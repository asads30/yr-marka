<template>
  <LineChart
    :height="200"
    :chart-data="chartData"
  />
  {{ chartData }}
</template>

<script>
import LineChart from '@core/libs/chartjs/components/LineChart';
import { useTheme } from 'vuetify';
export default{
  data: () => ({
    vuetifyTheme: useTheme(),
  }),
  props: {
    chartData: {
      type: Object,
      required: true
    },
  },
  components: {
    LineChart
  },
}
</script>