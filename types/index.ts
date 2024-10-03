export interface UserState {
    ulid: string
    name: string
    email: string
    token: string
}

export type UserCookie = string | null