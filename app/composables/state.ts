import type { UserState } from "~~/types"

export const useUser = () => useState<UserState>('user', () => ({} as UserState))