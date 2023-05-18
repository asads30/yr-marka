export default [
  { heading: 'Разделы' },
  {
    title: 'Users',
    icon: { icon: 'mdi-account-outline' },
    to: 'apps-user-list'
  },
  {
    title: 'Channels',
    icon: { icon: 'mdi-list-box' },
    to: 'apps-channels-list'
  },
  {
    title: 'Posts',
    icon: { icon: 'mdi-post' },
    to: 'apps-posts-list'
  },
  {
    title: 'Payments',
    icon: { icon: 'mdi-file-document-outline' },
    to: 'apps-invoice-list'
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
  {
    title: 'Verify',
    icon: { icon: 'mdi-check-decagram' },
    to: 'apps-verify-list',
  },
]
