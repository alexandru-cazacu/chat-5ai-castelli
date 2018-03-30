# RESTfull crud
This RESTfull crud use the JPA to interface with a database of Users. Database is not implement, so I upload a file content the DDL and DML the next time.

## Table of contents

- [GET Users](#get-users)
- [GET User](#get-user)
- [GET Search-user](#get-search-user)
- [POST New User](#post-new-user)
- [PUT Update User](#update-user)
- [DELETE User](#delete-user)

## GET Users

### Description
Return a JSON contains a list of Users

#### API call

`localhost:8080/chatty/users`

#### Body

```json
[
    {
        "id": value,
        "name": "value",
        "lastname": "value",
        "birthday": "value",
        "sex": "value",
        "mail": "value",
        "username": "value"
    }
    {
        ...
    }
]

## GET User

### Description
Return a JSON contains a only user when you pass a username;

#### API call

`localhost:8080/chatty/users/{username}`

#### Example

`localhost:8080/chatty/users/saulAquino`

#### Body

```json
[
    {
        "id": value,
        "name": "value",
        "lastname": "value",
        "birthday": "value",
        "sex": "value",
        "mail": "value",
        "username": "value"
    }
]
```

If don't exist a User with this return a Error JSON

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

## GET User

### Description
Return a JSON contains a list Users. This list is filtered according to username, name or lastname. You should pass a string to filtering the Users.

#### API call

`localhost:8080/chatty/users/{string}`

#### Example

`localhost:8080/chatty/users/sa`

#### Body

```json
[
    {
        "id": value,
        "name": "Saul",
        "lastname": "value",
        "birthday": "value",
        "sex": "value",
        "mail": "value",
        "username": "value"
    }
    {
        "id": value,
        "name": "Salice",
        "lastname": "value",
        "birthday": "value",
        "sex": "value",
        "mail": "value",
        "username": "value"
    }
    {
        ...
    }
]
```

If don't exist Users with this string return the same Error JSON in [GET User]


## POST New User

### Description
Create a new User. POST Request use a JSON body to create new User;

#### API call

`localhost:8080/chatty/users/`

#### Body

```json
[
    {
        "name": "value",
        "lastname": "value",
        "birthday": "value",
        "sex": "value",
        "mail": "value",
        "username": "value"
        "password": "value"
    }
]
```

If teh username is already taken it return a Error JSON
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

## PUT Update User

### Descrption

Modify a User if a username passed in the request. It use a JSON body to modify tha exist User.

#### API call

`localhost:8080/chatty/users/{username}`

#### Example

`localhost:8080/chatty/users/saulAquino`

#### Body

```json
[
    {
        "name": "value",
        "lastname": "value",
        "birthday": "value",
        "sex": "value",
        "mail": "value",
        "username": "value"
        "password": "value"
    }
]
```
If you modify the username but this is already taken it return a same Error JSON [POST New User]


## DELETE User

### Descrption

Delete a User if a username passed in the request.

#### API call

`localhost:8080/chatty/users/{username}`

#### Example

`localhost:8080/chatty/users/saulAquino`

#### Body

```json
[
    {
        "name": "value",
        "lastname": "value",
        "birthday": "value",
        "sex": "value",
        "mail": "value",
        "username": "value"
        "password": "value"
    }
]
```

## Still to do

Manage the rest request  users so that only the authorized users can do these reques for example: Username or password can be modifided by a user that have the same username and password


