from django.db import models

# Create your models here.
class EmployeeModel(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    mobile =models.CharField(max_length=15)
    date_of_birth = models.DateField()
    image = models.ImageField(upload_to='images/')
