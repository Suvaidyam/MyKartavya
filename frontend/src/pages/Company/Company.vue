<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
        <div class="max-w-5xl mx-auto p-6 font-sans mt-16">
            <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Company Name <span class="text-red-500">*</span>
                        </label>
                        <input type="text" v-model="form.companyName" required
                            class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Company Registration Date <span class="text-red-500">*</span>
                        </label>
                        <input type="date" v-model="form.registrationDate" required
                            class="block w-full rounded-md border-gray-300 border py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                </div>
                <div>
                    <h2 class="text-base font-bold text-gray-900 mb-4">Contact Information</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                First Name <span class="text-red-500">*</span>
                            </label>
                            <input type="text" v-model="form.firstName" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Designation <span class="text-red-500">*</span>
                            </label>
                            <input type="text" v-model="form.designation" required
                                class="block w-full rounded-md border-gray-300 border py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Last Name <span class="text-red-500">*</span>
                            </label>
                            <input type="text" v-model="form.lastName" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input type="tel" v-model="form.phone"
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Email <span class="text-red-500">*</span>
                            </label>
                            <input type="email" v-model="form.email" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Number <span class="text-red-500">*</span>
                            </label>
                            <input type="tel" v-model="form.mobileNumber" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-base font-bold text-gray-900 mb-4">Address Information</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                India Headquarters Address <span class="text-red-500">*</span>
                            </label>
                            <textarea v-model="form.address" rows="4" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Country <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.country" @change="fetchStates" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option v-for="country in countries" :key="country.name" :value="country.name">
                                    {{ country.label }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                State <span class="text-red-500">*</span>
                            </label>
                            <select v-model="form.state" @change="fetchCities" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                <option v-for="state in states" :key="state.name" :value="state.name">
                                    {{ state.label }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                City <span class="text-red-500">*</span>
                            </label>
                            <label for="city">City (District)</label>
                            <select id="city" v-model="form.city" required>
                                <option value="" disabled>Select your city</option>
                                <option v-for="city in cities" :key="city.name" :value="city.name">
                                    {{ city.label }}
                                </option>
                            </select>

                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Pincode <span class="text-red-500">*</span>
                            </label>
                            <input type="text" v-model="form.pincode" required
                                class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-base font-bold text-gray-900 mb-4">Organization Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Number of Employees <span class="text-red-500">*</span>
                            </label>
                            <input type="number" v-model="form.employees" required
                                class="block w-full rounded-md border-gray-300 border py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Clear Vision <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <select v-model="form.clearVision" required
                                    class="block w-full rounded-md border-gray-300 border py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                                <div
                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 class="text-base font-bold text-gray-900 mb-4">Volunteering Program Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Volunteering CSR Activities Cost <span class="text-red-500">*</span>
                            </label>
                            <input type="text" v-model="form.csrCost" required
                                class="block w-full rounded-md border-gray-300 border py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">
                                Employee Engagement Coverage <span class="text-red-500">*</span>
                            </label>
                            <input type="text" v-model="form.employeeEngagement" required
                                class="block w-full rounded-md border-gray-300 border py-2 px-3 bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                        </div>
                    </div>
                </div>
                <div class="flex justify-end">
                    <button type="submit"
                        class="bg-orange-500 text-white font-semibold py-2 px-6 rounded-sm hover:bg-orange-600 transition">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { call } from "frappe-ui";
import { reactive, ref } from "vue";

const form = reactive({
    registrationType: "Self Registration",
    registrationDate: "",
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    phone: "",
    mobileNumber: "",
    address: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    employees: "",
    clearVision: "Yes",
    csrCost: "",
    employeeEngagement: "",
});

function validateForm() {
    if (!form.companyName) {
        alert("Company Name is required");
        return false;
    }
    if (!form.city) {
        alert("City is required");
        return false;
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        alert("Valid email is required");
        return false;
    }
    if (!form.registrationDate) {
        alert("Registration Date is required");
        return false;
    }
    return true;
}


async function submitForm() {
    if (!validateForm()) return;

    console.log("Form submitted:", form);

    try {
        const response = await call("frappe.client.insert", {
            doc: {
                doctype: "Company",
                first_name: form.firstName,
                last_name: form.lastName,
                company_registration_date: form.registrationDate,
                company_name: form.companyName,
                email: form.email,
                designation: form.designation,
                india_headquarters_address: form.address,
                mobile_number: form.mobileNumber,
                country: form.country,
                state: form.state,
                city: form.city, // Include city here
                pincode: form.pincode,
                number_of_employees: form.employees,
                clear_vision: form.clearVision,
                volunteering_csr_activities: form.csrCost,
                employee_engagement: form.employeeEngagement,
            },
        });


        console.log("API Response:", response);
        alert("Form submitted successfully!");
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit the form. Please check the console for details.");
    }
}

const countries = ref([]);
const states = ref([]);
const cities = ref([]);

// Fetch data for countries
const fetchCountries = async () => {
    try {
        const res = await call("mykartavya.controllers.api.country_data");
        countries.value = Array.isArray(res)
            ? res.map((c) => ({ name: c.name, label: c.label || c.name }))
            : [];
    } catch (error) {
        console.error("Error fetching countries:", error);
        alert("Failed to load countries.");
    }
};

// Fetch data for states based on selected country
const fetchStates = async () => {
    if (!form.country) return;
    try {
        const res = await call("mykartavya.controllers.api.state_data", { country: form.country });
        states.value = Array.isArray(res)
            ? res.map((s) => ({ name: s.name, label: s.state_name || s.name }))
            : [];
    } catch (error) {
        console.error("Error fetching states:", error);
        alert("Failed to load states.");
    }
};

// Fetch data for cities based on selected state
const fetchCities = async () => {
    if (!form.state) return;
    try {
        const res = await call("mykartavya.controllers.api.city_data", { state: form.state });
        cities.value = Array.isArray(res)
            ? res.map((c) => ({ name: c.name, label: c.name })) // Ensure it matches `District` doctype
            : [];
    } catch (error) {
        console.error("Error fetching cities:", error);
        alert("Failed to load cities.");
    }
};


// Fetch initial countries on setup
fetchCountries();
</script>
