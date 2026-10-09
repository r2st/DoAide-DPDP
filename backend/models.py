from enum import Enum
from pydantic import BaseModel, Field


class BusinessType(str, Enum):
    ECOMMERCE = "ecommerce"
    HEALTHCARE = "healthcare"
    FINTECH = "fintech"
    EDTECH = "edtech"
    SAAS = "saas"
    SOCIAL_MEDIA = "social_media"
    LOGISTICS = "logistics"
    RETAIL = "retail"
    TELECOM = "telecom"
    OTHER = "other"


class PrivacyPolicyRequest(BaseModel):
    business_name: str = Field(min_length=1, max_length=200)
    business_type: BusinessType
    data_categories: list[str] = Field(min_length=1)
    processing_purposes: list[str] = Field(min_length=1)
    has_children_data: bool = False
    transfers_data_abroad: bool = False
    contact_email: str = Field(min_length=5)
    use_ai: bool = False


class PrivacyPolicyResponse(BaseModel):
    business_name: str
    policy_html: str
    sections: list[str]
    generated_at: str
    ai_enhanced: bool = False


class ConsentNoticeRequest(BaseModel):
    organization_name: str = Field(min_length=1, max_length=200)
    data_categories: list[str] = Field(min_length=1)
    processing_purposes: list[str] = Field(min_length=1)
    retention_period: str = Field(min_length=1)
    has_withdrawal_option: bool = True


class ConsentNoticeResponse(BaseModel):
    organization_name: str
    notice_html: str
    generated_at: str


class BreachReportRequest(BaseModel):
    organization_name: str = Field(min_length=1, max_length=200)
    breach_date: str
    discovery_date: str
    data_affected: list[str] = Field(min_length=1)
    individuals_affected: int = Field(ge=1)
    breach_description: str = Field(min_length=10)
    remedial_actions: str = Field(min_length=10)


class BreachReportResponse(BaseModel):
    organization_name: str
    report_html: str
    severity: str
    generated_at: str


class ComplianceScoreRequest(BaseModel):
    answers: dict[str, int]


class ComplianceQuestion(BaseModel):
    id: str
    question: str
    category: str
    options: list[dict]


class ComplianceScoreResponse(BaseModel):
    score: int
    category: str
    breakdown: dict[str, dict]
    recommendations: list[str]


class RequestType(str, Enum):
    ACCESS = "access"
    CORRECTION = "correction"
    ERASURE = "erasure"
    NOMINATION = "nomination"


class DSRRequest(BaseModel):
    organization_name: str = Field(min_length=1, max_length=200)
    request_type: RequestType
    data_principal_name: str = Field(min_length=1, max_length=200)
    data_principal_email: str = Field(min_length=5)
    request_details: str = Field(min_length=10)
    dpo_name: str = Field(min_length=1, max_length=200)
    dpo_email: str = Field(min_length=5)


class DSRResponse(BaseModel):
    organization_name: str
    request_type: str
    response_html: str
    sla_days: int
    generated_at: str


class ConsentWidgetRequest(BaseModel):
    organization_name: str = Field(min_length=1, max_length=200)
    data_categories: list[str] = Field(min_length=1)
    processing_purposes: list[str] = Field(min_length=1)
    privacy_policy_url: str = Field(min_length=5)
    theme: str = Field(default="dark", pattern=r"^(light|dark)$")
    position: str = Field(default="bottom", pattern=r"^(bottom|center|top)$")
    language: str = Field(default="en", pattern=r"^(en|hi)$")


class ConsentWidgetResponse(BaseModel):
    organization_name: str
    widget_html: str
    embed_script: str
    generated_at: str


class DPARequest(BaseModel):
    controller_name: str = Field(min_length=1, max_length=200)
    processor_name: str = Field(min_length=1, max_length=200)
    processing_description: str = Field(min_length=10)
    data_categories: list[str] = Field(min_length=1)
    security_measures: list[str] = Field(min_length=1)
    sub_processors: list[str] = Field(default_factory=list)


class DPAResponse(BaseModel):
    controller_name: str
    processor_name: str
    agreement_html: str
    generated_at: str
