# Madison Retaurant COVID-19 Information System  
Team Members: Cecelia Peterson, Harry Le, Matthew McJoynt, Prasoon Sinha, Riza Hassan, Walt Boettge  

## Project:  
Website allowing customers get COVID-19 information about local Madison restaurants. Restaurants can create accounts to give potential customers access to information like their safety policies and live capacity.
  
## Installation (local development):

1. Install Git/GitBash (https://git-scm.com/downloads), Node.js (https://nodejs.org/en/)
2. If this file is being viewed outside of the git repository, reach out to Prasoon Sinha with a git username to get access.
3. Clone the repository.  
Run: `git clone https://github.com/psinha25/covid-19-restaurant-system.git`
4. Change directory to project (either use command or open VSCode at the project folder)  
Run: `cd covid-19-restaurant-system`
5. On terminal, check you are on the right working directory by running the following
	Run: `pwd`
	You should see `[whatever path leading up to this]/covid-19-restaurant-system`
6. Create .env file for secret information
Run: `touch .env`
7. Paste this in .env  
`MONGO_URI_DEV="..."`  
Reach out to Harry for this URI  
8. Run: `npm install`  
This will download the packages of the backend to your node_modules folder.
9. Change directory to client  
Run: `cd client`
10. Run: `npm install`
This will download the packages of frontend to your node_modules folder.
11. Change directory back to project
cd ..
12. Launch both the server and client (both backend and frontend) by running:
Run: `npm run dev`
13. A browser window should open to localhost:3000 and 
14. To log in as a restauarant, reach out to Harry for a username and password
