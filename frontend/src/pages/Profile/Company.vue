<template>
    <Button class="text-orange-500 hover:text-orange-600 text-sm bg-white hover:bg-white" @click="dialog = true">
        + Map New Company
    </Button>
    <Dialog v-model="dialog">
        <template #body-title>
            <h3>Company Mapping</h3>
        </template>
        <template #body-content>
            <div v-if="!isEmailVerified" class="max-w-md">
                <div class="mb-4 relative">
                    <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                        Company Email <span class="text-red-500">*</span>
                    </label>
                    <input v-model="email" type="email" placeholder="Enter your company email"
                        :disabled="verificationSent"
                        class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                    <p v-if="emailError" class="text-red-500 absolute -bottom-10 text-[11px] mt-1">{{ emailError }}</p>
                </div>

                <!-- Verification Status -->
                <div v-if="verificationSent" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
                    <p class="text-green-700 text-sm">
                        <span class="font-medium">Verification email sent!</span><br />
                        Please check your email inbox and click the verification link to complete the company mapping
                        process.
                    </p>
                    <button @click="resendVerification" class="mt-2 text-orange-600 text-sm hover:text-orange-700"
                        :disabled="resendTimer > 0">
                        {{ resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend verification email' }}
                    </button>
                </div>
            </div>
        </template>
        <template #actions>
            <!-- Action Button -->
            <div>
                <button v-if="!verificationSent" @click="sendVerification" :disabled="!isValidEmail || isLoading"
                    class="bg-orange-500 text-white font-medium py-2 w-60 justify-center rounded-sm hover:bg-orange-600 transition disabled:opacity-50 flex items-center gap-2">
                    <span v-if="isLoading" class="inline-block animate-spin w-4 h-4">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </span>
                    {{ isLoading ? 'Sending...' : 'Send Verification Email' }}
                </button>
            </div>
        </template>
    </Dialog>
    <div v-if="showConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 class="text-lg font-medium text-gray-900 mb-3">Confirm Removal</h3>
            <p class="text-gray-600 mb-6">Are you sure you want to remove this company mapping?</p>
            <div class="flex justify-end gap-3">
                <button @click="showConfirmDialog = false"
                    class="px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-300 rounded-sm">
                    Cancel
                </button>
                <button @click="confirmRemoveMapping"
                    class="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600">
                    Remove
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue';
import { toast } from 'vue3-toastify';
import { Button, Dialog } from 'frappe-ui';

const call = inject('call');
const auth = inject('auth');
const dialog = ref(false);
const email = ref('');
const verificationSent = ref(false);
const isEmailVerified = ref(false);
const emailError = ref('');
const resendTimer = ref(0);
const mappedCompanies = ref([]);
const isLoading = ref(false);
const showConfirmDialog = ref(false);
const companyToRemove = ref(null);

// Email validation
const isValidEmail = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value);
});

// Send verification email
const sendVerification = async () => {
    if (!validateEmail()) {
        return;
    }

    try {
        isLoading.value = true;
        emailError.value = '';

        if (!isValidEmail.value) {
            emailError.value = 'Please enter a valid email address';
            return;
        }

        // Create new mapping document
        const response = await call('frappe.client.insert', {
            doc: {
                doctype: 'Volunteer Company Mapper',
                volunteer_email: email.value,
                volunteer: auth.cookie.name
                // is_email_verified: 1,

            }
        });

        if (response) {
            verificationSent.value = true;
            startResendTimer();
            toast.success('Verification email sent! Please check your inbox.', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    } catch (error) {
        // Handle specific error messages
        const errorMessage = error?.message?.toLowerCase() || '';

        if (errorMessage.includes('email not found in sva user')) {
            emailError.value = 'This email is not registered in our system. Please use your company email address.';
            toast.error('Invalid company email address', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else if (errorMessage.includes('no company associated')) {
            emailError.value = 'No company is associated with this email. Please contact your company administrator.';
            toast.error('No company association found', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else if (errorMessage.includes('already exists')) {
            emailError.value = 'This email is already mapped to a company. Please use a different email.';
            toast.error('Email already mapped', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else if (errorMessage.includes('verification required')) {
            verificationSent.value = true;
            startResendTimer();
            toast.info('A verification email has already been sent. Please check your inbox.', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else if (errorMessage.includes('rate limit')) {
            emailError.value = 'Please wait a few minutes before requesting another verification email.';
            toast.warning('Too many attempts. Please wait.', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        else {
            emailError.value = 'An error occurred while processing your request. Please try again later.';
            toast.error('Failed to process request', {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            console.error('Company mapping error:', error);
        }
    } finally {
        isLoading.value = false;
    }
};

// Resend verification email
const resendVerification = () => {
    if (resendTimer.value === 0) {
        sendVerification();
    }
};

// Start resend timer
const startResendTimer = () => {
    resendTimer.value = 300; // 5 minutes as per backend rate limit
    const timer = setInterval(() => {
        if (resendTimer.value > 0) {
            resendTimer.value--;
        } else {
            clearInterval(timer);
        }
    }, 1000);
};

// Start new company mapping
const startNewMapping = () => {
    email.value = '';
    verificationSent.value = false;
    isEmailVerified.value = false;
    emailError.value = '';
};

// Open confirmation dialog
const openConfirmDialog = (name) => {
    companyToRemove.value = name;
    showConfirmDialog.value = true;
};

// Confirm removal
const confirmRemoveMapping = async () => {
    try {
        await call('frappe.client.delete', {
            doctype: 'Volunteer Company Mapper',
            name: companyToRemove.value
        });

        toast.success('Company mapping removed successfully!');
        await fetchMappedCompanies();
    } catch (error) {
        const errorMessage = error?.message?.toLowerCase() || '';

        if (errorMessage.includes('permission')) {
            toast.error('You do not have permission to remove this mapping');
        } else if (errorMessage.includes('not found')) {
            toast.error('This mapping no longer exists');
            await fetchMappedCompanies();
        } else {
            toast.error('Failed to remove company mapping');
            console.error('Remove mapping error:', error);
        }
    } finally {
        showConfirmDialog.value = false;
        companyToRemove.value = null;
    }
};

// Fetch mapped companies with improved error handling
const fetchMappedCompanies = async () => {
    try {
        const response = await call('frappe.client.get_list', {
            doctype: 'Volunteer Company Mapper',
            fields: ['name', 'volunteer_email', 'company_name', 'role_profile'],
            filters: {
                volunteer: auth.cookie.name,
                is_email_verified: 1
            }
        });

        mappedCompanies.value = response || [];
        isEmailVerified.value = mappedCompanies.value.length > 0;
    } catch (error) {
        const errorMessage = error?.message?.toLowerCase() || '';

        if (errorMessage.includes('permission')) {
            toast.error('You do not have permission to view company mappings');
        } else {
            toast.error('Failed to fetch company mappings');
            console.error('Fetch mappings error:', error);
        }

        mappedCompanies.value = [];
        isEmailVerified.value = false;
    }
};

// Add input validation
const validateEmail = () => {
    emailError.value = '';

    if (!email.value) {
        emailError.value = 'Email address is required';
        return false;
    }

    if (!isValidEmail.value) {
        emailError.value = 'Please enter a valid email address';
        return false;
    }

    // Check if it's a company email (optional)
    if (email.value.includes('@gmail.com') ||
        email.value.includes('@yahoo.com') ||
        email.value.includes('@hotmail.com')) {
        emailError.value = 'Please use your company email address';
        return false;
    }

    return true;
};

// Update the email watcher
watch(email, () => {
    if (email.value && !isValidEmail.value) {
        emailError.value = 'Please enter a valid email address';
    } else {
        emailError.value = '';
    }
});

// Initialize component
onMounted(() => {
    fetchMappedCompanies();
});


</script>