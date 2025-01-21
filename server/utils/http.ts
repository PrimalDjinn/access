import type { H3Event, Router } from "h3";
import consola from "consola";

export function useController(folderName: string, router: Router) {
	router.use(
		"/**",
		defineEventHandler((event: H3Event) => {
			consola.warn(
				`Unknown route: [${event.method}] ${event.path} was attempted to be accessed`
			);
			return createError({
				statusCode: 404,
				statusMessage: "Not Found",
				message: "Unknown route",
			});
		})
	);

	return useBase(`/${folderName}`, router.handler);
}

type Response<T> = T;
export function createResponse<T extends object>(
	response: {
		statusMessage?: string;
		data?: T | string;
		headers?: Record<string, string>;
	} & OneOf<[{ statusCode: number }, { status: number }]>
): Response<T> {
	let inferred: Record<string, string> = {};
	let { statusMessage, data, headers } = response;
	let statusCode = (response as any)?.statusCode || (response as any)?.status || 200;

	switch (typeof data) {
		case "string":
			inferred = { "Content-Type": "text/plain" };
			break;
		case "object":
			inferred = { "Content-Type": "application/json" };
			data = JSON.stringify(data);
			break;
		case "number":
		case "boolean":
		case "bigint":
		case "symbol":
			inferred = { "Content-Type": "text/plain" };
			data = (data as any).toString();
			break;
		case "function":
			const result = (data as Function)();
			if (result instanceof Response) return result as T;
			return createResponse({ statusCode, data: result, headers: headers });
		default:
			inferred = {};
	}

	return new Response(data as BodyInit | XMLHttpRequestBodyInit, {
		status: statusCode,
		statusText: statusMessage || undefined,
		headers: new Headers({ ...inferred, ...headers }),
	}) as T;
}
