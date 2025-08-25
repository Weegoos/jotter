<template>
  <q-card class="q-pa-md">
    <div ref="chartRef" style="height: 400px; width: 100%"></div>
    <q-btn class="q-mt-md" label="Скачать как PNG" color="primary" @click="downloadChart" />
  </q-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import { useQuasar } from 'quasar';
import { getMethod } from 'src/composables/api-method/get';

const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();

const completedTasks = ref(0);
const pendingTasks = ref(0);
const percent = ref(0);

const chartRef = ref(null);
let chartInstance = null;

async function getSummary() {
  const response = await getMethod(
    serverURL,
    `tasks/summary?from_date=1970-01-01&to_date=2100-12-31`,
    $q
  );
  completedTasks.value = response.completed;
  pendingTasks.value = response.pending;
  percent.value = response.avg_completion_percent;

  updateChart();
}

function updateChart() {
  const option = {
    title: {
      text: 'Task Statistics',
      subtext: `Процент выполнения ${percent.value}%`,
      left: 'center',
    },
    tooltip: { trigger: 'item' },
    legend: { orient: 'vertical', left: 'left' },
    series: [
      {
        name: 'Tasks',
        type: 'pie',
        radius: '50%',
        data: [
          { value: completedTasks.value, name: 'Completed Tasks' },
          { value: pendingTasks.value, name: 'Pending Tasks' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  chartInstance.setOption(option);
}

onMounted(() => {
  chartInstance = echarts.init(chartRef.value);
  getSummary();
  window.addEventListener('resize', resizeChart);
});

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.dispose();
  window.removeEventListener('resize', resizeChart);
});

function resizeChart() {
  if (chartInstance) chartInstance.resize();
}

function downloadChart() {
  if (!chartInstance) return;
  const url = chartInstance.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff',
  });
  const link = document.createElement('a');
  link.href = url;
  link.download = 'chart.png';
  link.click();
}
</script>
