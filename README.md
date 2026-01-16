# Task Management App

## Requirements

* **Docker Engine**

Install dependencies and start the app using Docker:

```bash
docker compose up --build -d
```

---

## Browser URL

Once the servers are running, you can access the app in your browser:

* **App:** `http://localhost:5174/`

---

## Project Structure

```
project-root/
│
├── project/                # Django backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── app_name/           # Django apps
│   │   ├── models.py
│   │   ├── views.py
│   │   └── serializers.py
│   ├── core/               # Core utilities
│   │   ├── pagination.py
    │   └── response.py
    │
    ├──  frontend/               # React frontend
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── src/
    │   │   ├── components/
    │   │   ├── helpers/
    │   │   ├── router/
    │   │   ├── store/
    │   │   ├── pages/
    │   │   └── App.jsx
    │   └── ...
```

---
