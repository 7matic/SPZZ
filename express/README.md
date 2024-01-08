## Setting up the enviromental variables

This application runs automatically when running
```docker compose up``` in the root directory of the project.

Before starting the application for the first time, a ```.env``` file must be created in the root of the express folder.

Its contents should be two database urls. One for docker use and one so we can seed the database from the command line.

```
DATABASE_URL=mysql://root:password@mysql:3306/spzz
LOCALHOST_DATABASE_URL=mysql://root:password@localhost:3306/spzz
```

You can copy this into the .env file and the application will work fine as long as you set the same MYSQL_ROOT_PASSWORD in the .env file of the root project folder.

## Seeding the database
In order to seed the database you can simply use ```npm run reset``` from the root of the express folder. The Docker stack must be running in order for this to work. Note that this will drop your current database, create a new one and seed it with the /prisma/seed.ts script.