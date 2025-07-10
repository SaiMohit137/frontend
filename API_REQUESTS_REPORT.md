# Frontend API Requests Report

## Overview
This report summarizes how and where the frontend of your project sends API requests to the backend. It includes the files involved, example code snippets, and details on how the API base URL is configured.

---

## 1. API Request Handling
- The frontend uses the `fetch` API to send requests to the backend.
- The base URL for all API requests is set using the environment variable `VITE_API_URL`.
- This variable is accessed in code as `import.meta.env.VITE_API_URL`.

---

## 2. Files Making API Requests
The following files in `frontend/src/pages/` make API requests:

- `ViewProfile.tsx`
- `ThreadsPage.tsx`
- `SignupPage.tsx`
- `PreviousYearQuestionPaper.tsx`
- `NotesPage.tsx`
- `LoginPage.tsx`
- `JobsPage.tsx`
- `EditProfile.tsx`

---

## 3. Example Code Snippets

**Setting the API base URL:**
```ts
const API_URL = import.meta.env.VITE_API_URL;
```

**Making a request:**
```ts
fetch(`${API_URL}/users/${username}`)
```

**Other endpoints used:**
- `/threads`
- `/signup`
- `/question-papers`
- `/notes`
- `/login`
- `/jobs`

---

## 4. How the Base URL is Set
- The base URL is determined by the environment variable `VITE_API_URL`.
- You can set this variable in a `.env` file at the root of your `frontend/` directory, for example:

```
VITE_API_URL=https://your-backend-url.com
```

- Alternatively, set it in your deployment environment settings.

---

## 5. Changing the Backend URL
To change which backend your frontend communicates with, update the value of `VITE_API_URL` in your environment.

---

## 6. Summary
- All API requests are routed through the base URL set by `VITE_API_URL`.
- Requests are made using the `fetch` API in the main page components.
- Update your environment variable to change the backend target.

---

*Generated automatically.* 