import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'
const Home = lazy(async () => await import('@/pages/home/Home'))

export type MyRoutes = Omit<RouteObject, 'children'> & {
  children?: MyRoutes[]
  meta?: Record<string, unknown>
}
export const WebRoutes: MyRoutes[] = [
  {
    path: '/',
    element: <Home />,
    meta: {
      name: 'Home'
    }
  }
]
