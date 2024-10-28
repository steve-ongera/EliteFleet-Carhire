from django.shortcuts import render, redirect
from store.models import Cars
from store.forms import ContactForm

def home(request):
    products = Cars.objects.all().filter(is_available=True)

    context = {
        'products': products,
    }
    return render(request, 'home.html', context)

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()  # Save the form data to the database
            return redirect('home')  # Redirect after successful submission
    else:
        form = ContactForm()
    return render(request, 'contact.html')
