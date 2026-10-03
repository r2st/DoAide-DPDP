from datetime import datetime, timezone


def _assess_severity(individuals_affected: int, data_affected: list[str]) -> str:
    sensitive_categories = {"financial data", "health data", "biometric data", "aadhaar", "pan"}
    has_sensitive = any(d.lower() in sensitive_categories for d in data_affected)

    if individuals_affected > 10000 or has_sensitive:
        return "High"
    if individuals_affected > 1000:
        return "Medium"
    return "Low"


def generate_breach_report(
    organization_name: str,
    breach_date: str,
    discovery_date: str,
    data_affected: list[str],
    individuals_affected: int,
    breach_description: str,
    remedial_actions: str,
) -> dict:
    severity = _assess_severity(individuals_affected, data_affected)
    data_list_html = "".join(f"<li>{d}</li>" for d in data_affected)

    report_html = f"""
    <div class="breach-report">
        <h1>Data Breach Notification Report</h1>
        <p class="subtitle">Under Section 8(6) of the Digital Personal Data Protection Act, 2023</p>
        <p class="urgency">⚠ This report must be submitted to the Data Protection Board of India
        within 72 hours of becoming aware of the breach.</p>

        <table class="info-table">
            <tr><th>Report Date</th><td>{datetime.now(timezone.utc).strftime("%B %d, %Y %H:%M UTC")}</td></tr>
            <tr><th>Organization</th><td>{organization_name}</td></tr>
            <tr><th>Severity</th><td class="severity-{severity.lower()}">{severity}</td></tr>
        </table>

        <h2>1. Breach Timeline</h2>
        <table class="info-table">
            <tr><th>Date of Breach</th><td>{breach_date}</td></tr>
            <tr><th>Date of Discovery</th><td>{discovery_date}</td></tr>
            <tr><th>Report Submission</th><td>{datetime.now(timezone.utc).strftime("%Y-%m-%d")}</td></tr>
        </table>

        <h2>2. Nature of the Breach</h2>
        <p>{breach_description}</p>

        <h2>3. Personal Data Affected</h2>
        <ul>{data_list_html}</ul>

        <h2>4. Number of Data Principals Affected</h2>
        <p><strong>{individuals_affected:,}</strong> individuals</p>

        <h2>5. Potential Consequences</h2>
        <p>The breach may result in unauthorized access to personal data of affected Data Principals,
        potentially leading to identity theft, financial fraud, or other harm. The severity of this
        breach has been assessed as <strong>{severity}</strong>.</p>

        <h2>6. Remedial Actions Taken</h2>
        <p>{remedial_actions}</p>

        <h2>7. Steps to Mitigate Harm</h2>
        <ul>
            <li>Affected Data Principals have been / will be notified within the prescribed timeframe</li>
            <li>Relevant security patches and access controls have been implemented</li>
            <li>Internal investigation is ongoing to determine full scope of the breach</li>
            <li>Law enforcement has been / will be notified if criminal activity is suspected</li>
        </ul>

        <h2>8. Contact Information</h2>
        <p>For queries regarding this breach, affected Data Principals may contact:</p>
        <p><strong>{organization_name}</strong> — Data Protection / Grievance Officer</p>

        <h2>9. Notification to Data Protection Board</h2>
        <p>This report is to be submitted to the Data Protection Board of India as required under
        Section 8(6) of the DPDP Act, 2023. The Data Fiduciary shall intimate the Board and each
        affected Data Principal in the manner prescribed.</p>

        <div class="footer">
            <p>This report has been generated to assist with DPDP Act compliance. It should be
            reviewed by your legal team before submission to the Data Protection Board of India.</p>
        </div>
    </div>
    """

    return {
        "organization_name": organization_name,
        "report_html": report_html.strip(),
        "severity": severity,
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
