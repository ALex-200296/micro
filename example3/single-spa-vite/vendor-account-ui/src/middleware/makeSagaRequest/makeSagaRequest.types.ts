export interface ISagaRequest {
    url: string;
    method: 'get' | 'post' | 'put';
    params?: Record<string, string | number>;
    data?: any;
}
