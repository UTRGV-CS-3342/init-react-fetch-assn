# FEATURES

Update with every commit. Put a status (in-progress) or (complete) at the end of each line that you work on.

# Step 1: Convert the client to a single-page app
* 1.1 copy your A08 client into the new project and disable server-side rendering (ssr)
* 1.2 purge server-only code from the client
* 1.3 update the home and schedule routes to load / and /schedule with no data
* 1.4 remove the Add Course form from the Page component
* 1.5 remove the unneeded database and server packages

# Step 2: Load the schedule
* 2.1 api.js file with API server address, functions to get and post that throw on failure
* 2.2 update schedule route to fetch the schedule from the API server (state, useEffect)
* 2.3 show a "Loading..." message until the data arrives
* 2.4 on fetch error (throw or !response.ok), show error message (state)

# Step 3: User action changes
* 3.1 update add section, update section, and delete section to use the API server
