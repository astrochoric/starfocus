export interface Todo {
	id: string
	rank: number
	description: string
	notes?: string
	role?: string
	completedAt?: Date
}

export interface Goal extends Todo {
	starPoints: StarPoints
	frequency: Frequency
}

export interface Event extends Todo {
	start: Date
	end: Date
}

class StarPoints {
	points: number

	constructor(points: number) {
		if (![1, 2, 3, 5, 8, 13].includes(points))
			throw new TypeError(
				`Star points must be part of the fibonacci sequence between 1 and 13 but ${points} was provided.`
			)
		this.points = points
	}
}

class Frequency {
	progressDays: ProgressDay[]

	constructor(progressDays: ProgressDay[]) {
		if (progressDays.length !== 28)
			throw new TypeError(
				`The frequency bar shows the last 28 days but ${progressDays.length} were provided.`
			)
		this.progressDays = progressDays
	}
}

class ProgressDay {
	amplitude: number

	constructor(amplitude: number) {
		if (amplitude)
			throw new TypeError(
				`The amplitude can only be 0, 1, or 2 but ${amplitude} was provided.`
			)
	}
}

// Get all goals for user
// Get all chores for user
// Get all events for user
// Get roles
// Get past chores, events, and goals
// Filter by role on any of them
