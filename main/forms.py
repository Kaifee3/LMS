from django import forms
from .models import Course, ContactMessage
from allauth.account.forms import SignupForm, LoginForm

class CourseEditForm(forms.ModelForm):
    class Meta:
        model = Course
        fields = ('title', 'description', 'thumbnail', 'featured_video', 'level', 'duration', 'category', 'requirements', 'content', 'lesson_title', 'lesson_video')


class ContactForm(forms.ModelForm):
    # Simple honeypot: hidden field; bots might fill it
    website = forms.CharField(required=False, widget=forms.HiddenInput)

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'placeholder': 'Jane Doe',
                'autocomplete': 'name',
                'maxlength': '80',
                'required': True,
                'aria_required': 'true'
            }),
            'email': forms.EmailInput(attrs={
                'placeholder': 'you@example.com',
                'autocomplete': 'email',
                'required': True,
                'aria_required': 'true'
            }),
            'phone': forms.TextInput(attrs={
                'placeholder': '+1 555 123 4567',
                'inputmode': 'tel',
                'pattern': '[+0-9()\-\s]{7,20}',
                'aria_describedby': 'phone-hint'
            }),
            'message': forms.Textarea(attrs={
                'placeholder': 'Your message...',
                'rows': 6,
                'minlength': 10,
                'maxlength': 2000,
                'required': True,
                'aria_required': 'true'
            }),
        }

    def clean_website(self):
        value = self.cleaned_data.get('website')
        if value:
            raise forms.ValidationError("Spam detected.")
        return value

    def clean_message(self):
        msg = self.cleaned_data.get('message', '')
        if msg and msg.count('http') > 3:
            raise forms.ValidationError("Too many links; please reduce them.")
        return msg


class CustomSignupForm(SignupForm):
    """Extended signup form with consistent styling, placeholders and accessibility attributes."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        field_settings = {
            'username': {
                'placeholder': 'Choose a username',
                'autocomplete': 'username'
            },
            'email': {
                'placeholder': 'you@example.com',
                'autocomplete': 'email'
            },
            'password1': {
                'placeholder': 'Create a strong password',
                'autocomplete': 'new-password'
            },
            'password2': {
                'placeholder': 'Repeat your password',
                'autocomplete': 'new-password'
            },
        }
        for name, field in self.fields.items():
            css = 'auth-input'
            if name in field_settings:
                for k, v in field_settings[name].items():
                    field.widget.attrs[k] = v
            existing = field.widget.attrs.get('class', '')
            icon_names = {'username','email','password1','password2'}
            icon_cls = 'has-icon' if name in icon_names else ''
            field.widget.attrs['class'] = f"{existing} {css} {icon_cls}".strip()
            field.widget.attrs.setdefault('aria-label', field.label)

    def save(self, request):  # keep default behavior
        return super().save(request)


class CustomLoginForm(LoginForm):
    """Login form with placeholders and unified styling classes."""

    remember = forms.BooleanField(required=False, initial=True, label='Remember me')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        mapping = {
            'login': {'placeholder': 'Email or username', 'autocomplete': 'username email'},
            'password': {'placeholder': 'Your password', 'autocomplete': 'current-password'},
        }
        for name, field in self.fields.items():
            existing = field.widget.attrs.get('class', '')
            icon_names = {'login','password'}
            icon_cls = 'has-icon' if name in icon_names else ''
            field.widget.attrs['class'] = f"{existing} auth-input {icon_cls}".strip()
            if name in mapping:
                for k, v in mapping[name].items():
                    field.widget.attrs[k] = v
            field.widget.attrs.setdefault('aria-label', field.label)
        # Autofocus login field for convenience
        if 'login' in self.fields:
            self.fields['login'].widget.attrs['autofocus'] = True

