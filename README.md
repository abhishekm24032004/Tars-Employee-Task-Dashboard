# Employee Task Dashboard

> Developed for **TARS Technologies Internship Assessment**.

A responsive, professional Employee Task Dashboard built with React (JavaScript only). Manage tasks with full CRUD operations, search and filter, dark mode, toast notifications, live API integration, and a premium SaaS-style glassmorphism UI.

---

## Project Overview

The **Employee Task Dashboard** lets users view, create, edit, delete, and complete tasks. It provides a dashboard with statistics cards, progress tracking, task management, and a polished responsive interface for mobile, tablet, and desktop.

- Dark theme by default with light-mode toggle
- Persistent storage via Local Storage
- Sample tasks fetched live from the JSONPlaceholder API
- Global state managed through the Context API

---

## Features

## Features

- ✅ Authentication System (Single User Login)
- ✅ Protected Routes
- ✅ Dashboard with Clickable Statistics Cards (Total, Completed, Pending, High Priority)
- ✅ Progress Overview with Completion Tracking
- ✅ Quick Statistics and Recent/Pending Tasks Sections
- ✅ Task Management (Add, Edit, Delete, Complete)
- ✅ Task Priority and Due Date Management
- ✅ Search and Filter Functionality
- ✅ Drag and Drop Task Organization
- ✅ Dark Mode Toggle with Preference Persistence
- ✅ Toast Notifications for User Actions
- ✅ JSONPlaceholder API Integration
- ✅ Context API for Global State Management
- ✅ Local Storage Data Persistence
- ✅ Fully Responsive Design (Mobile, Tablet, Desktop)
- ✅ Modern Glassmorphism UI with Smooth Animations
- ✅ Report Download Functionality
- ✅ Download Reports.
---

## Tech Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Framework    | React 18 (JavaScript, functional components) |
| Build Tool   | Vite                                |
| Routing      | React Router DOM v6                 |
| Styling      | Tailwind CSS                        |
| State        | Context API + `useLocalStorage` hook |
| Notifications| React Toastify                      |
| API          | JSONPlaceholder (`/todos`)          |
| Persistence  | Browser Local Storage               |

> No TypeScript. Everything is `.js` / `.jsx`.

---

## Installation Steps

### Prerequisites

- Node.js 18+ and npm

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd employee-task-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open the app
# Vite prints a local URL (e.g. http://localhost:5173)
```

### Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build locally
```

---

## Folder Structure

```
employee-task-dashboard/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── eslint.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx
    │   ├── TaskCard.jsx
    │   ├── TaskForm.jsx
    │   ├── FilterBar.jsx
    │   ├── StatsCard.jsx
    │   └── ThemeToggle.jsx
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Tasks.jsx
    │   ├── AddTask.jsx
    │   └── EditTask.jsx
    ├── context/
    │   ├── TaskContext.js
    │   └── ThemeContext.js
    ├── hooks/
    │   └── useLocalStorage.js
    ├── services/
    │   └── api.js
    └── utils/
        └── helpers.js
```

---

## Pages

### 1. Dashboard (`/`)
Statistics cards (Total / Completed / Pending / High Priority) — each navigates to the Tasks page with the matching filter. Also includes Progress Overview, Quick Statistics, Recent Tasks, and Pending Tasks sections. Clicking any task opens the Edit page.

### 2. Tasks (`/tasks`)
Card grid of all tasks with priority/status badges, due dates, and inline Edit / Delete / Complete actions. Includes a search bar, filter tabs, and a "Fetch Sample Tasks" button that pulls live data from JSONPlaceholder.

### 3. Add Task (`/add`)
Form with validation: Title, Description, Priority, Due Date (cannot be in the past).

### 4. Edit Task (`/edit/:id`)
Loads the selected task and allows editing all fields including status, plus a quick "Mark Complete" action.

---

## Local Storage

Tasks are saved under the `tars_tasks` key. The theme preference is saved under `tars_theme`. Data persists across page refreshes.

---

## API Integration

Sample tasks are fetched from:

```
https://jsonplaceholder.typicode.com/todos
```

Fetched tasks are normalized (mapped to the internal task shape), merged with local tasks, and shown alongside them. Loading and error states are handled in the Tasks page.

---

## Custom Hooks

- `useLocalStorage(key, initialValue)` — reads and writes JSON to `localStorage`, keeping React state in sync.

---

## Deployment

### Vercel

1. Push the repository to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

### Netlify

1. Push the repository to GitHub.
2. Create a new site at [app.netlify.com](https://app.netlify.com).
3. Build command: `npm run build`. Publish directory: `dist`.
4. (Optional) Add a `public/_redirects` file with `/* /index.html 200` for SPA routing.

---

## Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite dev server          |
| `npm run build`   | Build for production (`dist/`)     |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Run ESLint                         |

---

## Screenshots

> Add screenshots here after running the project locally.

![Dashboard](./docs/dashboard.png)
![Tasks](./docs/tasks.png)
![Add Task](./docs/add-task.png)
![Dark Mode](./docs/dark-mode.png)

---

## Internship Project Information

**Project Title:** Employee Task Dashboard
**Organization:** TARS Technologies
**Purpose:** Internship Assessment Project
**Tech:** React (JavaScript), Vite, Tailwind CSS, React Router, Context API, Local Storage, REST API

This project demonstrates practical React skills: component architecture, hooks, context-based state management, form validation, API integration, responsive design, and production readiness.

---

## License

MIT — free to use for educational and assessment purposes.
=======
# Tars-Employee-Task-Dashboard
A modern Employee Task Dashboard built with React, React Router, Context API, Tailwind CSS, and Local Storage. Developed for the TARS Technologies Internship Assessment.
https://tars-employee-task-dashboard1.netlify.app/
