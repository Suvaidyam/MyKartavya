<template>
    <div class="report-container">
        <!-- Export Button -->
        <div class="btnexport">
            <p>Volunteer Report</p>
            <div class="flex gap-2">
                <button class="export-btn" @click="fetchData">
                    <svg class="btn-icon transition-transform duration-500" :class="{ 'rotate-180': rotated }"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                        <path d="M3 21v-5h5" />
                    </svg>
                </button>
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
                        <th>Duration</th>
                        <th>Completion Status</th>
                        <th>Karma Points</th>
                        <th>Rating</th>
                        <th>Completion %</th>
                        <th class="flex justify-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(volunteer, index) in volunteers" :key="volunteer.name || index">
                        <td>{{ index + 1 }}</td>
                        <td class="bold">{{ volunteer.full_name }}</td>
                        <td>{{ formatDuration(volunteer.duration) }}</td>
                        <td>
                            <span :class="getStatusClass(volunteer.completion_wf_state)">
                                {{ volunteer.completion_wf_state }}
                            </span>
                        </td>
                        <td>{{ volunteer.karma_points }}</td>
                        <td>{{ volunteer.rating }}</td>
                        <td><i class="ellipsis">{{ volunteer.com_percent }}%</i></td>
                        <td class="flex justify-center">
                            <button class="reject-btn btn btn-danger " @click="rejectActivity({ name: volunteer.name })"
                                :disabled="volunteer.completion_wf_state === 'Rejected'">
                                Reject
                            </button>
                        </td>
                    </tr>
                    <tr v-if="volunteers.length === 0">
                        <td colspan="8" class="empty-msg">No volunteer activities recorded.</td>
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

const fetchData = () => {
    rotated.value = !rotated.value
    frappe.call({
        method: 'frappe.desk.query_report.run',
        args: {
            report_name: 'Volunteer Activity',
        },
        callback: (r) => {
            console.log('r', r.message?.result)
            volunteers.value = r.message?.result || []
        },
    })
}

// Format seconds to HH:mm:ss
const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00:00'

    const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}`
}

// Get status badge class based on status
const getStatusClass = (status) => {
    const baseClass = 'status-badge'
    switch (status) {
        case 'Completed':
            return `${baseClass} status-completed`
        case 'Rejected':
            return `${baseClass} status-rejected`
        case 'In Progress':
            return `${baseClass} status-progress`
        default:
            return baseClass
    }
}

function rejectActivity(doc) {
    if (!doc || !doc.name) {
        console.error('Document name not provided.')
        frappe.msgprint('Error: Document name not provided.')
        return
    }

    frappe.confirm(
        'Are you sure you want to reject this activity?',
        () => {
            frappe.db.set_value('Volunteer Activity', doc.name, 'completion_wf_state', 'Rejected')
                .then(() => {
                    frappe.msgprint('Activity marked as Rejected.')
                    // Update frontend data
                    const updated = volunteers.value.find(v => v.name === doc.name)
                    if (updated) updated.completion_wf_state = 'Rejected'
                })
                .catch(err => {
                    console.error('Error rejecting activity:', err)
                    frappe.msgprint('Failed to update activity.')
                })
        }
    )
}

const handleExport = () => {
    if (volunteers.value.length === 0) {
        frappe.msgprint('No data to export.')
        return
    }

    frappe.call({
        method: 'frappe.desk.query_report.run',
        args: {
            report_name: 'Volunteer Activity',
            filters: {}, // Add any filters if needed
        },
        callback: (r) => {
            if (r.message && r.message.result) {
                // Convert data to CSV
                const csvContent = convertToCSV(r.message.result, r.message.columns)
                downloadCSV(csvContent, 'volunteer_activity_report.csv')
            } else {
                frappe.msgprint('No data to export.')
            }
        },
        error: (err) => {
            console.error('Export error:', err)
            frappe.msgprint('Failed to export data.')
        }
    })
}

// Helper function to convert data to CSV
const convertToCSV = (data, columns) => {
    const headers = columns.map(col => col.label || col.fieldname).join(',')
    const rows = data.map(row =>
        columns.map(col => {
            const value = row[col.fieldname] || ''
            // Escape commas and quotes in CSV
            return typeof value === 'string' && (value.includes(',') || value.includes('"'))
                ? `"${value.replace(/"/g, '""')}"`
                : value
        }).join(',')
    )
    return [headers, ...rows].join('\n')
}

// Helper function to download CSV
const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
}
onMounted(() => {
    fetchData()
})
</script>

<style scoped>
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

.flex { display: flex; }
.gap-2 { gap: 0.5rem; }

.export-btn {
    background-color: #f8f9fa;
    color: #495057;
    font-size: 0.875rem;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    padding: 0.3rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.export-btn:hover {
    background-color: #e9ecef;
    border-color: #adb5bd;
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

.status-badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    display: inline-block;
    font-weight: 500;
    background-color: #66c37d;
    color: white;
}

.status-completed {
    background-color: #d4edda;
    color: #155724;
}

.status-rejected {
    background-color: #f8d7da;
    color: #721c24;
}

.status-progress {
    background-color: #d1ecf1;
    color: #0c5460;
}

.ellipsis {
    color: #6c757d;
    font-size: 0.875rem;
    font-style: normal;
}

.reject-btn {
    background-color: #e41328;
    color: white;
    font-size: 0.75rem;
    padding: 2px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.reject-btn:hover:not(:disabled) {
    background-color: #dc3545;
    color: white;
}

.reject-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color:white ;
    padding: 2px 10px;
    background-color:#6c757d ;
}

.empty-msg {
    text-align: center;
    padding: 2rem;
    color: #6c757d;
    font-style: italic;
}

 
</style>