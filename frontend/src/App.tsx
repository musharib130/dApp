import { useRoutes, type RouteObject } from 'react-router-dom'
import walletRoutes from './components/wallet/wallet.routes'
import mainRoutes from './components/main/main.routes'
import ModelsController from './global/modelsController/ModelsController'

const routes: RouteObject[] = [
  ...walletRoutes,
  ...mainRoutes
]


function App() {
  const routing = useRoutes(routes)

  return (
    <ModelsController>
      {routing}
    </ModelsController>
  )
}

export default App
