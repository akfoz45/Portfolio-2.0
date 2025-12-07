# 🌐 Akif Özdemir | Software Developer Portfolio
This repository contains the source code for my personal portfolio website, designed to showcase my software development skills and projects.

## ✨ Key Features

* **⚡ Performance Focused: Integrates django-imagekit (using ImageSpecField) to automatically optimize project images into fast-loading thumbnails, significantly boosting mobile and desktop page speed.

* **🎨 Modern Interface (Dark Mode): A minimalist and fully responsive UI built with Tailwind CSS, emphasizing readability and a sleek dark aesthetic.

* **🧩 Hybrid Skill Display: The skills section dynamically supports both FontAwesome icon classes and external image URLs for technology logos, ensuring visual consistency.

* **⚙️ Secure Communication: The contact form uses AJAX requests secured with CSRF Token validation to ensure safe and non-blocking message submission.

* **📐 Modular Design: All portfolio components (Projects, Education, Experience) are database-driven and their display order can be precisely controlled using a manual order field.

* **🎬 Sequential Animation: The Hero section elements load sequentially with calculated CSS animation delays, providing a smooth and engaging welcome experience.

## 🛠️ Technologies & Tools

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![FontAwesome](https://img.shields.io/badge/FontAwesome-528DD7?style=flat&logo=fontawesome&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF677D?style=flat)

---

| Category            | Technology                                  | Purpose                                                         |
|---------------------|----------------------------------------------|-----------------------------------------------------------------|
| Backend Framework   | Python, Django 5.x                           | MVT architecture for backend logic.                             |
| Frontend Styling    | Tailwind CSS                                 | Rapid and responsive UI development.                           |
| Image Processing    | Django ImageKit                              | Create optimized thumbnails automatically.                      |
| Database            | SQLite3                                      | Development database system.                                    |
| Security / UX       | CSRF, X-Frame-Options                        | Web security enhancements.                                      |
| Libraries           | JS, FontAwesome, SweetAlert2                 | UI icons, interactivity, custom alerts.                         |


## 🚀 Installation and Local Setup
Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/akfoz45/Portfolio-2.0.git
cd Portfolio-2.0
```
### 2. Create a Virtual Environment
```bash
python -m venv venv

# Windows
.\venv\Scripts\activate

# Mac/Linux
source venv/bin/activate
```
### 3. Install Dependencies
```bash
pip install -r requirements.txt
```
### 4. Run Migrations
Since model changes (like the ImageSpecField structure) have been made, run migrations:
```bash
python manage.py makemigrations base
python manage.py migrate
```
### 5. Create Superuser (Optional)
To access the Django Admin panel for content entry:
```bash
python manage.py createsuperuser
```
### 6. Run the Server
```bash
python manage.py runserver
```
Open your browser and visit: http://127.0.0.1:8000/

