from datetime import datetime, timezone


SECTION_MAP = {
    "access": {
        "section": "Section 11",
        "title": "Right to Access Information",
        "description": "right to obtain information about your personal data being processed",
        "steps": [
            "Compile a summary of all personal data held pertaining to the Data Principal",
            "Document all processing activities undertaken with the Data Principal's data",
            "Identify all third parties with whom the data has been shared",
            "Prepare the information summary in a clear, accessible format",
            "Deliver the summary to the Data Principal within the prescribed timeline",
        ],
    },
    "correction": {
        "section": "Section 12",
        "title": "Right to Correction and Erasure",
        "description": "right to correction of inaccurate or misleading personal data",
        "steps": [
            "Identify all instances of the personal data requiring correction across our systems",
            "Verify the correction details provided by the Data Principal",
            "Update the personal data in all relevant databases and systems",
            "Notify any third parties to whom the data was disclosed of the correction",
            "Confirm completion of the correction to the Data Principal",
        ],
    },
    "erasure": {
        "section": "Section 12",
        "title": "Right to Correction and Erasure",
        "description": "right to erasure of personal data no longer necessary for the stated purpose",
        "steps": [
            "Identify all instances of the Data Principal's personal data across our systems",
            "Verify that retention is no longer required for legal or regulatory compliance",
            "Securely erase the personal data from all primary databases",
            "Ensure deletion from backups within the next scheduled backup rotation",
            "Notify any third parties to whom the data was disclosed of the erasure",
            "Confirm completion of erasure to the Data Principal",
        ],
    },
    "nomination": {
        "section": "Section 14",
        "title": "Right to Nominate",
        "description": "right to nominate another individual to exercise rights in the event of death or incapacity",
        "steps": [
            "Record the nomination details including the nominee's identity and contact information",
            "Verify the identity of both the Data Principal and the nominee",
            "Register the nomination in our Data Principal rights management system",
            "Provide confirmation of the nomination registration to the Data Principal",
            "Ensure the nominee can be contacted and verified if the nomination is invoked",
        ],
    },
}

REQUEST_TITLES = {
    "access": "Data Access Request",
    "correction": "Data Correction Request",
    "erasure": "Data Erasure Request",
    "nomination": "Nomination Registration Request",
}


def generate_dsr_response(
    organization_name: str,
    request_type: str,
    data_principal_name: str,
    data_principal_email: str,
    request_details: str,
    dpo_name: str,
    dpo_email: str,
) -> dict:
    info = SECTION_MAP[request_type]
    steps_html = "".join(f"<li>{step}</li>" for step in info["steps"])
    ref_number = f"DSR-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
    date_str = datetime.now(timezone.utc).strftime("%B %d, %Y")

    response_html = f"""
    <div class="dsr-response">
        <h1>Acknowledgment of {REQUEST_TITLES[request_type]}</h1>
        <p class="subtitle">Under {info["section"]} of the Digital Personal Data Protection Act, 2023</p>

        <table class="info-table">
            <tr><th>Reference Number</th><td>{ref_number}</td></tr>
            <tr><th>Date</th><td>{date_str}</td></tr>
            <tr><th>Organization</th><td>{organization_name}</td></tr>
            <tr><th>Request Type</th><td>{REQUEST_TITLES[request_type]}</td></tr>
        </table>

        <h2>Dear {data_principal_name},</h2>

        <p>We acknowledge receipt of your request submitted under <strong>{info["section"]}</strong>
        of the Digital Personal Data Protection Act, 2023, exercising your <strong>{info["title"]}</strong>
        — specifically, your {info["description"]}.</p>

        <h2>Request Details</h2>
        <p>{request_details}</p>
        <p>Data Principal Contact: <a href="mailto:{data_principal_email}">{data_principal_email}</a></p>

        <h2>Our Commitment</h2>
        <p>In accordance with the DPDP Act, 2023, we commit to the following timelines:</p>
        <ul>
            <li><strong>Acknowledgment:</strong> Within 48 hours of receipt (this letter serves as acknowledgment)</li>
            <li><strong>Resolution:</strong> Within 30 days from the date of this acknowledgment</li>
        </ul>

        <h2>Steps We Will Take</h2>
        <p>To fulfill your request, we will undertake the following actions:</p>
        <ol>{steps_html}</ol>

        <h2>Your Rights</h2>
        <p>Under the DPDP Act, 2023, you retain the following rights throughout this process:</p>
        <ul>
            <li>You may submit additional information relevant to this request at any time</li>
            <li>You may withdraw this request before it is fully processed</li>
            <li>If you are not satisfied with our response, you may file a complaint with
            the <strong>Data Protection Board of India</strong> as established under Section 15
            of the DPDP Act</li>
        </ul>

        <h2>Contact Information</h2>
        <p>For any queries regarding this request, please contact our Data Protection Officer:</p>
        <p><strong>{dpo_name}</strong><br>
        Email: <a href="mailto:{dpo_email}">{dpo_email}</a><br>
        Organization: {organization_name}</p>

        <div class="footer">
            <p>This acknowledgment has been generated in compliance with the Digital Personal
            Data Protection Act, 2023. Reference: {ref_number}</p>
            <p>If you are not satisfied with our grievance redressal, you may approach the
            Data Protection Board of India for resolution.</p>
        </div>
    </div>
    """

    return {
        "organization_name": organization_name,
        "request_type": request_type,
        "response_html": response_html.strip(),
        "sla_days": 30,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
