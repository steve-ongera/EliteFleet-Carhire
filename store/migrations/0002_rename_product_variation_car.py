# Generated by Django 4.2.3 on 2024-10-25 16:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='variation',
            old_name='product',
            new_name='car',
        ),
    ]
