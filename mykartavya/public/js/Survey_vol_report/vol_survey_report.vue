<template>
  <div class="report-container">
    <!-- Header -->
    <div class="btnexport">
      <p class="heading">Volunteer Report</p>
      <div class="flex gap-2">
        <!-- Refresh Button -->
        <button class="export-btn" @click="fetchData">
          <svg class="btn-icon transition-transform duration-500 bg-red-500" :class="{ 'rotate-180': rotated }" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
        </button>

        <!-- Export Button -->
        <button class="export-btn" @click="handleExport">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export Report
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table class="report-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Volunteer</th>
            <th>Activity</th>
            <th>Survey</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(volunteer, index) in volunteers" :key="volunteer?.log_id || index">
            <td class="vol-index-cell" @click="RenderVolAct()">{{ index + 1 }}</td>
            <td class="bold">{{ volunteer?.user_name }}</td>
            <td>{{ volunteer?.activity_title }}</td>
            <td>{{ volunteer?.survey_name }}</td>
          </tr>
          <tr v-if="volunteers.length === 0">
            <td colspan="5" class="empty-msg-cell">
              <div class="empty-msg-wrapper">
                <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                </svg>
                <span class="empty-text">No records found.</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const rotated = ref(false)
const volunteers = ref([])
const survey_id = ref('')
const survey = ref([])

// Fetch report data
const fetchData = async () => {
  rotated.value = !rotated.value
  await frappe.call({
    method: 'mykartavya.controllers.vol_act_report.vol_survey_report',
    args: {
      survey_id: frappe.router.current_route[2]
    },
    callback: (r) => {
      console.log(r);

      volunteers.value = r.message || []
      survey_id.value = r.message?.[0]?.activity_name || ''
      survey.value = r.message[0].name
    }
  })
}
// Export CSV
const handleExport = () => {
  if (!volunteers.value.length) return frappe.msgprint('No data to export.')

  const columns = Object.keys(volunteers.value[0]).map(key => ({
    fieldname: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
  }))

  const csvContent = convertToCSV(volunteers.value, columns)
  downloadCSV(csvContent, 'volunteer_activity_report.csv')
}

const convertToCSV = (data, columns) => {
  const headers = columns.map(col => col.label).join(',')
  const rows = data.map(row =>
    columns.map(col => {
      let val = row[col.fieldname] ?? ''

      // 👉 Custom handling for `answers` field (array of objects)
      if (col.fieldname === 'answers' && Array.isArray(val)) {
        val = val.map(a => `${a.question_label}: ${a.answer}`).join(' | ')
      }

      val = String(val).replace(/"/g, '""') // escape quotes
      return /[",\n]/.test(val) ? `"${val}"` : val
    }).join(',')
  )
  return [headers, ...rows].join('\n')
}
const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

// Redirect to activity page
const RenderVolAct = () => {
  if (survey.value) {
    console.log(survey);
    frappe.set_route('volunteer-survey-log', survey.value)
  } else {
    frappe.msgprint('No activity selected.')
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.btn-icon {
  width: 24px;
  height: 24px;
  transition: transform 0.5s ease;
}
.rotate-180 {
  transform: rotate(180deg);
}
.report-container {
  font-family: "Inter", sans-serif;
  background: #fff;
}

.btnexport {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  color: #333;
}

.btnexport p {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.export-btn {
  background-color: #f4f4f4;
  color: #495057;
  font-size: 0.875rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  padding: 0.3rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.heading {
  font-size: medium !important;
  font-weight: 400 !important;
}

.export-btn:hover {
  background-color: #e9ecef;
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 0.5rem;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.report-table th,
.report-table td {
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  border: 0.5px solid #dcdcdc;
}

.report-table thead {
  background-color: #f8f9fa;
}

.report-table th {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  font-size: small;
}

.report-table td.bold {
  font-weight: 500;
  font-size: small;
}

.reject-btn {
  background-color: #e41328;
  color: white;
  font-size: 0.75rem;
  padding: 2px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.reject-btn:hover {
  background-color: #dc3545;
}

.reject-btn:disabled {
  background-color: #6c757d;
  opacity: 0.5;
  cursor: not-allowed;
}

.empty-msg-cell {
  padding: 40px 0;
  text-align: center;
  color: #6b7280;
}

.empty-msg-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  width: 32px;
  height: 32px;
  color: #9ca3af;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 14px;
  color: #6b7280;
}

.vol-index-cell {
  width: 50px !important;
  cursor: pointer;
  font-weight: 500;
  text-align: center;
  transition: background-color 0.2s ease, color 0.2s ease;
}
</style>
