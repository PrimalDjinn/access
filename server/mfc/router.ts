import authController from "./auth/controller"

const router = createRouter()

router.use("/auth", authController)

export default useBase("/api", router.handler)