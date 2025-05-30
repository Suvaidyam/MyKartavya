<template>
  <div class="report-container">
    
    <!-- Export Button -->
    <div class="btnexport">
      <button class="export-btn" @click="handleExport()">Export Report</button>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(volunteer, index) in volunteers" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="bold">{{ volunteer.full_name }}</td>
            <td>{{ formatDuration(volunteer.duration) }}</td>
            <td>
              <span class="status-badge">{{ volunteer.completion_wf_state }}</span>
            </td>
            <td>{{ volunteer.karma_points }}</td>
            <td>{{ volunteer.rating }}</td>
            <td><i class="ellipsis">⋮</i></td>
            <td>
             <button class="btn" @click="rejectActivity({ name: volunteer.name })">Reject</button>

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

const volunteers = ref([])

const fetchData = () => {
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
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0')
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

function rejectActivity(doc) {
  if (!doc || !doc.name) {
    console.error('Document name not provided.');
    return;
  }

  frappe.db.set_value('Volunteer Activity', doc.name, 'completion_wf_state', 'Rejected')
    .then(() => {
      frappe.msgprint('Activity marked as Rejected.');
      // Update frontend data
      const updated = volunteers.value.find(v => v.name === doc.name);
      if (updated) updated.completion_wf_state = 'Rejected';
    })
    .catch(err => {
      console.error('Error rejecting activity:', err);
      frappe.msgprint('Failed to update activity.');
    });
}

const handleExport = () => {
  frappe.call({
    method: 'frappe.desk.query_report.export_query_report',
    args: {
      report_name: 'Volunteer Activity',
      format: 'CSV',
    },
    callback: (r) => {
      if (r.message) {
        const blob = new Blob([r.message], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'volunteer_activity_report.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        frappe.msgprint('No data to export.');
      }
    },
  });
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.dashboard-section .section-body {
  padding-top: 0 !important;
}
.form-section.card-section,.form-dashboard-section {
    border-bottom: none !important;
}
.report-container {
  font-family: "Inter", sans-serif;
  background: #fff;
}

.export-btn {
  background-color: light;
  color:gray;
  font-size: 0.875rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0.4rem 1rem;   
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid #dcdcdc;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.report-table thead {
  background-color:#ebe7e7ea;
}

.report-table th,
.report-table td {
  padding: 0.50rem 1rem;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  font-size: 0.875rem;
}

.report-table th {
  font-weight: 600;
  color: #333;
}

.report-table td.bold {
  font-weight: 500;
  color: #212121;
}
.btnexport{
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
}

.status-badge {
  background-color: #e0f7e9;
  color: #2e7d32;
  font-size: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 999px;
  display: inline-block;
  font-weight: 500;
}

.ellipsis {
  color: #888;
  font-size: 1rem;
}

.action-btn {
  border: 1px solid #ccc;
  background-color: transparent;
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s;
}
.action-btn:hover {
  background-color: #f1f1f1;
}

.empty-msg {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-style: italic;
}
</style>
