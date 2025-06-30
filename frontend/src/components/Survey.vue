
<template>
  <div class=" mx-auto py-6">
    <!-- Error Display for Props -->
    <div v-if="jsonError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-800">{{ jsonError }}</p>
    </div>

    <!-- No Form Message -->
    <div v-if="formFields.length === 0" class="bg-white rounded-lg shadow-md p-6 text-center">
      <p class="text-gray-500">No form fields available. Please provide form data through props.</p>
    </div>

    <!-- Dynamic Form -->
    <div v-if="formFields.length > 0" class="bg-white rounded-lg shadow-md p-6">
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-for="field in formFields" :key="field.name" class="form-field grid grid-cols-2 gap-4">
          
          <!-- Text Field -->
          <div v-if="field.fieldtype === 'Text'" class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="isRequired(field)" class="text-red-500 ml-1">*</span>
            </label>
            <input
              v-model="formData[field.name]"
              type="text"
              :class="getInputClasses(field)"
              :placeholder="`Enter ${field.label.toLowerCase()}`"
              :required="isRequired(field)"
            />
            <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">
              {{ fieldErrors[field.name] }}
            </div>
          </div>

          <!-- Select Field -->
          <div v-else-if="field.fieldtype === 'Select'" class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ field.label }}
              <span v-if="isRequired(field)" class="text-red-500 ml-1">*</span>
            </label>
            <select
              v-model="formData[field.name]"
              :class="getInputClasses(field)"
              :required="isRequired(field)"
            >
              <option value="">Select {{ field.label.toLowerCase() }}</option>
              <option 
                v-for="option in getSelectOptions(field.options)" 
                :key="option" 
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">
              {{ fieldErrors[field.name] }}
            </div>
          </div>

          <!-- Checkbox Field -->
          <div v-else-if="field.fieldtype === 'Check'" class="mb-3">
            <div class="flex items-center">
              <input
                v-model="formData[field.name]"
                type="checkbox"
                :id="field.name"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label :for="field.name" class="ml-2 block text-sm text-gray-700">
                {{ field.label }}
                <span v-if="isRequired(field)" class="text-red-500 ml-1">*</span>
              </label>
            </div>
            <div v-if="fieldErrors[field.name]" class="mt-1 text-sm text-red-600">
              {{ fieldErrors[field.name] }}
            </div>
          </div>

        </div>

        <!-- Submit Button -->
        <div class="mt-6 flex">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full md:w-60 bg-secondary hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-2 rounded-md transition duration-200"
          >
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

// Props
const props = defineProps({
  formJson: {
    type: [String, Object, Array],
    default: null
  },
  autoLoad: {
    type: Boolean,
    default: true
  }
})



// Reactive data
const formFields = ref([])
const formData = reactive({})
const fieldErrors = reactive({})
const jsonInput = ref('')
const jsonError = ref('')
const loadSuccess = ref(false)
const isSubmitting = ref(false)

// Computed properties
const isRequired = (field) => {
  return field.mandatory === 1 || field.mandatory === true
}

const getSelectOptions = (options) => {
  if (!options) return []
  return options.split('\n').filter(opt => opt.trim()).map(opt => opt.trim())
}

const getInputClasses = (field) => {
  const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
  const hasError = fieldErrors[field.name]
  const borderClass = hasError ? "border-red-500" : "border-gray-300"
  return `${baseClasses} ${borderClass}`
}

const loadJsonFromProps = () => {
  if (!props.formJson) return
  
  jsonError.value = ''
  loadSuccess.value = false
  
  try {
    let fields = []
    
    // Handle different prop types
    if (typeof props.formJson === 'string') {
      // If prop is a string, parse it
      const parsedData = JSON.parse(props.formJson)
      fields = extractFieldsFromData(parsedData)
    } else if (Array.isArray(props.formJson)) {
      // If prop is already an array
      fields = props.formJson
    } else if (typeof props.formJson === 'object') {
      // If prop is an object
      fields = extractFieldsFromData(props.formJson)
    }
    
    // Validate and set fields
    const validFields = validateFields(fields)
    if (validFields.length > 0) {
      formFields.value = validFields
      initializeFormData(validFields)
      loadSuccess.value = true
      console.log('Form loaded from props:', formFields.value)
    }
    
  } catch (error) {
    jsonError.value = `Error loading form from props: ${error.message}`
    console.error('Props loading error:', error)
  }
}

const extractFieldsFromData = (data) => {
  let fields = []
  
  if (Array.isArray(data)) {
    fields = data
  } else if (data.form_json) {
    // Handle nested structure with form_json property
    if (typeof data.form_json === 'string') {
      fields = JSON.parse(data.form_json)
    } else {
      fields = data.form_json
    }
  } else if (data.name && data.label && data.fieldtype) {
    // Single field object
    fields = [data]
  } else {
    throw new Error('Invalid data structure. Expected array of fields or object with form_json property.')
  }
  
  return Array.isArray(fields) ? fields : [fields]
}

const validateFields = (fields) => {
  return fields.filter(field => {
    if (!field.name || !field.label || !field.fieldtype) {
      console.warn('Skipping invalid field:', field)
      return false
    }
    return true
  })
}
const initializeFormData = (fields) => {
  // Clear existing data
  Object.keys(formData).forEach(key => delete formData[key])
  Object.keys(fieldErrors).forEach(key => delete fieldErrors[key])
  
  // Initialize with default values
  fields.forEach(field => {
    if (field.fieldtype === 'Checkbox') {
      formData[field.name] = false
    } else {
      formData[field.name] = ''
    }
  })
}

const loadJsonForm = () => {
  jsonError.value = ''
  loadSuccess.value = false
  
  try {
    const parsedData = JSON.parse(jsonInput.value)
    const fields = extractFieldsFromData(parsedData)
    const validFields = validateFields(fields)
    
    if (validFields.length === 0) {
      throw new Error('No valid fields found. Each field must have name, label, and fieldtype properties.')
    }
    
    formFields.value = validFields
    initializeFormData(validFields)
    loadSuccess.value = true
    
    console.log('Form loaded successfully:', formFields.value)
  } catch (error) {
    jsonError.value = `Invalid JSON format: ${error.message}`
    console.error('JSON Parse Error:', error)
  }
}

const loadSampleForm = () => {
  // Sample with the structure you provided
  const sampleJson = {
    "form_json": "[{\"name\":\"vcsef08rul\",\"owner\":\"Administrator\",\"creation\":\"2025-06-30 16:50:22.058318\",\"modified\":\"2025-06-30 16:51:14.209453\",\"modified_by\":\"Administrator\",\"docstatus\":0,\"idx\":1,\"label\":\"Name\",\"fieldtype\":\"Text\",\"mandatory\":0,\"parent\":\"SUR-Test-0210\",\"parentfield\":\"questions\",\"parenttype\":\"Survey\",\"doctype\":\"Survey Form Builder\"},{\"name\":\"email_field\",\"label\":\"Email Address\",\"fieldtype\":\"Text\",\"mandatory\":1},{\"name\":\"country_select\",\"label\":\"Country\",\"fieldtype\":\"Select\",\"options\":\"USA\\nCanada\\nUK\\nAustralia\\nGermany\",\"mandatory\":1},{\"name\":\"newsletter_checkbox\",\"label\":\"Subscribe to Newsletter\",\"fieldtype\":\"Checkbox\",\"mandatory\":0}]"
  }
  
  jsonInput.value = JSON.stringify(sampleJson, null, 2)
  loadJsonForm()
}

const clearForm = () => {
  jsonInput.value = ''
  formFields.value = []
  Object.keys(formData).forEach(key => delete formData[key])
  Object.keys(fieldErrors).forEach(key => delete fieldErrors[key])
  jsonError.value = ''
  loadSuccess.value = false
}

const validateForm = () => {
  // Clear previous errors
  Object.keys(fieldErrors).forEach(key => delete fieldErrors[key])
  
  const errors = []
  
  formFields.value.forEach(field => {
    if (isRequired(field)) {
      const value = formData[field.name]
      
      if (field.fieldtype === 'Checkbox') {
        if (!value) {
          fieldErrors[field.name] = 'This field is required'
          errors.push(field.label)
        }
      } else {
        if (!value || value.toString().trim() === '') {
          fieldErrors[field.name] = 'This field is required'
          errors.push(field.label)
        }
      }
    }
  })
  
  return errors
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    const errors = validateForm()
    
    if (errors.length > 0) {
      alert(`Please fill in the following required fields: ${errors.join(', ')}`)
      return
    }
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Form Data:', formData)
    alert('Form submitted successfully! Check console for data.')
    
  } catch (error) {
    console.error('Submission error:', error)
    alert('An error occurred while submitting the form.')
  } finally {
    isSubmitting.value = false
  }
}

// Initialize form data on component mount and when props change
onMounted(() => {
  if (props.formJson && props.autoLoad) {
    loadJsonFromProps()
  } else {
    initializeFormData(formFields.value)
  }
})

// Watch for prop changes
watch(() => props.formJson, (newJson) => {
  if (newJson && props.autoLoad) {
    loadJsonFromProps()
  }
}, { deep: true })

// Watch for changes in form data to clear errors
watch(formData, () => {
  Object.keys(fieldErrors).forEach(key => {
    if (formData[key] && fieldErrors[key]) {
      delete fieldErrors[key]
    }
  })
}, { deep: true })
</script>

<style scoped>
/* Custom styles if needed */
.form-field {
  transition: all 0.2s ease-in-out;
}

.form-field:hover {
  transform: translateY(-1px);
}
</style>
Made with
