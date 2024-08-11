import dynamic from 'next/dynamic'

// TODO: Find out if this is necessary to be compatible with Ionic & Capacitor
const LazyApp = dynamic(() => import('../../components/App'), {
	ssr: false,
})

export async function generateStaticParams() {
	return [{ all: ['home'] }, { all: ['constellation'] }, { all: ['settings'] }]
}

export default function Page() {
	return <LazyApp />
}
