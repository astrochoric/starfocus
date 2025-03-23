import {
	IonButton,
	IonContent,
	IonHeader,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonItemGroup,
	IonLabel,
	IonList,
	IonMenu,
	IonSpinner,
	IonTitle,
	IonToggle,
	IonToolbar,
} from '@ionic/react'
import { useLiveQuery } from 'dexie-react-hooks'
import {
	layersSharp,
	locateOutline,
	rocketSharp,
	timeSharp,
} from 'ionicons/icons'
import { RefObject } from 'react'
import { StarRoleIcon } from '../common/StarRoleIcon'
import { db, StarRole, StarRoleGroup } from '../db'
import useGroupedStarRoles from '../starRoleGroups/useStarRoleGroups'
import useView from './view'

export const ViewMenu = ({
	searchbarRef,
}: {
	searchbarRef: RefObject<HTMLIonSearchbarElement>
}) => {
	const queryResult = useLiveQuery(() =>
		Promise.all([db.starRoles.toArray(), db.starRoleGroups.toArray()]),
	)
	const isLoading = queryResult === undefined
	const { setQuery } = useView()

	return (
		<IonMenu
			contentId="main-content"
			id="view-menu"
			side="start"
			type="push"
		>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Views</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className="space-y-4 ion-padding">
				<IonButton
					color="warning"
					expand="block"
					onClick={() => {
						if (searchbarRef.current) {
							searchbarRef.current.value = 'is:snoozed'
							// Setting the value doesn't trigger ionic searchbar events so need to also set query ourselves
							setQuery('is:snoozed')
						}
					}}
				>
					View snoozed
					<IonIcon
						slot="end"
						icon={timeSharp}
					></IonIcon>
				</IonButton>
				<IonButton
					expand="block"
					routerLink="/constellation"
				>
					Edit roles
					<IonIcon
						slot="end"
						icon={rocketSharp}
					></IonIcon>
				</IonButton>
				{isLoading ? (
					<IonSpinner
						className="w-20 h-20"
						name="dots"
					/>
				) : (
					<div className="space-y-2">
						<StarRolesList
							starRoles={queryResult[0]}
							starRoleGroups={queryResult[1]}
						/>
					</div>
				)}
			</IonContent>
		</IonMenu>
	)
}

function StarRolesList({
	starRoles,
	starRoleGroups,
}: {
	starRoles: StarRole[]
	starRoleGroups: StarRoleGroup[]
}) {
	const starRolesByGroup = useGroupedStarRoles(starRoles, starRoleGroups)
	const {
		activateStarRole,
		activeStarRoles,
		deactivateStarRole,
		setActiveStarRoles,
	} = useView()

	return (
		<IonList>
			<IonItem lines="none">
				All
				<IonToggle
					checked={starRoles.length + 1 === activeStarRoles.length}
					color="secondary"
					className="font-bold"
					onIonChange={event => {
						if (event.detail.checked) {
							setActiveStarRoles([...starRoles.map(({ id }) => id), ''])
						} else {
							setActiveStarRoles([])
						}
					}}
					slot="end"
				></IonToggle>
			</IonItem>
			{starRolesByGroup.map(starRoleGroup => (
				<IonItemGroup key={starRoleGroup.id}>
					<IonItemDivider className="[--background:transparent]">
						<IonIcon
							color="light"
							icon={layersSharp}
							slot="end"
						/>
						<IonLabel>{starRoleGroup.title}</IonLabel>
						{/* Wrapping div necessary to align items with ion items */}
						<div
							className="flex items-center"
							slot="end"
						>
							<IonButton
								fill="clear"
								onClick={() => {
									console.log('SETTING EM')
									setActiveStarRoles(
										starRoleGroup.starRoles.map(({ id }) => id),
									)
								}}
								shape="round"
								size="small"
							>
								<IonIcon
									icon={locateOutline}
									slot="icon-only"
								></IonIcon>
							</IonButton>
							<IonToggle
								checked={
									starRoleGroup.starRoles.length !== 0 &&
									starRoleGroup.starRoles.every(starRole =>
										activeStarRoles.includes(starRole.id),
									)
								}
								disabled={starRoleGroup.starRoles.length === 0}
								color="secondary"
								className="font-bold"
								onIonChange={event => {
									if (event.detail.checked) {
										setActiveStarRoles(
											activeStarRoles.concat(
												starRoleGroup.starRoles.map(({ id }) => id),
											),
										)
									} else {
										setActiveStarRoles(
											activeStarRoles.filter(
												id =>
													!starRoleGroup.starRoles.some(role => role.id === id),
											),
										)
									}
								}}
							></IonToggle>
						</div>
					</IonItemDivider>
					{starRoleGroup.starRoles.map(starRole => (
						<IonItem
							className="ml-2"
							key={starRole.id}
							lines="none"
						>
							<StarRoleIcon starRole={starRole} />
							<IonLabel>{starRole?.title}</IonLabel>
							<IonButton
								fill="clear"
								onClick={() => {
									setActiveStarRoles([starRole.id])
								}}
								shape="round"
								slot="end"
								size="small"
							>
								<IonIcon
									icon={locateOutline}
									slot="icon-only"
								></IonIcon>
							</IonButton>
							<IonToggle
								checked={activeStarRoles.includes(starRole.id)}
								color="secondary"
								onIonChange={event => {
									event.detail.checked
										? activateStarRole(starRole.id)
										: deactivateStarRole(starRole.id)
								}}
								slot="end"
							></IonToggle>
						</IonItem>
					))}
				</IonItemGroup>
			))}
		</IonList>
	)
}
