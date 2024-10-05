export interface UserState {
    ulid: string
    name: string
    email: string
    token: string
    picture: string
}

export type NotificationOptions = {
    timeout?: number | 'never';
    intensity?: 'info' | 'success' | 'error';
};

export type UserCookie = string | null
