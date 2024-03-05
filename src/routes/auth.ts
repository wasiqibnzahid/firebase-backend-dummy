import { basicRouteController } from "@/controller";
import { verifyUserIdToken, verifyUserRole } from "@/middleware/auth";
import { Roles } from "@/types/roles";
import { Router } from "express";

const router = Router();

router.use(verifyUserIdToken); // This adds middleware to all routes of this router that adds data to req.user;

// The verifyUserRole middleware only works with routes that have verifyUserIdToken implemented since it checks
// for user role in req.user and the verifyIdToken middleware adds req.user which is undefined by default
router.get("/data", verifyUserRole(Roles.teamLead), basicRouteController); // It will run if user is teamLead or greater

export { router as AuthRouter };
