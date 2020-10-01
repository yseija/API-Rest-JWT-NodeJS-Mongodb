import { Router } from 'express'
const router = Router();

import *as userCtrl from "../controllers/user.controller";
import { authjwtoken, verifySignUp } from "../middlewares";


router.post("/", [
  authjwtoken.verifyToken,
  authjwtoken.isAdmin,
  verifySignUp.checkDuplicateUsernameOrEmail,
],
  userCtrl.createUser
);


export default router;