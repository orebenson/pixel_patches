

### TODO (in order of priority)
frontend
- add js functionality for painting the canvas
- add js functionality for clearing the canvas
- add js service for converting canvas to hex
- add js API routing for sending array to backend
    - add error handling (popup message for success/ error (patch already exists))
- create simple page to view all submitted patches

backend
- create response handler (errors, etc)
- create security middleware module to handle exposed api concerns
    - NoSQL injection
    - Rate limiting (ddos)
    - Input validation and sanitation
    - Error handling (status codes)
    - CORS (only allow use from specific IPs) - prevent XSS

## MVP
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

## Further features
- add user login with both oauth and non-oauth
- if the gallery is in order of recently made
    - cache front page results (first 50 or so images)
- limit requests from each client daily
