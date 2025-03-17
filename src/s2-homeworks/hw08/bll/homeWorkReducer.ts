import {initialPeople, UserType} from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }


export const homeWorkReducer = (state = initialPeople, action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const sorted = [...state] // создаём копию

            if (action.payload === "up") {
                sorted.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                sorted.sort((a, b) => b.name.localeCompare(a.name))
            }

            return sorted
        }
        case 'check': {
            return state.filter(user => user.age >= 18)
        }
        default:
            return state
    }
}
