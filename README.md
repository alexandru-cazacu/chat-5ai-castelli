# Chatty

## Table of contents

- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
- [Deployment](#deployment)
- [Built With](#built-with)
- [License](#license)

## Screenshots

![Login Page](/screenshots/login.png)
![Chat Page](/screenshots/chat.png)

## Getting Started

This is a school project made by me and other 4 students at IIS Castelli. The client side was bootstrapped with Create React App. The server side is made in Spring Boot.

A list of useful docs:
- [React](https://reactjs.org/docs/hello-world.html);
- [Create React App](https://github.com/facebookincubator/create-react-app);
- [Axios](https://github.com/axios/axios);
- [Spring Boot](https://spring.io/docs).

### Prerequisites

You need [`npm`](https://nodejs.org) and `MySQL` or something similar of your choice (I'm using Xampp). If you want to alse use PhpMyAdmin remember to change the port to something different from 8080 (the port used by our Tomcat configuration).

### Installing

```
git clone https://github.com/alexandru-cazacu/chatty.git
cd chatty/client-react
npm install
```

To start the live server run:

```
npm start
```

To build the project run:

```
npm run build
```

To start the server open the progect in your Java IDE as a Maven Project. After the dependencies are solved run the project.

## Deployment

```
cd client-react
npm run build
```

## Built With

- [Create React App](https://github.com/facebookincubator/create-react-app)
- [React](https://reactjs.org/docs/hello-world.html)
- [Axios](https://github.com/axios/axios)
- [Spring Boot](https://projects.spring.io/spring-boot/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
