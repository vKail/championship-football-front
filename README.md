# 🏆 Football Championship Management

Complete client-server system for football championship management, featuring a Java backend and a Next.js frontend with NextUI.

## 📋 Description

A robust platform for organizing, managing, and tracking football tournaments. The system handles everything from registration and scheduling to real-time scoring and automatic calculation of league standings, designed for high performance and scalability.

**Features:**

-   Comprehensive CRUD for Tournaments, Teams, and Players
    
-   Match scheduling and fixture generation
    
-   Real-time score updates via WebSockets (Simulated)
    
-   Automated standings and statistics calculation
    
-   User authentication and authorization (Admin/Public)
    
-   Modern and responsive frontend interface
    

## 🛠️ Technologies

-   **Backend:** Java, Spring Boot, PostgreSQL, JPA/Hibernate
    
-   **Frontend:** Next.js, NextUI, TypeScript, React Query (TanStack Query)
    

## 🚀 Installation

```
# Clone the repository (Assuming monorepo or separate repos setup)
git clone [https://github.com/vKail/championship-football.git](https://github.com/vKail/championship-football.git)
git clone [https://github.com/vKail/championship-football-front.git](https://github.com/vKail/championship-football-front.git)

# 1. Backend Setup (Java/Spring Boot)
cd championship-football
# Configure PostgreSQL settings in application.properties
./mvnw spring-boot:run

# 2. Frontend Setup (Next.js)
cd championship-football-front
npm install
# Configure API URL in .env
npm run dev

```

## 📂 Project Structure

Separated into Backend (Clean/Hexagonal Architecture) and Frontend (Feature-based):

```
championship-football/ (Backend)
├── src/main/java/
│   ├── application/
│   ├── domain/
│   └── infrastructure/

championship-football-front/ (Frontend)
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── features/

```

## 👥 Contributors

-   **Adrian Jurado** - [@vKail](https://github.com/vKail "null")
    
