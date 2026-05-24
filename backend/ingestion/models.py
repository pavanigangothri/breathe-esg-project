from django.db import models


class Organization(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class DataSource(models.Model):
    SOURCE_TYPES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    ]

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(max_length=20, choices=SOURCE_TYPES)

    original_filename = models.CharField(max_length=255)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.source_type} - {self.original_filename}"


class EmissionRecord(models.Model):
    STATUS_CHOICES = [
        ('VALID', 'VALID'),
        ('WARNING', 'WARNING'),
        ('FAILED', 'FAILED'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    ]

    SCOPE_CHOICES = [
        ('SCOPE_1', 'SCOPE_1'),
        ('SCOPE_2', 'SCOPE_2'),
        ('SCOPE_3', 'SCOPE_3'),
    ]

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    datasource = models.ForeignKey(DataSource, on_delete=models.CASCADE)

    category = models.CharField(max_length=100)
    scope = models.CharField(max_length=20, choices=SCOPE_CHOICES)

    activity_value = models.FloatField()
    activity_unit = models.CharField(max_length=50)
    co2e_kg = models.FloatField()

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='VALID')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category} - {self.co2e_kg} kg CO2e"


class AuditLog(models.Model):
    emission_record = models.ForeignKey(
        "EmissionRecord",
        on_delete=models.CASCADE
    )

    action = models.CharField(max_length=255)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.action