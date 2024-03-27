import React from 'react'
import ReactDOMClient from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import './assets/styles/colors'
import './assets/styles/fonts'
import './assets/styles/main'
import './assets/styles/zeroing'

ReactDOMClient.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

const devMode = process.env.NODE_ENV === 'development'

if (devMode && module && module.hot) {
	module.hot.accept()
}
