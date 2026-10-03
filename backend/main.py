from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import (
    BreachReportRequest,
    BreachReportResponse,
    ComplianceQuestion,
    ComplianceScoreRequest,
    ComplianceScoreResponse,
    ConsentNoticeRequest,
    ConsentNoticeResponse,
    DPARequest,
    DPAResponse,
    PrivacyPolicyRequest,
    PrivacyPolicyResponse,
)
from generators.privacy_policy import generate_privacy_policy
from generators.consent_notice import generate_consent_notice
from generators.breach_report import generate_breach_report
from generators.compliance_score import calculate_score, get_questions
from generators.dpa_generator import generate_dpa
from services.ai_service import enhance_with_ai

app = FastAPI(
    title="DoAide DPDP API",
    description="India's DPDP Act compliance toolkit API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "DoAide DPDP API"}


@app.post("/api/v1/privacy-policy/generate", response_model=PrivacyPolicyResponse)
async def generate_privacy_policy_endpoint(request: PrivacyPolicyRequest):
    result = generate_privacy_policy(
        business_name=request.business_name,
        business_type=request.business_type.value,
        data_categories=request.data_categories,
        processing_purposes=request.processing_purposes,
        has_children_data=request.has_children_data,
        transfers_data_abroad=request.transfers_data_abroad,
        contact_email=request.contact_email,
    )

    if request.use_ai:
        ai_result = await enhance_with_ai(
            prompt=f"Enhance this privacy policy for a {request.business_type.value} business called {request.business_name}. Add industry-specific clauses.",
            system_prompt="You are a DPDP Act compliance expert. Provide additional privacy policy clauses specific to the business type.",
        )
        if ai_result:
            result["policy_html"] += f"\n<div class='ai-enhanced'><h2>AI-Enhanced Recommendations</h2>{ai_result}</div>"
            result["ai_enhanced"] = True

    return result


@app.post("/api/v1/consent-notice/generate", response_model=ConsentNoticeResponse)
async def generate_consent_notice_endpoint(request: ConsentNoticeRequest):
    return generate_consent_notice(
        organization_name=request.organization_name,
        data_categories=request.data_categories,
        processing_purposes=request.processing_purposes,
        retention_period=request.retention_period,
        has_withdrawal_option=request.has_withdrawal_option,
    )


@app.post("/api/v1/breach-report/generate", response_model=BreachReportResponse)
async def generate_breach_report_endpoint(request: BreachReportRequest):
    return generate_breach_report(
        organization_name=request.organization_name,
        breach_date=request.breach_date,
        discovery_date=request.discovery_date,
        data_affected=request.data_affected,
        individuals_affected=request.individuals_affected,
        breach_description=request.breach_description,
        remedial_actions=request.remedial_actions,
    )


@app.get("/api/v1/compliance-score/questions", response_model=list[ComplianceQuestion])
async def get_compliance_questions():
    return get_questions()


@app.post("/api/v1/compliance-score/calculate", response_model=ComplianceScoreResponse)
async def calculate_compliance_score(request: ComplianceScoreRequest):
    return calculate_score(request.answers)


@app.post("/api/v1/dpa/generate", response_model=DPAResponse)
async def generate_dpa_endpoint(request: DPARequest):
    return generate_dpa(
        controller_name=request.controller_name,
        processor_name=request.processor_name,
        processing_description=request.processing_description,
        data_categories=request.data_categories,
        security_measures=request.security_measures,
        sub_processors=request.sub_processors,
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="172.18.0.1", port=3046)
