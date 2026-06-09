# Express.js JWT User Authentication API

A lightweight, secure, and robust backend REST API built using **Node.js**, **Express.js**, and **MongoDB** for managing user registration, authentication, and session handling using **JSON Web Tokens (JWT)**.

---

## 🚀 Features

*   **User Registration:** Secure registration with password hashing using `bcrypt`.
*   **User Login:** Password verification and generation of a stateless JSON Web Token (JWT) for authentication.
*   **Profile Retrieval:** A protected profile endpoint that resolves user details from a valid JWT.
*   **Auth Middleware:** JWT verification middleware that guards sensitive endpoints.
*   **Database Integration:** Seamless MongoDB connection using Mongoose ODM.

---

## 🛠️ Tech Stack

*   **Runtime:** Node.js
*   **Framework:** Express.js (v5.x)
*   **Database:** MongoDB & Mongoose
*   **Authentication:** `jsonwebtoken` (JWT) & `bcrypt` (Password Hashing)
*   **Development Tools:** `nodemon` (Auto-reload on code changes)

---

## 📂 Project Structure

```text
user/
├── controller/
│   └── addfinduser.js   # Request handlers for register, login, & find profile
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── model/
│   └── user.js          # Mongoose schema for User
├── routes/
│   └── routes.js        # Express routing configuration
├── package.json         # NPM package dependencies and scripts
└── server.js            # Main entry point & MongoDB connection
```

---

## ⚙️ Installation & Setup

### Prerequisites

*   [Node.js](https://nodejs.org/) installed (v16+ recommended).
*   [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port `27017` (or change the connection URI in `server.js`).

### Step-by-Step Guide

1.  **Clone or Navigate to the Directory:**
    ```bash
    cd "d:/all my/work-nodejs/node/user"
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Application:**
    *   **Development Mode (with auto-restart):**
        ```bash
        npx nodemon server.js
        ```
    *   **Production/Standard Mode:**
        ```bash
        node server.js
        ```

4.  The server should start running at **`http://localhost:3000`** with the console message:
    > `MongoDB connected: mongodb://localhost:27017/user`
    > `Server running on http://localhost:3000`

---

## 🔌 API Endpoints Reference

### 1. User Registration

Creates a new user account, hashes their password, and logs them in automatically.

*   **Endpoint:** `POST /user`
*   **Content-Type:** `application/json`
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response Status:** `201 Created`
*   **Response Body:**
    ```json
    {
      "user": {
        "_id": "64bf25c8...",
        "email": "user@example.com",
        "password": "$2b$10$hashedpasswordstring...",
        "__v": 0
      },
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```

---

### 2. User Login

Authenticates a user's credentials and returns a JWT.

*   **Endpoint:** `POST /login`
*   **Content-Type:** `application/json`
*   **Request Body:**
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword123"
    }
    ```
*   **Response Status:** `200 OK`
*   **Response Body:**
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```

---

### 3. Get User Profile (Protected)

Retrieves profile details of the authenticated user.

*   **Endpoint:** `GET /user`
*   **Headers:**
    *   `Authorization: Bearer <your_jwt_token_here>`
*   **Response Status:** `200 OK`
*   **Response Body:**
    ```json
    {
      "_id": "64bf25c8...",
      "email": "user@example.com",
      "password": "$2b$10$hashedpasswordstring...",
      "__v": 0
    }
    ```

---

## 🔒 Security & Configuration Warnings

> [!WARNING]
> **Production Safety:**
> *   The application's secret key `abcd` is currently hardcoded in [auth.js](file:///d:/all%20my/work-nodejs/node/user/middleware/auth.js) and [addfinduser.js](file:///d:/all%20my/work-nodejs/node/user/controller/addfinduser.js). For production environments, you **must** use a `.env` file (e.g., via the `dotenv` package) and keep your secrets outside the source code.
> *   The MongoDB connection string is hardcoded to `mongodb://localhost:27017/user`. Consider using environment variables to load target database URIs dynamically.
