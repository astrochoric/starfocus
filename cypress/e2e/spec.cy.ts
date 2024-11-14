before(() => {
	indexedDB.deleteDatabase('starfocus-z0vnq74nz')
})

it('works', () => {
	cy.visit('/home')

	cy.get('ion-fab-button').click()
	cy.get('ion-modal').within(() => {
		cy.contains('label', 'Title')
			.find('input')
			.wait(2000)
			.type('take the bins out')
		cy.contains('Confirm').click()
	})

	assertLists([], ['take the bins out'])

	cy.get('#view-menu-button').click()
	cy.contains('ion-button', 'Edit roles')
	// For some reason clicking edit roles doesn't work so we hard-navigate
	cy.visit('/constellation')

	cy.contains('ion-title', 'Constellation')

	cy.get('ion-fab-button').click()
	cy.get('ion-modal').within(() => {
		cy.contains('label', 'Title').find('input').wait(2000).type('Father')
		cy.get('#icons ion-icon').first().click()
		cy.get('#selected-icon').should('have.attr', 'icon')
		cy.wait(1000)
		cy.contains('Confirm').click()
	})

	cy.get('ion-fab-button').click()
	cy.get('ion-modal').within(() => {
		cy.contains('label', 'Title').find('input').wait(2000).type('Partner')
		cy.get('#icons ion-icon').eq(1).click()
		cy.get('#selected-icon').should('have.attr', 'icon')
		cy.wait(1000)
		cy.contains('Confirm').click()
	})

	cy.visit('/home')

	cy.get('ion-fab-button').click()
	cy.get('ion-modal').within(() => {
		cy.contains('label', 'Title')
			.find('input')
			.wait(3000)
			.type('be silly together')
		cy.get('ion-select[label="Star role"]').click()
	})
	cy.get('ion-alert').within(() => {
		cy.contains('Father').click()
		cy.contains('OK').click()
	})
	cy.get('ion-modal').contains('Confirm').click()

	cy.get('ion-fab-button').click()
	cy.get('ion-modal').within(() => {
		cy.contains('label', 'Title')
			.find('input')
			.wait(2000)
			.type('plan birthday day out')
		cy.get('ion-select[label="Star role"]').click()
	})
	cy.get('ion-alert').within(() => {
		cy.contains('Partner').click()
		cy.contains('OK').click()
	})
	cy.get('ion-modal').contains('Confirm').click()

	assertLists(
		[],
		['plan birthday day out', 'be silly together', 'take the bins out'],
	)

	cy.get('#icebox').contains('take the bins out').click()
	cy.get('#todo-action-sheet').contains('Move to wayfinder').click()
	cy.get('#log-and-wayfinder').contains('take the bins out')
	cy.get('#todo-action-sheet').should('not.exist')

	cy.get('#icebox').contains('be silly together').click()
	cy.get('#todo-action-sheet').contains('Move to wayfinder').click()
	cy.get('#log-and-wayfinder').contains('be silly together')
	cy.get('#todo-action-sheet').should('not.exist')

	cy.get('#icebox').contains('plan birthday day out').click()
	cy.get('#todo-action-sheet').contains('Move to wayfinder').click()
	cy.get('#log-and-wayfinder').contains('plan birthday day out')
	cy.get('#todo-action-sheet').should('not.exist')

	assertLists(
		['plan birthday day out', 'be silly together', 'take the bins out'],
		[],
	)

	// reorderImportantTodo(0, 2)
	// cy.get('#log-and-wayfinder .todo')
	// 	.first()
	// 	.find('ion-reorder')
	// 	.shadow()
	// 	.find('.reorder-icon')
	// 	.shadow()
	// 	.find('svg')
	// 	.drag('#log-and-wayfinder .todo:nth-child(3)')
	// assertLists(
	// 	[],
	// 	['be silly together', 'plan birthday day out', 'take the bins out'],
	// 	[],
	// )
	// reorderImportantTodo(1, -1)
	// assertLists(
	// 	[],
	// 	['plan birthday day out', 'be silly together', 'take the bins out'],
	// 	[],
	// )
	// cy.reload()
	// assertLists(
	// 	[],
	// 	['plan birthday day out', 'be silly together', 'take the bins out'],
	// 	[],
	// )

	cy.get('#log-and-wayfinder')
		.contains('.todo', 'take the bins out')
		.find('ion-checkbox')
		.click()

	assertLists(
		['take the bins out', 'plan birthday day out', 'be silly together'],
		[],
	)
})

function assertLists(wayfinder: string[], icebox: string[]) {
	cy.get('#log-and-wayfinder .todo')
		.should('have.length', wayfinder.length)
		.invoke('toArray')
		.invoke('map', item => item.textContent)
		.should('deep.equal', wayfinder)
	cy.get('#icebox .todo')
		.should('have.length', icebox.length)
		.invoke('toArray')
		.invoke('map', item => item.textContent)
		.should('deep.equal', icebox)
}

function reorderWayfinderTodo(todoIndex: number, places: number) {
	cy.get(`#log-and-wayfinder .todo`)
		.eq(todoIndex)
		.find('ion-reorder')
		.shadow()
		.find('.reorder-icon')
		.trigger('mousedown', { which: 1 })
		.trigger('mousemove', { screenX: 936, screenY: 287 + 49 })
		.trigger('mouseup')
}
