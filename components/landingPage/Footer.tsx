import Contact from './Contact'

export default function Footer({ display }: { display: boolean }) {
	return (
		/* Currently don't have a way to keep this sticky and have a variable height without pushing the rest of the LandingScreen off the top of the page.
		 * So we're using flex-wrap with a fixed height so that when the screen width gets too small for the other links they wrap to the next row
		 * and effectively disappear because of the fixed height.
		 */
		<footer
			id="calls-to-action"
			className={`glass fixed inset-x-0 bottom-0 z-10 m-auto flex h-[5rem] max-w-4xl ${
				display ? 'translate-y-0' : 'translate-y-20'
			} flex-wrap items-center justify-between overflow-hidden transition-transform md:w-[90vw] md:rounded-t-2xl`}
		>
			<Contact />
		</footer>
	)
}
