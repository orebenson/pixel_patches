export function handleRequest(service, params={}) {
    return async (req, res, next) => {
        const result = await service(params);
        handleResponse(res, result.status, result.message, result.data);
    }
}

export async function handleResponse(res, status, message = '', data = {}) {
    let res_status = status === 'error' ? 500 : 200;
    res.status(res_status);
    res.json({
        res_status,
        message,
        data
    });
};
