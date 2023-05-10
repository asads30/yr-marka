<script setup>
import axiosIns from '@/plugins/axios';
import ChartJsLineChart from '@/views/charts/chartjs/ChartJsLineChart.vue';
const stats = ref([])
const statsMonth = ref([])
const stats1 = ref([])
const chartJsCustomColors = {
  white: '#fff',
  yellow: '#ffe802',
  primary: '#836af9',
  areaChartBlue: '#2c9aff',
  barChartYellow: '#ffcf5c',
  polarChartGrey: '#4f5d70',
  polarChartInfo: '#299aff',
  lineChartYellow: '#d4e157',
  polarChartGreen: '#28dac6',
  lineChartPrimary: '#9e69fd',
  lineChartWarning: '#ff9800',
  horizontalBarInfo: '#26c6da',
  polarChartWarning: '#ff8131',
  scatterChartGreen: '#28c76f',
  warningShade: '#ffbd1f',
  areaChartBlueLight: '#84d0ff',
  areaChartGreyLight: '#edf1f4',
  scatterChartWarning: '#ff9f43',
}
Date.prototype.toISODateString = function () {
  return this.toISOString().substr(0,10);
};
Date.prototype.toDateFromDays = function (n) {
  n = parseInt(n) || 0;
  var newDate = new Date(this.getTime());
  newDate.setDate(this.getDate() + n);
  return newDate;
};
var fromMonth = new Date(new Date().setDate(1)).toISOString();
var date1 = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
var today = new Date().toISOString();
var curr = new Date;
var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
const fetchStat = () => {
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${firstday}&dateTo=${today}`).then(res => {
    let users = res.data.users;
    let channels = res.data.channels;
    let products = res.data.products;
    let payments = res.data.payments;
    let results = [
      {
        title: 'Пользователи',
        color: users.percentChange > 0 ? 'success' : 'error',
        icon: 'mdi-user',
        stats: `+${Number(users.usersCount).toFixed(0)}`,
        change: Number(users.percentChange).toFixed(0),
        subtitle: `В прошлой неделе добавилось ${Number(users.previousPeriodUsersCount).toFixed(0)}`
      },
      {
        title: 'Каналы',
        color: channels.percentChange > 0 ? 'success' : 'error',
        icon: 'mdi-list-box',
        stats: `+${Number(channels.channelsCount).toFixed(0)}`,
        change: Number(channels.percentChange).toFixed(0),
        subtitle: `В прошлой неделе добавилось ${Number(channels.previousPeriodChannelsCount).toFixed(0)}`
      },
      {
        title: 'Товары',
        color: products.countChangePercent > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(products.currentPeriodTotalCount).toFixed(0)}`,
        change: Number(products.countChangePercent).toFixed(0),
        subtitle: `В прошлой неделе добавилось ${Number(products.previousPeriodTotalCount).toFixed(0)}`
      },
      {
        title: 'Платежи',
        color: payments.priceChangePercent > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
        change: Number(payments.priceChangePercent).toFixed(0),
        subtitle: `В прошлой неделе добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
      }
    ]
    stats.value = results;
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${fromMonth}&dateTo=${today}`).then(res => {
    let users = res.data.users;
    let channels = res.data.channels;
    let products = res.data.products;
    let payments = res.data.payments;
    let results = [
      {
        title: 'Пользователи',
        color: Number(users.percentChange) > 0 ? 'success' : 'error',
        icon: 'mdi-user',
        stats: `+${Number(users.usersCount).toFixed(0)}`,
        change: Number(users.percentChange).toFixed(2),
        subtitle: `В прошлой неделе добавилось ${Number(users.previousPeriodUsersCount).toFixed(0)}`
      },
      {
        title: 'Каналы',
        color: Number(channels.percentChange) > 0 ? 'success' : 'error',
        icon: 'mdi-list-box',
        stats: `+${Number(channels.channelsCount).toFixed(0)}`,
        change: Number(channels.percentChange).toFixed(2),
        subtitle: `В прошлой неделе добавилось ${Number(channels.previousPeriodChannelsCount).toFixed(0)}`
      },
      {
        title: 'Товары',
        color: Number(products.countChangePercent) > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(products.currentPeriodTotalCount).toFixed(0)}`,
        change: Number(products.countChangePercent).toFixed(2),
        subtitle: `В прошлой неделе добавилось ${Number(products.previousPeriodTotalCount).toFixed(0)}`
      },
      {
        title: 'Платежи',
        color: Number(payments.priceChangePercent) > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
        change: Number(payments.priceChangePercent).toFixed(2),
        subtitle: `В прошлой неделе добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
      }
    ]
    statsMonth.value = results;
  })
}
watchEffect(fetchStat)
</script>

<template>
  <VRow class="match-height">
    <VCol
      cols="12"
      md="12"
    >
      <h2 class="mb-3">За текущую неделю</h2>
      <VRow>
        <VCol
          v-for="statistics in stats"
          :key="statistics.title"
          cols="3"
        >
          <CardStatisticsVertical v-bind="statistics" />
        </VCol>
      </VRow>
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
      <h2 class="mb-3">За текущий месяц</h2>
      <VRow>
        <VCol
          v-for="statistics in statsMonth"
          :key="statistics.title"
          cols="3"
        >
          <CardStatisticsVertical v-bind="statistics" />
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="12">
      <VCard
        title="Общая статистика"
      >
        <VCardText>
          <ChartJsLineChart :colors="chartJsCustomColors" />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
