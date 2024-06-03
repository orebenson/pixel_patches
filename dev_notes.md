
=============================================================================

## TODO for Current Version (v1.0) (in order of priority)
### frontend
- add js functionality for painting the canvas
    - create a canvas object
    - update canvas tiles when clicked with a colour
    - on page load, (if page is left and revisted), load canvas state from localstorage
    - on page unload, save canvas state to localstorage
- add js functionality for clearing the canvas
- add js service for converting canvas to hex
- add js API routing for sending array to backend
    - add error handling (popup message for success/ error (patch already exists))
- create simple page to view all submitted patches

### backend
- change to typsecript
- create response handler 
    - create response type (status, message, data)
    - create request type (basic validator - json containing patch hexes)

=============================================================================

## Version plan
### v1.0 - MVP
frontend
- navbar 
    - create/home page
        - short explanation of site
        - colour palette side bar 
        - 8 x 8 canvas
        - button to upload
            - convert image to 
    - gallery
        - show all created art with dates and times
    
backend
- database
    - literally doesnt matter which
- api
    - POST new /patch
        - if art exists - return error
        - else: store art in DB
    - GET all /patch

### v1.1 - validation
create middleware module for validation
- input cleaning and validation

### v1.2 - signup, signin, sessions
- add user sugnup
    - simple signup form with email, username, password
    - create user schema
    - add user id field to patch
- add login (sessions)
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
database - firebase store (firestore)
backend - firebase functions
    - auth - firebase auth
    - cache - find a managed redis service
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


