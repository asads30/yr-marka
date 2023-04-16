export default [
  { heading: 'Разделы' },

  // {
  //   title: 'Чат',
  //   icon: { icon: 'mdi-message-outline' },
  //   to: 'apps-chat',
  // },
  {
    title: 'Пользователи',
    icon: { icon: 'mdi-account-outline' },
    children: [
      { title: 'Список', to: 'apps-user-list' },
      { title: 'Просмотр', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Каналы',
    icon: { icon: 'mdi-list-box' },
    children: [
      { title: 'Список', to: 'apps-channels-list' },
      { title: 'Просмотр', to: { name: 'apps-channels-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Посты',
    icon: { icon: 'mdi-post' },
    children: [
      { title: 'Список', to: 'apps-posts-list' },
      { title: 'Просмотр', to: { name: 'apps-posts-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Платежи',
    icon: { icon: 'mdi-file-document-outline' },
    children: [
      { title: 'Список', to: 'apps-invoice-list' },
      { title: 'Просмотр', to: { name: 'apps-invoice-preview-id', params: { id: '5036' } } },
      { title: 'Изменить', to: { name: 'apps-invoice-edit-id', params: { id: '5036' } } },
    ],
  },
  {
    title: 'Рассылка',
    icon: { icon: 'mdi-newspaper' },
    children: [
      { title: 'Список', to: 'apps-mailing-list' },
      { title: 'Добавить', to: 'apps-mailing-add' },
    ],
  },
  {
    title: 'Выплаты',
    icon: { icon: 'mdi-cash' },
    to: 'apps-payouts-list',
  },
]
