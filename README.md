# playwright-multiuser-e2e-tests
This is a test project to see if we can do multi-user e2e testing in playwright


## Server

A graphql server with three mutations and one query:

* mutation login(username, password)
* mutation logout()
* mutation loggedInUsers()

Runs on [http://localhost:4001](http://localhost:4001)

Running:

```
$ cd server
$ npm run dev
```

There are two hard-coded users:

| Username | Password | 
| ---------|----------|
| user1    | pass     |
| user2    | pass     |


## Client

A React Native front-end to the graphql server, which allows a user to:
* Log in
* List logged in users
* Log out

Running:

```
$ cd client
$ expo run web
```