QUESTIONS = [
    {
        "id": "q1",
        "question": "Do you obtain explicit consent before collecting personal data?",
        "category": "Consent Management",
        "options": [
            {"value": 0, "label": "No consent mechanism exists"},
            {"value": 1, "label": "Implied consent only (e.g., buried in T&C)"},
            {"value": 2, "label": "Basic consent form exists but not DPDP-compliant"},
            {"value": 3, "label": "Clear, specific, informed consent with opt-in"},
        ],
    },
    {
        "id": "q2",
        "question": "Is your consent notice in clear, plain language as required by DPDP Act?",
        "category": "Consent Management",
        "options": [
            {"value": 0, "label": "No consent notice"},
            {"value": 1, "label": "Legal jargon, difficult to understand"},
            {"value": 2, "label": "Somewhat clear but could be improved"},
            {"value": 3, "label": "Clear, plain language, easily understandable"},
        ],
    },
    {
        "id": "q3",
        "question": "Can users withdraw consent easily?",
        "category": "Consent Management",
        "options": [
            {"value": 0, "label": "No withdrawal mechanism"},
            {"value": 1, "label": "Difficult process (e.g., email-only)"},
            {"value": 2, "label": "Possible but not straightforward"},
            {"value": 3, "label": "Easy one-click withdrawal available"},
        ],
    },
    {
        "id": "q4",
        "question": "Do you specify the purpose of data collection in your consent notice?",
        "category": "Consent Management",
        "options": [
            {"value": 0, "label": "No purpose specified"},
            {"value": 1, "label": "Vague or generic purposes"},
            {"value": 2, "label": "Some purposes specified"},
            {"value": 3, "label": "All purposes clearly specified and itemized"},
        ],
    },
    {
        "id": "q5",
        "question": "Can Data Principals access a summary of their personal data?",
        "category": "Data Principal Rights",
        "options": [
            {"value": 0, "label": "No access mechanism"},
            {"value": 1, "label": "Manual request process only"},
            {"value": 2, "label": "Partial self-service access"},
            {"value": 3, "label": "Full self-service dashboard with data summary"},
        ],
    },
    {
        "id": "q6",
        "question": "Can users request correction of their personal data?",
        "category": "Data Principal Rights",
        "options": [
            {"value": 0, "label": "No correction mechanism"},
            {"value": 1, "label": "Email-based correction requests"},
            {"value": 2, "label": "Form-based correction with manual processing"},
            {"value": 3, "label": "Self-service correction with immediate effect"},
        ],
    },
    {
        "id": "q7",
        "question": "Can users request erasure of their personal data?",
        "category": "Data Principal Rights",
        "options": [
            {"value": 0, "label": "No erasure mechanism"},
            {"value": 1, "label": "Request-based with no guaranteed timeline"},
            {"value": 2, "label": "Formal process with defined timeline"},
            {"value": 3, "label": "Automated erasure with confirmation"},
        ],
    },
    {
        "id": "q8",
        "question": "Do you have a nomination mechanism for Data Principals?",
        "category": "Data Principal Rights",
        "options": [
            {"value": 0, "label": "No nomination mechanism"},
            {"value": 1, "label": "Aware but not implemented"},
            {"value": 2, "label": "Basic nomination process exists"},
            {"value": 3, "label": "Full nomination mechanism as per DPDP Act"},
        ],
    },
    {
        "id": "q9",
        "question": "Have you appointed a Data Protection Officer (DPO) or equivalent?",
        "category": "Data Protection Officer",
        "options": [
            {"value": 0, "label": "No DPO appointed"},
            {"value": 1, "label": "Someone handles it part-time informally"},
            {"value": 2, "label": "Designated person but no formal appointment"},
            {"value": 3, "label": "Formally appointed DPO with published contact details"},
        ],
    },
    {
        "id": "q10",
        "question": "Do you have a grievance redressal mechanism?",
        "category": "Data Protection Officer",
        "options": [
            {"value": 0, "label": "No grievance mechanism"},
            {"value": 1, "label": "Generic customer support only"},
            {"value": 2, "label": "Dedicated email for data-related grievances"},
            {"value": 3, "label": "Formal grievance officer with SLA (acknowledge in 48hrs, resolve in 30 days)"},
        ],
    },
    {
        "id": "q11",
        "question": "Do you have a data breach response plan?",
        "category": "Data Breach Procedures",
        "options": [
            {"value": 0, "label": "No breach response plan"},
            {"value": 1, "label": "Informal understanding of what to do"},
            {"value": 2, "label": "Documented plan but not tested"},
            {"value": 3, "label": "Documented, tested, and regularly updated plan"},
        ],
    },
    {
        "id": "q12",
        "question": "Can you notify the Data Protection Board within 72 hours of a breach?",
        "category": "Data Breach Procedures",
        "options": [
            {"value": 0, "label": "No notification process exists"},
            {"value": 1, "label": "Would take more than 72 hours"},
            {"value": 2, "label": "Possible but not guaranteed"},
            {"value": 3, "label": "Yes, process and templates are ready"},
        ],
    },
    {
        "id": "q13",
        "question": "Can you notify affected Data Principals promptly after a breach?",
        "category": "Data Breach Procedures",
        "options": [
            {"value": 0, "label": "No mechanism to contact affected individuals"},
            {"value": 1, "label": "Manual process, would take significant time"},
            {"value": 2, "label": "Semi-automated notification possible"},
            {"value": 3, "label": "Automated notification system with templates ready"},
        ],
    },
    {
        "id": "q14",
        "question": "Do you process children's (under 18) personal data?",
        "category": "Children's Data",
        "options": [
            {"value": 3, "label": "No, we do not process children's data"},
            {"value": 0, "label": "Yes, without parental consent mechanisms"},
            {"value": 1, "label": "Yes, with basic age verification"},
            {"value": 2, "label": "Yes, with verifiable parental consent"},
        ],
    },
    {
        "id": "q15",
        "question": "Do you avoid tracking/behavioural monitoring of children?",
        "category": "Children's Data",
        "options": [
            {"value": 3, "label": "Not applicable (no children's data)"},
            {"value": 0, "label": "We track children's behaviour"},
            {"value": 2, "label": "Limited tracking with parental consent"},
            {"value": 3, "label": "No tracking or behavioural monitoring of children"},
        ],
    },
    {
        "id": "q16",
        "question": "Do you transfer personal data outside India?",
        "category": "Cross-Border Transfers",
        "options": [
            {"value": 3, "label": "No cross-border transfers"},
            {"value": 0, "label": "Yes, to any country without checks"},
            {"value": 1, "label": "Yes, but unsure about DPDP compliance"},
            {"value": 3, "label": "Yes, only to government-approved countries"},
        ],
    },
    {
        "id": "q17",
        "question": "Do you maintain records of cross-border data transfers?",
        "category": "Cross-Border Transfers",
        "options": [
            {"value": 3, "label": "Not applicable (no cross-border transfers)"},
            {"value": 0, "label": "No records maintained"},
            {"value": 1, "label": "Partial records"},
            {"value": 3, "label": "Complete records with legal basis documented"},
        ],
    },
    {
        "id": "q18",
        "question": "Do you have a defined data retention policy?",
        "category": "Data Retention & Processing",
        "options": [
            {"value": 0, "label": "No retention policy"},
            {"value": 1, "label": "Informal understanding, not documented"},
            {"value": 2, "label": "Documented but not consistently followed"},
            {"value": 3, "label": "Documented, enforced, and regularly reviewed"},
        ],
    },
    {
        "id": "q19",
        "question": "Do you erase personal data when it is no longer needed?",
        "category": "Data Retention & Processing",
        "options": [
            {"value": 0, "label": "Data is never deleted"},
            {"value": 1, "label": "Deleted on request only"},
            {"value": 2, "label": "Periodic cleanup but not systematic"},
            {"value": 3, "label": "Automated erasure based on retention schedule"},
        ],
    },
    {
        "id": "q20",
        "question": "Do you maintain records of data processing activities?",
        "category": "Data Retention & Processing",
        "options": [
            {"value": 0, "label": "No records maintained"},
            {"value": 1, "label": "Basic spreadsheet or informal tracking"},
            {"value": 2, "label": "Documented but incomplete"},
            {"value": 3, "label": "Comprehensive, up-to-date processing records"},
        ],
    },
]

CATEGORIES = [
    "Consent Management",
    "Data Principal Rights",
    "Data Protection Officer",
    "Data Breach Procedures",
    "Children's Data",
    "Cross-Border Transfers",
    "Data Retention & Processing",
]


def get_questions() -> list[dict]:
    return QUESTIONS


def calculate_score(answers: dict[str, int]) -> dict:
    max_score_per_question = 3
    total_max = len(QUESTIONS) * max_score_per_question
    total_score = 0

    category_scores: dict[str, dict] = {}
    for cat in CATEGORIES:
        category_scores[cat] = {"earned": 0, "max": 0, "percentage": 0}

    for q in QUESTIONS:
        qid = q["id"]
        answer_value = answers.get(qid, 0)
        answer_value = max(0, min(answer_value, max_score_per_question))
        total_score += answer_value
        category_scores[q["category"]]["earned"] += answer_value
        category_scores[q["category"]]["max"] += max_score_per_question

    for cat in category_scores:
        cat_max = category_scores[cat]["max"]
        if cat_max > 0:
            category_scores[cat]["percentage"] = round(
                (category_scores[cat]["earned"] / cat_max) * 100
            )

    score_percentage = round((total_score / total_max) * 100) if total_max > 0 else 0

    if score_percentage <= 30:
        category = "Critical"
    elif score_percentage <= 50:
        category = "Needs Work"
    elif score_percentage <= 70:
        category = "Progressing"
    elif score_percentage <= 85:
        category = "Good"
    else:
        category = "Excellent"

    recommendations = _generate_recommendations(category_scores)

    return {
        "score": score_percentage,
        "category": category,
        "breakdown": category_scores,
        "recommendations": recommendations,
    }


def _generate_recommendations(category_scores: dict[str, dict]) -> list[str]:
    recommendations = []
    for cat, scores in category_scores.items():
        pct = scores["percentage"]
        if pct < 50:
            if cat == "Consent Management":
                recommendations.append(
                    "Implement a DPDP-compliant consent mechanism with clear, plain-language notices."
                )
            elif cat == "Data Principal Rights":
                recommendations.append(
                    "Set up mechanisms for data access, correction, erasure, and nomination rights."
                )
            elif cat == "Data Protection Officer":
                recommendations.append(
                    "Appoint a Data Protection Officer and establish a formal grievance redressal mechanism."
                )
            elif cat == "Data Breach Procedures":
                recommendations.append(
                    "Create and test a data breach response plan with 72-hour notification capability."
                )
            elif cat == "Children's Data":
                recommendations.append(
                    "Implement verifiable parental consent and stop behavioural monitoring of children."
                )
            elif cat == "Cross-Border Transfers":
                recommendations.append(
                    "Review cross-border data transfers and ensure compliance with Section 16 of DPDP Act."
                )
            elif cat == "Data Retention & Processing":
                recommendations.append(
                    "Establish a documented data retention policy with automated erasure schedules."
                )
    if not recommendations:
        recommendations.append(
            "Your compliance posture is strong. Continue monitoring for DPDP Act rule updates."
        )
    return recommendations
