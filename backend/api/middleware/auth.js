export function hash(password) {
    return (req, res, next) => {
        // const salt = 10;
        // req.body.password = bcrypt.hash(req.body.password, salt);

        next();
    }
}

export function compare(hash, password) {
    return (req, res, next) => {
        // validate password with bcrypt
        

        next();
    }
}
