<script>
import axiosIns from '@/plugins/axios';
import CardStatisticsVertical from '@core/components/CardStatisticsVertical.vue';
import { formatDate } from '@core/utils/formatters';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import VueApexCharts from 'vue3-apexcharts';
  export default {
    name: "Ecommerce",
    data() {
      return {
        chartConfig: {
          chart: {
            parentHeightOffset: 0,
            toolbar: { show: false },
          },
          tooltip: { shared: false },
          dataLabels: { enabled: false },
          stroke: {
            show: false,
            curve: 'straight',
          },
          legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: { colors: "'#e0cffe', '#b992fe'" },
            markers: {
              offsetY: 1,
              offsetX: -3,
            },
            itemMargin: {
              vertical: 3,
              horizontal: 10,
            },
          },
          colors: ['#e0cffe', '#8a8d93', '#ffb400', '#F4CA16'],
          fill: {
            opacity: 1,
            type: 'solid',
          },
          grid: {
            show: true,
            borderColor: '#515059',
            xaxis: {
              lines: { show: true },
            },
          },
          yaxis: {
            labels: {
              style: { colors: 'rgba(231, 227, 252, 0.6)' },
            },
          },
          xaxis: {
            axisBorder: { show: false },
            axisTicks: { color: 'rgba(231, 227, 252)' },
            crosshairs: {
              stroke: { color: 'rgba(231, 227, 252)' },
            },
            labels: {
              style: { colors: 'rgba(231, 227, 252, 0.6)' },
            },
            categories: [
              '16/05',
              '17/05',
              '18/05',
            ]
          }
        },
        series: [
          {
            name: 'Платежи',
            data: [
              0,
              1858,
              2325,
              0
            ],
          },
          {
            name: 'Пользователи',
            data: [
              100,
              120,
              90,
            ],
          },
          {
            name: 'Товары',
            data: [
              20,
              40,
              30
            ],
          },
          {
            name: 'Каналы',
            data: [
              60,
              80,
              70
            ],
          },
        ],
        date: [new Date(), new Date()],
        stats: []
      }
    },
    components: {
      VueApexCharts,
      VueDatePicker,
      CardStatisticsVertical
    },
    methods: {
      async handleDate(modelData){
        let start = modelData[0].toISOString()
        let end = modelData[1].toISOString()
        const { data } = await axiosIns.get(`analytics/days?types=users,payments,products,channels&dateFrom=${start}&dateTo=${end}`)
        let payments = [];
        let users = [];
        let channels = [];
        let products = [];
        let dates = [];
        try {
          data.users.forEach(user => {
            users.push(user.data.usersCount)
            let format = formatDate(user.date, { month: 'short', day: 'numeric' })
            dates.push(format);
          });
          data.channels.forEach(user => {
            channels.push(user.data.channelsCount)
          });
          data.products.forEach(user => {
            products.push(user.data.currentPeriodTotalCount)
          });
          data.payments.forEach(payment => {
            payments.push(payment.data.currentPeriodTotalPrice)
          });
        } catch (error) {
          console.log(error)
        }
        let seriesData = [
          {
            name: 'Платежи',
            data: payments
          },
          {
            name: 'Пользователи',
            data: users
          },
          {
            name: 'Каналы',
            data: channels
          },
          {
            name: 'Товары',
            data: products
          }
        ]
        this.series = seriesData
        this.chartConfig = {
          labels: dates
        }
        await axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=${start}&dateTo=${end}`).then(res => {
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
              subtitle: `В прошлом периоде добавилось ${Number(users.previousPeriodUsersCount).toFixed(0)}`
            },
            {
              title: 'Каналы',
              color: Number(channels.percentChange) > 0 ? 'success' : 'error',
              icon: 'mdi-list-box',
              stats: `+${Number(channels.channelsCount).toFixed(0)}`,
              change: Number(channels.percentChange).toFixed(2),
              subtitle: `В прошлом периоде добавилось ${Number(channels.previousPeriodChannelsCount).toFixed(0)}`
            },
            {
              title: 'Товары',
              color: Number(products.countChangePercent) > 0 ? 'success' : 'error',
              icon: 'mdi-post',
              stats: `+${Number(products.currentPeriodTotalCount).toFixed(0)}`,
              change: Number(products.countChangePercent).toFixed(2),
              subtitle: `В прошлом периоде добавилось ${Number(products.previousPeriodTotalCount).toFixed(0)}`
            },
            {
              title: 'Платежи',
              color: Number(payments.priceChangePercent) > 0 ? 'success' : 'error',
              icon: 'mdi-post',
              stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
              change: Number(payments.priceChangePercent).toFixed(2),
              subtitle: `В прошлом периоде добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
            }
          ]
          this.stats = results;
        })
      },
      async makeGetRequest() {
        const { data } = await axiosIns.get(`analytics/days?types=users,payments,products,channels&dateFrom=2023-05-16T00:00:00.000Z&dateTo=2023-05-18T00:00:00.000Z`)
        let payments = [];
        let users = [];
        let channels = [];
        let products = [];
        try {
          data.payments.forEach(payment => {
            payments.push(payment.data.currentPeriodTotalPrice)
          });
          data.users.forEach(user => {
            users.push(user.data.usersCount)
          });
          data.channels.forEach(user => {
            channels.push(user.data.channelsCount)
          });
          data.products.forEach(user => {
            products.push(user.data.currentPeriodTotalCount)
          });
        } catch (error) {
          console.log(error)
        }
        let seriesData = [
          {
            name: 'Платежи',
            data: payments
          },
          {
            name: 'Пользователи',
            data: users
          },
          {
            name: 'Каналы',
            data: channels
          },
          {
            name: 'Товары',
            data: products
          }
        ]
        this.series = seriesData
        await axiosIns.get(`analytics?types=users,payments,products,channels&dateFrom=2023-05-16T00:00:00.000Z&dateTo=2023-05-18T00:00:00.000Z`).then(res => {
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
              subtitle: `В прошлом периоде добавилось ${Number(users.previousPeriodUsersCount).toFixed(0)}`
            },
            {
              title: 'Каналы',
              color: Number(channels.percentChange) > 0 ? 'success' : 'error',
              icon: 'mdi-list-box',
              stats: `+${Number(channels.channelsCount).toFixed(0)}`,
              change: Number(channels.percentChange).toFixed(2),
              subtitle: `В прошлом периоде добавилось ${Number(channels.previousPeriodChannelsCount).toFixed(0)}`
            },
            {
              title: 'Товары',
              color: Number(products.countChangePercent) > 0 ? 'success' : 'error',
              icon: 'mdi-post',
              stats: `+${Number(products.currentPeriodTotalCount).toFixed(0)}`,
              change: Number(products.countChangePercent).toFixed(2),
              subtitle: `В прошлом периоде добавилось ${Number(products.previousPeriodTotalCount).toFixed(0)}`
            },
            {
              title: 'Платежи',
              color: Number(payments.priceChangePercent) > 0 ? 'success' : 'error',
              icon: 'mdi-post',
              stats: `+${Number(payments.currentPeriodTotalPrice).toFixed(0)} ₽`,
              change: Number(payments.priceChangePercent).toFixed(2),
              subtitle: `В прошлом периоде добавилось ${Number(payments.previousPeriodTotalPrice).toFixed(0)} ₽`
            }
          ]
          this.stats = results;
        })
      }
    },
    async mounted() {
      await this.makeGetRequest()
    }
  }
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <VCard>
        <VCardItem class="d-flex flex-wrap justify-space-between gap-4">
          <VCardTitle>Общая статистика</VCardTitle>
          <VCardSubtitle>По выбранному периоду</VCardSubtitle>
        </VCardItem>
        <div class="datapicker-c">
          <VueDatePicker v-model="date" range multi-calendars @update:model-value="handleDate" format="MM/dd/yyyy" preview-format="MM/dd/yyyy" />
        </div>
        <VCardText>
          <VueApexCharts
            type="area"
            height="400"
            :options="chartConfig"
            :series="series"
          />
        </VCardText>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="12"
    >
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
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";
.datapicker-c{
  position: absolute;
  right: 30px;
  top: 30px;
}
</style>
