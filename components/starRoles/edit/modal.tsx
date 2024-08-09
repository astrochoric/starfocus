import { ComponentProps } from 'react'
import StarRoleModal from '../StarRoleModal'

export function EditStarRoleModal({
	...props
}: ComponentProps<typeof StarRoleModal>) {
	return <StarRoleModal {...props} />
}
