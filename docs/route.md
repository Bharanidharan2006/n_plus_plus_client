## Basic structure

- Everything realted to the authentication(login and forgot_password screens) reside in the root of the app directory.
- Screens for the app live inside the (app) folder.
- The root \_layout.tsx file checks whether a user is authenticated or not and handles the redirection.

## (app) structure

- /(shared)/ -> Screens that are common to both representatives and students are put inside this and also the screens that have minor modifications for representatives like the addition of extra edit button are also put inside this folder.
- /rep/ -> Screens specific to the representative reside inside this folder.
- When creating a route like /attendance inside the (shared) folder, it is advised to do the same inside the /rep folder to maintain uniformity. Do this only if representative specific screens are present for that route.
