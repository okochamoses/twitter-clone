# Twitter Clone

This is a project to build an MVP of twitter. The application is built with expressJS(nodeJS framework) and mongoDB.
The app has the following features

- User signup
- User sign in (using JWT)
- Post tweet
- Reply to tweet
- Follow other users
- View own timeline
- Search (Tweets and Users)
- Unit Testing

# Prerequisites

- Node.JS v10+
- Package manager(npm or yarn)

# Starting the app

Note: The commands below can be used with the equivalents on yarn

- After cloning the application, `cd` into the folder and run `npm install`.
- Create a `.env` file following the format of the `.env.example` file and populate with your own values or use the values available in the `.env.example` file
- Run `npm start` to start the application

# Technologies used

The app is built on node js, using express as the framework of choice. The database used for the project is mongoDB and is accessed using the mongoose ODM.

# Thought Process

For this application, I am building a twitter clone. Basically, the features that needed to be tackled in this program were related to tweets and users of the application. I will be explaining the reasons for why I have gone for a certain implementation, the advantages and disadvantages.

## Project structure

For the project structure, I have decided to go with an MVC structure for the application as this provides a nice level of separation of concerns from the data layer, to the implementation layer and the business logic.

- models: This is where the data models are defined
- repository: This provides access for querying the database for our objects
- services: This is the business layer of the application acts as the bridge between the routes and the data layer
- routes: This is the view layer which exposes data to the end user
- config: All configurations are defined in this module. Database, Logger, Auth config, Dependency management and environment variables access

## Design Patterns

Some of the design patterns used in this application are the module pattern, middleware pattern, dependency injection.

### Dependency Injection

For managing the services and repositories, dependency injection was favoured over the usual module pattern `(require)`.
The advantages of using this was to reduce tight coupling in the system and also enable easier unit testing as new implementations can be used without too much hassle
The major disadvantage comes from the fact that we are now tied to the dependency injection framework used `(awilix)`, as the DIcontainer file is now implementing the `middleware` pattern and is highly couples to other parts of the code

The first problem encountered on the app was finding a way to relate followers/following to a user

### Module pattern

This is very much baked into the nodejs system and is the building block for the application. Basically, this is something that I couldn't do without as it is the primary method of handling components in the framework.
Advantages: Helps expose needed functionality from different modules, and to a certain degree acts as an encapsulating tool for the project
Disadvantages: Hardcoded dependencies

### Middleware Pattern

Used in the DIcontainer.js file to add all the dependencies to a container and expose to the needed packages
Advantages: Duplicated logic now located in one place
Disadvantage: Tight coupling to packages where it's being referenced

## Schema Design

### Users

Based on the requirements for the application, the user needs to have a username and password for login into the app. This is provided in the User model.
The user also should be able to follow and be followed by other users. The choice was made to add a reference array for the followers and following list for the users. This way, each user can get access to both lists and have an easier way querying the needed things between both lists.
A disadvantage of using this design lies in the fact that the following and followers array can grow so large it starts affecting the database performance.

### Tweets

Consisting of message, createdAt and replies. The replies list is a reference to other Tweets that are posted to reply to a tweet.
Major reson for this was to provide quick query access to a Tweets replies.

### Real time timeline updates

For the realtime updates, I have decided to use socket.io to create a connection with the clients via web sockets, long polling etc, to broadcast any newly posted tweet to the users followers. The updates can be received on the client side by listening for the logged in user's userId for messages. The following snippet is an example of what can be done on the client side

```var socket = io("http://localhost:3000");
socket.on(userId, tweet => {
    // Use tweet message in any way you'd like
    alert(tweet.message);
});
```

# Continous Integration

I used circle CI as my continous integration tool

# Other considerations and caveats

- Ideally, I would have loved to use an in-memory database as a cache to manage some of the load on the database and increase speed of the app when it grows.
- Sharding would be nice to implement so the database load can be distributed for Users and tweets
- Test driven development was not a primary focus while building this application due to time constraints
- Refresh token should be implemented for jwt authorization
- Use cluster module to increase application performance
