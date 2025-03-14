# Django Backend for Md Fahmid Bin Mostafa's Portfolio

This is a simple Django backend for handling the contact form submissions from the portfolio website.

## Setup Instructions

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r ../requirements.txt
   ```

4. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
   Then edit the `.env` file with your actual settings.

5. Run migrations:
   ```
   python manage.py migrate
   ```

6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

## Features

- Contact form submission API endpoint
- Email notifications for new contact form submissions
- Admin interface for viewing and managing contact form submissions

## API Endpoints

- `POST /api/contact/` - Submit a contact form
  - Required fields: `name`, `email`, `subject`, `message`
  - Returns: `{"success": true, "message": "Your message has been sent successfully!"}` 