<template>
    <div class="mx-auto py-2">
        <div v-if="jsonError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p class="text-sm text-red-800">{{ jsonError }}</p>
        </div>

        <div v-if="formFields.length === 0" class="bg-white rounded-lg shadow-md p-6 text-center">
            <p class="text-gray-500">No form fields available.</p>
        </div>
        <div v-if="formFields.length > 0"
            class="rounded-md  border border-gray-200  overflow-visible transition-all duration-300">
            <!-- Header Always Visible -->
            <div class="flex justify-between items-center cursor-pointer px-6 py-3 bg-orange-50 rounded-t-md  transition-colors duration-300 group hover:bg-orange-50 focus:outline-none"
                :class="activeIndex === 0 ? 'bg-orange-50 ' : ''" @click="toggleAccordion(0)">
                <p class="text-lg font-bold text-gray-800 flex items-center  font-poppins tracking-wide">
                    {{ title }}
                </p>
                <button class="text-gray-500 hover:text-orange-600 focus:outline-none">
                    <svg :class="['w-5 h-5 transition-transform duration-300 transform', activeIndex === 0 ? 'rotate-180 text-orange-500' : 'text-gray-400']"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            <transition name="collapse">
                <div v-show="activeIndex === 0"
                    class="px-6 pb-5 pt-2 bg-white rounded-b-md border-t-0 border border-orange-100"
                    style="overflow: hidden;">
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div v-for="(field, idx) in formFields" :key="field.name" class="form-field">

                                <div v-if="field.fieldtype === 'Text'" class="">
                                    <label class="block text-sm font-medium text-gray-700 mb-4">
                                        <span class="font-bold mr-2">{{ idx + 1 }}.</span> <span class="font-bold">{{
                                            field.label }}</span><span v-if="isRequired(field)"
                                            class="text-red-500 ml-1">*</span>
                                    </label>
                                    <input v-model="formData[field.name]" type="text"
                                        :class="['form-input', getInputClasses(field)]" :required="isRequired(field)"
                                        :readonly="hasSubmitted" />
                                    <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">{{
                                        fieldErrors[field.name] }}</div>
                                </div>

                                <div v-if="field.fieldtype === 'Small Text'" class="">
                                    <label class="block text-sm font-medium text-gray-700 mb-4">
                                        <span class="font-bold mr-2">{{ idx + 1 }}.</span> <span class="font-bold">{{
                                            field.label }}</span><span v-if="isRequired(field)"
                                            class="text-red-500 ml-1">*</span>
                                    </label>
                                    <textarea v-model="formData[field.name]"
                                        :class="['form-input', getInputClasses(field)]" :required="isRequired(field)"
                                        :readonly="hasSubmitted" />
                                    <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">{{
                                        fieldErrors[field.name] }}</div>
                                </div>

                                <div v-else-if="field.fieldtype === 'Select'" class=" relative">
                                    <label class="block text-sm font-medium text-gray-700 mb-4">
                                        <span class="font-bold mr-2">{{ idx + 1 }}.</span> <span class="font-bold">{{
                                            field.label }}</span><span v-if="isRequired(field)"
                                            class="text-red-500 ml-1">*</span>
                                    </label>
                                    <div class="relative" :ref="el => dropdownRefs[field.name] = el">
                                        <button type="button" @click="toggleDropdown(field.name)"
                                            :class="['form-input', getInputClasses(field), 'bg-white text-left flex items-center justify-between focus:ring-2 focus:ring-orange-400 focus:border-orange-400 hover:border-orange-400 transition-all duration-200 shadow-sm hover:shadow-md']"
                                            :disabled="hasSubmitted">
                                            <span :class="formData[field.name] ? 'text-gray-900' : 'text-gray-500'">
                                                {{ formData[field.name] || `Select ${field.label.toLowerCase()}` }}
                                            </span>
                                            <svg :class="['w-5 h-5 text-gray-400 transition-transform duration-200', openDropdowns[field.name] ? 'rotate-180' : '']"
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <teleport to="body">
                                            <div v-show="openDropdowns[field.name]"
                                                :style="getDropdownStyle(field.name)"
                                                class="absolute z-50 w-72 md:w-96 mt-1 bg-white border border-gray-300 rounded-md shadow-xl max-h-60 overflow-auto animate-slideDown">
                                                <div @click="selectOption(field.name, '')"
                                                    class="px-3 py-2 text-gray-500 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                                                    Select {{ field.label.toLowerCase() }}
                                                </div>
                                                <div v-for="option in getSelectOptions(field.options)" :key="option"
                                                    @click="selectOption(field.name, option)" :class="[
                                                        'px-3 py-2 cursor-pointer hover:bg-orange-50 flex items-center justify-between transition-all',
                                                        formData[field.name] === option ? 'bg-orange-100 text-orange-900 font-medium' : 'text-gray-900'
                                                    ]">
                                                    <span>{{ option }}</span>
                                                    <svg v-if="formData[field.name] === option"
                                                        class="w-4 h-4 text-orange-600" fill="currentColor"
                                                        viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </teleport>
                                    </div>
                                    <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">{{
                                        fieldErrors[field.name] }}</div>
                                </div>

                                <div v-else-if="field.fieldtype === 'Check'" class="">
                                    <label class="block text-sm font-medium text-gray-700 mb-4">
                                        <span class="font-bold mr-2">{{ idx + 1 }}.</span> <span class="font-bold">{{
                                            field.label }}</span><span v-if="isRequired(field)"
                                            class="text-red-500 ml-1">*</span>
                                    </label>
                                    <div class="flex flex-col gap-2 cursor-pointer pl-0">
                                        <div v-for="option in getCheckboxOptions(field.options)" :key="option"
                                            class="flex items-center mb-0">
                                            <input :id="`${field.name}-${option}`" type="checkbox" :value="option"
                                                v-model="formData[field.name]"
                                                class="h-4 w-4 text-secondary cursor-pointer border-gray-300 transition duration-200 focus:outline-none focus:ring-0 focus:border-secondary mr-2"
                                                :disabled="hasSubmitted" />
                                            <label :for="`${field.name}-${option}`"
                                                class="text-sm text-gray-700 cursor-pointer m-0 leading-4 align-middle ml-2"
                                                style="display:inline; vertical-align:middle;">
                                                {{ option }}
                                            </label>
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
                        <button v-if="hasSubmittedLoaded" type="submit" :disabled="isSubmitting || hasSubmitted"
                            class="w-full md:w-44 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 font-poppins">
                            <template v-if="isSubmitting">
                                <span>Submitting</span>
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4" />
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                            </template>
                            <template v-else>
                                Submit
                            </template>
                        </button>
                        <div v-else class="text-gray-500 text-sm">Checking submission status...</div>
                    </form>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted, inject, nextTick } from 'vue'

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
const hasSubmittedLoaded = ref(false)


const toggleAccordion = (index) => {
    activeIndex.value = activeIndex.value === index ? null : index
}

const isRequired = (field) => field.mandatory === 1 || field.mandatory === true
const getSelectOptions = (options) => (!options ? [] : options.split('\n').filter(opt => opt.trim()).map(opt => opt.trim()))
const getCheckboxOptions = (options) => (!options ? [] : Array.isArray(options) ? options : options.split('\n').filter(opt => opt.trim()))
const getInputClasses = (field) => `w-full px-3 py-2 border rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-0 focus:border-blue-500 ${fieldErrors[field.name] ? 'border-red-500' : 'border-gray-300'}`

const toggleDropdown = (fieldName) => {
    if (hasSubmitted.value) return;
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

        if (result?.status === "success") {
            toast.success('Survey submitted successfully!', { autoClose: 2000 });
            hasSubmitted.value = true;
        } else {
            toast.error('Submission failed: ' + (result?.message || 'Unknown error'), { autoClose: 2000 });
        }
        isSubmitting.value = false;

    } catch (err) {
        console.error("Error submitting form", err);
        setTimeout(() => {
            toast.error('Error submitting form', { autoClose: 2000 });
            isSubmitting.value = false;
        }, 5000);
    }
};
onMounted(async () => {
    if (props.formJson && props.autoLoad) {
        loadJsonFromProps();
    } else {
        initializeFormData(formFields.value);
    }

    document.addEventListener('click', closeAllDropdowns);

    try {
        const res = await call('mykartavya.controllers.survey.has_submitted_survey', {
            survey_id: props.surveyId,
            user: props.userId
        });
        hasSubmitted.value = res === true;

        if (hasSubmitted.value) {
            // Wait for formFields and formData to be ready
            await nextTick();
            const answers = await call('mykartavya.controllers.survey.get_volunteer_survey_answers', {
                survey_id: props.surveyId
            });
            // Set formData with previous answers
            for (const key in answers) {
                // Find the field definition
                const field = formFields.value.find(f => f.name === key);
                if (field && field.fieldtype === 'Check') {
                    // Ensure value is an array for checkboxes
                    try {
                        formData[key] = Array.isArray(answers[key]) ? answers[key] : JSON.parse(answers[key]);
                    } catch {
                        formData[key] = [];
                    }
                } else {
                    formData[key] = answers[key];
                }
            }
        }
    } catch (err) {
        console.error("Check submit status error", err)
        hasSubmitted.value = false;
    } finally {
        hasSubmittedLoaded.value = true;
    }
});

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

// For Teleport dropdown positioning
const getDropdownStyle = (fieldName) => {
    const refEl = dropdownRefs[fieldName]
    if (!refEl) return {}
    const rect = refEl.getBoundingClientRect()
    return {
        position: 'absolute',
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.bottom + window.scrollY}px`,
        width: `${rect.width}px`,
        zIndex: 9999
    }
}
</script>

<style scoped>
.form-field {
    transition: box-shadow 0.2s, border-color 0.2s, background 0.2s;
    /* background: #fff; */
    border-radius: 0.75rem;
    margin-bottom: 1rem;
    /* box-shadow: 0 1px 4px 0 rgba(0,0,0,0.04); */
    text-align: left;
}

.form-field:hover,
.form-field:focus-within {
    /* box-shadow: 0 4px 16px 0 rgba(255, 145, 0, 0.10); */
    border-color: #ff9100;
    /* background: #fff7ed; */
}

input[type="text"],
textarea {
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    text-align: left;
}

input[type="text"]:focus,
textarea:focus {
    border-color: #ff9100;
    box-shadow: 0 0 0 2px #ffedd5;
}

/* Checkbox alignment fix */
.form-field .space-y-2,
.form-field .flex.gap-4 {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 0;
}

.form-field .flex.items-center {
    align-items: center;
    margin-bottom: 0;
}

.form-field input[type="checkbox"] {
    margin: 0;
    vertical-align: middle;
}

.form-field label {
    margin-bottom: 5px !important;
}

button[type="submit"] {
    background: linear-gradient(90deg, #ff9100 0%, #ff6d00 100%);
    box-shadow: 0 2px 8px 0 rgba(255, 145, 0, 0.10);
    border: none;
    font-weight: 600;
    letter-spacing: 0.02em;
    font-size: 1.1rem;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

button[type="submit"]:hover:not(:disabled) {
    background: linear-gradient(90deg, #ff6d00 0%, #ff9100 100%);
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 4px 16px 0 rgba(255, 145, 0, 0.15);
}

button[type="submit"]:disabled {
    background: #ecebeb;
    font-size: 16px;
    color: #bdbdbd;
    cursor: not-allowed;
    box-shadow: none;
}

.animate-slideDown {
    animation: slideDown 0.2s ease-out;
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

.form-field input[type="text"],
.form-field textarea,
.form-field .relative,
.form-field .space-y-2,
.form-field .flex.gap-4 {
    margin-top: 0.25rem;
}

.form-field .flex.items-center label {
    margin-bottom: 0 !important;
    line-height: 1.5rem;
    display: inline;
    vertical-align: middle;
    margin-left: 0.5rem !important;
}

.collapse-enter-active,
.collapse-leave-active {
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s, padding 0.4s;
    overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
    max-height: 1000px;
    /* Should be larger than your content's max possible height */
    opacity: 1;
    padding-top: 0.5rem;
    /* match your actual padding */
    padding-bottom: 1.25rem;
    /* match your actual padding */
}

.form-input {
    background: #fff;
    border: 1.5px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    text-align: left;
    min-height: 44px;
    /* Ensures consistent height */
    box-sizing: border-box;
}

.form-input:disabled,
.form-input[readonly] {
    background: #F8F8F8;
    color: #bdbdbd;
    cursor: not-allowed;
}
</style>
