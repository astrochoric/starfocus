import {
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCheckbox,
	IonIcon,
	IonItem,
	IonLabel,
} from '@ionic/react'
import dayjs from 'dayjs'
import { documentText, rocketSharp, timeSharp } from 'ionicons/icons'
import {
	ComponentProps,
	forwardRef,
	MouseEventHandler,
	PropsWithChildren,
	RefObject,
	useMemo,
} from 'react'
import type { EnrichedTodo, StarRole, Todo as TodoType } from '../db'
import { getIonIcon } from '../starRoles/icons'
import { useDebug } from '../useDebug'
import { Todo as TodoInterface } from './interfaces'
import Todo from './Todo'

export function Todos({
	currentTodoRef,
	listRef,
	todos,
}: {
	currentTodoRef?: RefObject<HTMLDivElement>
	listRef?: RefObject<HTMLDivElement>
	todos: TodoInterface[]
}) {
	const sortedTodos = useMemo(
		() =>
			todos.sort((a, b) => {
				if (a.completedAt || b.completedAt) {
					return (
						(a.completedAt?.getTime() || 0) - (b.completedAt?.getTime() || 0)
					)
				}
				return Number(b.rank) - Number(a.rank)
			}),
		[todos],
	)
	const completedCount = useMemo(
		() => todos.filter(todo => todo.completedAt).length,
		[todos],
	)

	return (
		// Without overflow-auto there is no margin between the bottom todo and the edge of the list 🤷‍♂️
		<div
			className="flex flex-wrap pt-2 todos"
			ref={listRef}
		>
			{sortedTodos.map((todo, index) => (
				<Todo
					todo={todo}
					key={todo.id}
					reference={
						index + 1 === todos.length - completedCount
							? currentTodoRef
							: undefined
					}
					compact={index < sortedTodos.length - 7 - completedCount}
				/>
			))}
		</div>
	)
}

export const TodoListItem = forwardRef<
	HTMLDivElement,
	PropsWithChildren<
		{
			starRole?: StarRole
			todo: TodoType & { order?: string; snoozedUntil?: Date }
			onCompletionChange: ComponentProps<typeof IonCheckbox>['onIonChange']
			onSelect: MouseEventHandler<HTMLIonItemElement>
		} & JSX.IntrinsicElements['div']
	>
>(function TodoListItem(
	{ children, starRole, todo, onCompletionChange, onSelect, ...props },
	ref,
) {
	const [debug] = useDebug()

	return (
		<div
			key={todo.id}
			ref={ref}
			{...props}
		>
			<IonItem
				button
				className="todo"
				onClick={onSelect}
			>
				<IonCheckbox
					aria-label="Complete todo"
					checked={!!todo.completedAt}
					slot="start"
					onClick={event => {
						// Prevents the IonItem onClick from firing when completing a todo
						event.stopPropagation()
					}}
					onIonChange={onCompletionChange}
				/>
				<IonLabel>{todo?.title}</IonLabel>
				{debug && (
					<span className="space-x-2">
						<data className="text-xs text-gray-500">{todo.id}</data>
						{todo.order ? (
							<data className="text-xs text-gray-500">{todo.order}</data>
						) : null}
						{todo.completedAt ? (
							<data className="text-xs text-gray-500">
								{todo.completedAt?.toISOString()}
							</data>
						) : null}
					</span>
				)}
				{todo.note ? (
					<a
						className="ion-hide-sm-down"
						href={todo.note.uri}
						target="_blank"
					>
						<IonIcon icon={documentText}></IonIcon>
					</a>
				) : (
					<IonIcon
						className="ion-hide-sm-down"
						color="light"
						icon={documentText}
					></IonIcon>
				)}
				<SnoozeIcon todo={todo} />
				<IonIcon
					color={starRole ? 'dark' : 'light'}
					icon={starRole ? getIonIcon(starRole.icon.name) : rocketSharp}
					slot="end"
				/>
				{children}
			</IonItem>
		</div>
	)
})

export function TodoCard({
	todo,
	...props
}: { todo: TodoType } & ComponentProps<typeof IonCard>) {
	return (
		<IonCard
			className="cursor-pointer todo ion-no-margin"
			{...props}
		>
			<IonCardHeader>
				<IonCardTitle className="text-sm">{todo.title}</IonCardTitle>
			</IonCardHeader>
		</IonCard>
	)
}

export function SnoozeIcon({
	todo,
}: {
	todo: TodoType & { order?: string; snoozedUntil?: Date }
}) {
	let color = 'light'
	let title = 'Not snoozed'

	if (todo.snoozedUntil) {
		title = `Snoozed until ${todo.snoozedUntil.toDateString()}`

		const today = dayjs()
		const snoozedUntil = dayjs(todo.snoozedUntil)

		if (snoozedUntil.isBefore(today, 'day')) {
			color = 'light'
		} else if (snoozedUntil.isSame(today, 'day')) {
			color = 'primary'
		} else if (snoozedUntil.isAfter(today, 'day')) {
			color = 'warning'
		}
	}

	return (
		<IonIcon
			className="ion-hide-sm-down"
			color={color}
			icon={timeSharp}
			slot="end"
			title={title}
		/>
	)
}
