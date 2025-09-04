import axios from 'axios';

export type RestHttpRequestType = {
    endpoint: string;
    method?: 'get' | 'post' | 'delete' | 'put';
    params?: Record<string, unknown>;
    body?: Record<string, unknown>;
    isResponseVoid?: boolean;
};

const restClient = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    timeout: 20000,
});

export function restApiHttpRequest<T>({
    endpoint,
    method = 'get',
    params,
    body,
    isResponseVoid = false,
}: RestHttpRequestType): Promise<void | T> {
    return new Promise<void | T>((resolve) => {
        (async () => {
            let response;
            try {
                if (method === 'post' || method === 'put') {
                    response = await restClient[method](endpoint, body, {
                        params,
                    });
                } else {
                    response = await restClient[method](endpoint, {
                        params,
                    });
                }
                const { data, status } = response;
                if (status === 200) {
                    if (isResponseVoid) {
                        resolve();
                        return;
                    }
                    if (data) {
                        resolve(data as T);
                    }
                }
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    // Handle 404 error when searching for a shared hl resolving the
                    // promise to avoid retries
                    if (
                        error.response &&
                        (error.response.status === 404 ||
                            error.response.status === 500)
                    ) {
                        resolve();
                        return;
                    }
                }
            }
        })();
    });
}
