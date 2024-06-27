
testing notes?:

npm test -- -t "/POST /user"
npm test -- -t "POST /patch/add Adds new user and tries to login"

=============================================================================

## features TODO for Current Version (v1.2) (in order of priority)
+ add email verification
    - backend: on user registration: send verification email > set verified to false > set verified to true once email link clicked
    - frontend: on click of verification email: send to backend > return success/error message

+ forgot password feature
    - setup a gmail account and password for application usage

+ extra
    - backend: add more tests:
        - reset password flow with email?
    - frontend: display username under each patch
    - frontend: show currently selected colour on palette

=============================================================================
- see 'Rooms' game on iphone for references
## Version plan
### v1.0 - MVP
### v1.1 - validation and code quality
### v1.2 - register, signin, sessions

### v1.3 - api security
- move frontend to npm and typescript
- add api documentation
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
    - captcha

### v2.0 - deployment (optional)
database - firestore/mongodb atlas
backend - firebase functions
    - auth - firebase auth
    - sessions - firestore
frontend - firebase hosting
CI/CD - github actions (create main and dev branch)
create docker-comepose yml to deploy frontend and backend

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
- nsfw filtering/labelling - (use tensorflow!!)
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
- add a sharing option to share new patches on different platforms

=============================================================================

## Marketing/Social/Release ideas
### Minimum for product release and spread
- must have minimum canvas features
    - fill paint bucket
    - erase pixel
- must have filters on the 'all patches' page
    - nsfw (blur them!!, also must have an account to view, with nsfw enabled) 
    - popularity
    - date
    - dimensions
    - username
- must not allow usernames with profanities
- must have full stack security (rate limiting especially)

### How to spread
- create tiktok + instagram account
    - post daily/weekly patches (can be a video of patch being created)

- monthly vote for new colour to be added to palette
- create a user feedback form?
- share button to share to social media
