from datetime import datetime, timezone


def generate_privacy_policy(
    business_name: str,
    business_type: str,
    data_categories: list[str],
    processing_purposes: list[str],
    has_children_data: bool,
    transfers_data_abroad: bool,
    contact_email: str,
) -> dict:
    categories_html = "".join(f"<li>{cat}</li>" for cat in data_categories)
    purposes_html = "".join(f"<li>{p}</li>" for p in processing_purposes)

    children_section = ""
    if has_children_data:
        children_section = """
        <h2>9. Children's Data</h2>
        <p>We acknowledge our obligations under the DPDP Act regarding processing of children's personal data.
        We obtain verifiable consent from the parent or lawful guardian before processing any personal data
        of a child (under 18 years of age). We do not undertake tracking, behavioural monitoring, or
        targeted advertising directed at children.</p>
        """

    cross_border_section = ""
    if transfers_data_abroad:
        cross_border_section = """
        <h2>10. Cross-Border Data Transfers</h2>
        <p>Your personal data may be transferred to and processed in countries outside India. Such transfers
        are made only to countries or territories notified by the Central Government as permissible under
        Section 16 of the DPDP Act, 2023. We ensure appropriate safeguards are in place to protect your
        data during such transfers.</p>
        """

    sections = [
        "Data Fiduciary Information",
        "Personal Data We Collect",
        "Purpose of Processing",
        "Legal Basis for Processing",
        "Consent Mechanism",
        "Data Principal Rights",
        "Data Retention",
        "Grievance Redressal",
    ]
    if has_children_data:
        sections.append("Children's Data")
    if transfers_data_abroad:
        sections.append("Cross-Border Data Transfers")
    sections.append("Updates to This Policy")

    policy_html = f"""
    <div class="privacy-policy">
        <h1>Privacy Policy</h1>
        <p class="effective-date">Effective Date: {datetime.now(timezone.utc).strftime("%B %d, %Y")}</p>

        <h2>1. Data Fiduciary Information</h2>
        <p><strong>{business_name}</strong> (hereinafter referred to as "we", "us", or "our") is the
        Data Fiduciary as defined under the Digital Personal Data Protection Act, 2023 ("DPDP Act").
        We are committed to protecting the personal data of our users ("Data Principals") in accordance
        with the DPDP Act and its rules.</p>
        <p>Business Type: {business_type.replace("_", " ").title()}</p>
        <p>Contact: <a href="mailto:{contact_email}">{contact_email}</a></p>

        <h2>2. Personal Data We Collect</h2>
        <p>We collect and process the following categories of personal data:</p>
        <ul>{categories_html}</ul>

        <h2>3. Purpose of Processing</h2>
        <p>We process your personal data for the following purposes:</p>
        <ul>{purposes_html}</ul>

        <h2>4. Legal Basis for Processing</h2>
        <p>We process your personal data based on:</p>
        <ul>
            <li><strong>Consent:</strong> Your free, specific, informed, unconditional, and unambiguous
            consent as required under Section 6 of the DPDP Act.</li>
            <li><strong>Legitimate Uses:</strong> Processing necessary for purposes specified under
            Section 7 of the DPDP Act, including compliance with legal obligations, response to medical
            emergencies, and employment-related purposes.</li>
        </ul>

        <h2>5. Consent Mechanism</h2>
        <p>Before collecting your personal data, we obtain your consent through a clear, plain-language
        notice that specifies the data being collected and the purpose of processing. You may withdraw
        your consent at any time by contacting us at <a href="mailto:{contact_email}">{contact_email}</a>.
        Withdrawal of consent shall not affect the lawfulness of processing based on consent before its
        withdrawal.</p>

        <h2>6. Data Principal Rights</h2>
        <p>Under the DPDP Act, you have the following rights:</p>
        <ul>
            <li><strong>Right to Access:</strong> Obtain a summary of your personal data being processed
            and the processing activities undertaken.</li>
            <li><strong>Right to Correction and Erasure:</strong> Request correction of inaccurate or
            misleading data, completion of incomplete data, updating of outdated data, and erasure of
            data no longer necessary for the stated purpose.</li>
            <li><strong>Right to Grievance Redressal:</strong> File complaints regarding our processing
            of your data.</li>
            <li><strong>Right to Nominate:</strong> Nominate another individual to exercise your rights
            in the event of your death or incapacity.</li>
        </ul>

        <h2>7. Data Retention</h2>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes for which
        it was collected, or as required by applicable law. Once the purpose is fulfilled, and retention
        is no longer necessary for legal or business purposes, we shall erase your personal data within
        a reasonable period.</p>

        <h2>8. Grievance Redressal</h2>
        <p>If you have any concerns or complaints regarding our processing of your personal data, you
        may contact our Grievance Officer:</p>
        <p>Email: <a href="mailto:{contact_email}">{contact_email}</a></p>
        <p>We shall acknowledge your complaint within 48 hours and resolve it within 30 days. If you are
        not satisfied with our response, you may file a complaint with the Data Protection Board of India.</p>

        {children_section}
        {cross_border_section}

        <h2>{"11" if has_children_data and transfers_data_abroad else "10" if has_children_data or transfers_data_abroad else "9"}. Updates to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be communicated to you
        through appropriate channels, and your continued use of our services after such changes constitutes
        acceptance of the updated policy.</p>

        <p class="footer">This privacy policy is compliant with the Digital Personal Data Protection Act,
        2023 (DPDP Act) of India.</p>
    </div>
    """

    return {
        "business_name": business_name,
        "policy_html": policy_html.strip(),
        "sections": sections,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "ai_enhanced": False,
    }
