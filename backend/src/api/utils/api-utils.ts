export function handleRequest(service) {
    return async (req, res) => {
        const params = {
            ...req.body,
            ...req.params
        };
        const result = await service(params);
        handleResponse(res, result.status, result.message, result.data, {username: req.body.username});
    }
}

export async function handleResponse(res, status, message = '', data = {}, headers = {}) {
    res.status(status);
    res.json({
        status,
        message,
        data,
        headers
    });
};
