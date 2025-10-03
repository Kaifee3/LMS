# Generated manually for ContactMessage model
from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_course_discount_course_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('message', models.TextField(max_length=2000)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('responded', models.BooleanField(default=False, help_text='Mark true once the inquiry has been handled.')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
