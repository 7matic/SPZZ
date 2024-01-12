## Setting up the enviromental variables

This application runs automatically when running
```docker compose up``` in the root directory of the project.

Before starting the application for the first time, a ```.env``` file must be created in the root of the express folder.

Its contents should a JWT secret string of your choice. Mine is provided below. You can use any one you like. There are also two database URLs. One for docker use and another one so we can seed the database from the command line.
```
DATABASE_URL=mysql://root:password@mysql:3306/spzz
LOCALHOST_DATABASE_URL=mysql://root:password@localhost:3306/spzz
JWT_SECRET=5a1fe99383364f1b75ff3dc7eec51766a6da4be312fa0c7416945deca787bed7
```

You can copy this into the .env file and the application will work fine as long as you set the same MYSQL_ROOT_PASSWORD in the .env file of the root project folder.

## Seeding the database
In order to seed the database you can simply use ```npm run reset``` from the root of the express folder. The Docker stack must be running in order for this to work. Note that this will drop your current database, create a new one and seed it with the /prisma/seed.ts script.

## Setting up the API in Postman
Please first call the login route so you get the JWT token to use with future requests. You can then set the token as a variable in the Environments tab. I named it authorizationSPZZ. You can now use it all over your app. The expiration time is set to 2hrs for development purposes. After that you need to log in again and repet the process. Using the User/WithToken will show you what payload the token holds and verify that you set it correctly.