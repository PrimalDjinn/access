import { AxeResults } from "axe-core"

export interface UserState {
    ulid?: string
    email?: string
    token?: string
    picture?: string
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


export type A11yResults = {
    result: AxeResults & {
        screenshot: string
    },
    error?: Error | string
} | {
    result?: undefined
    error: Error | string
}