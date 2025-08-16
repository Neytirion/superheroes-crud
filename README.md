Вот обновлённый вариант README.md с шагом про клонирование проекта:

```markdown
# Superheroes Database App

This is a full-stack web application for managing a superhero database. Users can create, edit, delete, and view superheroes, including uploading and managing their images.

---

## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: React, TailwindCSS
- File Uploads: Multer
- Testing: Jest

---

## Features

- CRUD operations for superheroes
- Upload and remove logo and album images
- Ability to view photos from an album by clicking on one of them
- Field validation (nickname and real name, max 50 characters)
- List all superheroes with pagination (5 items per page)
- View details of a superhero with all information and images
- Unit tests for main utility functions
- Async handler middleware for proper async error handling

---

## Project Structure

```

backend/      # Express backend
frontend/     # React frontend
uploads/      # Uploaded images



---

### Getting Started

1. Clone the project

```bash
git clone <repository-url>
cd super-heroes
```


---

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following:

```
MONGO_URI=<your MongoDB connection string>
PORT=5000
```

4. Start the backend server:

```bash
npm run dev
```

The backend will run at: [http://localhost:5000](http://localhost:5000)

---

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend:

```bash
npm start
```

The frontend will run at: [http://localhost:5173](http://localhost:5173)

---

## Running Tests

To run unit tests for backend utilities:

```bash
cd backend
npm test
```

Tests cover main logic and file utilities.

---

## Assumptions

* Maximum 5 images per superhero
* Maximum 50 characters for nickname and real name
* Only JPEG and PNG files are allowed for upload
* Images are stored locally in `uploads/`
* Pagination shows 5 superheroes per page

