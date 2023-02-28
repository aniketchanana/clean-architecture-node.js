import { userUrls, todoUrls } from "./common/constants/routes";
import cors from "cors";
import server from "./server";
import UserRouter from "./modules/user/routes";
import config from "../config";
import { getAuthMiddleWare } from "./middlewares/auth";
import TodoRoutes from "./modules/todos/routes";

(async () => {
  /**
   * Middlewares
   */
  const authMiddleWare = getAuthMiddleWare();

  /**
   * Initiating top level app routes
   */
  const userRoutes = UserRouter(authMiddleWare);
  const todoRoutes = TodoRoutes();

  /**
   * Registering routes to listen incoming request
   */
  server.use(cors({ credentials: true, origin: config.CLIENT_URL }));
  server.use(userUrls.root, userRoutes);
  server.use(todoUrls.root, authMiddleWare, todoRoutes);

  /**
   * Server
   */
  server.listen(config.PORT, () =>
    console.log(`Server is running on port ${config.PORT}`)
  );
})();
