import patchRouter from './patchRouter.js'
import helloRouter from './helloRouter.js'

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
