import { Router } from "express";
import { authRoute } from "../modules/Auth/auth.route";
import { gadgetRoute } from "../modules/Gadget/gadget.route";

const router = Router();

const routers = [
  {
    path: "/gadgets",
    router: gadgetRoute,
  },
  {
    path: "/auth",
    router: authRoute,
  },
];

routers.forEach(item => router.use(item.path, item.router));

export default router;
