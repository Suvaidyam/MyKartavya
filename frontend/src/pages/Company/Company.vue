<template>
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
                        <input type="text" v-model="form.country" required value="India"
                            class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            State <span class="text-red-500">*</span>
                        </label>
                        <input type="text" v-model="form.state" required
                            class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            City <span class="text-red-500">*</span>
                        </label>
                        <input type="text" v-model="form.city" required
                            class="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500">
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
</template>

<script setup>
import { call } from "frappe-ui";
import { reactive } from "vue";

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

function submitForm() {
    console.log("Form submitted:", form);
    // API call logic can go here
}
console.log()

const response = await call('frappe.client.insert', {
    doc: {
        doctype: 'Company',
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
        pincode: form.pincode,
        number_of_employees: form.employees,
        clear_vision: form.clearVision,
        volunteering_csr_activities: form.csrCost,
        employee_engagement: form.employeeEngagement,
    }

})

console.log(response)

function resetForm() {
    Object.keys(form).forEach((key) => {
        if (key === "country") form[key] = "India"; // Reset to default for `country`
        else if (key === "clearVision") form[key] = "Yes"; // Reset to default for `clearVision`
        else form[key] = ""; // Reset other fields to empty
    });
}
</script>

<style>
/* Additional custom styles can be added here if needed */
</style>