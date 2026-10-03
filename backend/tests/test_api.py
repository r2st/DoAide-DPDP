import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

import pytest
from httpx import ASGITransport, AsyncClient

from main import app


@pytest.fixture
def anyio_backend():
    return "asyncio"


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


@pytest.mark.anyio
async def test_health_check(client):
    response = await client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "DoAide DPDP API"


@pytest.mark.anyio
async def test_generate_privacy_policy(client):
    payload = {
        "business_name": "TestCorp",
        "business_type": "ecommerce",
        "data_categories": ["name", "email", "phone"],
        "processing_purposes": ["order fulfillment", "marketing"],
        "has_children_data": False,
        "transfers_data_abroad": False,
        "contact_email": "privacy@testcorp.com",
    }
    response = await client.post("/api/v1/privacy-policy/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["business_name"] == "TestCorp"
    assert "privacy-policy" in data["policy_html"]
    assert len(data["sections"]) >= 8
    assert data["ai_enhanced"] is False


@pytest.mark.anyio
async def test_generate_privacy_policy_with_children_data(client):
    payload = {
        "business_name": "EduKids",
        "business_type": "edtech",
        "data_categories": ["name", "age", "school"],
        "processing_purposes": ["education services"],
        "has_children_data": True,
        "transfers_data_abroad": True,
        "contact_email": "privacy@edukids.com",
    }
    response = await client.post("/api/v1/privacy-policy/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "Children" in data["policy_html"]
    assert "Cross-Border" in data["policy_html"]
    assert "Children's Data" in data["sections"]
    assert "Cross-Border Data Transfers" in data["sections"]


@pytest.mark.anyio
async def test_generate_privacy_policy_invalid(client):
    payload = {
        "business_name": "",
        "business_type": "ecommerce",
        "data_categories": [],
        "processing_purposes": ["test"],
        "contact_email": "a@b.c",
    }
    response = await client.post("/api/v1/privacy-policy/generate", json=payload)
    assert response.status_code == 422


@pytest.mark.anyio
async def test_generate_consent_notice(client):
    payload = {
        "organization_name": "DataOrg",
        "data_categories": ["email", "location"],
        "processing_purposes": ["analytics", "personalization"],
        "retention_period": "2 years",
        "has_withdrawal_option": True,
    }
    response = await client.post("/api/v1/consent-notice/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["organization_name"] == "DataOrg"
    assert "consent-notice" in data["notice_html"]
    assert "Withdrawal" in data["notice_html"]


@pytest.mark.anyio
async def test_generate_consent_notice_no_withdrawal(client):
    payload = {
        "organization_name": "BasicOrg",
        "data_categories": ["email"],
        "processing_purposes": ["communication"],
        "retention_period": "1 year",
        "has_withdrawal_option": False,
    }
    response = await client.post("/api/v1/consent-notice/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "Withdrawal of Consent" not in data["notice_html"]


@pytest.mark.anyio
async def test_generate_breach_report(client):
    payload = {
        "organization_name": "SecureCorp",
        "breach_date": "2026-10-01",
        "discovery_date": "2026-10-02",
        "data_affected": ["email addresses", "phone numbers"],
        "individuals_affected": 500,
        "breach_description": "Unauthorized access to customer database via SQL injection",
        "remedial_actions": "Patched vulnerability, reset affected credentials, engaged forensics team",
    }
    response = await client.post("/api/v1/breach-report/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["organization_name"] == "SecureCorp"
    assert data["severity"] == "Low"
    assert "breach-report" in data["report_html"]


@pytest.mark.anyio
async def test_generate_breach_report_high_severity(client):
    payload = {
        "organization_name": "FinCorp",
        "breach_date": "2026-10-01",
        "discovery_date": "2026-10-01",
        "data_affected": ["financial data", "aadhaar"],
        "individuals_affected": 50000,
        "breach_description": "Massive data exfiltration including Aadhaar numbers and bank details",
        "remedial_actions": "Shut down affected systems, notified CERT-In, engaged incident response",
    }
    response = await client.post("/api/v1/breach-report/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["severity"] == "High"


@pytest.mark.anyio
async def test_get_compliance_questions(client):
    response = await client.get("/api/v1/compliance-score/questions")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 20
    assert all("id" in q and "question" in q and "category" in q for q in data)


@pytest.mark.anyio
async def test_calculate_compliance_score_critical(client):
    answers = {f"q{i}": 0 for i in range(1, 21)}
    response = await client.post("/api/v1/compliance-score/calculate", json={"answers": answers})
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 0
    assert data["category"] == "Critical"
    assert len(data["recommendations"]) > 0


@pytest.mark.anyio
async def test_calculate_compliance_score_excellent(client):
    answers = {f"q{i}": 3 for i in range(1, 21)}
    response = await client.post("/api/v1/compliance-score/calculate", json={"answers": answers})
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 100
    assert data["category"] == "Excellent"


@pytest.mark.anyio
async def test_calculate_compliance_score_mid_range(client):
    answers = {f"q{i}": 1 for i in range(1, 11)}
    answers.update({f"q{i}": 2 for i in range(11, 21)})
    response = await client.post("/api/v1/compliance-score/calculate", json={"answers": answers})
    assert response.status_code == 200
    data = response.json()
    assert 30 < data["score"] < 70
    assert data["category"] in ["Needs Work", "Progressing"]


@pytest.mark.anyio
async def test_calculate_compliance_score_empty(client):
    response = await client.post("/api/v1/compliance-score/calculate", json={"answers": {}})
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 0
    assert data["category"] == "Critical"


@pytest.mark.anyio
async def test_generate_dpa(client):
    payload = {
        "controller_name": "DataCorp India",
        "processor_name": "CloudProcess Ltd",
        "processing_description": "Processing customer data for CRM and analytics purposes",
        "data_categories": ["customer names", "email addresses", "purchase history"],
        "security_measures": ["encryption at rest", "access controls", "audit logging"],
        "sub_processors": ["AWS India", "SendGrid"],
    }
    response = await client.post("/api/v1/dpa/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["controller_name"] == "DataCorp India"
    assert data["processor_name"] == "CloudProcess Ltd"
    assert "dpa" in data["agreement_html"]
    assert "AWS India" in data["agreement_html"]


@pytest.mark.anyio
async def test_generate_dpa_no_sub_processors(client):
    payload = {
        "controller_name": "SoloCorp",
        "processor_name": "InternalProcess",
        "processing_description": "Internal payroll data processing for employee management",
        "data_categories": ["employee names", "salaries"],
        "security_measures": ["encryption"],
    }
    response = await client.post("/api/v1/dpa/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "shall not engage any sub-processor" in data["agreement_html"]


@pytest.mark.anyio
async def test_generate_dpa_invalid(client):
    payload = {
        "controller_name": "",
        "processor_name": "Test",
        "processing_description": "Too short",
        "data_categories": [],
        "security_measures": ["encryption"],
    }
    response = await client.post("/api/v1/dpa/generate", json=payload)
    assert response.status_code == 422


@pytest.mark.anyio
async def test_breach_report_invalid_individuals(client):
    payload = {
        "organization_name": "TestOrg",
        "breach_date": "2026-10-01",
        "discovery_date": "2026-10-02",
        "data_affected": ["emails"],
        "individuals_affected": 0,
        "breach_description": "Test breach description for validation",
        "remedial_actions": "Test remedial actions taken",
    }
    response = await client.post("/api/v1/breach-report/generate", json=payload)
    assert response.status_code == 422
