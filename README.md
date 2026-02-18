# MyContacts Backend 📇

MyContacts Backend is a scalable REST API built using Express.js that manages contact information with support for multiple relational databases and audit logging. The project demonstrates clean backend architecture, polyglot persistence using MySQL, MSSQL, and MongoDB, and proper separation of concerns using controllers, services, and models.

A key feature of this project is database flexibility — the same API can connect to either **MySQL or MSSQL using Sequelize ORM**. You only need to change the database type in the `.env` file, and the application will automatically start querying the selected database without any code changes.

This project is designed to showcase real-world backend development practices including database abstraction, audit tracking, migrations, and modular architecture.

---

## 🚀 Features

- Create, retrieve, update, and delete contacts (CRUD operations)
- MySQL support using Sequelize ORM
- MSSQL support using Sequelize ORM
- Dynamic database switching via environment configuration
- MongoDB integration for audit logging and activity tracking
- Database migrations using Sequelize CLI
- Audit trail capturing create, update, and delete operations
- Layered architecture (Controller → Service → Model)
- Centralized error handling middleware
- Environment-based configuration support
- RESTful API design

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- MySQL
- MSSQL
- MongoDB
- Mongoose
- Sequelize CLI (Migrations)
- JavaScript (ES6+)

---

## 📁 Project Structure

```
MYCONTACTS-BACKEND
│
├── config
│   ├── config.json
│   ├── mongo.js
│   ├── mysql.js
│   └── sequelize.js
│
├── controllers
│   ├── contactController.js
│   └── contact_controller_sequelize.js
│
├── middleware
│   └── errorHandler.js
│
├── migrations
│   └── 20260129104731-create-contacts.js
│
├── models
│   ├── mongo_models
│   │   ├── contactAuditModel.js
│   │   └── contactModel.js
│   │
│   └── mysql_models
│       ├── contact_model_sequelize.js
│       └── index.js
│
├── routes
│   └── contactRoutes.js
│
├── services
│   ├── auditService.js
│   └── contactService.js
│
├── seeders
│
├── .env
├── constants.js
├── package.json
├── server.js
└── README.md
```

---

## 🧠 Architecture Overview

This project follows a clean layered backend architecture:

### Controller Layer

- Handles incoming HTTP requests
- Validates request data
- Sends response back to client

### Service Layer

- Contains business logic
- Handles interaction between controllers and database models
- Implements audit logging functionality

### Model Layer

- Defines database schema and structure
- Uses Sequelize for relational databases (MySQL or MSSQL)
- Uses Mongoose for MongoDB

### Middleware Layer

- Centralized error handling
- Ensures consistent error responses

---

## 🗄️ Database Architecture (Polyglot Persistence)

This project uses multiple databases for different purposes:

### Relational Database (MySQL or MSSQL)

Used for storing core contact data:

- Contact name
- Email
- Phone number
- Other structured fields

Handled using Sequelize ORM.

The same models and API logic work for both MySQL and MSSQL.
To switch between them, simply change the database type in the `.env` file — no code changes required.

### MongoDB (Audit Database)

Used for storing audit logs:

- Operation type (CREATE, UPDATE, DELETE)
- Before and after data
- Timestamp of changes

Handled using Mongoose.

This separation improves scalability, flexibility, and audit traceability.

---

## 🔄 Database Switching via `.env`

To switch between MySQL and MSSQL, update your `.env` file.

### Example for MySQL

```
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mycontacts
DB_USER=root
DB_PASSWORD=your_password
```

### Example for MSSQL

```
DB_TYPE=mssql
DB_HOST=localhost
DB_PORT=1433
DB_NAME=mycontacts
DB_USER=sa
DB_PASSWORD=your_password
```

After changing the database type, restart the server.
The API will automatically connect to the selected database using Sequelize.

---

## ⚙️ Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- MySQL or MSSQL Server
- MongoDB
- npm or yarn

---

### Clone the repository

```
git clone https://github.com/Aaryamanjhatakia/mycontacts-backend.git
cd mycontacts-backend
```

---

### Install dependencies

```
npm install
```

---

### Configure environment variables

Create a `.env` file and configure relational database and MongoDB settings as shown above.

---

### Run database migrations

```
npx sequelize-cli db:migrate
```

---

### Start the server

```
npm start
```

or

```
node server.js
```

---

## 📡 API Endpoints

### Create Contact

POST `/api/contacts`

```
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

---

### Get All Contacts

GET `/api/contacts`

---

### Get Contact by ID

GET `/api/contacts/:id`

---

### Update Contact

PUT `/api/contacts/:id`

---

### Delete Contact

DELETE `/api/contacts/:id`

---

## 📊 Audit Logging

All create, update, and delete operations are automatically logged in MongoDB, including:

- Operation type
- Previous data state
- New data state
- Timestamp

This enables full activity tracking and traceability.

---

## 🎯 Purpose of the Project

This project was built to:

- Learn Express.js backend development
- Implement layered backend architecture
- Work with multiple relational databases (MySQL & MSSQL)
- Implement database abstraction using Sequelize ORM
- Use MongoDB for audit logging
- Practice scalable backend design patterns
- Understand polyglot persistence concepts

---

## 👨‍💻 Author

Aaryaman Jhatakia

GitHub: [https://github.com/Aaryamanjhatakia](https://github.com/Aaryamanjhatakia)

---
