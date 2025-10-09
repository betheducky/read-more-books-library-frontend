# 📚 ReadMoreBooksLibrary (Frontend)

## Overview
A responsive Angular web app that allows users to **search for books**, **register/login**, and **save their favorite books** to a personalized booklist. Built with Angular and connected to a Laravel backend API.

## Features
- Search for books using the integrated API
- Register, log in, and manage user sessions
- Save and view books in your account booklist
- Guest mode for trying the app before registration
- Responsive UI styled with Angular Material
- Authentication handled via Laravel Sanctum

---

## Tech Stack
- **Frontend:** Angular 17, TypeScript
- **UI Library:** Angular Material
- **State Management:** Services and localStorage
- **Backend API:** Laravel (Fly.io)
- **Auth:** Laravel Sanctum (CSRF + Session-based)

---

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/betheducky/read-more-books-library-frontend.git
cd read-more-books-library-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set environment variables
In src/environments/environment.ts:

```bash
export const environment = {
    production: false,
    baseUrl: 'https://book-search-backend.fly.dev',
    apiUrl: 'https://book-search-backend.fly.dev/api'
};
```

### 4. Start the development server
```bash
ng serve
```

Navigate to `http://localhost:4200/` or your specified local development server URL. The application will automatically reload if you change any of the source files.

---

## Deployment
Test the app live [here.](https://arenbruce.com/book-search-app/home)

---

## Roadmap (future updates and project vision)
- Validation errors on login and registration forms
- Pop-up option to sync guest booklists with logged-in user data on log-in
- Implement password reset via email

---

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
