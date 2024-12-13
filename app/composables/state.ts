import type { Drizzle } from "~~/server/db/types";
import type { UserState } from "~~/shared/types";
import consola from "consola";

export const useUser = async () => {
	const { data } = await useAsyncState<UserState>("user", async () => {
		const cookie = User.authCookie;
		if (!cookie) return {} as UserState;
		const data = await $fetch<Drizzle.User.select>("/api/users/me", {
			headers: {
				Authorization: `Bearer ${cookie}`,
			},
			onRequestError({ error }) {
				if (import.meta.client) {
					window.alertError(error?.message || "An unknown error occurred");
				}
				consola.error(error?.message || "An unknown error occurred", error);
			},
			onResponseError({ error }) {
				consola.error(error);
				User.value = null;
				User.authToken = null;
			},
			onResponse({ response }) {
				if (!response.ok) return;
				User.value = response._data;
			},
		}).catch(e => null);
		if(!data) return {} as UserState
		const user = {
			email: data.email,
			token: cookie,
			ulid: data.ulid,
		} satisfies UserState;

		if (data.picture) (user as UserState).picture = data.picture;
		return user;
	});
	return data;
};

type Result<T> = T | undefined;
type Error = any | undefined;
type Return<T> = { data: Ref<Result<T>>; error: Error };

export const useAsyncState = async <T>(key: string, fn: () => Promise<T>): Promise<Return<T>> => {
	async function pull() {
		try {
			const data = await fn();
			return { result: data, error: undefined };
		} catch (error) {
			return Promise.resolve({ error: error as Error, result: undefined });
		}
	}

	if (tryUseNuxtApp()) {
		const { data: initial } = useNuxtData(key);
		if (initial.value) return Promise.resolve({ data: initial as Ref<T>, error: undefined });

		const { result, error } = await pull();
		initial.value = result;
		if (error) {
			consola.error("An error occurred while fetching data for", key);
			consola.error(error);
		}
		return { data: initial, error };
	} else {
		if (isDevelopment) {
			consola.warn(
				"Nuxt instance not found, re-executing initialisation function and discarding results right after." +
					" There is no state thus, results will not be re-used, please check your implementation." +
					" This has a low likelihood of being a Nuxt error, well unless you are an idiot then it's" +
					" completely your fault, you idiot."
			);
		}

		const { result, error } = await pull();
		return { data: ref(result) as Ref<typeof result>, error };
	}
};
