import { useMemo } from 'react'
import completedFalse from '../../../public/completed=false.png'
import completedTrue from '../../../public/completed=true.png'
import notesReading from '../../../public/expanded=true, edit=false.png'
import notesEditing from '../../../public/expanded=true, edit=true.png'
import rolesNoFilter from '../../../public/roles - no filter.png'
import rolesSoftwareEngineerFilter from '../../../public/roles - software engineer filter.png'
import starPointsFalse from '../../../public/star points=false.png'
import starPointsTrue from '../../../public/star points=true.png'
import todayThirtyMinutes from '../../../public/today - 30m.png'
import todayFifteenMinutes from '../../../public/today - 15m.png'
import upcomingCollapsed from '../../../public/upcoming - collapsed.png'
import upcomingExpanded from '../../../public/upcoming - expanded.png'
import Feature from './Feature'

export default function Features(props) {
	const tops = useMemo(() => {
		const tops = []
		for (let i = 0; i < props.featuresCount; i++) {
			const top = Math.round(80 / props.featuresCount) * (i + 1)
			tops.push(top + '%')
		}
		return tops
	}, [props.featuresCount])

	return (
		<section
			id="features"
			className="relative"
		>
			<Feature
				id="constellation"
				images={[starPointsFalse, starPointsTrue]}
				heading="Constellation"
				top={tops[6]}
			>
				Create a unique constellation of your roles so that you never forget
				what&apos;s important and where you&apos;re headed.
			</Feature>
			<Feature
				id="roles"
				images={[rolesNoFilter, rolesSoftwareEngineerFilter]}
				heading="Roles"
				top={tops[6]}
			>
				Assign todos to your important roles in life and easily focus on one at
				any time.
			</Feature>
			<Feature
				id="upcoming"
				images={[upcomingCollapsed, upcomingExpanded]}
				heading="Upcoming"
				top={tops[5]}
			>
				See everything you have upcoming at the push of a button.
			</Feature>
			<Feature
				id="today"
				images={[todayThirtyMinutes, todayFifteenMinutes]}
				heading="Today"
				top={tops[4]}
			>
				Integrate with your calendar so you never miss a meeting.
			</Feature>
			<Feature
				id="log"
				images={[completedFalse, completedTrue]}
				heading="Log"
				top={tops[3]}
			>
				Easily see what you did yesterday and every day before that.
			</Feature>
			<Feature
				id="notes"
				images={[starPointsTrue, notesEditing, notesReading]}
				heading="Notes"
				top={tops[2]}
			>
				Add as much extra information as you like to any todo as Markdown.
			</Feature>
			<Feature
				heading="Star Points"
				id="star-points"
				images={[starPointsFalse, starPointsTrue]}
				top={tops[1]}
			>
				Add star points to your todos to distinguish between small chores and
				larger goals.
			</Feature>
		</section>
	)
}
