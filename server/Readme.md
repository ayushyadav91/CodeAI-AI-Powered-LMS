# AI Power LMS Server

## Overview

AI Power LMS is a comprehensive Learning Management System built with Node.js, Express.js, and MongoDB. It provides a robust backend for managing courses, users, enrollments, and progress tracking.

## Features

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- CORS
- Cookie Parser
- Express Validator
- 

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   cd server
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   JWT_EXPIRES_IN=1h
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login an existing user
- `POST /api/v1/auth/logout` - Logout the current user

### Users

- `GET /api/v1/users/me` - Get current user profile
- `PUT /api/v1/users/me` - Update current user profile
- `DELETE /api/v1/users/me` - Delete current user

### Courses

- `GET /api/v1/courses` - Get all courses
- `GET /api/v1/courses/:id` - Get a specific course
- `POST /api/v1/courses` - Create a new course (educator only)
- `PUT /api/v1/courses/:id` - Update a course (educator only)
- `DELETE /api/v1/courses/:id` - Delete a course (educator only)

### Enrollments

- `POST /api/v1/enrollments` - Enroll in a course
- `GET /api/v1/enrollments` - Get user's enrollments
- `DELETE /api/v1/enrollments/:id` - Unenroll from a course

## Database Schema

### User Model

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String, // "student" or "educator"
  photoUrl: String,
  enrollCourses: [ObjectId]
}
```

### Course Model

```javascript
{
  title: String,
  description: String,
  educator: ObjectId,
  price: Number,
  category: String,
  duration: String,
  rating: Number,
  reviews: [ObjectId]
}
```

### Review Model

```javascript
{
  user: ObjectId,
  course: ObjectId,
  rating: Number,
  comment: String
}
```

## Error Handling

The API uses a consistent error handling structure:

```javascript
{
  success: false,
  statusCode: 400,
  message: "Error message",
  error: "Error details"
}
```

## Testing

To run the tests:

```bash
npm test
```

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any questions or concerns, please contact [your-email-address].
