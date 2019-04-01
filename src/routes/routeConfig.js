import asyncImportComponent from '@/hoc/asyncImportComponent'

const routeConfig = [
  {
    path: '/home',
    component: asyncImportComponent(() => import('@/views/home')),
    title: '一米'
  }
]

export default routeConfig
