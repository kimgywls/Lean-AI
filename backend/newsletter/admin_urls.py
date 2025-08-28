# newsletter/admin_urls.py
from django.urls import path
from django.contrib import admin
from django.shortcuts import redirect
from django.contrib import messages
from .models import Newsletter, EmailSubscriber
from django.core.mail import send_mass_mail
from django.utils import timezone

def send_newsletter(request, newsletter_id):
    newsletter = Newsletter.objects.get(pk=newsletter_id)
    recipients = EmailSubscriber.objects.values_list("email", flat=True)

    message = (newsletter.subject, newsletter.content, None, list(recipients))

    try:
        send_mass_mail((message,), fail_silently=False)
        newsletter.sent_at = timezone.now()
        newsletter.save()
        messages.success(request, "뉴스레터가 전송되었습니다!")
    except Exception as e:
        messages.error(request, f"전송 실패: {e}")

    return redirect(f"/admin/newsletter/newsletter/{newsletter_id}/change/")

def get_admin_urls(urls):
    def get_urls():
        custom_urls = [
            path(
                'newsletter/<int:newsletter_id>/send/',
                admin.site.admin_view(send_newsletter),
                name='send-newsletter',
            )
        ]
        return custom_urls + urls
    return get_urls()

admin_urls = get_admin_urls(admin.site.get_urls())
admin.site.get_urls = lambda: admin_urls
