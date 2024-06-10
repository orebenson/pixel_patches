import patchRouter from './patch-router.js'
import helloRouter from './hello-router.js'

const apiRoutes  = [
    ['/', helloRouter],
    ['/patch', patchRouter]
]

function addApiRoutes(app) {
    apiRoutes.forEach(([path, router]) => {
        app.use(path, router)
    })
}

export default addApiRoutes
