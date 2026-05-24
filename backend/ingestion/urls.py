from django.urls import path

from .views import (
    organization_list,
    emission_list,
    upload_sap_csv,
    update_emission_status,
    audit_logs
)

urlpatterns = [
    path('organizations/', organization_list),
    path('emissions/', emission_list),
    path('upload-sap/', upload_sap_csv),

    path(
        'emissions/<int:emission_id>/update-status/',
        update_emission_status
    ),

    # ✅ NEW: Audit logs API
    path('audit-logs/', audit_logs),
]