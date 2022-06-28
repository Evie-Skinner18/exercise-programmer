# Exercise Programmer

- Are you trying to program a healthy routine but avoiding the harder exercises? Use Exercise Programmer to automate the process!
- Create a randomised healthy blend for your training sesh :->
- Feel good about yourself. Aww yeah

# Features
- Add an exercise to the exercise bank, specifying its name, focus and difficulty out of 5
- See the full list of exercises available via pagination
- Generate a single random exercise for yourself
- Generate a fully randomised training programme of multiple exercises!

## Tools and Technologies Used
- React
- React Router
- TailwindCSS
- Material Design icons
- JavaScript
- TypeScript
- Mongo DB Atlas
- Express
- Node
- Mocha

# How to Run the App

## Prerequisites
- Install [Node.js LTS](https://nodejs.org/en/)
- Sign up for a free [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)
- Follow the steps to create a cluster, and within that cluster, a database called exercise_programmer. [See the MongoDB Atlas docs](https://www.mongodb.com/docs/guides/atlas/account/)
- Ensure you allow the IP address of your machine to connect to your MongoDB cluster. [Find out your IP address](https://www.whatsmyip.org)

## 1. Install NPM packages
- Open a Terminal from the root directory /exercise-programmer with two tabs
- From the root directory /exercise-programmer
    - `npm i`
- In one tab, run the following commands: 
    - `cd ./frontend`
    - `npm i` 
- In a second tab, run the following commands: 
    - `cd ./backend`
    - `npm i`

## 2. Create environment variables
- From the ./backend directory, create a file called .env
- Fill it with the following environment variables:
    - `MONGO_DB_CONNECTION_STRING=[your connection string in MongoDB Atlas]`
    - `DB_NAME=exercise_programmer`
    - `PORT=5001`
    - `REACT_APP_ORIGIN=http://localhost:3000`
- From the ./frontend directory, create another file called .env
- Fill it with the following environment variable:
    - `REACT_APP_API_BASE_URL=http://localhost:5001/api/`


## 3. Launch the app in development mode
- From the ./frontend directory, run `npm start`
- From the ./backend directory, run `nodemon index.ts`

# How to Test the App
- From the ./backend directory, ensure the API is not running and run the command `npm run test`
