import patchRouter from './patch-router'
import helloRouter from './hello-router'
import userRouter from './user-router'

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
