Add service account key to ./service-key/service-key.json

Entry point is src/index.ts

# Routes
See src/routes/auth.ts for implementation of everything



Firebase init initializes firebase app

src/firebase/firestore file connects to database and gives us user collection
src/firbase/auth gives us the firebase-auth instance


Middlewares
There are two auth middlewares
One takes the request, gets idToken from request and gets user data based on that
Second middleware - it always comes after the first middleware - takes a role and only lets user perform action if their role is equal or greater than that role

