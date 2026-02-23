# 🦊 Finfox - Personal Finance Tracker

**Finfox** is a comprehensive, AI-powered Personal Finance Tracker designed to help you manage your assets, plan budgets, analyze spending, and get intelligent financial advice. 

The application is built using a modern full-stack architecture featuring a **Java 17 (Spring Boot 3.4.0)** backend and a **Next.js 16 (React 19)** frontend, styled meticulously with **Tailwind CSS v4** and **Framer Motion**.

---

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based authentication system ensuring safe access to your financial data.
- **🤖 Financial AI Advisor**: Built-in AI module powered by **Anthropic** via Spring AI. Ask NLP-based financial queries and generate AI-driven savings reports.
- **💰 Asset & Budget Management**: Track your total assets, plan categorical budgets, and monitor your financial goals.
- **🗂️ Transaction Tracking**: Create, read, update, and delete (CRUD) your daily expense and income transactions.
- **📄 Statement Processing**: Intelligent parsing and understanding of financial statements (PDF integrations).
- **📊 Analytics & Reports**: Beautiful data visualization using **Recharts** to analyze cash flow, budgets, and historical spending.
- **📑 Document Generation**: Export transaction lists and financial reports as PDF or CSV securely.

---

## 🛠️ Technology Stack

### Backend (Java / Spring Boot)
- **Java 17** & **Spring Boot 3.4.0**
- **Spring Data MongoDB**: NoSQL database for flexible and fast data management.
- **Spring Security & JJWT**: Role-based access control and stateless authentication.
- **Spring AI (Anthropic)**: For advanced NLP and AI-generated insights.
- **Spring AI PDF Document Reader / OpenPDF**: Parsing and generating PDF financial statements.
- **OpenCSV**: CSV importing and exporting tool.
- **Swagger / OpenAPI 3**: Built-in interactive API documentation.

### Frontend (Next.js / React)
- **Next.js 16.1.6**: React framework with App Router configuration for optimized SEO and server-side rendering.
- **React 19**: Modern component building.
- **Tailwind CSS v4 & Framer Motion**: Deeply customized, responsive, and animated user interface.
- **Zustand**: Fast and scalable global state management.
- **Shadcn UI & Radix UI**: High-quality, accessible interactive UI components.
- **React Hook Form & Zod**: Robust form management and schema-based validation.
- **Recharts**: Responsive charting library for financial analytics.
- **Axios**: HTTP client for API requests.

---

## 📦 Prerequisites

Before getting started, make sure you have the following installed on your local machine:
1. **Java Development Kit (JDK) 17**
2. **Node.js 20+** & npm (or yarn/pnpm)
3. **MongoDB** (running locally on port `27017` or a cloud instance like MongoDB Atlas)
4. **Maven**
5. **Anthropic API Key** (for AI integrations)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/finfox.git
cd finfox
```

### 2. Backend Setup
Navigate to the root directory and configure the environment:

1. Spring Boot properties are located in `src/main/resources/application.yml`.
2. Ensure you have the required environment variables exported or added in your IDE configuration:
```bash
export MONGODB_URI=mongodb://localhost:27017/finfox
export ANTHROPIC_API_KEY=your_anthropic_secret_key
export JWT_SECRET=your_super_secret_jwt_key_that_is_long_enough
```
3. Run the application:
```bash
mvn spring-boot:run
```
*The backend API will start on `http://localhost:8080`.*

### 3. Frontend Setup
Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
```
Install the dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
*The frontend application will start on `http://localhost:3000`.*

---

## 🧭 Project Architecture

### Backend Modules Structure (`src/main/java/com/finfox`)
- `ai/` - AI Controller, Advisor Services, NLP Queries.
- `analytics/` - Statistical tracking and cash flow calculators.
- `asset/` - Managing fixed and liquid assets.
- `auth/` - Registration, login, security configurations, and JWT filters.
- `budget/` - Spending limits and categorizations.
- `common/` - Shared DTOs, utilities, and exception handlers.
- `report/` - PDF and CSV generator implementations.
- `statement/` - File parsing and automated transaction entry logic.
- `transaction/` - Core financial transaction management.
- `user/` - User preferences and profile details.

---

## 📚 API Documentation

Once the backend is running, you can access the Swagger UI to interact with the API endpoints:
- **Swagger Dashboard:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON:** `http://localhost:8080/v3/api-docs`

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
