import patchRouter from './patch-router.js'
import helloRouter from './hello-router.js'
import userRouter from './user-router.js'

const apiRoutes  = [
    ['/', helloRouter],
    ['/patch', patchRouter],
    ['/user', userRouter]
]

function addApiRoutes(app) {
    apiRoutes.forEach(([path, router]) => {
        app.use(path, router)
    })
}

export default addApiRoutes
