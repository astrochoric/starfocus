import { useObservable } from 'dexie-react-hooks'
import { db } from '../db'
import {
	IonButton,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonImg,
	IonInput,
	IonItem,
	IonList,
	IonPopover,
	IonTitle,
	IonToolbar,
} from '@ionic/react'
import {
	cloudDoneSharp,
	cloudDownloadSharp,
	cloudOfflineSharp,
	cloudUploadSharp,
	thunderstormSharp,
} from 'ionicons/icons'

export const Header = ({ title }: { title: string }) => {
	const user = useObservable(db.cloud.currentUser)
	const syncState = useObservable(db.cloud.syncState)
	const isLoggedIn = user?.isLoggedIn

	return (
		<IonHeader>
			<IonToolbar>
				<IonImg
					src="/icon.png"
					slot="start"
					className="w-10 h-10 ml-2" // Needs to align with starship and trajectory
				/>
				<IonTitle>{title}</IonTitle>
				<IonButtons
					className="mx-2"
					slot="secondary"
				>
					{isLoggedIn ? (
						<>
							<IonButton id="sync-status">
								<IonIcon
									icon={
										syncState?.error
											? thunderstormSharp
											: syncState?.phase === 'pushing'
												? cloudUploadSharp
												: syncState?.phase === 'pulling'
													? cloudDownloadSharp
													: cloudDoneSharp
									}
									color={syncState?.error ? 'danger' : 'default'}
									slot="icon-only"
								></IonIcon>
								<IonPopover
									trigger="sync-status"
									triggerAction="click"
								>
									<IonContent className="text-xs">
										{syncState?.error ? (
											<p>Sync error: ${syncState.error.message}</p>
										) : (
											<IonList>
												<IonItem>
													<IonInput
														label="Email"
														labelPlacement="floating"
														readonly
														value={user.email}
													></IonInput>
												</IonItem>

												<IonItem>
													<IonInput
														label="License"
														labelPlacement="floating"
														readonly
														value={syncState?.license}
													></IonInput>
												</IonItem>

												<IonItem>
													<IonInput
														label="Status"
														labelPlacement="floating"
														readonly
														value={syncState?.status}
													></IonInput>
												</IonItem>

												<IonItem>
													<IonInput
														label="Phase"
														labelPlacement="floating"
														readonly
														value={syncState?.phase}
													></IonInput>
												</IonItem>

												<IonItem>
													<IonInput
														label="Progress"
														labelPlacement="floating"
														readonly
														value={syncState?.progress || '-'}
													></IonInput>
												</IonItem>
											</IonList>
										)}
									</IonContent>
								</IonPopover>
							</IonButton>
							<IonButton
								fill="solid"
								onClick={() => {
									db.cloud.logout()
								}}
							>
								Unsync
							</IonButton>
						</>
					) : (
						<>
							<IonButton id="sync-status">
								<IonIcon
									icon={cloudOfflineSharp}
									slot="icon-only"
								></IonIcon>
								<IonPopover
									trigger="sync-status"
									triggerAction="click"
								>
									<IonContent class="ion-padding">
										Not synced. Your data is stored locally only.
									</IonContent>
								</IonPopover>
							</IonButton>
							<IonButton
								fill="solid"
								onClick={() => {
									db.cloud.login()
								}}
							>
								Sync
							</IonButton>
						</>
					)}
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	)
}
