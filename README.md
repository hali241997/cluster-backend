# Cluster Backend Side

This is a [AdnoisJS](https://adonisjs.com/) project bootstrapped with `npm init adonisjs@latest`.

## Getting Started
1. Install the packages or `npm install`
2. Create a `.env` file in the root of the project. The env file is provided to you via email
3. This project uses [postgres database](https://www.postgresql.org/). In order to run it, please install and run `postgres` on your system. If you want to use some other database, please change the `config/database.ts` accordingly.
4. Run the migrations using the command: `node ace migration:run`.
5. Run the development server using this command: `node ace serve --hmr`.
4. Your server will run on [http://localhost:3333](http://localhost:3333).

## Test
You can run the tests by executing the following command: `node ace test`.

## Working
This project contains a `generateDummyData.js` that generate a json file in `data/dummy-data.json` which will have dummy data for the cluster. There's no harm in executing this file but you do not need to. I already have provided the `data/dummy-data.json` in the project.

I assumed there will always be one policy from the information provided in the email. Hence I made the controllers accordingly.

The project has 3 routes:
- GET `/api/getTimeSeries`: This will get the data for the cluster from the `data/dummy-data.json`.
- GET `/api/getPolicy`: This will get the policy stored in the database. If no policy is stored, it will return `{}`.
- PUT `/api/setPolicy`: This will update the existing policy in the database. Incase, there is no policy, it will create a new policy and store it in the database.
