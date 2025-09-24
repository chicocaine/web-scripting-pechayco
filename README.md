# Lab Activity 2

This repository contains a **Laravel** backend and a **Next.js** frontend. Follow the instructions below to run the project locally.

## Prerequisites

Make sure you have the following installed:

- PHP >= 8.x
- Composer
- Node.js >= 18.x
- npm or yarn
- MySQL (or another supported database)
- Git (optional)

---

## 1. Setup Backend (Laravel)

1. **Navigate to the backend folder:**

```bash
cd backend
```

2. **Install dependencies:**
```bash
composer install
```

3. **Copy the .env file and configure it:**
```bash
cp .env.example .env
```
Edit the `.env` file and update your database credentials:

4. **Run database migrations:**
```bash
php artisan migrate
```

5. **Start the Laravel development server:**
```bash
php artisan serve
```

---

## 2. Setup Frontend (Next.js)

1. **Navigate to the frontend folder:**
```bash
cd ../frontend
```
2. **Install dependencies:**
```bash
npm install
# or
yarn install
```
3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```
The frontend should now be running at http://localhost:3000 by default.