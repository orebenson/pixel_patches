tmp

// "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js --transform '{}'"

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  setupFilesAfterEnv: [
    'dotenv/config'
  ]
};


=============================================================================

## TODO for Current Version (v1.2) (in order of priority)
### frontend
- handle navbar text overlapping on small screens
- add register
    - submit {
        email: email format less than 64 digits
        username: string less than 64 digits
        password:
    }
- add login page

### backend
- [done] add user register 
- add sessions (login/logout/requests): security > validator > services
 
    - create module for auth and token handling (see monkeytype, and owasp page on sessions)

    - login handler -- /login
        - 1 - check that user password matches with their password in database
        - 2 - generate: {session_id, signature (prevent tampering), logged_in_user_id, expiry_time} and put in token database
        - 3 - send user session_id, signed with signature, in secure cookie
    - request handler session validation (middleware for all requests) -- /patch/**
        - (to check if a user is logged in, and retrieve their id, and information if they are)
        - 1 - on each request, check if there is a session id in the header/cookie or whatever
        - 2 - if there is:
            - 2.1 - if the session is expired, revoke session and redirect to login page
            - 2.2 - if the session is close to expiry, generate a new session and send {session_id, signature (prevent tampering), logged_in_user_id, expiry_time} to user
            - 2.3 - if the session is valid, continue and fetch relevant user data (their patches/profile whatever)
        - 3 - if there isnt:
            - 3.1 - deny the request if they are trying to access a user-only route
    - logout handler -- /logout
        - 1 - if no session id, redirect user to login page
        - 2 - if session id, revoke session

- add forgot password (send email with reset link)
    - simple reset password form for that user

=============================================================================
- see 'Rooms' game on iphone for references
## Version plan
### v1.0 - MVP

### v1.1 - validation and code quality

### v1.2 - register, signin, sessions
- add user register
- add login
- add logout
- add forgot password

### v1.3 - api security
- secure API to industry standard:
- create separate module for checking user permissions (see monkeytype)
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


