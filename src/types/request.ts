import { Request } from "express";
import { firestore } from "firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { Roles } from "./roles";

// This interface represents what kind of other custom data we want to store in our own collection
export interface CollectionUserData {
  custom_field: string;
  role: Roles;
}

export interface FirebaseRequest extends Request {
  user?: { user: UserRecord; data: CollectionUserData };
}

export function assignTypes<T extends object>() {
  return {
    toFirestore(doc: T): firestore.DocumentData {
      return doc;
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): T {
      return snapshot.data()! as T;
    },
  };
}
