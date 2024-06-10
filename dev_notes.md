
=============================================================================

## TODO for Current Version (v1.1) (in order of priority)
### frontend
- handle navbar text overlapping on small screens

### backend
- add validator middleware
    - Validator.validateAddPatch(req) > return { valid: true/false, session_id: null/id, patch: array }
    - Validator.validateGetPatches(req) > return { valid: true/false }
    - Validator.validateSignUp(req) > return { valid: true/false, body: {} }
    - Validator.validateSignIn(req) > return { valid: true/false, body: {email: "", username: "", password: ""}}
    - Validator.validateLogout(req) > check for session_id header (see if user is logged in)

=============================================================================

## Version plan
### v1.0 - MVP

### v1.1 - validation and code quality
- create response handler 
- manage message passing between application layers
- create middleware module for simple input validation (check types, etc)
    

### v1.2 - signup, signin, sessions
- add user sugnup:  Validator.validateSignUp() > Security.createUser() 
    - simple signup form with email, username, password
    - create user schema
    - add user id field to patch
- add login (sessions):  Validator.validateSignIn() > Security.signIn() (returns session id)
    - simple login form
    - create module for auth and token handling (see monkeytype)
        - send user session id with signature
        - use a redis store to store session data (session id, signature (prevent tampering), logged-in-user-id, expiry time)
        - if expiry time is close, and user sends a new request, create a new session
    - create separate module for checking user permissions (see monkeytype)
- add forgot password (send email with reset link)
    - simple reset password form for that user

### v1.3 - api security
- secure API to industry standard:
- create security middleware module to handle exposed api concerns
    - NoSQL injection
    - Rate limiting (ddos)
    - Input validation and sanitation
    - Error handling (status codes)
    - CORS (only allow use from specific IPs) - prevent XSS

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

+ General features
- dimensions can be from 2,4,8,16,32,64 (they are all 64 x 64) (page starts on 8x8)
- custom MLP written in C for simple classification to 
    - label nsfw patches
    - group patches into themes for sorting?
- custom compression/decompression utility written in c and called by backend
    - must be deterministoc for 64 x 64

+ Real-time features
- analytics dashboard to show live number of users, most popular colours, number of uploads per day
- invite user to collaborate on art with you
    - both have to click submit for it to submit
- leaderboard for most uploads

+ Social features
- limit uploads from each client daily (1 per day?)
- user has a number of likes to give out per day


