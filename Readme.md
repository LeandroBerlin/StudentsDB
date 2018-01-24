# Students Database

Restful Service with Node, Express, Bootstrap and MongoDB for Devugees

![Screenshot](./screen.png?raw=true "Screenshot")

## Requirements

**You need to have Mongod Up&Running to launch the app**

You can configure your connection from **config/database.config.js**

A dump of the collection used by the app is under */database/export.js*


## Setup

1. Install dependencies

```bash
npm install
```

2. Run Server

```bash
npm start
```

You can access the project frontend at <http://localhost:3000>

## API

The api are available under /api 
i.e. <http://localhost:3000/api/students> returns all the students in db


*/api*

*/api/students* List the students

*/api/student* **POST** - create a new user

*/api/student:id* **GET** - read user

*/api/student:id* **PUT** - update user

*/api/student:delete* **DELETE** - delete user



## DISCLAIMER

![biblethump](https://git.io/biblethump) Use at your own risk! 
