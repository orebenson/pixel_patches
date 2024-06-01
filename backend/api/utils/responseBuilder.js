export async function sendRes(res, status, message) {
    res.status(status);
    res.json({
        status,
        message
    });
};
