document.addEventListener('DOMContentLoaded', () => {

  const state = {
    type: 'direct', // 'direct' | 'representative'
    lang: 'my'      // 'my' | 'en'
  };

  const monthNamesMY = ["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "ဩဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ"];
  const monthNamesEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Helper: English Numerals to Myanmar Numerals
  function toMyanmarNumerals(inputStr) {
    if (!inputStr) return '';
    const myanmarDigits = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];
    return String(inputStr).replace(/[0-9]/g, (digit) => myanmarDigits[digit]);
  }

  // Dictionary
  const i18n = {
    my: {
      typeLabel: "တိုင်ကြားမှု အမျိုးအစား",
      optDirect: "ကိုယ်တိုင် တိုင်ကြားမည်",
      optRep: "ကိုယ်စား တိုင်ကြားမည်",
      langLabel: "စာရွက် ဘာသာစကား",
      legComplainant: "တိုင်ကြားသူ၏ အချက်အလက်",
      lblCompName: "တိုင်ကြားသူ အမည် *",
      lblCompNrc: "မှတ်ပုံတင်အမှတ် *",
      lblCompPhone: "ဖုန်းနံပါတ် *",
      lblCompEmail: "အီးမေးလ် (ရှိပါက)",
      lblCompAddress: "နေရပ်လိပ်စာ အပြည့်အစုံ *",
      legRepresentative: "နစ်နာသူ၏ အချက်အလက် (ကိုယ်စား တိုင်ကြားခြင်း)",
      lblVictimName: "နစ်နာသူ အမည် *",
      lblVictimRelation: "တော်စပ်ပုံ *",
      lblRepReason: "ကိုယ်စား တိုင်ကြားရသည့် အကြောင်းအရင်း *",
      legIncident: "ဖြစ်စဉ် အချက်အလက်များ",
      lblRespondent: "တိုင်ကြားခံရသူ / ဌာန / အဖွဲ့အစည်း *",
      lblIncidentDate: "ဖြစ်ပွားခဲ့သည့် ရက်စွဲ *",
      lblIncidentLocation: "ဖြစ်ပွားခဲ့သည့် နေရာ *",
      lblIncidentDetail: "ဖြစ်စဉ် အသေးစိတ် *",
      lblEvidence: "ပူးတွဲ အထောက်အထားများ",
      datePrefix: "ရက်စွဲ။ ။",
      toPrefix: "သို့",
      toTitle: "ဥက္ကဋ္ဌ",
      toOrg: "မြန်မာနိုင်ငံ အမျိုးသား လူ့အခွင့်အရေး ကော်မရှင်",
      toCity: "ရန်ကုန်မြို့။",
      subjDirect: "အကြောင်းအရာ။ ။ လူ့အခွင့်အရေး ချိုးဖောက်ခံရမှုအတွက် တိုင်ကြားစာ ပေးပို့ခြင်း။",
      subjRep: "အကြောင်းအရာ။ ။ [VICTIM] ၏ လူ့အခွင့်အရေး ချိုးဖောက်ခံရမှုအတွက် ကိုယ်စား တိုင်ကြားစာ ပေးပို့ခြင်း။",
      signClosing: "လေးစားစွာဖြင့်",
      signLabel: "(လက်မှတ်) ........................................",
      signName: "အမည်",
      signRelation: "တော်စပ်ပုံ",
      signPhone: "ဖုန်းနံပါတ်",
      signEmail: "အီးမေးလ်"
    },
    en: {
      typeLabel: "Complaint Type",
      optDirect: "Direct Complaint",
      optRep: "On Behalf (Representative)",
      langLabel: "Document Language",
      legComplainant: "Complainant Information",
      lblCompName: "Complainant Name *",
      lblCompNrc: "NRC / Passport No. *",
      lblCompPhone: "Phone Number *",
      lblCompEmail: "Email (Optional)",
      lblCompAddress: "Full Address *",
      legRepresentative: "Victim Details (Representative Complaint)",
      lblVictimName: "Victim Name *",
      lblVictimRelation: "Relationship to Victim *",
      lblRepReason: "Reason for Representative Filing *",
      legIncident: "Incident Details",
      lblRespondent: "Respondent / Organization / Dept *",
      lblIncidentDate: "Date of Incident *",
      lblIncidentLocation: "Location of Incident *",
      lblIncidentDetail: "Incident Details *",
      lblEvidence: "Supporting Evidence/Documents",
      datePrefix: "Date:",
      toPrefix: "To:",
      toTitle: "The Chairman",
      toOrg: "Myanmar National Human Rights Commission (MNHRC)",
      toCity: "Yangon, Myanmar.",
      subjDirect: "Subject: Submission of Human Rights Violation Complaint",
      subjRep: "Subject: Submission of Human Rights Violation Complaint on Behalf of [VICTIM]",
      signClosing: "Respectfully yours,",
      signLabel: "(Signature) ........................................",
      signName: "Name",
      signRelation: "Relationship",
      signPhone: "Phone",
      signEmail: "Email"
    }
  };

  const repSection = document.getElementById('repSection');
  const outBody = document.getElementById('outBody');
  const evidenceInput = document.getElementById('evidence');
  let evidenceHelp = null;
  const documentFooter = document.querySelector('.doc-footer');
  const attachmentSection = document.createElement('section');
  const attachmentTitle = document.createElement('h3');
  const attachmentList = document.createElement('ol');
  const attachmentImages = document.createElement('div');
  let attachmentObjectUrls = [];

  attachmentSection.className = 'doc-attachments';
  attachmentSection.hidden = true;
  attachmentTitle.className = 'doc-attachments__title';
  attachmentList.className = 'doc-attachments__list';
  attachmentImages.className = 'doc-attachments__images';
  attachmentSection.append(attachmentTitle, attachmentList, attachmentImages);
  documentFooter?.insertAdjacentElement('afterend', attachmentSection);

  if (evidenceInput) {
    evidenceInput.type = 'file';
    evidenceInput.multiple = true;
    evidenceInput.accept = 'image/*,application/pdf,.doc,.docx';
    evidenceInput.removeAttribute('placeholder');
    evidenceInput.setAttribute('aria-describedby', 'evidence-help');

    evidenceHelp = document.createElement('small');
    evidenceHelp.id = 'evidence-help';
    evidenceHelp.className = 'file-upload-hint';
    evidenceInput.insertAdjacentElement('afterend', evidenceHelp);
  }

  // Controllers Listeners
  document.querySelectorAll('input[name="complaintType"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.type = e.target.value;
      if (state.type === 'representative') {
        repSection.classList.remove('hidden');
        document.getElementById('outSignRelationRow').classList.remove('hidden');
      } else {
        repSection.classList.add('hidden');
        document.getElementById('outSignRelationRow').classList.add('hidden');
      }
      renderUI();
    });
  });

  document.querySelectorAll('input[name="docLanguage"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      state.lang = e.target.value;
      renderUI();
    });
  });

  // Keep the generated letter aligned with the shared website language control.
  // The document-language selector still lets a visitor deliberately prepare
  // a letter in the other language without changing the rest of the website.
  function syncDocumentLanguageWithSite() {
    const siteLanguage = document.body.classList.contains('lang-en') ? 'en' : 'my';
    if (siteLanguage === state.lang) return;

    state.lang = siteLanguage;
    const languageRadio = document.getElementById(siteLanguage === 'en' ? 'langEN' : 'langMY');
    if (languageRadio) languageRadio.checked = true;
    renderUI();
  }

  // Inputs Listener
  const formInputs = document.querySelectorAll('#complaintForm input, #complaintForm textarea');
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.id === 'incidentDate') {
        renderDate();
      }
      renderBodyText();
    });
    input.addEventListener('change', () => {
      if (input.id === 'incidentDate') renderDate();
      renderBodyText();
    });
  });

  function renderUI() {
    const t = i18n[state.lang];

    document.getElementById('lblComplaintType').innerText = t.typeLabel;
    document.getElementById('optDirect').innerText = t.optDirect;
    document.getElementById('optRep').innerText = t.optRep;
    document.getElementById('lblLanguage').innerText = t.langLabel;

    document.getElementById('legComplainant').innerText = t.legComplainant;
    document.getElementById('lblCompName').innerText = t.lblCompName;
    document.getElementById('lblCompNrc').innerText = t.lblCompNrc;
    document.getElementById('lblCompPhone').innerText = t.lblCompPhone;
    document.getElementById('lblCompEmail').innerText = t.lblCompEmail;
    document.getElementById('lblCompAddress').innerText = t.lblCompAddress;

    document.getElementById('legRepresentative').innerText = t.legRepresentative;
    document.getElementById('lblVictimName').innerText = t.lblVictimName;
    document.getElementById('lblVictimRelation').innerText = t.lblVictimRelation;
    document.getElementById('lblRepReason').innerText = t.lblRepReason;

    document.getElementById('legIncident').innerText = t.legIncident;
    document.getElementById('lblRespondent').innerText = t.lblRespondent;
    document.getElementById('lblIncidentDate').innerText = t.lblIncidentDate;
    document.getElementById('lblIncidentLocation').innerText = t.lblIncidentLocation;
    document.getElementById('lblIncidentDetail').innerText = t.lblIncidentDetail;
    document.getElementById('lblEvidence').innerText = t.lblEvidence;
    if (evidenceHelp) {
      evidenceHelp.textContent = state.lang === 'en'
        ? 'Choose images, PDFs, or Word documents. You can select multiple files.'
        : 'ဓာတ်ပုံ၊ PDF သို့မဟုတ် Word စာရွက်စာတမ်းများကို ဖိုင်များစွာ ရွေးချယ်နိုင်သည်။';
    }

    document.getElementById('lblDatePrefix').innerText = t.datePrefix;
    document.getElementById('docToPrefix').innerText = t.toPrefix;
    document.getElementById('docToTitle').innerText = t.toTitle;
    document.getElementById('docToOrg').innerText = t.toOrg;
    document.getElementById('docToCity').innerText = t.toCity;

    document.getElementById('lblSignClosing').innerText = t.signClosing;
    document.getElementById('lblSignature').innerText = t.signLabel;
    document.getElementById('lblSignName').innerText = t.signName;
    document.getElementById('lblSignRelation').innerText = t.signRelation;
    document.getElementById('lblSignPhone').innerText = t.signPhone;
    document.getElementById('lblSignEmail').innerText = t.signEmail;

    // Header text is handled by the shared .lang-en/.lang-my styles. These
    // fields are not text nodes, so their placeholders need an explicit sync.
    const placeholderAttribute = state.lang === 'en' ? 'data-placeholder-en' : 'data-placeholder-my';
    document.querySelectorAll('[data-placeholder-en][data-placeholder-my]').forEach((field) => {
      field.placeholder = field.getAttribute(placeholderAttribute) || '';
    });

    const printText = document.getElementById('btnPrintText');
    if (printText) {
      printText.textContent = state.lang === 'en' ? printText.dataset.en : printText.dataset.my;
    }

    const rawVictim = document.getElementById('victimName').value.trim();
    const victimVal = rawVictim || (state.lang === 'my' ? '[နစ်နာသူအမည်]' : '[Victim Name]');
    if (state.type === 'direct') {
      document.getElementById('outSubject').innerText = t.subjDirect;
    } else {
      document.getElementById('outSubject').innerText = t.subjRep.replace('[VICTIM]', victimVal);
    }

    renderDate();
    renderBodyText();
  }

  // Date Formatting for Header
  function renderDate() {
    const rawDate = document.getElementById('incidentDate').value;
    const now = rawDate ? new Date(rawDate) : new Date();
    
    if (state.lang === 'my') {
      const year = toMyanmarNumerals(now.getFullYear());
      const day = toMyanmarNumerals(now.getDate());
      const month = monthNamesMY[now.getMonth()];
      document.getElementById('outDate').innerText = `${year} ခုနှစ်၊ ${month} လ၊ (${day}) ရက်`;
    } else {
      document.getElementById('outDate').innerText = `${monthNamesEN[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    }
  }

  // Incident Date Formatting for Paragraph
  function getFormattedIncidentDate() {
    const rawDate = document.getElementById('incidentDate').value;
    if (!rawDate) return state.lang === 'my' ? '[ဖြစ်ပွားခဲ့သည့် ရက်စွဲ]' : '[Date of Incident]';

    const [year, month, day] = rawDate.split('-');
    const monthIndex = parseInt(month, 10) - 1;

    if (state.lang === 'my') {
      return `${toMyanmarNumerals(year)} ခုနှစ်၊ ${monthNamesMY[monthIndex]} လ၊ (${toMyanmarNumerals(parseInt(day, 10))}) ရက်`;
    } else {
      return `${monthNamesEN[monthIndex]} ${parseInt(day, 10)}, ${year}`;
    }
  }

  function renderEvidenceAttachments() {
    attachmentObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    attachmentObjectUrls = [];
    attachmentList.replaceChildren();
    attachmentImages.replaceChildren();

    const files = Array.from(evidenceInput?.files || []);
    attachmentSection.hidden = files.length === 0;
    if (!files.length) return;

    attachmentTitle.textContent = state.lang === 'en' ? 'Attachments' : 'ပူးတွဲအထောက်အထားများ';

    files.forEach((file) => {
      const listItem = document.createElement('li');
      listItem.textContent = file.name;
      attachmentList.append(listItem);

      if (!file.type.startsWith('image/')) return;
      const imageUrl = URL.createObjectURL(file);
      attachmentObjectUrls.push(imageUrl);

      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const caption = document.createElement('figcaption');
      image.src = imageUrl;
      image.alt = '';
      caption.textContent = file.name;
      figure.append(image, caption);
      attachmentImages.append(figure);
    });
  }

  // Main Dynamic Body Rendering Logic
  function renderBodyText() {
    const getVal = (id) => document.getElementById(id).value.trim();
    const getEvidenceNames = () => Array.from(evidenceInput?.files || [])
      .map((file) => file.name)
      .join(', ');

    const rawCompName = getVal('compName');
    const rawCompNrc = getVal('compNrc');
    const rawCompPhone = getVal('compPhone');
    const rawCompEmail = getVal('compEmail');
    const rawCompAddress = getVal('compAddress');

    const rawVictimName = getVal('victimName');
    const rawVictimRelation = getVal('victimRelation');
    const rawRepReason = getVal('repReason');

    const rawRespondent = getVal('respondent');
    const rawLocation = getVal('incidentLocation');
    const rawDetail = getVal('incidentDetail');
    const rawEvidence = getEvidenceNames();

    const incDateStr = getFormattedIncidentDate();

    // Footer Sync
    const displayCompName = rawCompName || (state.lang === 'my' ? '[တိုင်ကြားသူအမည်]' : '[Complainant Name]');
    const displayCompPhone = rawCompPhone ? (state.lang === 'my' ? toMyanmarNumerals(rawCompPhone) : rawCompPhone) : (state.lang === 'my' ? '[ဖုန်းနံပါတ်]' : '[Phone Number]');
    const displayRelation = rawVictimRelation || (state.lang === 'my' ? '[တော်စပ်ပုံ]' : '[Relationship]');

    document.getElementById('outSignName').innerText = displayCompName;
    document.getElementById('outSignPhone').innerText = displayCompPhone;
    document.getElementById('outSignRelation').innerText = displayRelation;

    if (rawCompEmail) {
      document.getElementById('outSignEmailRow').classList.remove('hidden');
      document.getElementById('outSignEmail').innerText = rawCompEmail;
    } else {
      document.getElementById('outSignEmailRow').classList.add('hidden');
    }

    if (state.lang === 'my') {
      // MYANMAR LOGIC
      const cName = rawCompName ? `<span class="fill-data">${rawCompName}</span>` : `<span class="fill-data">[တိုင်ကြားသူအမည်]</span>`;
      const cNrc = rawCompNrc ? `၊ မှတ်ပုံတင်အမှတ် <span class="fill-data">${toMyanmarNumerals(rawCompNrc)}</span>` : '';
      const cAddr = rawCompAddress ? `၊ <span class="fill-data">${rawCompAddress}</span> တွင် နေထိုင်သူ` : '';

      let p1 = '';
      if (state.type === 'direct') {
        p1 = `၁။ ကျွန်တော်/ကျွန်မ ${cName}${cNrc}${cAddr} သည် မိမိ၏ လူ့အခွင့်အရေး ချိုးဖောက်ခံရမှု ဖြစ်စဉ်နှင့် ပတ်သက်၍ အောက်ပါအတိုင်း တိုင်ကြားအပ်ပါသည်။`;
      } else {
        const vName = rawVictimName ? `<span class="fill-data">${rawVictimName}</span>` : `<span class="fill-data">[နစ်နာသူအမည်]</span>`;
        const vRel = rawVictimRelation ? `<span class="fill-data">${rawVictimRelation}</span>` : `<span class="fill-data">[တော်စပ်ပုံ]</span>`;
        const rReason = rawRepReason ? ` (<span class="fill-data">${rawRepReason}</span> ကြောင့်)` : '';

        p1 = `၁။ ကျွန်တော်/ကျွန်မ ${cName}${cNrc}${cAddr} သည် နစ်နာသူ ${vName} ၏ ${vRel} တော်စပ်သူဖြစ်ပြီး၊ နစ်နာသူကိုယ်တိုင် တိုင်ကြားနိုင်ခြင်းမရှိပါသဖြင့်${rReason} နစ်နာသူ၏ ကိုယ်စား အောက်ပါအတိုင်း တိုင်ကြားအပ်ပါသည်။`;
      }

      const locStr = rawLocation ? `၊ <span class="fill-data">${rawLocation}</span> ၌` : '';
      const respStr = rawRespondent ? `<span class="fill-data">${rawRespondent}</span>` : `<span class="fill-data">[တိုင်ကြားခံရသူ/ဌာန]</span>`;
      const detailStr = rawDetail ? `<span class="fill-data">${rawDetail}</span>` : `<span class="fill-data">[ဖြစ်စဉ်အသေးစိတ်]</span>`;

      // Fixed: Removed "ဟု" and duplicate "ရက်နေ့"
      let p2 = `၂။ ဖြစ်စဉ်မှာ <span class="fill-data">${incDateStr}</span>${locStr} ${respStr} မှ ${detailStr} စသည့် လူ့အခွင့်အရေး ချိုးဖောက်မှုများ ပြုလုပ်ခဲ့ပါသည်။`;

      const evStr = rawEvidence ? `နှင့်အတူ <span class="fill-data">${rawEvidence}</span> တို့ကို` : 'နှင့်အတူ သက်ဆိုင်ရာ သက်သေခံ အထောက်အထားများကို';
      let p3 = `၃။ သို့ဖြစ်ပါ၍ ယခုတိုင်ကြားစာ${evStr} ပူးတွဲတင်ပြအပ်ပါသဖြင့် ဖြစ်စဉ်အား ခိုင်မာစွာ စုံစမ်းစစ်ဆေးပေးပါရန်နှင့် လိုအပ်သည့် ကူညီစောင့်ရှောက်မှုများ ဆောင်ရွက်ပေးပါရန် လေးစားစွာဖြင့် တိုင်ကြားအပ်ပါသည်။`;

      outBody.innerHTML = `<p>${p1}</p><p>${p2}</p><p>${p3}</p>`;

    } else {
      // ENGLISH LOGIC
      const cName = rawCompName ? `<span class="fill-data">${rawCompName}</span>` : `<span class="fill-data">[Complainant Name]</span>`;
      const cNrc = rawCompNrc ? `, holding NRC/Passport No. <span class="fill-data">${rawCompNrc}</span>` : '';
      const cAddr = rawCompAddress ? `, residing at <span class="fill-data">${rawCompAddress}</span>` : '';

      let p1 = '';
      if (state.type === 'direct') {
        p1 = `1. I, ${cName}${cNrc}${cAddr}, hereby submit this official complaint regarding a violation of my fundamental human rights.`;
      } else {
        const vName = rawVictimName ? `<span class="fill-data">${rawVictimName}</span>` : `<span class="fill-data">[Victim Name]</span>`;
        const vRel = rawVictimRelation ? `<span class="fill-data">${rawVictimRelation}</span>` : `<span class="fill-data">[Relationship]</span>`;
        const rReason = rawRepReason ? ` due to <span class="fill-data">${rawRepReason}</span>` : '';

        p1 = `1. I, ${cName}${cNrc}${cAddr}, am submitting this complaint as the ${vRel} on behalf of the victim, ${vName}, who is unable to file personally${rReason}.`;
      }

      const locStr = rawLocation ? ` at <span class="fill-data">${rawLocation}</span>` : '';
      const respStr = rawRespondent ? `<span class="fill-data">${rawRespondent}</span>` : `<span class="fill-data">[Respondent/Dept]</span>`;
      const detailStr = rawDetail ? `<span class="fill-data">${rawDetail}</span>` : `<span class="fill-data">[Incident Details]</span>`;

      let p2 = `2. Incident Details: On <span class="fill-data">${incDateStr}</span>${locStr}, ${respStr} committed the following acts: ${detailStr}.`;

      const evStr = rawEvidence ? `<span class="fill-data">${rawEvidence}</span>` : 'relevant supporting documents';
      let p3 = `3. Therefore, along with this complaint, I attach ${evStr} for your review. I respectfully request the Commission to investigate this matter thoroughly and ensure justice and legal protection.`;

      outBody.innerHTML = `<p>${p1}</p><p>${p2}</p><p>${p3}</p>`;
    }

    renderEvidenceAttachments();
  }

  renderUI();

  // script.js updates the body language class whenever the main converter is
  // used. Observing that class makes the form page follow the same control.
  new MutationObserver(syncDocumentLanguageWithSite).observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
  syncDocumentLanguageWithSite();
});
