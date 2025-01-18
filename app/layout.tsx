import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import 'tailwindcss/tailwind.css'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/**
 * Ionic Dark Palette
 * -----------------------------------------------------
 * For more information, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
import '@ionic/react/css/palettes/dark.always.css'

/* Theme variables */
import '../styles/theme.css'
import '../styles/globals.css'

export const metadata: Metadata = {
	title: 'Starfocus',
	description: 'The todo list for our future',
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
	viewportFit: 'cover',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
			<Script
				type="module"
				src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"
				strategy="lazyOnload"
			/>
			<Script
				noModule
				src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"
				strategy="lazyOnload"
			/>
		</html>
	)
}
