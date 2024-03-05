// Firestore is the database

import { CollectionUserData, assignTypes } from "@/types/request";
import { app } from "./init";

const firestore = app.firestore();

//  lets say collection name is user_list

export const Users = firestore
  .collection("user_list")
  .withConverter(assignTypes<CollectionUserData>());
