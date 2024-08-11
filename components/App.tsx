'use client'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { StatusBar, Style } from '@capacitor/status-bar'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Constellation from './pages/Constellation'
import ErrorBoundary from './ErrorBoundary'

setupIonicReact({})

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', async status => {
		try {
			await StatusBar.setStyle({
				style: status.matches ? Style.Dark : Style.Light,
			})
		} catch {}
	})

const App = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonRouterOutlet id="main">
					<ErrorBoundary>
						<Route
							path="/constellation"
							render={() => <Constellation />}
						/>
						<Route
							path="/home"
							render={() => <Home />}
						/>
					</ErrorBoundary>
				</IonRouterOutlet>
			</IonReactRouter>
		</IonApp>
	)
}

export default App
