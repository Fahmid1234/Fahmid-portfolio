# Md Fahmid Bin Mostafa - Personal Portfolio

A modern, responsive personal portfolio website for Md Fahmid Bin Mostafa, a Django Backend Developer.

## Features

- Clean, minimal design with dark blue and cyan/aqua color scheme
- Fully responsive layout that works on all devices
- Smooth animations and transitions
- Interactive elements with JavaScript
- Contact form for potential clients to get in touch
- Sections for showcasing skills, services, and portfolio projects

## Technologies Used

- HTML5
- CSS3 (with CSS variables and flexbox/grid layouts)
- JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts

## Project Structure

```
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # JavaScript functionality
│   └── images/             # Image assets
└── README.md               # Project documentation
```

## Setup Instructions

1. Clone the repository
2. Open `index.html` in your browser to view the website

## Backend Integration (Future)

The contact form is currently set up to display a success message when submitted. To make it fully functional:

1. Set up a Django backend with a contact form endpoint
2. Modify the form submission in `main.js` to send data to your Django backend
3. Implement email notifications or database storage for form submissions

## Customization

- Update personal information in `index.html`
- Replace placeholder images in the `assets/images/` directory with your own
  - The website currently uses Unsplash random images as placeholders for the portfolio projects and profile picture
  - For production, download these images or replace them with your own project screenshots and profile photo
- Replace the placeholder resume file at `assets/files/Md_Fahmid_Bin_Mostafa_Resume.pdf` with your actual resume
- Modify colors in the CSS variables section of `styles.css`
- Add or remove sections as needed

## License

This project is available for personal use.

## Contact

For any questions or inquiries, please reach out through the contact form on the website.

## Contact Form Setup

The contact form uses EmailJS to send emails directly from the client-side without requiring a backend server. Follow these steps to set it up:

1. Create a free account at [EmailJS](https://www.emailjs.com/)

2. Create an Email Service:
   - Go to the EmailJS dashboard
   - Click on "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the instructions to connect your email account

3. Create an Email Template:
   - Go to "Email Templates" in the EmailJS dashboard
   - Click "Create New Template"
   - Design your email template with the following variables:
     - `{{name}}` - Sender's name
     - `{{email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message
   - Save your template

4. Update the JavaScript code:
   - Open `assets/js/main.js`
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key (found in Account > API Keys)
   - Replace `service_id` with your EmailJS service ID
   - Replace `template_id` with your EmailJS template ID

5. Test the form:
   - Fill out the contact form on your website
   - Submit the form
   - Check your email to confirm that you received the message

Now your contact form should be fully functional and send emails directly to your inbox! 