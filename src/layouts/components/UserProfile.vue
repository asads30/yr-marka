<script setup>

const router = useRouter()

const logout = () => {
  localStorage.removeItem('userData')
  localStorage.removeItem('userSign')
  router.replace({ path: '/login' })
}

const avatarBadgeProps = {
  dot: true,
  location: 'bottom right',
  offsetX: 3,
  offsetY: 3,
  color: 'success',
  bordered: true,
}
</script>

<template>
  <VBadge v-bind="avatarBadgeProps">
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VIcon
        icon="mdi-account-outline"
      />
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem
            link
            @click="logout"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout-variant"
                size="22"
              />
            </template>
            <VListItemTitle>Выйти</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>
