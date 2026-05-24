import csv
from io import TextIOWrapper

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Organization,
    EmissionRecord,
    DataSource,
    AuditLog
)

from .serializers import (
    OrganizationSerializer,
    EmissionRecordSerializer
)


@api_view(['GET'])
def audit_logs(request):
    logs = AuditLog.objects.all().order_by('-timestamp')

    data = [
        {
            "id": log.id,
            "action": log.action,
            "timestamp": log.timestamp,
            "emission_id": log.emission_record.id
        }
        for log in logs
    ]

    return Response(data)


@api_view(['GET'])
def organization_list(request):
    organizations = Organization.objects.all()
    serializer = OrganizationSerializer(organizations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def emission_list(request):
    emissions = EmissionRecord.objects.all()
    serializer = EmissionRecordSerializer(emissions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def upload_sap_csv(request):
    csv_file = request.FILES.get('file')

    if not csv_file:
        return Response({"error": "No file uploaded"}, status=400)

    organization = Organization.objects.first()

    datasource = DataSource.objects.create(
        organization=organization,
        source_type='SAP',
        original_filename=csv_file.name
    )

    file_data = TextIOWrapper(csv_file.file, encoding='utf-8')
    reader = csv.DictReader(file_data)

    created_records = []

    for row in reader:
        activity_value = float(row['activity_value'])
        co2e_kg = float(row['co2e_kg'])

        status = 'VALID'

        if activity_value < 0:
            status = 'FAILED'
        elif co2e_kg > 1000:
            status = 'WARNING'

        emission = EmissionRecord.objects.create(
            organization=organization,
            datasource=datasource,
            category=row['category'],
            scope=row['scope'],
            activity_value=activity_value,
            activity_unit=row['activity_unit'],
            co2e_kg=co2e_kg,
            status=status
        )

        created_records.append(emission.id)

    return Response({
        "message": "CSV uploaded successfully",
        "records_created": len(created_records)
    })


@api_view(['POST'])
def update_emission_status(request, emission_id):
    try:
        emission = EmissionRecord.objects.get(id=emission_id)

        new_status = request.data.get('status')

        emission.status = new_status
        emission.save()

        # ✅ AUDIT LOG ADDED
        AuditLog.objects.create(
            emission_record=emission,
            action=f"Status changed to {new_status}"
        )

        return Response({
            "message": "Status updated successfully"
        })

    except EmissionRecord.DoesNotExist:
        return Response({
            "error": "Emission record not found"
        }, status=404)