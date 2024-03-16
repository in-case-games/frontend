import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { BootScreenSaver } from '../components/loading'

const InfoPage = lazy(() => import('../pages/info/info'))

const Info = () => (
	<Routes>
		<Route
			path=':id'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<InfoPage />
				</Suspense>
			}
		/>
		<Route
			path='*'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<InfoPage />
				</Suspense>
			}
		/>
	</Routes>
)

export default Info
