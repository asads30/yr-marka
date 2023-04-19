export default [
  { heading: 'Разделы' },

  // {
  //   title: 'Чат',
  //   icon: { icon: 'mdi-message-outline' },
  //   to: 'apps-chat',
  // },
  {
    title: 'Users',
    icon: { icon: 'mdi-account-outline' },
    children: [
      { title: 'List', to: 'apps-user-list' },
      { title: 'View', to: { name: 'apps-user-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Channels',
    icon: { icon: 'mdi-list-box' },
    children: [
      { title: 'List', to: 'apps-channels-list' },
      { title: 'View', to: { name: 'apps-channels-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Posts',
    icon: { icon: 'mdi-post' },
    children: [
      { title: 'List', to: 'apps-posts-list' },
      { title: 'View', to: { name: 'apps-posts-view-id', params: { id: 21 } } },
    ],
  },
  {
    title: 'Payments',
    icon: { icon: 'mdi-file-document-outline' },
    children: [
      { title: 'List', to: 'apps-invoice-list' },
      { title: 'View', to: { name: 'apps-invoice-preview-id', params: { id: '5036' } } },
      { title: 'Edit', to: { name: 'apps-invoice-edit-id', params: { id: '5036' } } },
    ],
  },
  {
    title: 'Newsletter',
    icon: { icon: 'mdi-newspaper' },
    children: [
      { title: 'List', to: 'apps-mailing-list' },
      { title: 'View', to: 'apps-mailing-add' },
    ],
  },
  {
    title: 'Payouts',
    icon: { icon: 'mdi-cash' },
    to: 'apps-payouts-list',
  },
]
