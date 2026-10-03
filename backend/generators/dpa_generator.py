from datetime import datetime, timezone


def generate_dpa(
    controller_name: str,
    processor_name: str,
    processing_description: str,
    data_categories: list[str],
    security_measures: list[str],
    sub_processors: list[str],
) -> dict:
    categories_html = "".join(f"<li>{cat}</li>" for cat in data_categories)
    measures_html = "".join(f"<li>{m}</li>" for m in security_measures)

    sub_processor_section = ""
    if sub_processors:
        sp_html = "".join(f"<li>{sp}</li>" for sp in sub_processors)
        sub_processor_section = f"""
        <h2>8. Sub-Processors</h2>
        <p>The Data Processor is authorized to engage the following sub-processors:</p>
        <ul>{sp_html}</ul>
        <p>The Data Processor shall ensure that each sub-processor is bound by data protection
        obligations no less protective than those set out in this Agreement and the DPDP Act.</p>
        <p>The Data Processor shall inform the Data Fiduciary of any intended addition or replacement
        of sub-processors, giving the Data Fiduciary the opportunity to object.</p>
        """
    else:
        sub_processor_section = """
        <h2>8. Sub-Processors</h2>
        <p>The Data Processor shall not engage any sub-processor without prior written authorization
        from the Data Fiduciary. If sub-processors are engaged, the Data Processor shall ensure
        equivalent data protection obligations are in place.</p>
        """

    date_str = datetime.now(timezone.utc).strftime("%B %d, %Y")

    agreement_html = f"""
    <div class="dpa">
        <h1>Data Processing Agreement</h1>
        <p class="subtitle">Under the Digital Personal Data Protection Act, 2023</p>
        <p class="date">Date: {date_str}</p>

        <h2>Parties</h2>
        <p><strong>Data Fiduciary (Controller):</strong> {controller_name}</p>
        <p><strong>Data Processor:</strong> {processor_name}</p>

        <h2>1. Scope and Purpose</h2>
        <p>This Data Processing Agreement ("Agreement") sets out the terms under which the Data
        Processor shall process personal data on behalf of the Data Fiduciary, in compliance with
        the Digital Personal Data Protection Act, 2023 ("DPDP Act") and any rules made thereunder.</p>

        <h2>2. Description of Processing</h2>
        <p>{processing_description}</p>

        <h2>3. Categories of Personal Data</h2>
        <p>The following categories of personal data shall be processed under this Agreement:</p>
        <ul>{categories_html}</ul>

        <h2>4. Obligations of the Data Processor</h2>
        <p>The Data Processor shall:</p>
        <ul>
            <li>Process personal data only on documented instructions from the Data Fiduciary</li>
            <li>Ensure that persons authorized to process personal data are bound by confidentiality obligations</li>
            <li>Implement appropriate technical and organizational security measures</li>
            <li>Assist the Data Fiduciary in fulfilling obligations to respond to Data Principal requests</li>
            <li>Delete or return all personal data upon termination of this Agreement</li>
            <li>Make available to the Data Fiduciary all information necessary to demonstrate compliance</li>
            <li>Immediately inform the Data Fiduciary if an instruction infringes the DPDP Act</li>
        </ul>

        <h2>5. Security Measures</h2>
        <p>The Data Processor shall implement the following security measures:</p>
        <ul>{measures_html}</ul>

        <h2>6. Data Breach Notification</h2>
        <p>The Data Processor shall notify the Data Fiduciary without undue delay after becoming
        aware of a personal data breach. The notification shall include:</p>
        <ul>
            <li>Nature of the breach including categories and approximate number of Data Principals affected</li>
            <li>Likely consequences of the breach</li>
            <li>Measures taken or proposed to address the breach</li>
            <li>Contact details of the designated point of contact</li>
        </ul>

        <h2>7. Data Principal Rights</h2>
        <p>The Data Processor shall assist the Data Fiduciary in fulfilling its obligations to
        respond to requests from Data Principals exercising their rights under the DPDP Act,
        including rights of access, correction, and erasure.</p>

        {sub_processor_section}

        <h2>9. Term and Termination</h2>
        <p>This Agreement shall remain in effect for the duration of the processing. Upon
        termination, the Data Processor shall, at the choice of the Data Fiduciary, delete
        or return all personal data and certify such deletion or return.</p>

        <h2>10. Governing Law</h2>
        <p>This Agreement shall be governed by and construed in accordance with the laws of
        India, including the Digital Personal Data Protection Act, 2023.</p>

        <div class="signatures">
            <div class="signature-block">
                <p><strong>Data Fiduciary:</strong></p>
                <p>{controller_name}</p>
                <p>Date: {date_str}</p>
                <p>Signature: ___________________</p>
            </div>
            <div class="signature-block">
                <p><strong>Data Processor:</strong></p>
                <p>{processor_name}</p>
                <p>Date: {date_str}</p>
                <p>Signature: ___________________</p>
            </div>
        </div>
    </div>
    """

    return {
        "controller_name": controller_name,
        "processor_name": processor_name,
        "agreement_html": agreement_html.strip(),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
