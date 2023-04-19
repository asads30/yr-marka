<script setup>

import figma from '@images/icons/project-icons/figma.png'
import html5 from '@images/icons/project-icons/html5.png'
import python from '@images/icons/project-icons/python.png'
import react from '@images/icons/project-icons/react.png'
import sketch from '@images/icons/project-icons/sketch.png'
import vue from '@images/icons/project-icons/vue.png'
import xamarin from '@images/icons/project-icons/xamarin.png'

const props = defineProps({
  payments: {
    type: Object,
    required: true,
  }
})

const projects = [
  {
    logo: react,
    name: 'BGC eCommerce App',
    project: 'React Project',
    totalTask: '122/240',
    progress: 78,
    hours: '18:42',
  },
  {
    logo: figma,
    name: 'Falcon Logo Design',
    project: 'Figma Project',
    totalTask: '09/56',
    progress: 18,
    hours: '20:42',
  },
  {
    logo: vue,
    name: 'Dashboard Design',
    project: 'Vuejs Project',
    totalTask: '290/320',
    progress: 62,
    hours: '120:87',
  },
  {
    logo: xamarin,
    name: 'Foodista mobile app',
    project: 'Xamarin Project',
    totalTask: '290/320',
    progress: 8,
    hours: '120:87',
  },
  {
    logo: python,
    name: 'Dojo Email App',
    project: 'Python Project',
    totalTask: '120/186',
    progress: 49,
    hours: '230:10',
  },
  {
    logo: sketch,
    name: 'Blockchain Website',
    project: 'Sketch Project',
    totalTask: '99/109',
    progress: 92,
    hours: '342:41',
  },
  {
    logo: html5,
    name: 'Hoffman Website',
    project: 'HTML Project',
    totalTask: '98/110',
    progress: 88,
    hours: '12:45',
  },
]

const resolveUserProgressVariant = progress => {
  if (progress <= 25)
    return 'error'
  if (progress > 25 && progress <= 50)
    return 'warning'
  if (progress > 50 && progress <= 75)
    return 'primary'
  if (progress > 75 && progress <= 100)
    return 'success'
  
  return 'secondary'
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Posts">
        <VDivider />
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">
                PROJECT
              </th>
              <th scope="col">
                TOTAL TASK
              </th>
              <th scope="col">
                PROGRESS
              </th>
              <th scope="col">
                HOURS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in projects"
              :key="project.name"
            >
              <td class="d-flex align-center">
                <VAvatar
                  :size="34"
                  class="me-3"
                  :image="project.logo"
                />
                <div>
                  <p class="font-weight-medium mb-0">
                    {{ project.name }}
                  </p>
                  <p class="text-xs text-medium-emphasis mb-0">
                    {{ project.project }}
                  </p>
                </div>
              </td>
              <td>
                {{ project.totalTask }}
              </td>
              <td>
                <span>{{ project.progress }}%</span>
                <VProgressLinear
                  :height="6"
                  :model-value="project.progress"
                  rounded
                  :color="resolveUserProgressVariant(project.progress)"
                />
              </td>
              <td class="text-medium-emphasis">
                {{ project.hours }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <VCol cols="12">
      <VCard
        v-if="props.payments.length > 0"
        id="invoice-list"
        title="Платежи"
      >
        <VTable class="text-no-wrap invoice-list-table">
          <thead>
            <tr>
              <th scope="col">
                ID
              </th>
              <th scope="col" class="text-center">
                СУММА
              </th>
              <th scope="col" class="text-center">
                ПОКУПАТЕЛЬ
              </th>
              <th scope="col" class="text-center">
                ПРОДАВЕЦ
              </th>
              <th scope="col" class="text-center">
                ТОВАР
              </th>
              <th scope="col" class="text-center">
                ДЕЙСТВИЯ
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="payment in props.payments"
              :key="payment.id"
            >
              <td>
                <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: payment.id } }"
                >
                  #{{ payment.id }}
                </RouterLink>
              </td>
              <td class="text-center">
                {{ payment.price }} ₽
              </td>
              <td class="text-center">
                {{ payment.name }}
              </td>
              <td class="text-center">
                {{ payment.user_id }}
              </td>
              <td class="text-center">
                {{ payment.product_id }}
              </td>
              <td
                class="text-center"
                style="width: 5rem;"
              >
                <VBtn
                  size="x-small"
                  color="default"
                  variant="plain"
                  icon
                >
                  <VIcon
                    size="24"
                    icon="mdi-dots-vertical"
                  />
                  <VMenu activator="parent">
                    <VList>
                      <VListItem :to="{ name: 'apps-user-view-id', params: { id: payment.id } }">
                        <template #prepend>
                          <VIcon
                            icon="mdi-eye-outline"
                            :size="20"
                            class="me-3"
                          />
                        </template>
                        <VListItemTitle>Посмотреть</VListItemTitle>
                      </VListItem>
                      <VListItem href="javascript:void(0)">
                        <template #prepend>
                          <VIcon
                            icon="mdi-delete-outline"
                            :size="20"
                            class="me-3"
                          />
                        </template>
                        <VListItemTitle>Блокировать</VListItemTitle>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>
