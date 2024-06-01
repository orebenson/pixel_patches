

### TODO (in order of priority)
- create simple frontend page with 8 by 8 grid, colour palette, and a submit button
- create simple page to view all submitted patches
- create response handler (errors, etc)

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
