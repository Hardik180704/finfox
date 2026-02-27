<h1 align="center">
  🦊 Finfox
</h1>
<p align="center">
  <strong>Comprehensive, AI-powered Personal Finance Tracker</strong>
</p>

Finfox is a personal finance tracker designed to help you manage your assets, plan budgets, analyze spending, and get intelligent financial advice leveraging Advanced AI. 

Built using a modern full-stack architecture featuring a **Java 17 (Spring Boot 3.4.0)** backend and a **Next.js 16 (React 19)** frontend, styled meticulously with **Tailwind CSS v4** and **Framer Motion**.

---

## 📑 Table of Contents
- [Features](#-key-features)
- [Technology Stack](#-technology-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation \& Setup](#installation--setup)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Key Features

1. **🔐 Secure Authentication**
   - JWT-based authentication system ensuring safe access to your financial data.
   - Secure routing on the frontend with middleware protections.

2. **🤖 Financial AI Advisor**
   - Built-in AI module powered by **Anthropic** via Spring AI.
   - Ask NLP-based financial queries and generate context-aware AI-driven savings reports.

3. **💰 Asset & Budget Management**
   - Track your total assets, plan categorical budgets, and monitor your financial goals.
   - Dynamic budget alerts when thresholds are reached.

4. **🗂️ Transaction Tracking**
   - Create, read, update, and delete (CRUD) your daily expense and income transactions.
   - Advanced filtering, sorting, and categorization mapping.

5. **📄 Statement Processing**
   - Intelligent parsing and understanding of financial statements (PDF integrations via OpenPDF and Spring AI).
   - Automated layout extraction from uploaded banking statements.

6. **📊 Analytics & Reports**
   - Beautiful data visualization using **Recharts** to analyze cash flow, budgets, and historical spending patterns.
   - Monthly trend lines and pie charts for expense distributions.

7. **📑 Document Generation**
   - Export robust transaction lists and customized financial reports dynamically as PDF or CSV securely.

---

## 🛠️ Technology Stack

### Frontend (Next.js / React)
- **Next.js 16.1.6**: React framework with App Router configuration for optimized SEO and server-side rendering.
- **React 19**: Utilizing latest React compiler features.
- **Tailwind CSS v4 & Framer Motion**: Deeply customized, responsive, and animated user interface.
- **Zustand**: Fast and scalable global client state management.
- **Shadcn UI & Radix UI**: High-quality, robust, accessible interactive UI components.
- **React Hook Form & Zod**: Robust form management and schema-based client-side validation.
- **Recharts**: Responsive charting library for financial analytics.
- **Axios**: Promised-based HTTP client for API requests.

### Backend (Java / Spring Boot)
- **Java 17 & Spring Boot 3.4.0**: High-performance backend routing and RESTful API structures.
- **Spring Data MongoDB**: NoSQL database for flexible and fast data management.
- **Spring Security & JJWT**: Role-based access control and stateless authentication.
- **Spring AI (Anthropic)**: For advanced NLP, LLM capabilities, and AI-generated insights.
- **OpenPDF**: Parsing and generating PDF financial statements.
- **OpenCSV**: CSV importing and exporting tool.
- **Swagger / OpenAPI 3**: Built-in interactive API documentation generation.

---

## 🧭 Project Architecture

### Backend Structure (`src/main/java/com/finfox`)
- `ai/` - AI Controller, Advisor Services, NLP Queries integrations.
- `analytics/` - Statistical tracking, aggregations, and cash flow calculators.
- `asset/` - Managing fixed and liquid assets logic.
- `auth/` - Registration, login, security configurations, and JWT filter implementations.
- `budget/` - Spending limits logic and related categorizations validations.
- `common/` - Shared DTOs, generalized utilities, and global exception handlers.
- `report/` - PDF and CSV generator implementations.
- `statement/` - File parsing and automated transaction entry logic via document upload.
- `transaction/` - Core financial transaction management REST API.
- `user/` - User preferences, configurations, and profile details.

### Frontend Structure (`frontend/src`)
- `app/` - Next.js App Router definitions, pages, layouts, and API routes.
- `components/` - Reusable React components (UI components like Shadcn, feature components like charts).
- `lib/` - Utility functions, API clients, and constants.
- `hooks/` - Custom React hooks for data fetching and state abstractions.
- `store/` - Zustand global state definitions and reducers.
- `styles/` - Global CSS containing Tailwind properties.
- `types/` - TypeScript interface and type declarations for payloads and entities.

---

## 🚀 Getting Started

### Prerequisites

Before getting started, make sure you have the following installed on your local machine:
- **Java Development Kit (JDK) 17**
- **Node.js 20+** & npm (or yarn/pnpm)
- **MongoDB** (running locally on port `27017` or a cloud instance like MongoDB Atlas)
- **Maven**
- **Anthropic API Key** (for AI integrations)

### Environment Variables

You must maintain environment variables to support application functionality.

**Backend (`src/main/resources/application.yml` overrides or system exports)**:
| Variable Name | Description | Default |
|---|---|---|
| `MONGODB_URI` | The connection string to your MongoDB cluster/local. | `mongodb://localhost:27017/finfox` |
| `ANTHROPIC_API_KEY` | Required to utilize the AI features (advisor, parser). | - |
| `JWT_SECRET` | Used for generating user access tokens. Must be securely generated and > 256 bits. | `verysecretkeyMustBeLongerThan...` |

**Frontend (`frontend/.env.local` or inline)**:
| Variable Name | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Spring Boot backend API. | `http://localhost:8080/api` |

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/finfox.git
   cd finfox
   ```

2. **Backend Setup**
   Ensure your environment variables are set. Then, run the application using Maven wrapper or directly:
   ```bash
   mvn spring-boot:run
   # The backend API will start on http://localhost:8080.
   ```

3. **Frontend Setup**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   # The frontend application will start on http://localhost:3000.
   ```

---

## 📚 API Documentation

Once the backend is running, you can access the Swagger UI to interactively test and view the API endpoints:
- **Swagger Dashboard:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON specification:** `http://localhost:8080/v3/api-docs`

---

## 🧪 Testing

### Backend
The backend utilizes JUnit 5 and Mockito. Execute the test suite via Maven:
```bash
mvn test
```

### Frontend
Frontend linting ensures code quality. Run the linter:
```bash
cd frontend
npm run lint
```

---

## 📦 Deployment

### Backend (Docker/JAR)
1. Package the application:
   ```bash
   mvn clean package -DskipTests
   ```
2. The executable JAR will be generated in `target/finfox-0.0.1-SNAPSHOT.jar`. Run it with standard `java -jar`.

### Frontend (Vercel/Node Platform)
1. The frontend can be easily deployed on Vercel or any Node.js environment.
2. Build the production build:
   ```bash
   cd frontend
   npm run build
   npm run start
   ```

---

## 🤝 Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License
This project is proprietary and confidential. Unauthorized copying of files, via any medium, is strictly prohibited unless stated otherwise.
