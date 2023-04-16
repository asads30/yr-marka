<script setup>
import {
avatarText,
} from '@core/utils/formatters'

import figma from '@images/icons/project-icons/figma.png'
import html5 from '@images/icons/project-icons/html5.png'
import python from '@images/icons/project-icons/python.png'
import react from '@images/icons/project-icons/react.png'
import sketch from '@images/icons/project-icons/sketch.png'
import vue from '@images/icons/project-icons/vue.png'
import xamarin from '@images/icons/project-icons/xamarin.png'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

const standardPlan = {
  plan: 'Standard',
  price: 99,
  benefits: [
    '10 Users',
    'Up to 10GB storage',
    'Basic Support',
  ],
}

const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

const resolveUserStatusVariant = stat => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'
  
  return 'primary'
}

const resolveUserRoleVariant = role => {
  if (role === 'subscriber')
    return {
      color: 'primary',
      icon: 'mdi-account-outline',
    }
  if (role === 'author')
    return {
      color: 'warning',
      icon: 'mdi-cog-outline',
    }
  if (role === 'maintainer')
    return {
      color: 'success',
      icon: 'mdi-database-outline',
    }
  if (role === 'editor')
    return {
      color: 'info',
      icon: 'mdi-pencil-outline',
    }
  if (role === 'admin')
    return {
      color: 'error',
      icon: 'mdi-dns-outline',
    }
  
  return {
    color: 'primary',
    icon: 'mdi-account-outline',
  }
}

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
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="sm"
            :size="120"
            color="primary"
            variant="tonal"
          >
            <VImg
              v-if="props.userData.avatar"
              :src="props.userData.avatar"
            />
            <span
              v-else
              class="text-5xl font-weight-medium"
            >
              {{ avatarText(props.userData.fullName) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ props.userData.fullName }}
          </h6>

          <!-- 👉 Role chip -->
          <VChip
            label
            :color="resolveUserRoleVariant(props.userData.role).color"
            size="small"
            class="text-capitalize mt-4"
          >
            {{ props.userData.role }}
          </VChip>
        </VCardText>

        <VCardText class="d-flex justify-center flex-wrap mt-3">
          <div class="d-flex align-center me-8 mb-2">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-3"
            >
              <VIcon
                size="22"
                icon="mdi-cash"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                1 258 ₽
              </h6>
              <span>Всего заработано</span>
            </div>
          </div>

          <div class="d-flex align-center me-4 mb-2">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-3"
            >
              <VIcon
                size="22"
                icon="mdi-cash"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                356 ₽
              </h6>
              <span>Выведено</span>
            </div>
          </div>
        </VCardText>

        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">
            Детали
          </h6>

          <VDivider class="mt-4" />

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Username:
                  <span class="text-body-2">
                    @{{ props.userData.username }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Статус:

                  <VChip
                    label
                    size="small"
                    :color="resolveUserStatusVariant(props.userData.status)"
                    class="text-capitalize"
                  >
                    {{ props.userData.status }}
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Роль:
                  <span class="text-capitalize text-body-2">{{ props.userData.role }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  User ID:
                  <span class="text-body-2">
                    {{ props.userData.taxId }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="tonal"
            color="error"
          >
            Блокировать
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
    
    <VCol cols="12">
      <VCard title="Каналы">
        <VDivider />
        <VTable class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">
                НАЗВАНИЕ
              </th>
              <th
                scope="col"
                class="text-center"
              >
                ДЕЙСТВИЯ
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
              <td class="text-center">
                <VBtn
                  icon
                  variant="plain"
                  color="default"
                  size="x-small"
                >
                  <VIcon
                    icon="mdi-delete-outline"
                    :size="24"
                  />
                </VBtn>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.8rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
