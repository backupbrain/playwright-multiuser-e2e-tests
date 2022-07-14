# playwright-multiuser-e2e-tests
This is a test project to see if we can do multi-user e2e testing in playwright.

In particular, it seeks to test the interactien between two users, simultaneously logged in on two different browsers


## Server

A graphql server with three mutations and one query:

* mutation login(username, password)
* mutation logout()
* mutation loggedInUsers()

Runs on [http://localhost:4001](http://localhost:4001)

Running:

```bash
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

```bash
$ cd client
$ npm run web
```

Multiple browser session testing:

```bash
$ cd client
$ npm run test # --headed to display browsers

Running 3 tests using 1 worker

  ✓  [chromium] › tests/example.spec.ts:11:1 › Non-browsur tests (6ms)
  ✓  [chromium] › tests/example.spec.ts:16:3 › Browser tests › Single log i (2s)
  ✓  [chromium] › tests/example.spec.ts:27:3 › Browser tests › Logins from  (5s)


  3 passed (8s)
```

To show the browsers:

```bash
$ npm run test:headed
```