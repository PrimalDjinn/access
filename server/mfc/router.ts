import authController from "./auth/controller"
import usersController from "./users/controller"

const router = createRouter()

router.use("/auth", authController)
router.use("/users", usersController)

export default useBase("/api", router.handler)