# saritasa-frontend-kmb-ex3

This is an educational prototype for database design to the task: https://saritasa.atlassian.net/browse/JC19-511

Backend based on PostGraphile solution: https://www.graphile.org/postgraphile/

## Get Started

Run `docker-compose up` to init and start up backend.

Initial DB already contains some methods to support authorization process. You can use mutation `authenticate` to get authorization token and queries `currentUserId` and `userProfile` to get info about authorized user.

Don't forget about authorization header when you work with API, e.g. for GraphiQL you can set it here: http://jingus.saritasa.com/PavelZadorin/screen_2023-02-02_15-28-38_pQZe.png

Initially just one user created into DB, use it for API authorization:  
> login: `admin@saritasa.com`  
> password: `123`

Postgres server is available at `localhost:5432`
> DB: `vocabulary`
> username: `postgres`
> password: `secret`

GraphQL API is available at `http://localhost:5433/graphql`
GraphiQL GUI tool is available at `http://localhost:5433/graphiql`

## Starting application
Run `docker compose up` to see magic setup. Application will start at `http://localhost:3000`
