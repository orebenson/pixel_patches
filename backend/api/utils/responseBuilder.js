export async function sendRes(res, status, message='', data={}) {
    res.status(status);
    res.json({
        status,
        message,
        data
    });
};
