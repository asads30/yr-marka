<script setup>
import axiosIns from '@/plugins/axios';
const stats = ref([])
const statsMonth = ref([])
const statsThree = ref([])
Date.prototype.toISODateString = function () {
  return this.toISOString().substr(0,10);
};
Date.prototype.toDateFromDays = function (n) {
  n = parseInt(n) || 0;
  var newDate = new Date(this.getTime());
  newDate.setDate(this.getDate() + n);
  return newDate;
};
var newDate = new Date();
var week = newDate.toDateFromDays(-7).toISOString();
var month = newDate.toDateFromDays(-30).toISOString();
var monthThree = newDate.toDateFromDays(-60).toISOString();
var today = new Date().toISOString();
const fetchStat = () => {
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${week}&dateTo=${today}`).then(res => {
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
        title: 'Товары',
        color: payments.priceChangePercent > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
        change: Number(payments.priceChangePercent).toFixed(0),
        subtitle: `В прошлой неделе добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
      }
    ]
    stats.value = results;
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${month}&dateTo=${today}`).then(res => {
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
        title: 'Товары',
        color: Number(payments.priceChangePercent) > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
        change: Number(payments.priceChangePercent).toFixed(2),
        subtitle: `В прошлой неделе добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
      }
    ]
    statsMonth.value = results;
  })
  axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${monthThree}&dateTo=${today}`).then(res => {
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
        title: 'Товары',
        color: payments.priceChangePercent > 0 ? 'success' : 'error',
        icon: 'mdi-post',
        stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
        change: Number(payments.priceChangePercent).toFixed(0),
        subtitle: `В прошлой неделе добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
      }
    ]
    statsThree.value = results;
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
      <h2 class="mb-3">Статистика за неделю</h2>
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
      <h2 class="mb-3">Статистика за месяц</h2>
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
      <h2 class="mb-3">Статистика за 2 месяца</h2>
      <VRow>
        <VCol
          v-for="statistics in statsThree"
          :key="statistics.title"
          cols="3"
        >
          <CardStatisticsVertical v-bind="statistics" />
        </VCol>
      </VRow>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
</style>
