import { Handler } from "express";
import { auth } from "@/firebase/auth";
import { FirebaseRequest } from "@/types/request";
import { Users } from "@/firebase/firestore";
import { Roles } from "@/types/roles";
export const verifyUserIdToken: Handler = async (
  req: FirebaseRequest,
  res,
  next
) => {
  try {
    console.log("THE HEADER VALUE IS ", req.headers.authorization);
    const idToken = req.headers.authorization?.split("Bearer ")[0] || "";
    console.log("VALUE OF TOKEN AFTER SPLITTING IS ", idToken);
    const token = await auth.verifyIdToken(idToken);

    const user_id = token.uid;
    const user_data = await auth.getUser(user_id);
    let user_collection_data = await Users.doc(user_id)
      .get()
      .then((res) => res.data());
    // Normally these conditions would be handled by separate routes - depends on the app
    if (!user_collection_data) {
      user_collection_data = {
        // can include any data
        custom_field: "SADASD",
        role: Roles.member,
      };
      await Users.doc(user_id).create(user_collection_data);
    }
    // We can have role in user_data
    req.user = {
      user: user_data,
      data: user_collection_data,
    };
    next();
  } catch (e) {
    res.status(401).send("NO ID TOKEN");
  }
};
// This example middleware requires minimum role for route
export const verifyUserRole: (Role: Roles) => Handler = (Role) => {
  // This is a very basic role checker as an example - not for production use
  return (req: FirebaseRequest, res, next) => {
    if (!req.user || req.user?.data.role < Role) {
      res.send("Not allowed permission low");
    }
    next();
  };
};
