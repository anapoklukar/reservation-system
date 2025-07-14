# Reservation System

A full-stack reservation system built with a React frontend and Spring Boot backend. This application allows users to view, create, edit, and delete reservations across multiple resources in a weekly calendar view.

## Preview

![App Screenshot](./screenshot.png)

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

* **Node.js** (22)
* **npm** (10)
* **Java** (21)
* **Gradle** (8.14)
* **Docker** (20.10)

## Local Installation & Setup

### 1. Database Setup

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

### 2. Backend Setup

#### Run the Backend

```bash
cd backend
DB_USERNAME=yourusername DB_PASSWORD=yourpassword SPRING_PROFILES_ACTIVE=dev ./gradlew clean bootRun
```

The backend runs on `http://localhost:8080`.

### 📖 OpenAPI Documentation

After starting the backend, you can access the auto-generated API documentation at `http://localhost:8080/swagger-ui.html`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000`.

## Local Testing

### Backend Test

Run the integration test:
```bash
cd backend
DB_USERNAME=yourusername DB_PASSWORD=yourpassword SPRING_PROFILES_ACTIVE=dev ./gradlew test
```

### Frontend Test

Make sure the app is running locally (on `localhost:3000`), then run:

```bash
cd frontend
npm install
npm run test
```
