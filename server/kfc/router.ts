import authController from "./auth/controller"
import usersController from "./users/controller"
import a11yController from "./a11y/controller"
import consola from "consola"

const router = createRouter()

router.use("/auth/**", authController)
router.use("/users/**", usersController)
router.use("/a11y/**", a11yController)

/** This has to be the last route */
router.use("/**", defineEventHandler(event => {
    consola.warn(`Unknown route: [${event.method}] ${event.path} was attempted to be accessed`)
    return createError({statusCode: 404, statusMessage: "Not Found"})
}))

export default useBase("/api", router.handler)