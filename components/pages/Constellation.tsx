import {
	IonButton,
	IonContent,
	IonFab,
	IonFabButton,
	IonFabList,
	IonIcon,
	IonItem,
	IonItemDivider,
	IonItemGroup,
	IonLabel,
	IonList,
	IonPage,
	IonReorder,
	IonSpinner,
} from '@ionic/react'
import { useLiveQuery } from 'dexie-react-hooks'
import { add, layersSharp, starHalfSharp, starOutline } from 'ionicons/icons'
import { RefObject, useCallback, useEffect, useRef } from 'react'
import { Header } from '../common/Header'
import { db } from '../db'
import { useCreateStarRoleGroupModal } from '../starRoleGroups/create/useCreateStarRoleGroupModal'
import useGroupedStarRoles from '../starRoleGroups/useStarRoleGroups'
import { useCreateStarRoleModal } from '../starRoles/create/useCreateStarRoleModal'
import { getIonIcon } from '../starRoles/icons'
import { useStarRoleActionSheet } from '../starRoles/StarRoleActionSheet'
import { useStarRoleGroupActionSheet } from '../starRoleGroups/StarRoleGroupActionSheet'

export default function Constellation() {
	const data = useLiveQuery(() =>
		Promise.all([db.starRoles.toArray(), db.starRoleGroups.toArray()]),
	)
	const isLoading = data === undefined
	const starRolesByGroup = useGroupedStarRoles(data)

	const fab = useRef<HTMLIonFabElement>(null)

	const [presentCreateStarRoleModal] = useCreateStarRoleModal()
	const openCreateStarRoleModal = useCallback(() => {
		presentCreateStarRoleModal({
			onWillDismiss: () => {
				if (fab.current) fab.current.activated = false
			},
		})
	}, [fab, presentCreateStarRoleModal])

	const [presentCreateStarRoleGroupModal] = useCreateStarRoleGroupModal()
	const openCreateStarRoleGroupModal = useCallback(() => {
		presentCreateStarRoleGroupModal({
			onWillDismiss: () => {
				if (fab.current) fab.current.activated = false
			},
		})
	}, [fab, presentCreateStarRoleGroupModal])

	const [presentStarRoleActionSheet] = useStarRoleActionSheet()
	const [presentStarRoleGroupActionSheet] = useStarRoleGroupActionSheet()

	useGlobalKeyboardShortcuts(fab, openCreateStarRoleModal)

	return (
		<IonPage>
			<Header title="Constellation" />
			<IonContent fullscreen>
				{isLoading ? (
					<div className="flex items-center justify-center h-full">
						<IonSpinner
							className="w-20 h-20"
							name="dots"
						/>
					</div>
				) : data[0].length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full gap-5">
						<IonIcon
							icon={starOutline}
							size="large"
						/>
						<p>
							Create some roles to focus on what matters in different areas of
							your life
						</p>
					</div>
				) : (
					<IonList inset>
						{/* <IonReorderGroup
							disabled={false}
							onIonItemReorder={handleReorder}
						> */}
						{starRolesByGroup.map(starRoleGroup => (
							<IonItemGroup key={starRoleGroup.title}>
								<IonItemDivider
									className="[--background:transparent] cursor-pointer"
									onClick={() => {
										presentStarRoleGroupActionSheet(starRoleGroup)
									}}
								>
									<IonLabel>{starRoleGroup.title}</IonLabel>
								</IonItemDivider>
								{starRoleGroup.starRoles.length === 0 ? (
									<div className="flex items-center justify-center gap-5 m-4 h-fit">
										<IonIcon
											color="medium"
											icon={starHalfSharp}
											size="small"
										/>
										<IonLabel color="medium">
											<span className="text-sm">
												No star roles in this group yet
											</span>
										</IonLabel>
									</div>
								) : (
									starRoleGroup.starRoles.map(starRole => (
										<IonItem
											button
											className="ml-2"
											key={starRole.id}
											onClick={() => {
												presentStarRoleActionSheet(starRole)
											}}
										>
											<IonLabel>{starRole?.title}</IonLabel>
											{starRole?.icon && (
												<IonIcon
													icon={getIonIcon(starRole.icon.name)}
													slot="end"
												/>
											)}
											<IonReorder slot="end"></IonReorder>
										</IonItem>
									))
								)}
							</IonItemGroup>
						))}
						{/* </IonReorderGroup> */}
					</IonList>
				)}
				<IonFab
					ref={fab}
					slot="fixed"
					vertical="bottom"
					horizontal="end"
				>
					<IonFabButton color="success">
						<IonIcon icon={add}></IonIcon>
					</IonFabButton>
					<IonFabList side="top">
						<IonFabButton
							id="create-star-role"
							onClick={openCreateStarRoleModal}
						>
							<IonIcon icon={starHalfSharp}></IonIcon>
						</IonFabButton>
						<IonFabButton id="create-star-role-group">
							<IonIcon
								onClick={openCreateStarRoleGroupModal}
								icon={layersSharp}
							></IonIcon>
						</IonFabButton>
					</IonFabList>
				</IonFab>
			</IonContent>
		</IonPage>
	)
}
function useGlobalKeyboardShortcuts(
	fab: RefObject<HTMLIonFabElement>,
	openCreateStarRoleModal: any,
) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.target !== document.body) return

			if (event.key === 'c') {
				event.preventDefault()
				if (fab.current) fab.current.activated = true
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [fab, openCreateStarRoleModal])
}
