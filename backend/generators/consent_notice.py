from datetime import datetime, timezone


def generate_consent_notice(
    organization_name: str,
    data_categories: list[str],
    processing_purposes: list[str],
    retention_period: str,
    has_withdrawal_option: bool,
) -> dict:
    categories_html = "".join(f"<li>{cat}</li>" for cat in data_categories)
    purposes_html = "".join(f"<li>{p}</li>" for p in processing_purposes)

    withdrawal_section = ""
    if has_withdrawal_option:
        withdrawal_section = """
        <div class="withdrawal-section">
            <h3>Withdrawal of Consent</h3>
            <p>You have the right to withdraw your consent at any time. To withdraw consent, please
            contact us through the channels mentioned above. Please note that withdrawal of consent
            shall not affect the lawfulness of processing based on consent given before such withdrawal.</p>
        </div>
        """

    notice_html = f"""
    <div class="consent-notice">
        <h1>Consent Notice</h1>
        <p class="subtitle">Under the Digital Personal Data Protection Act, 2023</p>

        <div class="organization-info">
            <p><strong>{organization_name}</strong> ("we", "us", or "our") seeks your consent to
            collect and process your personal data as described below.</p>
        </div>

        <h2>Data We Collect</h2>
        <p>We collect the following categories of personal data:</p>
        <ul>{categories_html}</ul>

        <h2>Purpose of Collection</h2>
        <p>Your personal data will be processed for the following purposes:</p>
        <ul>{purposes_html}</ul>

        <h2>Data Retention</h2>
        <p>Your personal data will be retained for: <strong>{retention_period}</strong></p>
        <p>After this period, your data will be securely erased unless retention is required by law.</p>

        <h2>Your Rights</h2>
        <p>As a Data Principal under the DPDP Act, you have the right to:</p>
        <ul>
            <li>Access a summary of your personal data and processing activities</li>
            <li>Request correction or erasure of your personal data</li>
            <li>File a grievance with our Grievance Officer</li>
            <li>Nominate another individual to exercise your rights</li>
        </ul>

        {withdrawal_section}

        <div class="consent-action">
            <p><strong>By clicking "I Consent", you provide your free, specific, informed, and
            unambiguous consent to the collection and processing of your personal data as described
            above, in accordance with Section 6 of the DPDP Act, 2023.</strong></p>
            <div class="buttons">
                <button class="consent-btn accept">I Consent</button>
                <button class="consent-btn decline">I Do Not Consent</button>
            </div>
        </div>
    </div>
    """

    return {
        "organization_name": organization_name,
        "notice_html": notice_html.strip(),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
