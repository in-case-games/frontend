import React, { lazy, Suspense } from 'react'
import { BootScreenSaver } from './components/loading'
import { BootScreenSaverPage } from './pages/boot-screen-saver-page'

const Routes = lazy(() => import('./routing/main'))
const Layout = lazy(() => import('./layouts/main/main'))

const App = () => (
	<Suspense fallback={<BootScreenSaverPage />}>
		<Layout>
			<Suspense fallback={<BootScreenSaver />}>
				<Routes />
			</Suspense>
		</Layout>
	</Suspense>
)

export default App
