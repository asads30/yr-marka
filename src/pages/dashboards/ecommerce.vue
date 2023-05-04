<script setup>

const statisticsVerticalTwo = [
  {
    title: 'Logistics',
    color: 'error',
    icon: 'mdi-truck-outline',
    stats: '44.10k',
    change: 12,
    subtitle: 'Revenue Increase',
  },
  {
    title: 'Reports',
    color: 'warning',
    icon: 'mdi-check',
    stats: '268',
    change: -8,
    subtitle: 'System Bugs',
  },
]
</script>

<template>
  <VRow class="match-height">

    <VCol
      cols="12"
      md="12"
    >
      <VRow>
        <VCol
          v-for="statistics in statisticsVerticalTwo"
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
