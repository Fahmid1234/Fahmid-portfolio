from django.core.mail import send_mail
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json

from .models import Contact

@csrf_exempt
@require_POST
def contact_form(request):
    """Handle contact form submissions via AJAX."""
    try:
        data = json.loads(request.body)
        name = data.get('name', '')
        email = data.get('email', '')
        subject = data.get('subject', '')
        message = data.get('message', '')
        
        # Validate data
        if not all([name, email, subject, message]):
            return JsonResponse({'success': False, 'error': 'All fields are required'}, status=400)
        
        # Save to database
        contact = Contact.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        # Send email notification
        email_subject = f"New Contact Form Submission: {subject}"
        email_message = f"""
        You have received a new message from your website contact form.
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        """
        
        try:
            send_mail(
                email_subject,
                email_message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.EMAIL_HOST_USER or 'your-email@example.com'],
                fail_silently=False,
            )
        except Exception as e:
            # Log the error but don't fail the request
            print(f"Error sending email: {str(e)}")
        
        return JsonResponse({'success': True, 'message': 'Your message has been sent successfully!'})
    
    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500) 