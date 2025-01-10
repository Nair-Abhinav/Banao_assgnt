
# Backend Application

This backend application is built using **Node.js** and **Express.js**. It provides user authentication, password management, and session handling functionalities. It connects to a **MongoDB** database for storing user information and uses **JWT** for token-based authentication.

## Features

- User registration with hashed passwords.
- Secure login using JWT tokens.
- Logout functionality with token blacklisting.
- Forgot and reset password functionality.
- Protected routes with middleware for authentication.
- Validation for user input using `express-validator`.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

---

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd Backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the MongoDB server (ensure it's running locally or provide a cloud connection string in `MONGO_URI`).

4. Start the server:
    ```bash
    npm start
    ```

5. The server will run on `http://localhost:5000`.

---

## Folder Structure

```
Backend
├── Controllers
│   └── user.controller.js      # Handles user-related logic
├── Middlewares
│   └── authUser.middleware.js  # Middleware for authentication
├── Models
│   └── user.model.js           # Mongoose schema for users
│   └── blacklistToken.model.js # Mongoose schema for blacklisted tokens
├── Routes
│   └── user.routes.js          # Defines all API endpoints
├── Services
│   └── user.service.js         # Handles service logic for user-related tasks
├── app.js                      # Main application file
├── server.js                   # Starts the application
├── DB
│   └── db.DB.js                # MongoDB connection setup
└── README.md                   # Documentation for the backend
```

---

## Endpoints

### Public Endpoints

1. **Register User**  
   - **URL:** `/api/register`  
   - **Method:** `POST`  
   - **Body:**  
     ```json
     {
       "name": "John Doe",
       "email": "johndoe@example.com",
       "password": "password123"
     }
     ```

2. **Login User**  
   - **URL:** `/api/login`  
   - **Method:** `POST`  
   - **Body:**  
     ```json
     {
       "email": "johndoe@example.com",
       "password": "password123"
     }
     ```

3. **Forgot Password**  
   - **URL:** `/api/forgotpassword`  
   - **Method:** `POST`  
   - **Body:**  
     ```json
     {
       "email": "johndoe@example.com"
     }
     ```

4. **Reset Password**  
   - **URL:** `/api/resetpassword`  
   - **Method:** `POST`  
   - **Body:**  
     ```json
     {
       "token": "reset-token",
       "newPassword": "newPassword123"
     }
     ```

---

### Protected Endpoints

(All protected endpoints require the `Authorization` header with a valid JWT token.)

1. **Get User Profile**  
   - **URL:** `/api/profile`  
   - **Method:** `GET`  
   - **Headers:**  
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```

2. **Logout User**  
   - **URL:** `/api/logout`  
   - **Method:** `GET`

---

## Authentication Flow

1. **Registration:** User registers by providing a name, email, and password. The password is hashed before being saved to the database.
2. **Login:** User logs in with email and password. A JWT token is generated and sent back to the client.
3. **Logout:** User logs out by blacklisting the token.
4. **Forgot Password:** User requests a password reset token, which is valid for 15 minutes.
5. **Reset Password:** User submits a new password along with the reset token.

---

## Middleware

- **authUser.middleware.js:** Protects routes by verifying JWT tokens and checking if tokens are blacklisted.

---

## Dependencies

The project uses the following npm packages:

- **express:** Web framework for Node.js.
- **mongoose:** MongoDB object modeling for Node.js.
- **express-validator:** Middleware for validating request bodies.
- **jsonwebtoken:** For generating and verifying JWT tokens.
- **bcrypt:** For hashing passwords.
- **cookie-parser:** For parsing cookies.
- **dotenv:** For loading environment variables.
- **cors:** For enabling Cross-Origin Resource Sharing.

---

## Development

To run the application in development mode with hot-reloading, install **nodemon**:

```bash
npm install -g nodemon
```

Start the server:
```bash
nodemon server.js
```

---

## License

This project is licensed under the MIT License.
```

This `README.md` provides all the essential details for the backend, ensuring it's easy for anyone to understand and set up the project. Let me know if you'd like to customize any sections further!