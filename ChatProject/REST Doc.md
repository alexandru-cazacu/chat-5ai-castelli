# Documentation

## Table of contents

- [GET Users](#get-users)
- [GET / POST / PUT / DELETE User](#get-post-put-delete-user)
- [JSON Structures](#json-structures)
    - [User](#user)
    - [User already taken Error](#user-already-taken-error)
    - [User not found Error](#user-not-found-error)

# GET Users

`GET http://localhost:8080/chatty/users`

- Returns a list of [User](#user)

# GET / POST / PUT / DELETE User

`GET http://localhost:8080/chatty/users/{username}`

- Returns a [User](#user)
- Returns [User not found Error](#user-not-found-error) if no user with that Username is found

`POST http://localhost:8080/chatty/users`

- Requires a [User](#user) as body
- Returns [User Taken Error](#user-already-taken-error) if the Username is already taken

`PUT http://localhost:8080/chatty/users/{username}`

- Requires a [User](#user) as body
- Returns [User Taken Error](#user-already-taken-error) if the Username is already taken

`DELETE http://localhost:8080/chatty/users/{username}`

# JSON structures

## User

```json
[
    {
        "id": 1,
        "name": "value",
        "lastname": "value",
        "birthday": "1997-08-10",
        "sex": "Male",
        "mail": "mail@host.com",
        "username": "value",
        "password": "value"
    }
]
```

When in a request body it doesn't neet the "id" parameter.

## User already taken Error

```json
[
    {
        "timestamp": "2018-03-30T09:44:37.140+0000",
        "status": 409,
        "error": "Conflict",
        "message": "The username saulAquino is already taken. Please choose another",
        "path": "/chatty/users"
    }
]
```

## User not found Error

```json
[
    {
        "timestamp": "2018-03-30T09:16:41.901+0000",
        "status": 404,
        "error": "Not Found",
        "message": "User not found with username: saulAquino",
        "path": "/chatty/users/saulAquino"
    }
]
```

TODO Add chats, messages