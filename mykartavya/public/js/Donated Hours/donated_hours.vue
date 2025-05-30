<template>
    <div>
        <h3>
            Charts for hours Donated
        </h3>
        <canvas ref="chartCanvas" width="400" height="150"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart } from 'chart.js/auto'

const chartCanvas = ref(null)

const sdgColors = [
    "#26BDE2", // Clean Water and Sanitation (SDG 6)
    "#3F7E44", // Climate Action (SDG 13)
    "#19486A", // Partnerships for the Goals (SDG 17)
    "#FD6925", // Industry Innovation and Infrastructure (SDG 9)
    "#A21942", // Decent Work and Economic Growth (SDG 8)
    "#BF8B2E", // Responsible Consumption and Production (SDG 12)
    "#00689D", // Peace, Justice and Strong Institutions (SDG 16)
    "#56C02B", // Life on Land (SDG 15)
    "#FF3A21", // Gender Equality (SDG 5)
    "#0A97D9", // Life Below Water (SDG 14)
    "#FD9D24", // Sustainable Cities and Communities (SDG 11)
    "#C5192D", // Quality Education (SDG 4)
    "#E5243B", // No Poverty (SDG 1)
    "#4C9F38", // Good Health and Well-being (SDG 3)
    "#FCC30B", // Affordable and Clean Energy (SDG 7)
    "#DDA63A", // Zero Hunger (SDG 2)
    "#DD1367"  // Reduced Inequality (SDG 10)
]

onMounted(() => {
    frappe.call({
        method: 'frappe.desk.query_report.run',
        args: {
            report_name: 'Charts for hours Donated'
        },
        callback: (r) => {
            const result = r.message

            if (!result || !result.result || result.result.length <= 1) {
                console.error("No data found in report")
                return
            }


            const labels = result.result.map(item => item.sdg_name)
            const values = result.result.map(item => item.total_hours)

            if (chartCanvas.value) {
                new Chart(chartCanvas.value, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [{
                            label: result.columns[1].label,
                            data: values,
                            backgroundColor: sdgColors.slice(0, values.length),
                            hoverBackgroundColor: sdgColors.slice(0, values.length),
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            }
        }
    })
})
</script>

<style scoped>
canvas {
    max-width: 100%;
}
</style>
