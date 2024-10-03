export interface UserState {
    ulid: string
    name: string
    email: string
    token: string
    pic: string
}

export type UserCookie = string | null
