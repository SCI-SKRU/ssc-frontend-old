import { Button, ConfigProvider } from 'antd'
import Link from 'next/link'
import theme from '../theme/themeConfig'

const HomePage = () => (
  <ConfigProvider theme={theme}>
    <div className="App">
      <Button type="primary">
        <Link href={'/booking'}>จองคอร์ส</Link>
      </Button>
    </div>
  </ConfigProvider>
)

export default HomePage
