export interface UserState {
    ulid: string
    name: string
    email: string
    token: string
    picture: string
}

export type UserCookie = string | null
