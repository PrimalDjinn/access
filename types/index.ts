export interface UserState {
    ulid: string
    email: string
    token: string
    picture: string
}

export type NotificationOptions = {
    timeout?: number | 'never';
    intensity?: 'info' | 'success' | 'error';
};

export type UserCookie = string | null


export interface ValidationError {
    validation?: string;
    code: string;
    message: string;
    path: string[];
    minimum?: number;
    type?: string;
    inclusive?: boolean;
    exact?: boolean;
}