<template>
     <p class="text-lg md:text-2xl font-semibold font-poppins text-gray-800 tracking-tight pb-2">
            Survey
          </p>
    <div class="mx-auto py-2">
        <div v-if="jsonError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p class="text-sm text-red-800">{{ jsonError }}</p>
        </div>

        <div v-if="formFields.length === 0" class="bg-white rounded-lg shadow-md p-6 text-center">
            <p class="text-gray-500">No form fields available.</p>
        </div>
        <div v-if="formFields.length > 0" class="rounded-lg shadow-md overflow-hidden transition-all duration-300">
            <!-- Header Always Visible -->
            <div class="flex justify-between items-center cursor-pointer px-6 py-4 transition-colors duration-300"
                :class="activeIndex === 0 ? 'bg-white' : 'bg-gray-100'" @click="toggleAccordion(0)">
                <p class="text-lg font-semibold text-gray-800 flex items-center">{{ title }}</p>
                <button class="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg :class="[
                        'w-6 h-6 transition-transform duration-200 transform',
                        activeIndex === 0 ? 'rotate-180' : ''
                    ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            <div v-show="activeIndex === 0" class="px-6 pb-6 bg-white" style="transition: max-height 0.3s ease;">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="field in formFields" :key="field.name" class="form-field">

                            <div v-if="field.fieldtype === 'Text'" class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    {{ field.label }}<span v-if="isRequired(field)" class="text-red-500 ml-1">*</span>
                                </label>
                                <input v-model="formData[field.name]" type="text" :class="getInputClasses(field)"
                                    :placeholder="`Enter ${field.label.toLowerCase()}`" :required="isRequired(field)" />
                                <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">{{
                                    fieldErrors[field.name] }}</div>
                            </div>

                            <div v-if="field.fieldtype === 'Small Text'" class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    {{ field.label }}<span v-if="isRequired(field)" class="text-red-500 ml-1">*</span>
                                </label>
                                <textarea v-model="formData[field.name]" :class="getInputClasses(field)"
                                    :placeholder="`Enter ${field.label.toLowerCase()}`" :required="isRequired(field)" />
                                <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">{{
                                    fieldErrors[field.name] }}</div>
                            </div>

                            <div v-else-if="field.fieldtype === 'Select'" class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    {{ field.label }}<span v-if="isRequired(field)" class="text-red-500 ml-1">*</span>
                                </label>
                                <div class="relative" :ref="el => dropdownRefs[field.name] = el">
                                    <button type="button" @click="toggleDropdown(field.name)" :class="[
                                        getInputClasses(field),
                                        'bg-white text-left flex items-center justify-between'
                                    ]">
                                        <span :class="formData[field.name] ? 'text-gray-900' : 'text-gray-500'">
                                            {{ formData[field.name] || `Select ${field.label.toLowerCase()}` }}
                                        </span>
                                        <svg :class="['w-5 h-5 text-gray-400 transition-transform duration-200', openDropdowns[field.name] ? 'rotate-180' : '']"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div v-show="openDropdowns[field.name]"
                                        class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                                        <div @click="selectOption(field.name, '')"
                                            class="px-3 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                                            Select {{ field.label.toLowerCase() }}
                                        </div>
                                        <div v-for="option in getSelectOptions(field.options)" :key="option"
                                            @click="selectOption(field.name, option)" :class="[
                                                'px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center justify-between',
                                                formData[field.name] === option ? 'bg-blue-100 text-blue-900 font-medium' : 'text-gray-900'
                                            ]">
                                            <span>{{ option }}</span>
                                            <svg v-if="formData[field.name] === option" class="w-4 h-4 text-blue-600"
                                                fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">{{
                                    fieldErrors[field.name] }}</div>
                            </div>

                            <div v-else-if="field.fieldtype === 'Check'" class="mb-3">
                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                    {{ field.label }}<span v-if="isRequired(field)" class="text-red-500 ml-1">*</span>
                                </label>
                                <div class="space-y-2 pl-4">
                                    <div v-for="option in getCheckboxOptions(field.options)" :key="option"
                                        class="flex items-center">
                                        <input :id="`${field.name}-${option}`" type="checkbox" :value="option"
                                            v-model="formData[field.name]"
                                            class="h-4 w-4 text-secondary border-gray-300 transition duration-200 focus:outline-none focus:ring-0 focus:border-secondary" />
                                        <label :for="`${field.name}-${option}`"
                                            class="ml-2 block text-sm text-gray-700">{{
                                                option }}</label>
                                    </div>
                                </div>
                                <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">{{
                                    fieldErrors[field.name] }}</div>
                            </div>

                        </div>
                    </div>

                    <!-- <div class="mt-6 flex gap-4">
                        <button type="submit" :disabled="isSubmitting"
                            class="w-full md:w-44 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 transform hover:scale-105 disabled:transform-none">
                            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
                        </button>
                    </div> -->
                    <button type="submit" :disabled="isSubmitting || hasSubmitted"
                        class="w-full md:w-44 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2">
                        <template v-if="isSubmitting">
                            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                            <span>Submitting</span>
                        </template>
                        <template v-else>
                            Submit
                        </template>
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted, inject } from 'vue'

const props = defineProps({
    formJson: [String, Object, Array],
    title: String,
    autoLoad: { type: Boolean, default: true },
    surveyId: { type: String, required: true },
    userId: { type: String, default: null },
    activityId: { type: String, default: null }
})

const formFields = ref([])
const formData = reactive({})
const fieldErrors = reactive({})
const jsonError = ref('')
const loadSuccess = ref(false)
const isSubmitting = ref(false)
const call = inject('call')
const openDropdowns = reactive({})
const dropdownRefs = reactive({})
import { toast } from 'vue3-toastify'
const activeIndex = ref(null)
const hasSubmitted = ref(false)

const toggleAccordion = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
}

const isRequired = (field) => field.mandatory === 1 || field.mandatory === true
const getSelectOptions = (options) => (!options ? [] : options.split('\n').filter(opt => opt.trim()).map(opt => opt.trim()))
const getCheckboxOptions = (options) => (!options ? [] : Array.isArray(options) ? options : options.split('\n').filter(opt => opt.trim()))
const getInputClasses = (field) => `w-full px-3 py-2 border rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-0 focus:border-blue-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'}`

const toggleDropdown = (fieldName) => {
    Object.keys(openDropdowns).forEach(key => {
        if (key !== fieldName) openDropdowns[key] = false
    })
    openDropdowns[fieldName] = !openDropdowns[fieldName]
}

const selectOption = (fieldName, option) => {
    formData[fieldName] = option
    openDropdowns[fieldName] = false
    if (fieldErrors[fieldName]) delete fieldErrors[fieldName]
}


const closeAllDropdowns = (event) => {
    let inside = false
    Object.keys(dropdownRefs).forEach(fieldName => {
        if (dropdownRefs[fieldName]?.contains(event.target)) inside = true
    })
    if (!inside) Object.keys(openDropdowns).forEach(key => openDropdowns[key] = false)
}

const loadJsonFromProps = () => {
    if (!props.formJson) return
    jsonError.value = ''
    loadSuccess.value = false

    try {
        let fields = []
        if (typeof props.formJson === 'string') fields = extractFieldsFromData(JSON.parse(props.formJson))
        else if (Array.isArray(props.formJson)) fields = props.formJson
        else if (typeof props.formJson === 'object') fields = extractFieldsFromData(props.formJson)

        const validFields = validateFields(fields)
        if (validFields.length > 0) {
            formFields.value = validFields
            initializeFormData(validFields)
            loadSuccess.value = true
        }
    } catch (error) {
        jsonError.value = `Error loading form: ${error.message}`
    }
}

const extractFieldsFromData = (data) => {
    if (Array.isArray(data)) return data
    if (data.form_json) return typeof data.form_json === 'string' ? JSON.parse(data.form_json) : data.form_json
    if (data.name && data.label && data.fieldtype) return [data]
    throw new Error('Invalid form_json structure')
}

const validateFields = (fields) => fields.filter(f => f.name && f.label && f.fieldtype)

const initializeFormData = (fields) => {
    Object.keys(formData).forEach(k => delete formData[k])
    Object.keys(fieldErrors).forEach(k => delete fieldErrors[k])
    Object.keys(openDropdowns).forEach(k => delete openDropdowns[k])

    fields.forEach(field => {
        formData[field.name] = field.fieldtype === 'Check' ? [] : ''
        if (field.fieldtype === 'Select') openDropdowns[field.name] = false
    })
}

const validateForm = () => {
    Object.keys(fieldErrors).forEach(k => delete fieldErrors[k])
    const errors = []

    formFields.value.forEach(field => {
        const value = formData[field.name]
        if (isRequired(field)) {
            if (field.fieldtype === 'Check' && (!value || !value.length)) {
                fieldErrors[field.name] = 'Please select at least one option'
                errors.push(field.label)
            } else if (!value || value.toString().trim() === '') {
                fieldErrors[field.name] = 'This field is required'
                errors.push(field.label)
            }
        }
    })

    return errors
}

const handleSubmit = async () => {
    isSubmitting.value = true;

    try {
        const errors = validateForm();
        if (errors.length > 0) {
            alert(`Please fill in the following required fields: ${errors.join(', ')}`);
            isSubmitting.value = false;
            return;
        }

        const answers = formFields.value.map(field => ({
            question_id: field.name,
            question_label: field.label,
            question_type: field.fieldtype,
            answer: field.fieldtype === 'Check'
                ? JSON.stringify(formData[field.name] || [])
                : formData[field.name] || ''
        }));

        const result = await call('mykartavya.controllers.survey.submit_volunteer_survey', {
            data: JSON.stringify({
                survey_id: props.surveyId,
                activity_id: props.activityId,
                user: props.userId,
                answers
            })
        });
        setTimeout(() => {
            if (result?.status === "success") {
                toast.success('Survey submitted successfully!', { autoClose: 2000 });
                hasSubmitted.value = true;
            } else {
                toast.error('Submission failed: ' + (result?.message || 'Unknown error'), { autoClose: 2000 });
            }
            isSubmitting.value = false;
        }, 5000);  
    } catch (err) {
        console.error(err);
        setTimeout(() => {
            toast.error('Error submitting form', { autoClose: 2000 });
            isSubmitting.value = false;
        }, 5000);  
    }
};
onMounted(() => {
    if (props.formJson && props.autoLoad) loadJsonFromProps()
    else initializeFormData(formFields.value)
    document.addEventListener('click', closeAllDropdowns)
})

onUnmounted(() => {
    document.removeEventListener('click', closeAllDropdowns)
})

watch(() => props.formJson, (newJson) => {
    if (newJson && props.autoLoad) loadJsonFromProps()
}, { deep: true })

watch(formData, () => {
    for (const key of Object.keys(fieldErrors)) {
        if (formData[key] && fieldErrors[key]) delete fieldErrors[key]
    }
}, { deep: true })
</script>

<style scoped>
.form-field {
    transition: all 0.2s ease-in-out;
}

.overflow-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.absolute.z-50 {
    animation: slideDown 0.2s ease-out;
}
</style>
