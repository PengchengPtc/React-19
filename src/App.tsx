import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/zh_CN'
import dayjs from 'dayjs'
import { SWRConfig } from 'swr'
import { swrFetcher } from './utils/request'
import { theme } from './theme'
import { type RouteObject, useRoutes, BrowserRouter } from 'react-router-dom'
import { WebRoutes } from './routes/Routes'
import { type JSX } from 'react'

dayjs.locale('zh-cn')

function AppRouter(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  return useRoutes(WebRoutes as RouteObject[])
}

function App(): JSX.Element {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, suspense: false, fetcher: swrFetcher }}>
      <ConfigProvider
        locale={locale}
        button={{
          autoInsertSpace: false
        }}
        theme={theme}
        getPopupContainer={(triggerNode) => {
          if (triggerNode) {
            return triggerNode.parentNode as HTMLElement
          }
          return document.body
        }}
      >
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppRouter />
        </BrowserRouter>
      </ConfigProvider>
    </SWRConfig>
  )
}

export default App
