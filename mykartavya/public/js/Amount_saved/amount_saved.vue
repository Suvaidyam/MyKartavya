<template>
    <div>
        <h3 style="font-size: 16px;font-weight: 400; color:#7c7c7c;">
            Charts for Amount Saved
        </h3>
        <canvas ref="chartCanvas" width="400" height="150"></canvas>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart } from 'chart.js/auto'

const chartCanvas = ref(null)
const sdgColors = {
  "Clean Water and Sanitation":                "#26BDE2",
  "Climate Action":                            "#3F7E44",
  "Partnerships for the Goals":                "#19486A",
  "Industry Innovation and Infrastructure":    "#FD6925",
  "Decent Work and Economic Growth":           "#A21942",
  "Responsible Consumption and Production":    "#BF8B2E",
  "Peace Justice and Strong Institutions":     "#00689D",
  "Life on Land":                              "#56C02B",
  "Gender Equality":                           "#FF3A21",
  "Life Below Water":                          "#0A97D9",
  "Sustainable Cities and Communities":        "#FD9D24",
  "Quality Education":                         "#C5192D",
  "No Poverty":                                "#E5243B",
  "Good Health and Well-being":                "#4C9F38",
  "Affordable and Clean Energy":               "#FCC30B",
  "Zero Hunger":                               "#DDA63A",
  "Reduced Inequality":                        "#DD1367"
}


onMounted(() => {
    frappe.call({
        method: 'frappe.desk.query_report.run',
        args: {
            report_name: 'Chart for Amount Saved'
        },
        callback: (r) => {
            const result = r.message

            if (!result || !result.result || result.result.length <= 1) {
                console.error("No data found in report")
                return
            }
            console.log("result", result.result)


            // const labels = result.result.map(item => item.sdg_name)
            // const values = result.result.map(item => item.total_hours)
            const labels = result.result.map(item => item.sdg_name)
            const values = result.result.map(item => item.work_value_rupees)
            const backgroundColors = labels.map(label => sdgColors[label] || '#ccc') 


            if (chartCanvas.value) {
                new Chart(chartCanvas.value, {
                    type: 'bar',
                    data: {
                        labels,
                        datasets: [{
                            label: result.columns[1].label,
                            data: values,
                            backgroundColor:backgroundColors,
                            hoverBackgroundColor: backgroundColors,
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

h3 {
    color: white;
    background-color: #b31717;
    padding: 10px;
    text-align: center;
}
</style>
