import { PopoverOptions, useIonPopover } from '@ionic/react'
import { db, Todo } from '../db'
import { Popover } from './popover'
import useTodoContext from './TodoContext'
import { HookOverlayOptions } from '@ionic/react/dist/types/hooks/HookOverlayOptions'

type TodoPopoverOptions = Omit<PopoverOptions, 'component' | 'componentProps'> &
	HookOverlayOptions

export function useTodoPopover(): [
	(event: any, todo: Todo, options?: TodoPopoverOptions) => void,
	(data?: any, role?: string) => void,
] {
	const {
		selectedTodo: [todo, setTodo],
	} = useTodoContext()
	const [present, dismiss] = useIonPopover(Popover, {
		dismiss: (data: string, role: string) => dismiss(data, role),
		todo,
	})

	return [
		(event: any, todo: Todo, options?: TodoPopoverOptions) => {
			present({
				...(options || {}),
				event,
				onWillPresent: () => {
					setTodo(todo)
				},
			})
		},
		dismiss,
	]
}
