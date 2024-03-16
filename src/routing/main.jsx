import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Email as EmailRouting, Info as InfoRouting } from '.'
import { BootScreenSaver } from '../components/loading'

const FAQPage = lazy(() => import('../pages/faq/faq'))
const ReviewsPage = lazy(() => import('../pages/reviews/reviews'))
const BoxPage = lazy(() => import('../pages/box/box'))
const ProfilePage = lazy(() => import('../pages/profile/profile'))
const GamePage = lazy(() => import('../pages/game/game'))
const HomePage = lazy(() => import('../pages/home/home'))
const NotFoundPage = lazy(() => import('../pages/not-found/not-found'))

const Main = () => (
	<Routes>
		<Route
			path='/faq/*'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<FAQPage />
				</Suspense>
			}
		/>
		<Route
			path='/reviews/:id'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<ReviewsPage />
				</Suspense>
			}
		/>
		<Route
			path='/reviews/*'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<ReviewsPage />
				</Suspense>
			}
		/>
		<Route
			path='/profile/:id'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<ProfilePage />
				</Suspense>
			}
		/>
		<Route
			path='/profile/*'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<ProfilePage />
				</Suspense>
			}
		/>
		<Route path='/email/*' element={<EmailRouting />} />
		<Route path='/info/*' element={<InfoRouting />} />
		<Route
			path='/game/:name'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<GamePage />
				</Suspense>
			}
		/>
		<Route
			path='/box/:id'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<BoxPage />
				</Suspense>
			}
		/>
		<Route
			path='/'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<HomePage />
				</Suspense>
			}
		/>
		<Route
			path='*'
			element={
				<Suspense fallback={<BootScreenSaver />}>
					<NotFoundPage />
				</Suspense>
			}
		/>
	</Routes>
)

export default Main
