<script setup>
import { getLineChartConfig } from '@core/libs/chartjs/chartjsConfig';
import LineChart from '@core/libs/chartjs/components/LineChart';
import { useTheme } from 'vuetify';

const props = defineProps({
  colors: {
    type: null,
    required: true,
  },
})

const vuetifyTheme = useTheme()

const data = {
  labels: [
    '01',
    '02',
    '03'
  ],
  datasets: [
    {
      fill: false,
      tension: 0.5,
      pointRadius: 1,
      label: 'Пользователи',
      pointHoverRadius: 5,
      pointStyle: 'circle',
      borderColor: '#836af9',
      backgroundColor: '#836af9',
      pointHoverBorderWidth: 5,
      pointHoverBorderColor: '#fff',
      pointBorderColor: '#fff',
      pointBorderWidth: 3,
      pointHoverBackgroundColor: '#836af9',
      data: [
        80,
        150,
        180
      ],
    }
  ],
}

const chartConfig = computed(() => getLineChartConfig(vuetifyTheme.current.value))
</script>

<template>
  <LineChart
    :chart-options="chartConfig"
    :height="400"
    :chart-data="data"
  />
</template>
