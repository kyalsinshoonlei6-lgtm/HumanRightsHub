(() => {
  'use strict';

  const articles = [
    { title: 'Dignity and equality', titleMy: 'ဂုဏ်သိက္ခာနှင့် တန်းတူညီမျှမှု', en: 'All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.', my: 'လူသားအားလုံးသည် လွတ်လပ်သူများအဖြစ် မွေးဖွားလာကြပြီး ဂုဏ်သိက္ခာနှင့် အခွင့်အရေးများ တန်းတူရည်တူရှိကြသည်။ လူတို့၌ ဆင်ခြင်တုံတရားနှင့် အမှားအမှန်ဝေဖန်ပိုင်းခြားနိုင်သော အသိဉာဏ် ရှိကြ၍၊ တစ်ဦးကိုတစ်ဦး ညီရင်းအစ်ကို စိတ်ဓာတ်ဖြင့် ဆက်ဆံ ကျင့်သုံးသင့်သည်။' },
    { title: 'Freedom from discrimination', titleMy: 'ခွဲခြားဆက်ဆံမှုမှ လွတ်မြောက်ခွင့်', en: 'Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status. Furthermore, no distinction shall be made on the basis of the political, jurisdictional or international status of the country or territory to which a person belongs, whether it be independent, trust, non-self-governing or under any other limitation of sovereignty.', my: ' လူတိုင်းသည် လူမျိုး၊ အဆင်းအရောင်၊ အမျိုးသား၊ အမျိုးသမီး၊ ဘာသာစကား၊ ကိုးကွယ်ယုံကြည်မှု၊ နိုင်ငံရေး သို့မဟုတ် အခြားအယူအဆ၊ နိုင်ငံသား သို့မဟုတ် လူမှုအသိုင်းအဝိုင်းဆိုင်ရာ ဇာတိချက်ကြွေ၊ ပစ္စည်းဥစ္စာ၊ မျိုးရိုးဇာတိနှင့် အခြားအဆင့်အတန်း စသည်တို့ ခွဲခြားမှု မရှိစေဘဲ ဤကြေညာစာတမ်းတွင် ဖော်ပြထားသည့် အခွင့်အရေးများနှင့် လွတ်လပ်ခွင့် အားလုံးကို ခံစားပိုင်ခွင့် ရှိသည်။ ထို့ပြင် လူတစ်ဦးတစ်ယောက်၏ နေထိုင်ရာ နိုင်ငံ သို့မဟုတ် နယ်မြေသည် အချုပ်အခြာအာဏာပိုင် လွတ်လပ်သည့် နိုင်ငံ ဖြစ်စေ၊ ကုလသမဂ္ဂ ထိန်းသိမ်းစောင့်ရှောက်ရသော နယ်မြေ ဖြစ်စေ၊ ကိုယ်ပိုင်အုပ်ချုပ်ခွင့် မရှိသော နယ်မြေ ဖြစ်စေ၊ သို့မဟုတ် အခြားအကန့်အသတ် ခံရသော အချုပ်အခြာအာဏာပိုင် နယ်မြေ စသည်ဖြင့် ယင်း၏ နိုင်ငံရေး၊ စီရင်ပိုင်ခွင့် သို့မဟုတ် နိုင်ငံတကာ အဆင့်အတန်း အခြေအနေတို့ ပေါ်အခြေပြု၍ ခွဲခြားမှု မပြုရ။' },
    { title: 'Life, liberty and security', titleMy: 'အသက်၊ လွတ်လပ်ခွင့်နှင့် လုံခြုံမှု', en: 'Everyone has the right to life, liberty and security of person.', my: 'လူတိုင်းတွင် အသက်ရှင်သန်ခွင့်၊ လွတ်လပ်ခွင့်နှင့် လူ့လုံခြုံမှု ရရှိခွင့် ရှိသည်။' },
    { title: 'Freedom from slavery', titleMy: 'ကျေးကျွန်ပြုမှုမှ လွတ်မြောက်ခွင့်', en: 'No one shall be held in slavery or servitude; slavery and the slave trade shall be prohibited in all their forms.', my: 'မည်သူ့ကိုမျှ ကျေးကျွန်အဖြစ် သို့မဟုတ် ကျေးကျွန်ကဲ့သို့ ခိုင်းစေမှု မပြုရ။ ကျေးကျွန်ပြုလုပ်မှုနှင့် ကျေးကျွန်အရောင်းအဝယ်ပြုလုပ်ခြင်း အားလုံးကို ပိတ်ပင်တားမြစ်ရမည်။' },
    { title: 'Freedom from torture', titleMy: 'ညှဉ်းပန်းနှိပ်စက်မှုမှ လွတ်မြောက်ခွင့်', en: 'No one shall be subjected to torture or to cruel, inhuman or degrading treatment or punishment.', my: 'မည်သူ့ကိုမျှ ညှင်းပန်းနှိပ်စက်ခြင်း သို့မဟုတ် ရက်စက်ကြမ်းကြုတ်သော၊ လူမဆန်သော၊ ဂုဏ်သိက္ခာ ညှိုးနွမ်းစေသော ပြုမူဆက်ဆံခြင်း သို့မဟုတ် အပြစ်ဒဏ်ပေးခြင်း မပြုရ။' },
    { title: 'Recognition before the law', titleMy: 'ဥပဒေရှေ့မှောက် လူပုဂ္ဂိုလ်အဖြစ် အသိအမှတ်ပြုမှု', en: 'Everyone has the right to recognition everywhere as a person before the law.', my: 'လူတိုင်းတွင် ဥပဒေအရာ၌ လူတစ်ဦးအဖြစ် နေရာတိုင်းတွင် အသိအမှတ်ပြုခြင်းကို ခံယူပိုင်ခွင့် ရှိသည်။' },
    { title: 'Equality before the law', titleMy: 'ဥပဒေရှေ့မှောက် တန်းတူညီမျှမှု', en: 'All are equal before the law and are entitled without any discrimination to equal protection of the law. All are entitled to equal protection against any discrimination in violation of this Declaration and against any incitement to such discrimination.', my: ' လူအားလုံးတို့သည် ဥပဒေအရာ၌ တန်းတူညီမျှ ရှိကြပြီး၊ ဥပဒေ၏ အကာအကွယ်ကို မည်သည့် ခွဲခြားဆက်ဆံမှုမျှ မရှိစေဘဲ ခံစားပိုင်ခွင့် ရှိသည်။ ဤကြေညာစာတမ်းပါ အချက်များကို ဆန့်ကျင်၍ ခွဲခြားဆက်ဆံခြင်းမှလည်းကောင်း၊ ထိုသို့ ခွဲခြားဆက်ဆံရန် လှုံ့ဆော်ခြင်းမှလည်းကောင်း ကာကွယ်စောင့်ရှောက်မှုကို ခံစားပိုင်ခွင့် ရှိသည်။' },
    { title: 'Right to an effective remedy', titleMy: 'ထိရောက်သော ကုစားမှု ရပိုင်ခွင့်', en: ' Everyone has the right to an effective remedy by the competent national tribunals for acts violating the fundamental rights granted him by the constitution or by law.', my: 'လူတိုင်းတွင် ဖွဲ့စည်းပုံအခြေခံဥပဒေ သို့မဟုတ် ဥပဒေအရ ၎င်းအား အပ်နှင်းထားသည့် အခြေခံအခွင့်အရေးများကို ချိုးဖောက်ခြင်း ခံရလျှင် ထိရောက်သော သက်သာခွင့်ကို အခွင့်အာဏာရှိသော အမျိုးသားတရားရုံးများတွင် လျှောက်ထားပိုင်ခွင့် ရှိသည်။' },
    { title: 'Freedom from arbitrary detention', titleMy: 'မတရားဖမ်းဆီးချုပ်နှောင်မှုမှ လွတ်မြောက်ခွင့်', en: 'No one shall be subjected to arbitrary arrest, detention or exile.', my: 'မည်သူ့ကိုမျှ မတရား ဖမ်းဆီးခြင်း၊ ချုပ်နှောင်ထားခြင်း သို့မဟုတ် ပြည်နှင်ဒဏ်ပေးခြင်း မပြုရ။' },
    { title: 'Fair and public hearing', titleMy: 'မျှတ၍ အများပြည်သူရှေ့ ကြားနာမှု', en: 'Everyone is entitled in full equality to a fair and public hearing by an independent and impartial tribunal, in the determination of his rights and obligations and of any criminal charge against him.', my: 'လူတိုင်းသည် ၎င်း၏ အခွင့်အရေးများနှင့် တာဝန်များကို ဆုံးဖြတ်ရာတွင်လည်းကောင်း၊ ၎င်းအပေါ် စွပ်စွဲချက်များအရ ရာဇဝတ်မှု စွဲဆိုခံရမှုတွင်လည်းကောင်း၊ လွတ်လပ်၍ ဘက်လိုက်မှုမရှိသော တရားရုံးက အများပြည်သူရှေ့မှောက်တွင် တရားမျှတစွာ စစ်ဆေးကြားနာမှုကို တန်းတူညီမျှ အပြည့်အဝ ခံစားပိုင်ခွင့် ရှိသည်။' },
    { title: 'Presumption of innocence', titleMy: 'အပြစ်မရှိဟု မှတ်ယူပိုင်ခွင့်', en: '(1) Everyone charged with a penal offence has the right to be presumed innocent until proved guilty according to law in a public trial at which he has had all the guarantees necessary for his defence.<br>(2) No one shall be held guilty of any penal offence on account of any act or omission which did not constitute a penal offence, under national or international law, at the time when it was committed. Nor shall a heavier penalty be imposed than the one that was applicable at the time the penal offence was committed.', my: '(၁) ပြစ်မှုကျူးလွန်ကြောင်း စွပ်စွဲခံရသူတိုင်းသည် မိမိ၏ ခုခံချေပမှုအတွက် လိုအပ်သည့် အာမခံချက်များ ရရှိသော၊ အများပြည်သူ ရှေ့မှောက်တွင် စစ်ဆေးသော တရားရုံး၌ ဥပဒေအရ ပြစ်မှုကျူးလွန်ကြောင်း သက်သေပြနိုင်သည့် အချိန်အထိ အပြစ်မဲ့သူဖြစ်သည်ဟု ယူဆခြင်း ခံပိုင်ခွင့် ရှိသည်။<br>(၂) ပြစ်မှုကျူးလွန်ကြောင်း စွပ်စွဲခံရသည့်အချိန်တွင် ပြည်တွင်းဥပဒေအရဖြစ်စေ၊ အပြည်ပြည်ဆိုင်ရာဥပဒေအရဖြစ်စေ ပြုလုပ်မှု သို့မဟုတ် ပျက်ကွက်မှုတစ်ရပ်သည် ပြစ်မှု မမြောက်ပါက မည်သူမျှ အပြစ်မရှိစေရ။ ပြစ်မှုကျူးလွန်စဉ်အချိန်က ထိုက်တန်သော ပြစ်ဒဏ်ထက် ပိုမိုကြီးလေးသော ပြစ်ဒဏ်ကိုလည်း ချမှတ်ခြင်း မရှိစေရ။' },
    { title: 'Privacy and reputation', titleMy: 'ကိုယ်ရေးကိုယ်တာနှင့် ဂုဏ်သတင်း', en: 'No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.', my: 'မည်သူမျှ မိမိ၏ ပုဂ္ဂိုလ်ရေး၊ မိသားစု၊ နေအိမ် သို့မဟုတ် အပြန်အလှန် ဆက်သွယ်ရေးတွင် မတရား ဝင်ရောက်စွက်ဖက်ခြင်းကိုလည်းကောင်း၊ မိမိ၏ ဂုဏ်သိက္ခာနှင့် ထိခိုက်စေရေး ပြုမူဆောင်ရွက်ခြင်းကိုလည်းကောင်း မခံစေရ။ လူတိုင်းတွင် ထိုသို့ စွက်ဖက်ခြင်း သို့မဟုတ် ထိခိုက်စေခြင်းတို့မှ ဥပဒေအရ ကာကွယ်စောင့်ရှောက်မှု ခံယူပိုင်ခွင့် ရှိသည်။' },
    { title: 'Freedom of movement', titleMy: 'လွတ်လပ်စွာ သွားလာနေထိုင်ခွင့်', en: '(1) Everyone has the right to freedom of movement and residence within the borders of each State.<br>(2) Everyone has the right to leave any country, including his own, and to return to his country.', my: '(၁) လူတိုင်းတွင် မိမိ၏ နိုင်ငံ၏ နယ်နိမိတ်အတွင်း၌ လွတ်လပ်စွာ သွားလာလှုပ်ရှားခွင့်နှင့် နေထိုင်ခွင့် ရှိသည်။<br>(၂) လူတိုင်းတွင် မိမိ၏ နိုင်ငံအပါအဝင် မည်သည့်နိုင်ငံမှမဆို ထွက်ခွာပိုင်ခွင့်နှင့် မိမိ၏ နိုင်ငံသို့ ပြန်လာပိုင်ခွင့် ရှိသည်။' },
    { title: 'Right to seek asylum', titleMy: 'ခိုလှုံခွင့် တောင်းခံပိုင်ခွင့်', en: '(1) Everyone has the right to seek and to enjoy in other countries asylum from persecution.<br>(2) This right may not be invoked in the case of prosecutions genuinely arising from non-political crimes or from acts contrary to the purposes and principles of the United Nations.', my: ' (၁) လူတိုင်းတွင် ဖိနှိပ်ချုပ်ချယ်မှုမှ လွတ်မြောက်ရန် အခြားနိုင်ငံများ၌ ခိုလှုံခွင့်ကို တောင်းခံပိုင်ခွင့်နှင့် ခိုလှုံနေထိုင်ပိုင်ခွင့် ရှိသည်။<br>(၂) နိုင်ငံရေးနှင့် မသက်ဆိုင်သည့် ပြစ်မှုများ သို့မဟုတ် ကုလသမဂ္ဂ၏ ရည်ရွယ်ချက်များနှင့် အခြေခံမူများကို ဆန့်ကျင်သော ပြုလုပ်မှုများမှ အမှန်တကယ် ဖြစ်ပေါ်လာသည့် တရားစွဲဆိုမှုများတွင် အထက်ပါအခွင့်အရေးကို ကိုးကားသုံးစွဲခွင့် မရှိစေရ။' },
    { title: 'Right to a nationality', titleMy: 'နိုင်ငံသားဖြစ်ပိုင်ခွင့်', en: '(1) Everyone has the right to a nationality.<br>(2) No one shall be arbitrarily deprived of his nationality nor denied the right to change his nationality.', my: '(၁) လူတိုင်းသည် နိုင်ငံသားအဖြစ်ကို ခံယူခွင့် ရှိသည်။<br>(၂) မည်သူမျှ မိမိ၏ နိုင်ငံသားအဖြစ်ကို မတရား ရုပ်သိမ်းခြင်း မခံစေရ။ မိမိ၏ နိုင်ငံသားအဖြစ်ကို ပြောင်းလဲပိုင်ခွင့် အခွင့်အရေးကိုလည်း ငြင်းပယ်ခြင်း မခံစေရ။' },
    { title: 'Marriage and family', titleMy: 'အိမ်ထောင်နှင့် မိသားစု', en: '(1) Men and women of full age, without any limitation due to race, nationality or religion, have the right to marry and to found a family. They are entitled to equal rights as to marriage, during marriage and at its dissolution.<br>(2) Marriage shall be entered into only with the free and full consent of the intending spouses.<br>(3) The family is the natural and fundamental group unit of society and is entitled to protection by society and the State.', my: ' (၁) အရွယ်ရောက်ပြီးသော အမျိုးသားနှင့် အမျိုးသမီးတို့တွင် လူမျိုး၊ နိုင်ငံသား သို့မဟုတ် ကိုးကွယ်သည့်ဘာသာကို အကြောင်းပြု၍ အကန့်အသတ်မရှိဘဲ ထိမ်းမြားမင်္ဂလာပြုနိုင်ခွင့်နှင့် မိသားစု ထူထောင်နိုင်ခွင့် ရှိသည်။ ၎င်းတို့သည် ထိမ်းမြားစဉ်တွင်လည်းကောင်း၊ အိမ်ထောင်ပြုနေစဉ်ကာလအတွင်း၌လည်းကောင်း၊ ကွာရှင်းပြတ်စဲသည့်အခါ၌လည်းကောင်း တန်းတူအခွင့်အရေးများ ရရှိကြသည်။<br>(၂) အမျိုးသားနှင့် အမျိုးသမီး နှစ်ဦးစလုံး၏ လွတ်လပ်သော သဘောတူညီချက်ဖြင့်သာလျှင် ထိမ်းမြားမင်္ဂလာကို ပြုလုပ်နိုင်သည်။<br>(၃) မိသားစုသည် လူ့အဖွဲ့အစည်း၏ သဘာဝကျသော အခြေခံအုပ်စုဖြစ်ပြီး လူ့အဖွဲ့အစည်းနှင့် နိုင်ငံတော်၏ အကာအကွယ်ပေးမှုကို ခံယူပိုင်ခွင့် ရှိသည်။' },
    { title: 'Right to own property', titleMy: 'ပစ္စည်းဥစ္စာ ပိုင်ဆိုင်ခွင့်', en: '(1) Everyone has the right to own property alone as well as in association with others.<br>(2) No one shall be arbitrarily deprived of his property.', my: '(၁) လူတိုင်းတွင် မိမိတစ်ဦးတည်းဖြစ်စေ၊ အခြားသူများနှင့် စုပေါင်း၍ဖြစ်စေ ပစ္စည်းဥစ္စာကို ပိုင်ဆိုင်ပိုင်ခွင့် ရှိသည်။<br>(၂) မည်သူမျှ မိမိ၏ ပစ္စည်းဥစ္စာကို မတရား သိမ်းယူခြင်း မခံစေရ။' },
    { title: 'Thought, conscience and religion', titleMy: 'အတွေးအခေါ်၊ ယုံကြည်ချက်နှင့် ဘာသာရေးလွတ်လပ်ခွင့်', en: 'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.', my: 'လူတိုင်းတွင် လွတ်လပ်စွာ တွေးခေါ်ကြံဆခွင့်၊ အမှားအမှန် ဝေဖန်ပိုင်းခြားနိုင်ခွင့်နှင့် ကိုးကွယ်သည့်ဘာသာ လွတ်လပ်ခွင့် ရှိသည်။ အဆိုပါ အခွင့်အရေးများတွင် မိမိ၏ ကိုးကွယ်သည့်ဘာသာ သို့မဟုတ် သက်ဝင်ယုံကြည်ချက်ကို လွတ်လပ်စွာ ပြောင်းလဲနိုင်ခွင့်နှင့် တစ်ဦးတည်းဖြစ်စေ၊ အခြားသူများနှင့် စုပေါင်း၍ဖြစ်စေ၊ အများပြည်သူ ရှေ့မှောက်တွင်ဖြစ်စေ၊ သီးခြားဖြစ်စေ လွတ်လပ်စွာ သင်ကြားခြင်း၊ ကျင့်သုံးခြင်း၊ ဝတ်ပြုကိုးကွယ်ခြင်းနှင့် ဓလေ့ထုံးစံများကို လိုက်နာခြင်းတို့ဖြင့် မိမိ၏ ကိုးကွယ်သည့်ဘာသာ သို့မဟုတ် သက်ဝင်ယုံကြည်မှုကို ဖော်ထုတ်ပြသခွင့် ပါဝင်သည်။' },
    { title: 'Opinion and expression', titleMy: 'ထင်မြင်ယူဆချက်နှင့် ထုတ်ဖော်ပြောဆိုခွင့်', en: 'Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.', my: 'လူတိုင်းတွင် လွတ်လပ်စွာ ထုတ်ဖော်ပြောဆိုခွင့်နှင့် လွတ်လပ်စွာ သဘောထားပိုင်ခွင့် ရှိသည်။ အဆိုပါအခွင့်အရေးများတွင် အနှောင့်အယှက်မရှိဘဲ သဘောထားများ ကိုင်စွဲနိုင်ခွင့်နှင့် သတင်းအချက်အလက်များနှင့် အယူအဆများကို နယ်ပယ် အကန့်အသတ်မရှိ စာနယ်ဇင်း သို့မဟုတ် အခြားနည်းလမ်းတစ်ခုခုဖြင့် ရှာဖွေနိုင်ခွင့်၊ လက်ခံနိုင်ခွင့်နှင့် ဖြန့်ဝေနိုင်ခွင့်တို့လည်း ပါဝင်သည်။<' },
    { title: 'Peaceful assembly and association', titleMy: 'ငြိမ်းချမ်းစွာ စုဝေးအသင်းဖွဲ့ခွင့်', en: ' (1) Everyone has the right to freedom of peaceful assembly and association.<br>(2) No one may be compelled to belong to an association.', my: '(၁) လူတိုင်းတွင် ငြိမ်းချမ်းစွာ စုဝေးခွင့်နှင့် အသင်းအဖွဲ့ ဖွဲ့စည်းခွင့်တို့ကို လွတ်လပ်စွာ ကျင့်သုံးပိုင်ခွင့် ရှိသည်။<br>(၂) အသင်းအဖွဲ့တစ်ခုခုတွင် ပါဝင်စေရန် မည်သူ့ကိုမျှ အဓမ္မ မပြုရ။' },
    { title: 'Participation in government', titleMy: 'အစိုးရတွင် ပါဝင်ဆောင်ရွက်ခွင့်', en: '(1) Everyone has the right to take part in the government of his country, directly or through freely chosen representatives.<br>(2) Everyone has the right of equal access to public service in his country.<br>(3) The will of the people shall be the basis of the authority of government; this will shall be expressed in periodic and genuine elections which shall be by universal and equal suffrage and shall be held by secret vote or by equivalent free voting procedures.', my: ' (၁) လူတိုင်းတွင် မိမိနိုင်ငံ၏ အစိုးရအဖွဲ့၌ တိုက်ရိုက်ဖြစ်စေ၊ လွတ်လပ်စွာ ရွေးချယ်လိုက်သည့် ကိုယ်စားလှယ်များမှတစ်ဆင့်ဖြစ်စေ ပါဝင်ဆောင်ရွက်ပိုင်ခွင့် ရှိသည်။<br>(၂) လူတိုင်းတွင် မိမိနိုင်ငံ၏ ပြည်သူ့ဝန်ဆောင်မှုလုပ်ငန်းများ၌ တန်းတူညီမျှ ခံစားပိုင်ခွင့် ရှိသည်။<br>(၃) အစိုးရ၏ အုပ်ချုပ်မှုအာဏာသည် ပြည်သူလူထု၏ ဆန္ဒအပေါ်၌ အခြေခံရမည်။ ထိုဆန္ဒကို အချိန်အခါအလိုက် စစ်မှန်သော ရွေးကောက်ပွဲများဖြင့် ဖော်ထုတ်ရမည်။ အဆိုပါ ရွေးကောက်ပွဲများကိုလည်း လူတိုင်း ဆန္ဒမဲပေးနိုင်သည့် တန်းတူညီမျှသော ဆန္ဒမဲပေးပိုင်ခွင့်ဖြင့် ကျင်းပရမည်ဖြစ်ပြီး၊ လျှို့ဝှက်ဆန္ဒမဲပေးစနစ်ဖြင့်ဖြစ်စေ၊ သို့မဟုတ် လွတ်လပ်သော မဲပေးရေး နည်းလမ်းများနှင့်အညီဖြစ်စေ ကျင်းပရမည်။' },
    { title: 'Social security', titleMy: 'လူမှုဖူလုံရေး', en: 'Everyone, as a member of society, has the right to social security and is entitled to realization, through national effort and international co-operation and in accordance with the organization and resources of each State, of the economic, social and cultural rights indispensable for his dignity and the free development of his personality.', my: ' လူတိုင်းသည် လူ့အဖွဲ့အစည်း၏ အဖွဲ့ဝင်တစ်ဦးအနေဖြင့် လူမှုဖူလုံရေး အခွင့်အရေးကို ရရှိပိုင်ခွင့်ရှိသည်။ အဆိုပါ အခွင့်အရေးများတွင် မိမိ၏ ဂုဏ်သိက္ခာနှင့် မိမိ၏ ပုဂ္ဂလကရုပ်သွင် လွတ်လပ်စွာ ဖွံ့ဖြိုးတိုးတက်ရေးအတွက် မရှိမဖြစ် လိုအပ်သော စီးပွားရေး၊ လူမှုရေးနှင့် ယဉ်ကျေးမှုဆိုင်ရာ အခွင့်အရေးများကို နိုင်ငံအတွင်း အားထုတ်မှုဖြင့်လည်းကောင်း၊ နိုင်ငံတကာ ပူးပေါင်းဆောင်ရွက်မှုဖြင့်လည်းကောင်း၊ နိုင်ငံတစ်ခုစီ၏ ဖွဲ့စည်းပုံနှင့် သယံဇာတ အရင်းအမြစ်များအတိုင်း ရရှိခံစားနိုင်ခွင့် ပါဝင်သည်။' },
    { title: 'Right to work', titleMy: 'အလုပ်လုပ်ပိုင်ခွင့်', en: '(1) Everyone has the right to work, to free choice of employment, to just and favourable conditions of work and to protection against unemployment.<br>(2) Everyone, without any discrimination, has the right to equal pay for equal work.<br>(3) Everyone who works has the right to just and favourable remuneration ensuring for himself and his family an existence worthy of human dignity, and supplemented, if necessary, by other means of social protection.<br>(4) Everyone has the right to form and to join trade unions for the protection of his interests.', my: '(၁) လူတိုင်းတွင် အလုပ်လုပ်ပိုင်ခွင့်၊ အလုပ်အကိုင်ကို လွတ်လပ်စွာ ရွေးချယ်ပိုင်ခွင့်၊ တရားမျှတ၍ သင့်တော်သော အလုပ်အကိုင် အခြေအနေများကို ရရှိပိုင်ခွင့်နှင့် အလုပ်လက်မဲ့ဖြစ်ခြင်းမှ ကာကွယ်စောင့်ရှောက်မှု ခံယူပိုင်ခွင့် ရှိသည်။<br>(၂) လူတိုင်းတွင် ခွဲခြားဆက်ဆံခြင်းမရှိဘဲ တူညီသောအလုပ်အတွက် တူညီသော လုပ်ခလစာ ရရှိပိုင်ခွင့် ရှိသည်။<br>(၃) အလုပ်လုပ်သူတိုင်းတွင် မိမိနှင့် မိမိ၏ မိသားစုအတွက် လူ့ဂုဏ်သိက္ခာနှင့် ညီညွတ်သော နေထိုင်မှုအဆင့်အတန်းကို အာမခံနိုင်သည့် တရားမျှတ၍ သင့်တော်သော လုပ်ခလစာ ရရှိပိုင်ခွင့်ရှိပြီး၊ လိုအပ်ပါက အခြားသော လူမှုကာကွယ်စောင့်ရှောက်ရေး နည်းလမ်းများဖြင့် ဖြည့်စွက်ပေးရမည်။<br>(၄) လူတိုင်းတွင် မိမိ၏ အကျိုးစီးပွားများကို ကာကွယ်ရန် အလုပ်သမားအသင်းအဖွဲ့များ ဖွဲ့စည်းပိုင်ခွင့်နှင့် အသင်းအဖွဲ့များသို့ ဝင်ရောက်ပိုင်ခွင့် ရှိသည်။' },
    { title: 'Rest and leisure', titleMy: 'အနားယူခြင်းနှင့် အားလပ်ချိန်', en: ' Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.', my: 'လူတိုင်းတွင် အလုပ်ချိန် အကန့်အသတ်ကို သင့်တော်စွာ သတ်မှတ်ခြင်းနှင့် လစာပါသော အချိန်အခါလိုက် အလုပ်ပိတ်ရက်များ အပါအဝင် အနားယူခွင့်နှင့် အားလပ်ခွင့် ရှိသည်။' },
    { title: 'Adequate standard of living', titleMy: 'လုံလောက်သော လူနေမှုအဆင့်အတန်း', en: ' (1) Everyone has the right to a standard of living adequate for the health and well-being of himself and of his family, including food, clothing, housing and medical care and necessary social services, and the right to security in the event of unemployment, sickness, disability, widowhood, old age or other lack of livelihood in circumstances beyond his control.<br>(2) Motherhood and childhood are entitled to special care and assistance. All children, whether born in or out of wedlock, shall enjoy the same social protection.', my: '(၁) လူတိုင်းတွင် အစားအစာ၊ အဝတ်အထည်၊ နေအိမ်၊ ဆေးဝါးကုသမှုနှင့် လိုအပ်သော လူမှုရေး ဝန်ဆောင်မှုများ အပါအဝင် မိမိနှင့် မိမိမိသားစု၏ ကျန်းမာရေးနှင့် သာယာဝတ္ထုပြည်စုံရေးအတွက် လုံလောက်သော ဘဝအဆင့်အတန်းကို ရရှိပိုင်ခွင့်ရှိသည့်အပြင် အလုပ်လက်မဲ့ဖြစ်ခြင်း၊ မကျန်းမာခြင်း၊ မသန်စွမ်းခြင်း၊ မုဆိုးမဖြစ်ခြင်း၊ အသက်အရွယ်အိုမင်းခြင်း သို့မဟုတ် မိမိ မတတ်နိုင်သော အကြောင်းကြောင့် အသက်မွေးဝမ်းကျောင်း လုပ်ကိုင်နိုင်စွမ်း မရှိခြင်းတို့ ကြုံတွေ့ရပါက လုံခြုံမှုရရှိပိုင်ခွင့် ရှိသည်။<br>(၂) မိခင်များနှင့် ကလေးငယ်များသည် အထူးပြုစုစောင့်ရှောက်မှုနှင့် အကူအညီကို ရရှိပိုင်ခွင့် ရှိသည်။ တရားဝင် ထိမ်းမြားခြင်းဖြင့်ဖြစ်စေ၊ ထိမ်းမြားခြင်းမရှိဘဲဖြစ်စေ မွေးဖွားလာသော ကလေးအားလုံးသည် တူညီသော လူမှုကာကွယ်စောင့်ရှောက်မှုကို ခံစားပိုင်ခွင့် ရှိသည်။' },
    { title: 'Right to education', titleMy: 'ပညာသင်ယူခွင့်', en: ' (1) Everyone has the right to education. Education shall be free, at least in the elementary and fundamental stages. Elementary education shall be compulsory. Technical and professional education shall be made generally available and higher education shall be equally accessible to all on the basis of merit.<br>(2) Education shall be directed to the full development of the human personality and to the strengthening of respect for human rights and fundamental freedoms. It shall promote understanding, tolerance and friendship among all nations, racial or religious groups, and shall further the activities of the United Nations for the maintenance of peace.<br>(3) Parents have a prior right to choose the kind of education that shall be given to their children.', my: '(၁) လူတိုင်းတွင် ပညာသင်ကြားပိုင်ခွင့် ရှိသည်။ အနည်းဆုံး မူလတန်းနှင့် အခြေခံအဆင့်များ၌ ပညာရေးသည် အခမဲ့ ဖြစ်ရမည်။ မူလတန်းပညာရေးသည် မသင်မနေရ ဖြစ်ရမည်။ နည်းပညာနှင့် သက်မွေးဝမ်းကျောင်း ပညာရေးကို အများပြည်သူတို့ သင်ယူနိုင်ခွင့် ရှိစေရမည်ဖြစ်ပြီး၊ အဆင့်မြင့်ပညာရေးကိုလည်း အရည်အချင်းအပေါ် အခြေခံ၍ လူတိုင်း တန်းတူ သင်ယူနိုင်ခွင့် ရှိစေရမည်။<br>(၂) ပညာရေးသည် လူ့ပုဂ္ဂလကရုပ်သွင် အပြည့်အဝ ဖွံ့ဖြိုးတိုးတက်ရေးကိုလည်းကောင်း၊ လူ့အခွင့်အရေးနှင့် အခြေခံလွတ်လပ်ခွင့်များကို လေးစားမှု ပိုမိုခိုင်မာစေရေးကိုလည်းကောင်း ဦးတည်ရမည်။ ပညာရေးသည် နိုင်ငံအားလုံး၊ လူမျိုးစု သို့မဟုတ် ဘာသာရေးအုပ်စုများအကြား နားလည်မှု၊ သည်းခံမှုနှင့် ချစ်ကြည်ရင်းနှီးမှုကို မြှင့်တင်ပေးရမည် ဖြစ်သည့်အပြင် ငြိမ်းချမ်းရေး ထိန်းသိမ်းရေးအတွက် ကုလသမဂ္ဂ၏ ဆောင်ရွက်ချက်များကိုလည်း တိုးတက်စေရမည်။<br>(၃) မိဘတို့တွင် မိမိတို့၏ ရင်သွေးငယ်များအား ပေးအပ်ရမည့် ပညာရေးအမျိုးအစားကို ဦးစွာ ရွေးချယ်ပိုင်ခွင့် ရှိသည်။' },
    { title: 'Cultural and scientific life', titleMy: 'ယဉ်ကျေးမှုနှင့် သိပ္ပံဘဝ', en: '(1) Everyone has the right freely to participate in the cultural life of the community, to enjoy the arts and to share in scientific advancement and its benefits.<br>(2) Everyone has the right to the protection of the moral and material interests resulting from any scientific, literary or artistic production of which he is the author.', my: ' (၁) လူတိုင်းတွင် လူ့အဖွဲ့အစည်း၏ ယဉ်ကျေးမှုဘဝ၌ လွတ်လပ်စွာ ပါဝင်ဆောင်ရွက်ပိုင်ခွင့်၊ အနုပညာများကို ခံစားပိုင်ခွင့်နှင့် သိပ္ပံပညာ တိုးတက်မှုများ၌လည်းကောင်း၊ ထိုမှရရှိသော အကျိုးကျေးဇူးများ၌လည်းကောင်း မျှဝေခံစားပိုင်ခွင့် ရှိသည်။<br>(၂) လူတိုင်းတွင် မိမိဖန်တီးထားသော မည်သည့် သိပ္ပံဆိုင်ရာ၊ စာပေဆိုင်ရာ သို့မဟုတ် အနုပညာဆိုင်ရာ လက်ရာမှမဆို ဖြစ်ပေါ်လာသည့် စိတ်ဓာတ်ရေးရာနှင့် ရုပ်ဝတ္ထုရေးရာ အကျိုးစီးပွားများအတွက် ကာကွယ်စောင့်ရှောက်မှု ခံယူပိုင်ခွင့် ရှိသည်။' },
    { title: 'A rights-respecting order', titleMy: 'အခွင့်အရေးကို လေးစားသော အစီအစဉ်', en: 'Everyone is entitled to a social and international order in which the rights and freedoms set forth in this Declaration can be fully realized.', my: 'လူတိုင်းတွင် ဤကြေညာစာတမ်း၌ ဖော်ပြထားသော အခွင့်အရေးများနှင့် လွတ်လပ်ခွင့်များကို အပြည့်အဝ ရရှိခံစားနိုင်သည့် လူမှုရေးနှင့် အပြည်ပြည်ဆိုင်ရာ စနစ်ကောင်းတစ်ရပ်ကို ရရှိပိုင်ခွင့် ရှိသည်။' },
    { title: 'Duties to the community', titleMy: 'လူမှုအသိုင်းအဝိုင်းအပေါ် တာဝန်များ', en: '(1) Everyone has duties to the community in which alone the free and full development of his personality is possible.<br>(2) In the exercise of his rights and freedoms, everyone shall be subject only to such limitations as are determined by law solely for the purpose of securing due recognition and respect for the rights and freedoms of others and of meeting the just requirements of morality, public order and the general welfare in a democratic society.<br>(3) These rights and freedoms may in no case be exercised contrary to the purposes and principles of the United Nations.', my: '(၁) လူတိုင်းတွင် မိမိ၏ ပုဂ္ဂလကရုပ်သွင် လွတ်လပ်စွာနှင့် အပြည့်အဝ ဖွံ့ဖြိုးတိုးတက်နိုင်သည့် တစ်ခုတည်းသော စုပေါင်းနေထိုင်ရာ လူ့အဖွဲ့အစည်းအပေါ်၌ ဝတ္တရားများ ရှိကြသည်။<br>(၂) မိမိ၏ အခွင့်အရေးများနှင့် လွတ်လပ်ခွင့်များကို ကျင့်သုံးရာတွင် လူတိုင်းသည် အခြားသူများ၏ အခွင့်အရေးများနှင့် လွတ်လပ်ခွင့်များကို ထိုက်တန်စွာ အသိအမှတ်ပြု လေးစားစေရန်နှင့် ဒီမိုကရေစီ လူ့အဖွဲ့အစည်းတွင် စီလဓမ္မ၊ အများပြည်သူ အေးချမ်းသာယာရေးနှင့် အများပြည်သူဆိုင်ရာ သာယာဝတ္ထုပြည်စုံရေးတို့အတွက် တရားမျှတသော လိုအပ်ချက်များကို ဖြည့်ဆည်းပေးရန် အလို့ငှာ ဥပဒေက ပြဋ္ဌာန်းထားသည့် အကန့်အသတ်များကိုသာ လိုက်နာရမည်။<br>(၃) အဆိုပါ အခွင့်အရေးများနှင့် လွတ်လပ်ခွင့်များကို ကုလသမဂ္ဂ၏ ရည်ရွယ်ချက်များနှင့် အခြေခံမူများကို ဆန့်ကျင်၍ မည်သည့်အခါမျှ ကျင့်သုံးခြင်း မပြုရ။' },
    { title: 'No destruction of rights', titleMy: 'အခွင့်အရေးများကို မဖျက်ဆီးရ', en: 'Nothing in this Declaration may be interpreted as implying for any State, group or person any right to engage in any activity or to perform any act aimed at the destruction of any of the rights and freedoms set forth herein.', my: 'ဤကြေညာစာတမ်းပါ မည်သည့်အချက်ကိုမျှ နိုင်ငံတစ်ခုခု၊ အဖွဲ့အစည်းတစ်ခုခု သို့မဟုတ် ပုဂ္ဂိုလ်တစ်ဦးဦးအား ဤကြေညာစာတမ်းတွင် ဖော်ပြထားသည့် အခွင့်အရေးများနှင့် လွတ်လပ်ခွင့်များအနက် မည်သည့်အခွင့်အရေးနှင့် လွတ်လပ်ခွင့်ကိုမဆို ဖျက်ဆီးပစ်ရန် ရည်ရွယ်သော လုပ်ဆောင်မှုတစ်ခုခု၌ ပါဝင်ဆောင်ရွက်ခွင့် သို့မဟုတ် ပြုလုပ်မှုတစ်ခုခုကို ဆောင်ရွက်ခွင့် ပေးသည်ဟု အဓိပ္ပာယ်မကောက်ယူရ။' }
  ];

  const groups = [
    { label: 'Foundations', labelMy: 'အခြေခံမူများ', start: 1, end: 2, accent: '#149fc5' },
    { label: 'Civil & political', labelMy: 'နိုင်ငံသားနှင့် နိုင်ငံရေး', start: 3, end: 21, accent: '#3979c9' },
    { label: 'Economic, social & cultural', labelMy: 'စီးပွား၊ လူမှုနှင့် ယဉ်ကျေးမှု', start: 22, end: 27, accent: '#158b78' },
    { label: 'Collective responsibility', labelMy: 'အများဆိုင်ရာ တာဝန်', start: 28, end: 30, accent: '#7759b7' }
  ];

  const myanmarDigits = '၀၁၂၃၄၅၆၇၈၉';
  const isMyanmar = () => document.body.classList.contains('lang-my');
  const localizeDigits = (value) => isMyanmar()
    ? String(value).replace(/\d/g, (digit) => myanmarDigits[digit])
    : String(value);
  const twoDigits = (number) => localizeDigits(String(number).padStart(2, '0'));
  const articleLabel = (number) => `${isMyanmar() ? 'အပိုဒ်' : 'Article'} ${twoDigits(number)}`;
  let activeArticle = 1;
  let transitionTimer;

  function initialiseArticleExplorer() {
    const root = document.querySelector('.articles-page');
    if (!root || root.dataset.articleAppReady === 'true') return;
    root.dataset.articleAppReady = 'true';
    const pageContent = root.closest('#page-content') || document;

    const elements = {
      groups: root.querySelector('#article-groups'),
      select: root.querySelector('#article-select'),
      reader: root.querySelector('#article-reader'),
      imageOpen: root.querySelector('#article-image-open'),
      image: root.querySelector('#article-image'),
      lightbox: pageContent.querySelector('#article-lightbox'),
      lightboxImage: pageContent.querySelector('#article-lightbox-image'),
      lightboxCaption: pageContent.querySelector('#article-lightbox-caption'),
      lightboxClose: pageContent.querySelector('#article-lightbox-close'),
      visualNumber: root.querySelector('#article-visual-number'),
      number: root.querySelector('#article-number'),
      category: root.querySelector('#article-category'),
      title: root.querySelector('#article-title'),
      copyEn: root.querySelector('#article-copy-en'),
      copyMy: root.querySelector('#article-copy-my'),
      progressCurrent: root.querySelector('#article-progress-current'),
      progressTotal: root.querySelector('#article-progress-total'),
      progressBar: root.querySelector('#article-progress-bar'),
      previous: root.querySelector('#article-previous'),
      next: root.querySelector('#article-next'),
      previousLabel: root.querySelector('#previous-label'),
      nextLabel: root.querySelector('#next-label')
    };

    const categoryFor = (number) => groups.find((group) => number >= group.start && number <= group.end);
    const neighbour = (offset) => ((activeArticle - 1 + offset + articles.length) % articles.length) + 1;

    function renderArticleNavigation() {
      const optionFragment = document.createDocumentFragment();
      articles.forEach((article, index) => {
        const option = document.createElement('option');
        option.value = String(index + 1);
        option.textContent = `${articleLabel(index + 1)} — ${isMyanmar() ? article.titleMy : article.title}`;
        optionFragment.append(option);
      });
      elements.select.replaceChildren(optionFragment);
      elements.select.value = String(activeArticle);

      elements.groups.replaceChildren();
      groups.forEach((group) => {
        const section = document.createElement('section');
        section.className = 'article-group';
        const heading = document.createElement('h3');
        heading.className = 'article-group__title';
        heading.textContent = isMyanmar() ? group.labelMy : group.label;
        const grid = document.createElement('div');
        grid.className = 'article-group__grid';

        for (let number = group.start; number <= group.end; number += 1) {
          const button = document.createElement('button');
          button.className = 'article-index-button';
          button.type = 'button';
          button.dataset.article = String(number);
          button.textContent = twoDigits(number);
          button.setAttribute('aria-label', isMyanmar()
            ? `${articleLabel(number)} ကိုဖွင့်ရန်: ${articles[number - 1].titleMy}`
            : `Open ${articleLabel(number)}: ${articles[number - 1].title}`);
          button.classList.toggle('is-active', number === activeArticle);
          button.setAttribute('aria-pressed', String(number === activeArticle));
          button.addEventListener('click', () => renderArticle(number));
          grid.append(button);
        }
        section.append(heading, grid);
        elements.groups.append(section);
      });
    }

    function syncLanguageText() {
      const article = articles[activeArticle - 1];
      const group = categoryFor(activeArticle);
      const title = isMyanmar() ? article.titleMy : article.title;
      elements.title.textContent = title;
      elements.category.textContent = isMyanmar() ? group.labelMy : group.label;
      elements.visualNumber.textContent = twoDigits(activeArticle);
      elements.number.textContent = articleLabel(activeArticle);
      elements.progressCurrent.textContent = twoDigits(activeArticle);
      elements.progressTotal.textContent = localizeDigits(articles.length);
      elements.previousLabel.textContent = articleLabel(neighbour(-1));
      elements.nextLabel.textContent = articleLabel(neighbour(1));
      elements.image.alt = isMyanmar() ? `${articleLabel(activeArticle)} အတွက် ရုပ်ပုံ` : `Illustration for ${articleLabel(activeArticle)}: ${article.title}`;
      elements.imageOpen.setAttribute('aria-label', isMyanmar() ? `${articleLabel(activeArticle)} ရုပ်ပုံကိုဖွင့်ရန်` : `Open ${articleLabel(activeArticle)} illustration: ${article.title}`);
      elements.lightboxImage.alt = elements.image.alt;
      elements.lightboxCaption.textContent = `${articleLabel(activeArticle)} — ${title}`;
      renderArticleNavigation();
    }

    function updateAddress(number) {
      const url = new URL(window.location.href);
      url.searchParams.set('article', String(number));
      url.hash = 'articles';
      history.replaceState({ ...(history.state || {}), article: number }, '', url);
    }

    function updateContent(number) {
      const article = articles[number - 1];
      const group = categoryFor(number);
      const previousNumber = neighbour(-1);
      const nextNumber = neighbour(1);
      const padded = twoDigits(number);

      elements.image.src = `images/Article-${number}.jpg`;
      elements.image.alt = `Illustration for UDHR Article ${number}: ${article.title}`;
      elements.imageOpen.setAttribute('aria-label', `Open Article ${number} illustration: ${article.title}`);
      elements.lightboxImage.src = `images/Article-${number}.jpg`;
      elements.lightboxImage.alt = `Enlarged illustration for UDHR Article ${number}: ${article.title}`;
      elements.lightboxCaption.textContent = `UDHR Article ${number} — ${article.title}`;
      root.style.setProperty('--article-accent', group.accent);
      elements.visualNumber.textContent = padded;
      elements.number.textContent = `Article ${padded}`;
      elements.copyEn.textContent = article.en.replace(/<br\s*\/?\s*>/gi, '\n');
      elements.copyMy.textContent = article.my.replace(/<br\s*\/?\s*>/gi, '\n');
      elements.progressCurrent.textContent = padded;
      elements.progressBar.style.width = `${(number / articles.length) * 100}%`;
      elements.previousLabel.textContent = `Article ${twoDigits(previousNumber)}`;
      elements.nextLabel.textContent = `Article ${twoDigits(nextNumber)}`;
      elements.select.value = String(number);
      elements.groups.querySelectorAll('.article-index-button').forEach((button) => {
        const selected = Number(button.dataset.article) === number;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      syncLanguageText();
      updateAddress(number);
    }

    function renderArticle(number, animate = true) {
      const safeNumber = Math.min(articles.length, Math.max(1, Number(number) || 1));
      if (safeNumber === activeArticle && root.dataset.hasRendered === 'true') {
        syncLanguageText();
        return;
      }

      window.clearTimeout(transitionTimer);
      activeArticle = safeNumber;

      if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        updateContent(safeNumber);
        root.dataset.hasRendered = 'true';
        return;
      }

      elements.reader.classList.remove('is-entering');
      elements.reader.classList.add('is-changing');
      transitionTimer = window.setTimeout(() => {
        updateContent(safeNumber);
        elements.reader.classList.remove('is-changing');
        void elements.reader.offsetWidth;
        elements.reader.classList.add('is-entering');
        window.setTimeout(() => elements.reader.classList.remove('is-entering'), 540);
      }, 175);
      root.dataset.hasRendered = 'true';
    }

    elements.select.addEventListener('change', (event) => renderArticle(event.target.value));
    elements.previous.addEventListener('click', () => renderArticle(neighbour(-1)));
    elements.next.addEventListener('click', () => renderArticle(neighbour(1)));
    document.addEventListener('hrh:languagechange', syncLanguageText);

    const closeLightbox = () => {
      elements.lightbox.classList.add('hidden');
      elements.lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('article-lightbox-open');
      elements.imageOpen.focus();
    };

    elements.imageOpen.addEventListener('click', () => {
      elements.lightbox.classList.remove('hidden');
      elements.lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('article-lightbox-open');
      elements.lightboxClose.focus();
    });
    elements.lightbox.querySelectorAll('[data-lightbox-close], #article-lightbox-close').forEach((button) => button.addEventListener('click', closeLightbox));
    elements.lightbox.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeLightbox();
    });

    root.addEventListener('keydown', (event) => {
      if (event.target.matches('input, select, textarea, button, a')) return;
      if (event.key === 'ArrowLeft') renderArticle(neighbour(-1));
      if (event.key === 'ArrowRight') renderArticle(neighbour(1));
    });

    const requested = Number(new URL(window.location.href).searchParams.get('article'));
    activeArticle = Number.isInteger(requested) && requested >= 1 && requested <= 30 ? requested : 1;
    updateContent(activeArticle);
    root.dataset.hasRendered = 'true';
  }

  document.addEventListener('DOMContentLoaded', initialiseArticleExplorer);
  document.addEventListener('hrh:page-ready', initialiseArticleExplorer);
})();
