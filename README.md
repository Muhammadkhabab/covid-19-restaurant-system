# Madison Retaurant COVID-19 Information System

Team Members: Cecelia Peterson, Harry Le, Matthew McJoynt, Prasoon Sinha, Riza Hassan, Walt Boettge

## Project:

Website allowing customers get COVID-19 information about local Madison restaurants. Restaurants can create accounts to give potential customers access to information like their safety policies and live capacity.

## Installation (local development):

1. Install Git/GitBash (https://git-scm.com/downloads), Node.js (https://nodejs.org/en/).
2. If this file is being viewed outside of the git repository, reach out to Prasoon Sinha with a git username to get access.
3. Clone the repository.  
   Run: `git clone https://github.com/psinha25/covid-19-restaurant-system.git`
4. Change directory to project (either use command or open VSCode at the project folder).
   Run: `cd covid-19-restaurant-system`
5. On terminal, check you are on the right working directory by running the following.
   Run: `pwd`
   You should see `[whatever path leading up to this]/covid-19-restaurant-system`
6. Create .env file for secret information.
   Run: `touch .env`
7. Paste this in .env file.
   `...`  
   Reach out to Harry for the content of this file.
8. Install backend dependencies.
   Run: `npm install`
9. Change directory to client.  
   Run: `cd client`
10. Install frontend dependencies.
    Run: `npm install`
11. Change directory back to project.
    cd ..
12. Launch both the server and client (both backend and frontend) by running:
    Run: `npm run dev`
13. A browser window should open to localhost:3000 and
14. To log in as a restauarant, reach out to Harry for a username and password.

## Running Tests:

### Frontend - Selenium

Selenium runs using the .side files found in /test/client/. These can be run directly using the selenium browser extension, or via the command line using `selenium-side-runner`.
To run all frontend tests using the command line:

1. Run `npm run seeds`. This will ensure the database is in a known state before running the tests. Be careful -- this will overwrite the current database!
2. Run `npm run dev` to launch the server.
3. Run `npm run frontend-test` will cause the tests to be run

Alternatively, if `selenium-side-runner` is installed, the .side files can be run directly. Check if the package is installed by running `selenium-side-runner --version`. If it is not installed, run `npm install -g selenium-side-runner`. Additional dependencies might also need to be installed, such as jest and webdriver

### Frontend - Jest

1. Frontend tests:
   Run: `cd client`
   Run: `npm run test`
2. Frontend coverage:
   Run: `cd client`
   Run: `npm run coverage`

### Backend

Backend tests are written using Mocha as test framework, Chai as assertion library, and Supertest to make requests. Tests can be found inside /test folder in the project directory.

1. Backend tests:
   Run: `npm run test`
2. Backend coverage:
   Run: `npm run coverage`
