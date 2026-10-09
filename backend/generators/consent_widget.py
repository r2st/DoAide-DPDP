from datetime import datetime, timezone


TRANSLATIONS = {
    "en": {
        "title": "Cookie & Data Consent",
        "intro": "We use cookies and collect personal data to provide and improve our services. Under the Digital Personal Data Protection Act, 2023, we need your consent.",
        "data_title": "Data We Collect",
        "purposes_title": "Purposes",
        "accept_all": "Accept All",
        "reject_all": "Reject All",
        "manage": "Manage Preferences",
        "save": "Save Preferences",
        "privacy_link": "Privacy Policy",
        "powered_by": "DPDP Compliant",
        "essential_label": "Essential (Required)",
        "essential_desc": "Necessary for the website to function properly",
    },
    "hi": {
        "title": "कुकी और डेटा सहमति",
        "intro": "हम अपनी सेवाएं प्रदान करने और सुधारने के लिए कुकीज़ का उपयोग करते हैं और व्यक्तिगत डेटा एकत्र करते हैं। डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 के तहत, हमें आपकी सहमति की आवश्यकता है।",
        "data_title": "हम जो डेटा एकत्र करते हैं",
        "purposes_title": "उद्देश्य",
        "accept_all": "सभी स्वीकार करें",
        "reject_all": "सभी अस्वीकार करें",
        "manage": "प्राथमिकताएं प्रबंधित करें",
        "save": "प्राथमिकताएं सहेजें",
        "privacy_link": "गोपनीयता नीति",
        "powered_by": "DPDP अनुपालन",
        "essential_label": "आवश्यक (अनिवार्य)",
        "essential_desc": "वेबसाइट के सही ढंग से काम करने के लिए आवश्यक",
    },
}


def generate_consent_widget(
    organization_name: str,
    data_categories: list[str],
    processing_purposes: list[str],
    privacy_policy_url: str,
    theme: str,
    position: str,
    language: str,
) -> dict:
    t = TRANSLATIONS.get(language, TRANSLATIONS["en"])

    is_dark = theme == "dark"
    bg = "#1a1a1a" if is_dark else "#ffffff"
    text = "#ffffff" if is_dark else "#1a1a1a"
    secondary = "#a0a0a0" if is_dark else "#666666"
    border = "#333333" if is_dark else "#e0e0e0"
    accent = "#F0B429"
    toggle_bg = "#333333" if is_dark else "#cccccc"

    pos_css = {
        "bottom": "bottom:0;left:0;right:0;",
        "top": "top:0;left:0;right:0;",
        "center": "top:50%;left:50%;transform:translate(-50%,-50%);max-width:560px;width:90%;border-radius:12px;",
    }
    position_style = pos_css.get(position, pos_css["bottom"])

    categories_html = "".join(
        f'<span style="display:inline-block;background:{border};padding:3px 10px;border-radius:12px;font-size:12px;margin:2px">{cat}</span>'
        for cat in data_categories
    )

    purpose_toggles = ""
    for i, purpose in enumerate(processing_purposes):
        pid = f"dpdp_purpose_{i}"
        purpose_toggles += f"""
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid {border}">
            <div>
                <div style="font-size:13px;font-weight:500">{purpose}</div>
            </div>
            <label style="position:relative;display:inline-block;width:40px;height:22px;cursor:pointer">
                <input type="checkbox" id="{pid}" checked style="opacity:0;width:0;height:0">
                <span style="position:absolute;top:0;left:0;right:0;bottom:0;background:{toggle_bg};border-radius:22px;transition:.3s"></span>
                <span class="dpdp-slider-dot" style="position:absolute;height:16px;width:16px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.3s"></span>
            </label>
        </div>"""

    widget_html = f"""<!DOCTYPE html>
<html lang="{language}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{t["title"]} — {organization_name}</title>
<style>
*{{box-sizing:border-box;margin:0;padding:0}}
body{{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}}
#dpdp-consent-banner{{position:fixed;{position_style}z-index:999999;background:{bg};color:{text};
  padding:24px;box-shadow:0 -2px 20px rgba(0,0,0,0.3);font-size:14px;line-height:1.5}}
#dpdp-consent-banner a{{color:{accent};text-decoration:underline}}
#dpdp-consent-banner button{{cursor:pointer;border:none;padding:10px 20px;border-radius:6px;font-size:13px;font-weight:600;transition:opacity .2s}}
#dpdp-consent-banner button:hover{{opacity:0.85}}
.dpdp-btn-accept{{background:{accent};color:#000}}
.dpdp-btn-reject{{background:transparent;color:{secondary};border:1px solid {border}!important}}
.dpdp-btn-manage{{background:transparent;color:{accent};border:1px solid {accent}!important}}
.dpdp-prefs{{display:none;margin-top:16px;padding-top:16px;border-top:1px solid {border}}}
.dpdp-prefs.active{{display:block}}
input[type="checkbox"]:checked+span{{background:{accent}!important}}
input[type="checkbox"]:checked+span+.dpdp-slider-dot{{transform:translateX(18px)}}
</style>
</head>
<body>
<div id="dpdp-consent-banner">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
    <strong style="font-size:16px">{t["title"]}</strong>
    <span style="font-size:11px;color:{secondary};background:{border};padding:2px 8px;border-radius:4px">{t["powered_by"]}</span>
  </div>
  <p style="color:{secondary};margin-bottom:12px;font-size:13px">{t["intro"]}</p>
  <div style="margin-bottom:12px">
    <div style="font-size:12px;color:{secondary};margin-bottom:6px">{t["data_title"]}:</div>
    <div>{categories_html}</div>
  </div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">
    <button class="dpdp-btn-accept" onclick="dpdpAcceptAll()">{t["accept_all"]}</button>
    <button class="dpdp-btn-reject" onclick="dpdpRejectAll()">{t["reject_all"]}</button>
    <button class="dpdp-btn-manage" onclick="dpdpTogglePrefs()">{t["manage"]}</button>
  </div>
  <div class="dpdp-prefs" id="dpdp-prefs">
    <div style="font-size:13px;font-weight:600;margin-bottom:8px">{t["purposes_title"]}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid {border}">
      <div>
        <div style="font-size:13px;font-weight:500">{t["essential_label"]}</div>
        <div style="font-size:11px;color:{secondary}">{t["essential_desc"]}</div>
      </div>
      <label style="position:relative;display:inline-block;width:40px;height:22px">
        <input type="checkbox" checked disabled style="opacity:0;width:0;height:0">
        <span style="position:absolute;top:0;left:0;right:0;bottom:0;background:{accent};border-radius:22px"></span>
        <span style="position:absolute;height:16px;width:16px;left:3px;bottom:3px;background:white;border-radius:50%;transform:translateX(18px)"></span>
      </label>
    </div>
    {purpose_toggles}
    <div style="margin-top:12px;display:flex;gap:8px">
      <button class="dpdp-btn-accept" onclick="dpdpSavePrefs()">{t["save"]}</button>
    </div>
  </div>
  <div style="margin-top:12px;font-size:11px;color:{secondary}">
    <a href="{privacy_policy_url}" target="_blank">{t["privacy_link"]}</a> ·
    {organization_name} · DPDP Act, 2023
  </div>
</div>
<script>
(function(){{
  var STORAGE_KEY="dpdp_consent_{organization_name.lower().replace(' ','_')}";
  var stored=localStorage.getItem(STORAGE_KEY);
  if(stored){{document.getElementById("dpdp-consent-banner").style.display="none";return}}
  window.dpdpAcceptAll=function(){{
    var consent={{essential:true,timestamp:new Date().toISOString(),version:"1.0"}};
    var checks=document.querySelectorAll('#dpdp-prefs input[type="checkbox"]:not([disabled])');
    checks.forEach(function(c){{consent[c.id]=true}});
    localStorage.setItem(STORAGE_KEY,JSON.stringify(consent));
    document.getElementById("dpdp-consent-banner").style.display="none";
  }};
  window.dpdpRejectAll=function(){{
    var consent={{essential:true,timestamp:new Date().toISOString(),version:"1.0"}};
    var checks=document.querySelectorAll('#dpdp-prefs input[type="checkbox"]:not([disabled])');
    checks.forEach(function(c){{consent[c.id]=false}});
    localStorage.setItem(STORAGE_KEY,JSON.stringify(consent));
    document.getElementById("dpdp-consent-banner").style.display="none";
  }};
  window.dpdpTogglePrefs=function(){{
    document.getElementById("dpdp-prefs").classList.toggle("active");
  }};
  window.dpdpSavePrefs=function(){{
    var consent={{essential:true,timestamp:new Date().toISOString(),version:"1.0"}};
    var checks=document.querySelectorAll('#dpdp-prefs input[type="checkbox"]:not([disabled])');
    checks.forEach(function(c){{consent[c.id]=c.checked}});
    localStorage.setItem(STORAGE_KEY,JSON.stringify(consent));
    document.getElementById("dpdp-consent-banner").style.display="none";
  }};
}})();
</script>
</body>
</html>"""

    embed_script = f"""<script>(function(){{var d=document,s=d.createElement("div");s.innerHTML='<div id="dpdp-cb" style="position:fixed;{position_style}z-index:999999;background:{bg};color:{text};padding:20px;box-shadow:0 -2px 20px rgba(0,0,0,.3);font-size:14px;font-family:sans-serif"><p style="margin:0 0 12px;font-size:13px;color:{secondary}">{t["intro"]}</p><div style="display:flex;gap:8px"><button onclick="this.parentElement.parentElement.style.display=\\'none\\';localStorage.setItem(\\'dpdp_consent\\',\\'all\\')" style="background:{accent};color:#000;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">{t["accept_all"]}</button><button onclick="this.parentElement.parentElement.style.display=\\'none\\';localStorage.setItem(\\'dpdp_consent\\',\\'essential\\')" style="background:transparent;color:{secondary};border:1px solid {border};padding:8px 16px;border-radius:6px;cursor:pointer;font-size:13px">{t["reject_all"]}</button></div><div style="margin-top:8px;font-size:11px;color:{secondary}"><a href="{privacy_policy_url}" target="_blank" style="color:{accent}">{t["privacy_link"]}</a> · {organization_name}</div></div>';if(!localStorage.getItem("dpdp_consent"))d.body.appendChild(s.firstChild)}})();</script>"""

    return {
        "organization_name": organization_name,
        "widget_html": widget_html.strip(),
        "embed_script": embed_script.strip(),
        "generated_at": datetime.now(timezone.utc).isoformat(),
    }
