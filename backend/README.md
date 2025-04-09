# Holiday Planner Backend

This is the backend service for the Holiday Planner application. It provides RESTful APIs for managing trips, user authentication, and other related functionalities.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
backend/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── test/          # Test files
├── .env           # Environment variables (not in git)
├── .gitignore     # Git ignore file
├── package.json   # Project dependencies
└── server.js      # Entry point
```

## API Documentation

### Authentication

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/login
Login user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Trips

#### GET /api/trips
Get all trips for the authenticated user.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "trips": [
    {
      "id": "trip_id",
      "title": "Trip Title",
      "description": "Trip Description",
      "startDate": "2024-04-01",
      "endDate": "2024-04-07",
      "destination": "Destination",
      "status": "planned"
    }
  ]
}
```

#### POST /api/trips
Create a new trip.

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "title": "Trip Title",
  "description": "Trip Description",
  "startDate": "2024-04-01",
  "endDate": "2024-04-07",
  "destination": "Destination"
}
```

**Response:**
```json
{
  "trip": {
    "id": "trip_id",
    "title": "Trip Title",
    "description": "Trip Description",
    "startDate": "2024-04-01",
    "endDate": "2024-04-07",
    "destination": "Destination",
    "status": "planned"
  }
}
```

## Testing

Run the test suite:
```bash
npm test
```

The tests use:
- Mocha as the test framework
- Chai for assertions
- Sinon for mocking and stubbing

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run tests
4. Submit a pull request

## License

This project is licensed under the MIT License. 