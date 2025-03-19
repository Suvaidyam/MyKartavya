<template>
    <div class="max-w-[1920px] mx-auto px-10 pt-[82px] pb-4 bg-gray-50">
        <div class="bg-white rounded-lg shadow mt-4">
            <div class="p-6">
                <h2 class="text-xl font-semibold text-gray-700 mb-4">Company Registration</h2>
                <form @submit.prevent="submitForm" class="space-y-8" :class="{ 'loading': loading }">
                    <!-- Error Message Display -->
                    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
                        role="alert">
                        <span class="block sm:inline">{{ error }}</span>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Basic Information -->
                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Company Name <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.company_name" type="text" placeholder="Enter Company Name" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Registration Date <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.registration_date" type="date" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Email <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.email" type="email" placeholder="company@example.com" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <!-- Contact Information -->
                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                First Name <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.first_name" type="text" placeholder="First Name" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Last Name <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.last_name" type="text" placeholder="Last Name" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Designation <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.designation" type="text" placeholder="e.g., Director, Manager" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Mobile Number <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.mobile_number" type="tel" placeholder="+91 XXXXX XXXXXr" maxlength="10"
                                pattern="\d{10}"
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>


                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Phone
                            </label>
                            <input v-model="form.phone" type="tel" placeholder="+91 XXXXX XXXXX"
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <!-- Address Information -->
                        <div class="md:col-span-2">
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                India Headquarters Address <span class="text-red-500 pt-2">*</span>
                            </label>
                            <textarea v-model="form.address" rows="3"
                                placeholder="Enter complete address with landmarks" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200"></textarea>
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Country <span class="text-red-500 pt-2">*</span>
                            </label>
                            <select v-model="form.country" @change="fetchStates" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200">
                                <option value="" disabled>Select Country</option>
                                <option v-for="country in countries" :key="country.name" :value="country.name">
                                    {{ country.label || country.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                State <span class="text-red-500 pt-2">*</span>
                            </label>
                            <select v-model="form.state" @change="fetchCities" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200">
                                <option value="" disabled>Select State</option>
                                <option v-for="state in states" :key="state.name" :value="state.name">
                                    {{ state.state_name || state.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                City <span class="text-red-500 pt-2">*</span>
                            </label>
                            <select v-model="form.city" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200">
                                <option value="" disabled>Select City</option>
                                <option v-for="city in cities" :key="city.name" :value="city.name">
                                    {{ city.district_name || city.name }}
                                </option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Pincode <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.pincode" type="text" placeholder="Enter PIN code" maxlength="6"
                                pattern="\d{6}" required
                                oninput="this.value=this.value.replace(/[^0-9]/g,'').slice(0,6)"
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <!-- Organization Details -->
                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Number of Employees <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.number_of_employees" type="number" min="1" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Clear Vision <span class="text-red-500 pt-2">*</span>
                            </label>
                            <select v-model="form.clear_vision" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <!-- Volunteering Program Details -->
                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Volunteering CSR Activities Cost (%) <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.volunteering_csr_activities" type="number" min="0" max="100" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>

                        <div>
                            <label class="block text-bodyh1 font-normal text-gray-700 mb-1">
                                Employee Engagement Coverage (%) <span class="text-red-500 pt-2">*</span>
                            </label>
                            <input v-model="form.employee_engagement" type="number" min="0" max="100" required
                                class="block w-full border border-gray-300 text-bodyh2 rounded py-2 px-3 focus:outline-none focus:ring focus:ring-orange-200" />
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="mt-6">
                        <button type="submit"
                            class="bg-orange-500 text-white font-semibold py-2 px-4 rounded-sm hover:bg-orange-600 transition"
                            :disabled="loading">
                            {{ loading ? 'Registering...' : 'Register Company' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const call = inject('call');
const router = useRouter();
const loading = ref(false);
const error = ref(null);
const value = ref(null)

const form = ref({
    registration_type: "Self Registration",
    registration_date: "",
    company_name: "",
    first_name: "",
    last_name: "",
    email: "",
    designation: "",
    phone: "",
    mobile_number: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    number_of_employees: "",
    clear_vision: "Yes",
    volunteering_csr_activities: "",
    employee_engagement: "",
});

const validateForm = () => {
    // Reset error
    error.value = null;

    // Required fields validation
    const requiredFields = [
        'company_name',
        'registration_date',
        'first_name',
        'last_name',
        'email',
        'designation',
        'mobile_number',
        'address',
        'country',
        'state',
        'city',
        'pincode',
        'number_of_employees',
        'clear_vision',
        'volunteering_csr_activities',
        'employee_engagement'
    ];

    for (const field of requiredFields) {
        if (!form.value[field]) {
            error.value = `Please fill in ${field.replace(/_/g, ' ')}.`;
            toast.error(error.value, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
            });
            return false;
        }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.value.email)) {
        error.value = 'Please enter a valid email address.';
        toast.error(error.value, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
        return false;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(this.form.mobile_number)) {
        this.error = 'Mobile number must be exactly 10 digits.';
        this.toast.error(this.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
        return false;
    }

    if (form.value.phone && !phoneRegex.test(form.value.phone)) {
        error.value = 'Phone number must be exactly 10 digits.';
        toast.error(error.value, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
        return false;
    }

    // Pincode validation
    if (!/^\d{6}$/.test(form.value.pincode)) {
        error.value = 'Pincode must be exactly 6 digits.';
        toast.error(error.value, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
        return false;
    }

    // Number of employees validation
    if (parseInt(form.value.number_of_employees) < 1) {
        error.value = 'Number of employees must be at least 1.';
        toast.error(error.value, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
        return false;
    }

    // Percentage validations
    const percentageFields = ['volunteering_csr_activities', 'employee_engagement'];
    for (const field of percentageFields) {
        const value = parseFloat(form.value[field]);
        if (isNaN(value) || value < 0 || value > 100) {
            error.value = `${field.replace(/_/g, ' ')} must be between 0 and 100.`;
            toast.error(error.value, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
            });
            return false;
        }
    }

    return true;
};

const submitForm = async () => {
    try {
        if (!validateForm()) {
            return;
        }

        loading.value = true;

        const response = await call('mykartavya.mykartavya.api.register_company', {
            registration_type: form.value.registration_type,
            registration_date: form.value.registration_date,
            company_name: form.value.company_name,
            first_name: form.value.first_name,
            last_name: form.value.last_name,
            email: form.value.email,
            designation: form.value.designation,
            phone: form.value.phone,
            mobile_number: form.value.mobile_number,
            address: form.value.address,
            country: form.value.country,
            state: form.value.state,
            city: form.value.city,
            pincode: form.value.pincode,
            number_of_employees: form.value.number_of_employees,
            clear_vision: form.value.clear_vision,
            volunteering_csr_activities: form.value.volunteering_csr_activities,
            employee_engagement: form.value.employee_engagement,
        });

        if (response.status === 'error') {
            throw new Error(response.message);
        }

        toast.success('Company Registration Successful! Please check your email for login credentials.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });

        // Redirect to home after a short delay
        setTimeout(() => {
            router.push('/');
        }, 2000);

    } catch (err) {
        console.error('Error submitting form:', err);
        toast.error(err.message || 'Failed to register company. Please try again.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
        });
    } finally {
        loading.value = false;
    }
};

// Fetch country, state and city data
const countries = ref([]);
const states = ref([]);
const cities = ref([]);

const fetchCountries = async () => {
    try {
        loading.value = true;
        const res = await call("mykartavya.controllers.api.country_data");
        countries.value = res || [];
    } catch (err) {
        console.error('Error fetching countries:', err);
        toast.error('Failed to load countries. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
    } finally {
        loading.value = false;
    }
};

const fetchStates = async () => {
    try {
        if (!form.value.country) return;
        loading.value = true;
        const res = await call("mykartavya.controllers.api.state_data", {
            country: form.value.country
        });
        states.value = res || [];
        form.value.state = ""; // Reset state when country changes
        form.value.city = ""; // Reset city when country changes
    } catch (err) {
        console.error('Error fetching states:', err);
        toast.error('Failed to load states. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
    } finally {
        loading.value = false;
    }
};

const fetchCities = async () => {
    try {
        if (!form.value.state) return;
        loading.value = true;
        const res = await call("mykartavya.controllers.api.city_data", {
            state: form.value.state
        });
        cities.value = res || [];
        form.value.city = ""; // Reset city when state changes
    } catch (err) {
        console.error('Error fetching cities:', err);
        toast.error('Failed to load cities. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
        });
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await fetchCountries();
    if (form.value.country) {
        await fetchStates();
    }
});
</script>

<style scoped>
.loading {
    opacity: 0.7;
    pointer-events: none;
}

.error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}
</style>
