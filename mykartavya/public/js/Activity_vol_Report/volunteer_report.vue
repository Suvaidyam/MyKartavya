<script setup>
import { ref, onMounted } from 'vue'
import * as XLSX from 'xlsx'

const rotated = ref(false)
const volunteers = ref([])
const activity = ref([])

const fetchData = async () => {
    rotated.value = !rotated.value
    await frappe.call({
        method: 'mykartavya.controllers.vol_act_report.get_volunteer_activity_report',
        args: {
            activity: frappe.router.current_route[2]
        },
        callback: (r) => {
            volunteers.value = r.message || []
            activity.value = r.message[0]?.name // Added optional chaining
        }
    })
}

// Format seconds to HH:mm:ss
const formatDuration = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0m'

    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)

    if (h > 0 && m > 0) {
        return `${h}h ${m}m`
    } else if (h > 0) {
        return `${h}h`
    } else {
        return `${m}m`
    }
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

// Updated handleExport function for Excel export
const handleExport = async () => {
    if (volunteers.value.length === 0) {
        frappe.msgprint('No data to export.')
        return
    }

    try {
        // Show loading indicator
        frappe.show_progress('Exporting Excel file...', 50);

        await frappe.call({
            method: 'mykartavya.controllers.vol_act_report.get_volunteer_activity_report',
            args: {
                activity: frappe.router.current_route[2]
            },
            callback: (r) => {
                // Hide loading indicator
                frappe.hide_progress();

                console.log(r, "Response data");

                if (r.message && Array.isArray(r.message) && r.message.length > 0) {
                    // Export to Excel instead of CSV
                    exportToExcel(r.message, 'volunteer_activity_report.xlsx');
                    frappe.show_alert('Excel report exported successfully!', 5);
                } else {
                    frappe.msgprint('No data to export.');
                }
            },
            error: (r) => {
                // Hide loading indicator
                frappe.hide_progress();

                console.error('Error fetching data:', r);
                frappe.msgprint('Error occurred while fetching data.');
            }
        })
    } catch (err) {
        console.error('Export error:', err)
        frappe.msgprint('Failed to export data.')
        frappe.hide_progress();
    }
}

// New function to export data to Excel
const exportToExcel = (data, filename) => {
    if (!data || data.length === 0) {
        frappe.msgprint('No data to export.');
        return;
    }

    try {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();

        // Process data to make it more Excel-friendly
        const processedData = data.map(row => {
            const processedRow = {};

            // Copy all fields and format them appropriately
            Object.keys(row).forEach(key => {
                let value = row[key];

                // Handle different data types
                if (value === null || value === undefined) {
                    processedRow[key] = '';
                } else if (typeof value === 'object') {
                    processedRow[key] = JSON.stringify(value);
                } else if (key.toLowerCase().includes('duration') && typeof value === 'number') {
                    // Format duration fields
                    processedRow[key] = formatDuration(value);
                } else {
                    processedRow[key] = value;
                }
            });

            return processedRow;
        });

        // Convert data to worksheet format
        const worksheet = XLSX.utils.json_to_sheet(processedData);

        // Auto-fit column widths
        const colWidths = [];
        if (processedData.length > 0) {
            const headers = Object.keys(processedData[0]);
            headers.forEach((header, index) => {
                let maxWidth = header.length;
                processedData.forEach(row => {
                    const cellValue = row[header] ? row[header].toString() : '';
                    maxWidth = Math.max(maxWidth, cellValue.length);
                });
                // Set width with min 10 and max 50 characters
                colWidths[index] = { wch: Math.min(Math.max(maxWidth + 2, 10), 50) };
            });
        }
        worksheet['!cols'] = colWidths;

        // Add some basic formatting to header row
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        for (let col = range.s.c; col <= range.e.c; col++) {
            const headerCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: col })];
            if (headerCell) {
                headerCell.s = {
                    font: { bold: true, sz: 12 },
                    fill: { fgColor: { rgb: "FFEEEEEE" } },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            }
        }

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Volunteer Activity Report');

        // Add metadata
        workbook.Props = {
            Title: "Volunteer Activity Report",
            Subject: "Activity Report",
            Author: "MyKartavya System",
            CreatedDate: new Date()
        };

        // Save the file
        XLSX.writeFile(workbook, filename);

        console.log('Excel file exported successfully');

    } catch (error) {
        console.error('Error creating Excel file:', error);
        frappe.msgprint('Error creating Excel file: ' + error.message);
    }
}

// Alternative function for CSV export (keeping as backup)
const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return

    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, filename);
}

// CSV conversion function (backup)
const convertToCSV = (data) => {
    if (!data || data.length === 0) return ''

    // Get column headers from the first object
    const headers = Object.keys(data[0])

    // Create header row
    const headerRow = headers.join(',')

    // Create data rows
    const dataRows = data.map(row => {
        return headers.map(header => {
            const value = row[header] || ''
            // Escape commas and quotes in CSV
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`
            }
            return value
        }).join(',')
    })

    // Combine header and data rows
    return [headerRow, ...dataRows].join('\n')
}

// Helper function to download CSV (backup)
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

// Function to handle both Excel and CSV export
const handleExportWithOptions = async (format = 'excel') => {
    if (volunteers.value.length === 0) {
        frappe.msgprint('No data to export.')
        return
    }

    try {
        frappe.show_progress(`Exporting ${format.toUpperCase()} file...`, 50);

        await frappe.call({
            method: 'mykartavya.controllers.vol_act_report.get_volunteer_activity_report',
            args: {
                activity: frappe.router.current_route[2]
            },
            callback: (r) => {
                frappe.hide_progress();

                if (r.message && Array.isArray(r.message) && r.message.length > 0) {
                    if (format === 'excel') {
                        exportToExcel(r.message, 'volunteer_activity_report.xlsx');
                        frappe.show_alert('Excel report exported successfully!', 5);
                    } else if (format === 'csv') {
                        exportToCSV(r.message, 'volunteer_activity_report.csv');
                        frappe.show_alert('CSV report exported successfully!', 5);
                    }
                } else {
                    frappe.msgprint('No data to export.');
                }
            },
            error: (r) => {
                frappe.hide_progress();
                console.error('Error fetching data:', r);
                frappe.msgprint('Error occurred while fetching data.');
            }
        })
    } catch (err) {
        console.error('Export error:', err)
        frappe.msgprint('Failed to export data.')
        frappe.hide_progress();
    }
}

function RenderVolAct() {
    if (activity.value) {
        frappe.set_route('volunteer-activity', activity.value)
    } else {
        frappe.msgprint('No activity selected.')
    }
}

onMounted(() => {
    fetchData()
})

// Export functions for use in template or external calls
defineExpose({
    handleExport,
    handleExportWithOptions,
    exportToExcel,
    exportToCSV,
    fetchData,
    rejectActivity,
    RenderVolAct
})
</script>