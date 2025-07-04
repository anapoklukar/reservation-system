# Reservation System

A full-stack reservation system built with a React frontend and Spring Boot backend. This application allows users to view, create, edit, and delete reservations across multiple resources in a weekly calendar view.

## Features

* 📅 Weekly calendar view
* 🏢 Multiple resource management
* ✏️ Create, edit, and delete reservations
* 🎨 Color-coded resources for easy identification
* 🔍 Resource visibility toggle in sidebar
* ⏰ Time-based grid with hourly slots

## Project Structure

```
reservation-system/
├── frontend/                 # React application
└── backend/                  # Spring Boot application
```

## Prerequisites

* **Node.js** (18)
* **npm** (10)
* **Java** (21)
* **Gradle** (8.14)
* **Docker** (20.10)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/anapoklukar/reservation-system.git
cd reservation-system
```

### 2. Database Setup

You can run PostgreSQL using Docker:

```bash
docker run --name reservation-system \
  -e POSTGRES_USER=yourusername \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=reservation-system \
  -p 5432:5432 \
  -d postgres:15
```

You can customize the credentials.

### 3. Backend Setup

#### Run the Backend

```bash
cd backend
DB_USERNAME=yourusername DB_PASSWORD=yourpassword ./gradlew clean bootRun
```

The backend runs on `http://localhost:8080`.

### 4. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000`.

## Testing

### Backend Test

Run the integration test:
```bash
cd backend
DB_USERNAME=yourusername DB_PASSWORD=yourpassword ./gradlew test
```

## API Endpoints

### **Reservations**

| Method | Endpoint                    | Description                              |
| ------ | --------------------------- | ---------------------------------------- |
| GET    | `/api/reservations`         | Get all reservations                     |
| GET    | `/api/reservations/{id}`    | Get reservation by ID                    |
| GET    | `/api/reservations/grouped` | Get reservations grouped by day     |
| GET    | `/api/reservations/range`   | Get reservations within a datetime range |
| POST   | `/api/reservations`         | Create a reservation                     |
| PUT    | `/api/reservations/{id}`    | Update a reservation                     |
| DELETE | `/api/reservations/{id}`    | Delete a reservation                     |

### **Resources**

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/resources`      | Get all resources  |
| GET    | `/api/resources/{id}` | Get resource by ID |
| POST   | `/api/resources`      | Create a resource  |
| PUT    | `/api/resources/{id}` | Update a resource  |
| DELETE | `/api/resources/{id}` | Delete a resource  |