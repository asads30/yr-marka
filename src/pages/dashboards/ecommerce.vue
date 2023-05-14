<script setup>
import axiosIns from '@/plugins/axios';
import { getLineChartConfig } from '@core/libs/chartjs/chartjsConfig';
import LineChart from '@core/libs/chartjs/components/LineChart';
import { computed } from 'vue';
import { useTheme } from 'vuetify';
const statsMonth = ref([])
const statsOldMonth = ref([])
const vuetifyTheme = useTheme()
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
var today = new Date().toISOString();
var current = new Date();
var date1 = new Date(new Date().setDate(current.getDate() - 1)).toISOString();
var date2 = new Date(new Date().setDate(current.getDate() - 2)).toISOString();
var date3 = new Date(new Date().setDate(current.getDate() - 3)).toISOString();
var date4 = new Date(new Date().setDate(current.getDate() - 4)).toISOString();
var date5 = new Date(new Date().setDate(current.getDate() - 5)).toISOString();
var date6 = new Date(new Date().setDate(current.getDate() - 6)).toISOString();
var date7 = new Date(new Date().setDate(current.getDate() - 7)).toISOString();
var oldMonth = new Date(current.getFullYear(), current.getMonth() - 1, 1);
const fetchStat = () => {
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
        stats: `${Number(users.usersCount).toFixed(0)}`,
        change: Number(users.percentChange).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(users.previousPeriodUsersCount).toFixed(0)}`
      },
      {
        title: 'Каналы',
        color: Number(channels.percentChange) > 0 ? 'success' : 'error',
        icon: 'mdi-list-box',
        stats: `+${Number(channels.channelsCount).toFixed(0)}`,
        change: Number(channels.percentChange).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(channels.previousPeriodChannelsCount).toFixed(0)}`
      },
      {
        title: 'Товары',
        color: Number(products.countChangePercent) > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(products.currentPeriodTotalCount).toFixed(0)}`,
        change: Number(products.countChangePercent).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(products.previousPeriodTotalCount).toFixed(0)}`
      },
      {
        title: 'Платежи',
        color: Number(payments.priceChangePercent) > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
        change: Number(payments.priceChangePercent).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
      }
    ]
    statsMonth.value = results;
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${oldMonth}&dateTo=${fromMonth}`).then(res => {
    let users = res.data.users;
    let channels = res.data.channels;
    let products = res.data.products;
    let payments = res.data.payments;
    let results = [
      {
        title: 'Пользователи',
        color: Number(users.percentChange) > 0 ? 'success' : 'error',
        icon: 'mdi-user',
        stats: `${Number(users.usersCount).toFixed(0)}`,
        change: Number(users.percentChange).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(users.previousPeriodUsersCount).toFixed(0)}`
      },
      {
        title: 'Каналы',
        color: Number(channels.percentChange) > 0 ? 'success' : 'error',
        icon: 'mdi-list-box',
        stats: `+${Number(channels.channelsCount).toFixed(0)}`,
        change: Number(channels.percentChange).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(channels.previousPeriodChannelsCount).toFixed(0)}`
      },
      {
        title: 'Товары',
        color: Number(products.countChangePercent) > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(products.currentPeriodTotalCount).toFixed(0)}`,
        change: Number(products.countChangePercent).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(products.previousPeriodTotalCount).toFixed(0)}`
      },
      {
        title: 'Платежи',
        color: Number(payments.priceChangePercent) > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
        change: Number(payments.priceChangePercent).toFixed(2),
        subtitle: `В прошлом месяце добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
      }
    ]
    statsOldMonth.value = results;
  })
}
const dataChart = computed(() => {
  let statsUsers = [];
  let statsChannels = [];
  let statsProducts = [];
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${date1}&dateTo=${today}`).then(res => {
    statsUsers.push(res.data.users.usersCount)
    statsChannels.push(res.data.channels.channelsCount)
    statsProducts.push(res.data.products.currentPeriodTotalCount)
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${date2}&dateTo=${today}`).then(res => {
    statsUsers.push(res.data.users.usersCount)
    statsChannels.push(res.data.channels.channelsCount)
    statsProducts.push(res.data.products.currentPeriodTotalCount)
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${date3}&dateTo=${today}`).then(res => {
    statsUsers.push(res.data.users.usersCount)
    statsChannels.push(res.data.channels.channelsCount)
    statsProducts.push(res.data.products.currentPeriodTotalCount)
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${date4}&dateTo=${today}`).then(res => {
    statsUsers.push(res.data.users.usersCount)
    statsChannels.push(res.data.channels.channelsCount)
    statsProducts.push(res.data.products.currentPeriodTotalCount)
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${date5}&dateTo=${today}`).then(res => {
    statsUsers.push(res.data.users.usersCount)
    statsChannels.push(res.data.channels.channelsCount)
    statsProducts.push(res.data.products.currentPeriodTotalCount)
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${date6}&dateTo=${today}`).then(res => {
    statsUsers.push(res.data.users.usersCount)
    statsChannels.push(res.data.channels.channelsCount)
    statsProducts.push(res.data.products.currentPeriodTotalCount)
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${date7}&dateTo=${today}`).then(res => {
    statsUsers.push(res.data.users.usersCount)
    statsChannels.push(res.data.channels.channelsCount)
    statsProducts.push(res.data.products.currentPeriodTotalCount)
  })
  return {
    labels: [
      '7 день',
      '6 день',
      '5 день',
      '4 день',
      '3 день',
      '2 день',
      '1 день'
    ],
    datasets: [
      {
        fill: true,
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
        data: statsUsers
      },
      {
        fill: true,
        tension: 0.5,
        pointRadius: 1,
        label: 'Каналы',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: '#ffe802',
        backgroundColor: '#ffe802',
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: '#fff',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointHoverBackgroundColor: '#ffe802',
        data: statsChannels
      },
      {
        fill: true,
        tension: 0.5,
        pointRadius: 1,
        label: 'Продукты',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: '#28dac6',
        backgroundColor: '#28dac6',
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: '#fff',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointHoverBackgroundColor: '#28dac6',
        data: statsProducts
      }
    ],
  }
})
watchEffect(fetchStat)
const chartConfig = computed(() => getLineChartConfig(vuetifyTheme.current.value))
</script>

<template>
  <VRow class="match-height">
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
    <VCol
      cols="12"
      md="12"
    >
      <h2 class="mb-3">За предудущий месяц</h2>
      <VRow>
        <VCol
          v-for="statistics in statsOldMonth"
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
          <LineChart
            :height="300"
            :chart-data="dataChart"
            :chart-options="chartConfig"
          />
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
