
testing notes?:

npm test -- -t '/POST /user'
npm test -- -t 'Adds new user and tries to login'

=============================================================================

## features TODO for Current Version (v1.2) (in order of priority)
+ register feature
    - backend: add /user/register and handler [done]
    - frontend: add register page - { email: email format less than 64 digits, username: string less than 64 digits, password: ''}

+ login feature
    - backend: add /login and login handler[done]
    - frontend: add login page - on login, server can return the users username, to be stored in localstorage, loaded, and dispayed on each page load

+ logout feature
    - backend: add /logout and logout handler [done]
    - backend: add logout tests with sessions [done]
    - frontend: add logout button - if backend returns user not logged in, redirect to login page

+ session management per request
    - backend: session handler, session validation (middleware for all requests) -- /patch/** [done]
    - backend: change all tests to use sessions
    - backend: add extensive tests for the session management
    - frontend: add relevant logic for if a user is logged in (displaying name in header if there is a username field in response)

+ forgot password feature
    - backend: add /user/resetpassword (send email with reset link)
    - frontend: add reset password pages

+ usability
    - frontend: handle navbar text overlapping on small screens

=============================================================================
- see 'Rooms' game on iphone for references
## Version plan
### v1.0 - MVP
### v1.1 - validation and code quality
### v1.2 - register, signin, sessions
- add user register
- add login
- add session checks per request 
- add logout
- add forgot password

### v1.3 - api security
- secure API to industry standard:
- create separate module for checking user permissions (see monkeytype)
- create security middleware module to handle exposed api concerns
    - NoSQL injection
    - Rate limiting (ddos)
        - users/ips can only send a limited amount per day
        - additional ddos protection 
    - Input validation and sanitation
    - Error handling (status codes)
    - Prevent open redirects
    - Only allow certain number of login requests from a specific source ip

### v2.0 - deployment
database - firestore
backend - firebase functions
    - auth - firebase auth
    - sessions - firestore
frontend - firebase hosting

=============================================================================

## Un-assigned features
+ Core code quality features
- caching of recently uploaded patches
- WebComponents for simple parts such as header
- simple architecture for state management (canvas, list)
- add eslint and prettier for backend
- Create types and assign type hints

+ General features
- dimensions can be from 2,4,8,16,32,64 (they are all 64 x 64) (page starts on 8x8)
- custom MLP written in C for simple classification to 
    - label nsfw patches
    - group patches into themes for sorting?
- custom compression/decompression utility written in c and called by backend
    - must be deterministoc for 64 x 64
- add gif animation options (each frame is its own patch)

+ Real-time features
- analytics dashboard to show live number of users, most popular colours, number of uploads per day
- invite user to collaborate on art with you
    - both have to click submit for it to submit
- leaderboard for most uploads

+ Social features
- limit uploads from each client daily (1 per day?)
- user has a number of likes to give out per day
- add a sharing option to share new patches on different platforms


