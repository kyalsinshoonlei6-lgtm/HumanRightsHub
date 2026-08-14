/* Human Rights Hub quiz: local, accessible, bilingual and score-aware. */
document.addEventListener('DOMContentLoaded', () => {
  const coreQuestions = [
    { topic: 'UDHR', icon: 'fa-landmark', correct: 0, en: { q: 'In which year was the Universal Declaration of Human Rights adopted?', o: ['1948', '1958', '1968', '1978'], e: 'The UN General Assembly adopted the Universal Declaration of Human Rights on 10 December 1948.' }, my: { q: 'အပြည်ပြည်ဆိုင်ရာ လူ့အခွင့်အရေးကြေညာစာတမ်းကို မည်သည့်နှစ်တွင် အတည်ပြုခဲ့သနည်း?', o: ['၁၉၄၈', '၁၉၅၈', '၁၉၆၈', '၁၉၇၈'], e: 'ကုလသမဂ္ဂ အထွေထွေညီလာခံက ၁၉၄၈ ခုနှစ် ဒီဇင်ဘာ ၁၀ ရက်တွင် UDHR ကို အတည်ပြုခဲ့သည်။' } },
    { topic: 'Article 1', icon: 'fa-people-group', correct: 0, en: { q: 'Article 1 says that all human beings are born free and equal in what?', o: ['Dignity and rights', 'Wealth and status', 'Language and religion', 'Education and employment'], e: 'Article 1 places equal dignity and rights at the foundation of human rights.' }, my: { q: 'အပိုဒ် ၁ အရ လူသားအားလုံးသည် မည်သည့်အရာတွင် လွတ်လပ်၍ တန်းတူညီမျှစွာ မွေးဖွားလာကြသနည်း?', o: ['ဂုဏ်သိက္ခာနှင့် အခွင့်အရေး', 'ချမ်းသာမှုနှင့် အဆင့်အတန်း', 'ဘာသာစကားနှင့် ကိုးကွယ်မှု', 'ပညာရေးနှင့် အလုပ်အကိုင်'], e: 'အပိုဒ် ၁ သည် ဂုဏ်သိက္ခာနှင့် အခွင့်အရေး တန်းတူညီမျှမှုကို လူ့အခွင့်အရေး၏ အခြေခံအဖြစ် သတ်မှတ်ထားသည်။' } },
    { topic: 'Article 3', icon: 'fa-heart-pulse', correct: 0, en: { q: 'Which right is protected by Article 3 of the UDHR?', o: ['Life, liberty and security of person', 'A paid holiday', 'A political office', 'Private property only'], e: 'Article 3 protects life, liberty, and security of person.' }, my: { q: 'UDHR အပိုဒ် ၃ တွင် မည်သည့်အခွင့်အရေးကို ကာကွယ်ပေးထားသနည်း?', o: ['အသက်ရှင်ခွင့်၊ လွတ်လပ်ခွင့်နှင့် လုံခြုံခွင့်', 'လစာပါသော အားလပ်ရက်', 'နိုင်ငံရေးရာထူး', 'ကိုယ်ပိုင်ပစ္စည်းသာ'], e: 'အပိုဒ် ၃ သည် အသက်ရှင်ခွင့်၊ လွတ်လပ်ခွင့်နှင့် ပုဂ္ဂိုလ်လုံခြုံခွင့်ကို ကာကွယ်ပေးထားသည်။' } },
    { topic: 'Article 5', icon: 'fa-shield-heart', correct: 0, en: { q: 'No one shall be subjected to torture or to cruel, inhuman or degrading treatment. Which article states this?', o: ['Article 5', 'Article 10', 'Article 15', 'Article 27'], e: 'Article 5 expressly prohibits torture and cruel, inhuman, or degrading treatment or punishment.' }, my: { q: 'မည်သူမျှ ညှဉ်းပန်းနှိပ်စက်မှု သို့မဟုတ် ရက်စက်၊ လူမဆန်၊ ဂုဏ်သိက္ခာကျဆင်းစေသော ဆက်ဆံမှု မခံရစေရန် မည်သည့်အပိုဒ်တွင် ဖော်ပြထားသနည်း?', o: ['အပိုဒ် ၅', 'အပိုဒ် ၁၀', 'အပိုဒ် ၁၅', 'အပိုဒ် ၂၇'], e: 'အပိုဒ် ၅ သည် ညှဉ်းပန်းနှိပ်စက်မှုနှင့် ရက်စက်သော ဆက်ဆံမှုများကို တားမြစ်ထားသည်။' } },
    { topic: 'Article 7', icon: 'fa-scale-balanced', correct: 0, en: { q: 'Equality before the law means that:', o: ['Everyone is entitled to equal protection of the law', 'Only citizens may use courts', 'Laws apply differently by wealth', 'Officials are above the law'], e: 'Article 7 says all are equal before the law and entitled without discrimination to equal protection.' }, my: { q: 'ဥပဒေရှေ့တွင် တန်းတူညီမျှခြင်းဆိုသည်မှာ မည်သို့ဆိုလိုသနည်း?', o: ['လူတိုင်းသည် ဥပဒေ၏ တန်းတူကာကွယ်မှုကို ရရှိခွင့်ရှိသည်', 'နိုင်ငံသားများသာ တရားရုံးသုံးခွင့်ရှိသည်', 'ချမ်းသာမှုအလိုက် ဥပဒေကွဲပြားသည်', 'အရာရှိများသည် ဥပဒေအထက်တွင်ရှိသည်'], e: 'အပိုဒ် ၇ အရ လူတိုင်းသည် ဥပဒေရှေ့တွင် တန်းတူညီမျှပြီး ခွဲခြားမှုမရှိသော ကာကွယ်မှုကို ရရှိခွင့်ရှိသည်။' } },
    { topic: 'Article 8', icon: 'fa-gavel', correct: 0, en: { q: 'When a fundamental right is violated, what does Article 8 support?', o: ['An effective remedy by competent national tribunals', 'Ignoring the violation', 'Punishing the person who reports it', 'A remedy only for public officials'], e: 'Article 8 protects the right to an effective remedy for acts violating fundamental rights.' }, my: { q: 'အခြေခံအခွင့်အရေး ချိုးဖောက်ခံရသည့်အခါ အပိုဒ် ၈ က မည်သည့်အရာကို ထောက်ခံသနည်း?', o: ['အရည်အချင်းရှိသော တရားရုံးမှ ထိရောက်သော ကုစားခွင့်', 'ချိုးဖောက်မှုကို လျစ်လျူရှုခြင်း', 'တိုင်ကြားသူကို အပြစ်ပေးခြင်း', 'အရာရှိများအတွက်သာ ကုစားခြင်း'], e: 'အပိုဒ် ၈ သည် အခြေခံအခွင့်အရေးများ ချိုးဖောက်ခံရသည့်အခါ ထိရောက်သော ကုစားခွင့်ကို ကာကွယ်ထားသည်။' } },
    { topic: 'Article 12', icon: 'fa-user-shield', correct: 0, en: { q: 'Which area is protected from arbitrary interference under Article 12?', o: ['Privacy, family, home and correspondence', 'Only public speeches', 'A person’s favourite sport', 'Government budgets only'], e: 'Article 12 protects privacy, family, home, correspondence, honour, and reputation.' }, my: { q: 'အပိုဒ် ၁၂ အရ မတရားဝင် ဝင်ရောက်စွက်ဖက်မှုမှ မည်သည့်အရာကို ကာကွယ်ပေးထားသနည်း?', o: ['ကိုယ်ရေးကိုယ်တာ၊ မိသားစု၊ အိမ်နှင့် စာပေးစာယူ', 'အများပြည်သူ မိန့်ခွန်းများသာ', 'နှစ်သက်ရာ အားကစား', 'အစိုးရဘတ်ဂျက်သာ'], e: 'အပိုဒ် ၁၂ သည် ကိုယ်ရေးကိုယ်တာ၊ မိသားစု၊ အိမ်၊ စာပေးစာယူ၊ ဂုဏ်သိက္ခာနှင့် နာမည်ကောင်းကို ကာကွယ်ပေးသည်။' } },
    { topic: 'Article 14', icon: 'fa-route', correct: 0, en: { q: 'Article 14 recognizes the right to seek and enjoy what from persecution?', o: ['Asylum in other countries', 'A free passport', 'A private army', 'A voting exemption'], e: 'Article 14 recognizes the right to seek and enjoy asylum from persecution.' }, my: { q: 'အပိုဒ် ၁၄ သည် ညှဉ်းပန်းမှုမှ လွတ်မြောက်ရန် မည်သည့်အခွင့်အရေးကို အသိအမှတ်ပြုသနည်း?', o: ['အခြားနိုင်ငံများတွင် ခိုလှုံခွင့် တောင်းခံနိုင်ခြင်း', 'အခမဲ့ နိုင်ငံကူးလက်မှတ်', 'ကိုယ်ပိုင်စစ်တပ်', 'မဲပေးခွင့်မှ ကင်းလွတ်ခြင်း'], e: 'အပိုဒ် ၁၄ သည် ညှဉ်းပန်းမှုမှ လွတ်မြောက်ရန် ခိုလှုံခွင့် တောင်းခံနိုင်ခြင်းကို အသိအမှတ်ပြုထားသည်။' } },
    { topic: 'Article 15', icon: 'fa-id-card', correct: 0, en: { q: 'What does Article 15 say every person has a right to?', o: ['A nationality', 'A government job', 'Own a business', 'Free travel anywhere'], e: 'Article 15 recognizes the right to a nationality and protection from arbitrary deprivation of it.' }, my: { q: 'အပိုဒ် ၁၅ အရ လူတိုင်းတွင် မည်သည့်အခွင့်အရေးရှိသနည်း?', o: ['နိုင်ငံသားဖြစ်ခွင့်', 'အစိုးရအလုပ် ရရှိခွင့်', 'စီးပွားရေးလုပ်ငန်း ပိုင်ဆိုင်ခွင့်', 'မည်သည့်နေရာမဆို အခမဲ့သွားလာခွင့်'], e: 'အပိုဒ် ၁၅ သည် နိုင်ငံသားဖြစ်ခွင့်နှင့် ယင်းနိုင်ငံသားကို မတရားစွန့်လွှတ်မခံရခွင့်ကို အသိအမှတ်ပြုထားသည်။' } },
    { topic: 'Article 18', icon: 'fa-hands-praying', correct: 0, en: { q: 'Freedom of thought, conscience and religion includes the freedom to:', o: ['Change a religion or belief', 'Force others to believe', 'Deny others’ beliefs', 'Punish peaceful belief'], e: 'Article 18 includes freedom to change religion or belief and to manifest it peacefully.' }, my: { q: 'အတွေးအခေါ်၊ ယုံကြည်ချက်နှင့် ကိုးကွယ်မှု လွတ်လပ်ခွင့်တွင် မည်သည့်အရာ ပါဝင်သနည်း?', o: ['ကိုးကွယ်မှု သို့မဟုတ် ယုံကြည်ချက် ပြောင်းလဲခွင့်', 'အခြားသူများကို အတင်းယုံကြည်စေခြင်း', 'အခြားသူ၏ ယုံကြည်ချက်ကို ငြင်းပယ်ခြင်း', 'ငြိမ်းချမ်းသော ယုံကြည်မှုကို အပြစ်ပေးခြင်း'], e: 'အပိုဒ် ၁၈ တွင် ကိုးကွယ်မှု သို့မဟုတ် ယုံကြည်ချက်ကို ပြောင်းလဲခွင့်နှင့် ငြိမ်းချမ်းစွာ ထုတ်ဖော်ကျင့်သုံးခွင့် ပါဝင်သည်။' } },
    { topic: 'Article 19', icon: 'fa-comment-dots', correct: 0, en: { q: 'Freedom of opinion and expression includes the freedom to:', o: ['Seek, receive and impart information and ideas', 'Spread threats without consequence', 'Silence all disagreement', 'Access information only with permission'], e: 'Article 19 protects opinions and the ability to seek, receive, and impart information and ideas.' }, my: { q: 'ထင်မြင်ယူဆခွင့်နှင့် ထုတ်ဖော်ပြောဆိုခွင့်တွင် မည်သည့်အရာ ပါဝင်သနည်း?', o: ['သတင်းအချက်အလက်နှင့် အယူအဆများကို ရှာဖွေ၊ လက်ခံ၊ ဖြန့်ဝေနိုင်ခြင်း', 'ခြိမ်းခြောက်မှုများကို အပြစ်မရှိဘဲ ဖြန့်ဝေခြင်း', 'သဘောမတူမှုအားလုံးကို နှုတ်ပိတ်ခြင်း', 'ခွင့်ပြုချက်ရမှသာ သတင်းရယူခြင်း'], e: 'အပိုဒ် ၁၉ သည် ထင်မြင်ယူဆခွင့်နှင့် သတင်းအချက်အလက်၊ အယူအဆများကို ရှာဖွေ၊ လက်ခံ၊ ဖြန့်ဝေခွင့်ကို ကာကွယ်ပေးသည်။' } },
    { topic: 'Article 20', icon: 'fa-people-arrows-left-right', correct: 0, en: { q: 'Which activity is protected by Article 20?', o: ['Peaceful assembly and association', 'Compulsory membership of any group', 'Violent intimidation', 'Secret punishment'], e: 'Article 20 protects peaceful assembly and association, and no one may be compelled to belong to an association.' }, my: { q: 'အပိုဒ် ၂၀ သည် မည်သည့်လှုပ်ရှားမှုကို ကာကွယ်ပေးသနည်း?', o: ['ငြိမ်းချမ်းစွာ စုဝေးခြင်းနှင့် အသင်းအဖွဲ့ဖွဲ့စည်းခြင်း', 'မည်သည့်အဖွဲ့မဆို အတင်းအကျပ် ဝင်ခိုင်းခြင်း', 'အကြမ်းဖက်ခြိမ်းခြောက်ခြင်း', 'လျှို့ဝှက်အပြစ်ပေးခြင်း'], e: 'အပိုဒ် ၂၀ သည် ငြိမ်းချမ်းစွာ စုဝေးခြင်းနှင့် အသင်းအဖွဲ့ဖွဲ့စည်းခွင့်ကို ကာကွယ်ပြီး မည်သူ့ကိုမျှ အဖွဲ့ဝင်ဖြစ်ရန် အတင်းအကျပ် မခိုင်းရဟု ဆိုထားသည်။' } },
    { topic: 'Article 23', icon: 'fa-briefcase', correct: 0, en: { q: 'Which principle belongs to the right to work?', o: ['Equal pay for equal work', 'No safe conditions', 'Forced labour for everyone', 'Work without fair remuneration'], e: 'Article 23 recognizes fair and favourable conditions of work and equal pay for equal work.' }, my: { q: 'အလုပ်လုပ်ပိုင်ခွင့်တွင် မည်သည့်အခြေခံမူ ပါဝင်သနည်း?', o: ['တူညီသောအလုပ်အတွက် တူညီသောလစာ', 'လုံခြုံသော အလုပ်အခြေအနေမလိုခြင်း', 'လူတိုင်းကို အတင်းအကျပ် အလုပ်ခိုင်းခြင်း', 'မျှတသောလစာမရှိဘဲ အလုပ်လုပ်ခြင်း'], e: 'အပိုဒ် ၂၃ သည် မျှတကောင်းမွန်သော အလုပ်အခြေအနေနှင့် တူညီသောအလုပ်အတွက် တူညီသောလစာကို အသိအမှတ်ပြုထားသည်။' } },
    { topic: 'Article 24', icon: 'fa-clock', correct: 0, en: { q: 'Article 24 recognizes the right to:', o: ['Rest and leisure, including reasonable working hours', 'Work without any break', 'Unlimited compulsory overtime', 'Retire only with permission'], e: 'Article 24 recognizes rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.' }, my: { q: 'အပိုဒ် ၂၄ သည် မည်သည့်အခွင့်အရေးကို အသိအမှတ်ပြုသနည်း?', o: ['သင့်တင့်သော အလုပ်ချိန်အပါအဝင် အနားယူခြင်းနှင့် အားလပ်ချိန်', 'အနားမယူဘဲ အလုပ်လုပ်ခြင်း', 'အကန့်အသတ်မရှိ အချိန်ပိုခိုင်းခြင်း', 'ခွင့်ပြုချက်ဖြင့်သာ အနားယူခြင်း'], e: 'အပိုဒ် ၂၄ သည် သင့်တင့်သော အလုပ်ချိန်ကန့်သတ်မှုနှင့် လစာပါသော အားလပ်ရက်အပါအဝင် အနားယူခြင်းနှင့် အားလပ်ချိန်ကို အသိအမှတ်ပြုထားသည်။' } },
    { topic: 'Article 25', icon: 'fa-house', correct: 0, en: { q: 'An adequate standard of living includes which of the following?', o: ['Food, clothing, housing and medical care', 'Luxury goods only', 'A government title', 'A private security force'], e: 'Article 25 includes food, clothing, housing, medical care, and necessary social services.' }, my: { q: 'လုံလောက်သော လူနေမှုအဆင့်အတန်းတွင် မည်သည့်အရာများ ပါဝင်သနည်း?', o: ['အစားအစာ၊ အဝတ်အစား၊ နေအိမ်နှင့် ဆေးကုသမှု', 'ဇိမ်ခံပစ္စည်းများသာ', 'အစိုးရရာထူး', 'ကိုယ်ပိုင်လုံခြုံရေးတပ်ဖွဲ့'], e: 'အပိုဒ် ၂၅ တွင် အစားအစာ၊ အဝတ်အစား၊ နေအိမ်၊ ဆေးကုသမှုနှင့် လိုအပ်သော လူမှုဝန်ဆောင်မှုများ ပါဝင်သည်။' } },
    { topic: 'Article 26', icon: 'fa-graduation-cap', correct: 0, en: { q: 'What does Article 26 recognize as a right?', o: ['Education', 'Only university education', 'Education only for citizens with wealth', 'No access to learning'], e: 'Article 26 recognizes the right to education and states that elementary education should be free and compulsory.' }, my: { q: 'အပိုဒ် ၂၆ သည် မည်သည့်အရာကို အခွင့်အရေးအဖြစ် အသိအမှတ်ပြုသနည်း?', o: ['ပညာသင်ယူခွင့်', 'တက္ကသိုလ်ပညာသာ', 'ချမ်းသာသော နိုင်ငံသားများအတွက်သာ ပညာရေး', 'သင်ယူခွင့်မရှိခြင်း'], e: 'အပိုဒ် ၂၆ သည် ပညာသင်ယူခွင့်ကို အသိအမှတ်ပြုပြီး မူလတန်းပညာကို အခမဲ့နှင့် မသင်မနေရ ဖြစ်သင့်သည်ဟု ဖော်ပြထားသည်။' } }
  ];

  const importedQuestions = [
  { id: 1, icon: "fa-gavel", question: { my: "အောင်ဆန်းသည် လမ်းခင်းရာတွင် ဘတ်ဂျက်မကောက်မတိုင်ဘဲ အလွဲသုံးစားလုပ်သည်ကို တွေ့ရှိခဲ့သည်။ မည်သည့်လုပ်ပိုင်ခွင့်ကို သုံးသင့်သနည်း။", en: "Aung San found budget misappropriation in road construction. What right should he exercise?" }, options: { my: ["တရားဝင် တိုင်ကြားစာပေးပို့၍ ထောက်ပြခွင့်", "ဘာမှမသိသလိုနေမည်", "လူမှုကွန်ရက်တွင် ဆဲဆိုခွင့်", "အထက်လူကြီး ခွင့်ပြုမှပြောခွင့်"], en: ["Submit formal complaint & criticize legally", "Pretend to know nothing", "Insult publicly on social media", "Speak only after approval"] }, correct: 0, explanation: { my: "အဂတိလိုက်စားမှုကို တရားဝင်တိုင်ကြားပိုင်ခွင့်ရှိပါသည်။", en: "Citizens hold the right to petition and report corruption legally." } },
  { id: 2, icon: "fa-hands-praying", question: { my: "နိုင်ငံသားတစ်ယောက်အနေဖြင့် မည်သည့် ဘာသာတရားကိုမဆို လွတ်လပ်စွာ ကိုးကွယ်ခွင့် ရှိပါသလား။", en: "Does a citizen have the right to freely practice any religion?" }, options: { my: ["ရှိပါသည်", "မရှိပါ", "အစိုးရခွင့်ပြုမှရမည်", "လူများသည့်ဘာသာမှရမည်"], en: ["Yes", "No", "Only with government permission", "Only for majority religion"] }, correct: 0, explanation: { my: "လွတ်လပ်စွာ ကိုးကွယ်ခွင့်သည် အခြေခံ မွေးရာပါ အခွင့်အရေးဖြစ်ပါသည်။", en: "Freedom of thought, conscience, and religion is a fundamental right." } },
  { id: 3, icon: "fa-briefcase", question: { my: "အလုပ်ရှင်တစ်ဦးသည် အသက် ၁၈ နှစ်ပြည့်ပြီးသူကို တစ်ပတ်လျှင် မည်မျှ အလုပ်ခိုင်းခွင့်ရှိသနည်း။", en: "Standard maximum working hours per week for adults normally is:" }, options: { my: ["နာရီ ၄၀ မှ ၄၈ နာရီ", "နာရီ ၇၀", "နာရီ ၁၀၀", "မိမိစိတ်ကြိုက်"], en: ["40 to 48 hours", "70 hours", "100 hours", "Unlimited"] }, correct: 0, explanation: { my: "အလုပ်သမားဥပဒေအရ တစ်ပတ်လျှင် နာရီ ၄၈ နာရီထက် မပိုရပါ။", en: "Standard labor law mandates max 48 working hours per week." } },
  { id: 4, icon: "fa-graduation-cap", question: { my: "ကလေးငယ်တိုင်း ပညာသင်ကြားခွင့် မည်သို့ရှိသနည်း။", en: "What is the education right for every child?" }, options: { my: ["အခြေခံပညာ အခမဲ့ သင်ကြားခွင့်ရှိရမည်", "ပိုက်ဆံရှိမှ သင်ခွင့်ရှိမည်", "အမျိုးသားများသာ သင်ရမည်", "အတန်းကြီးမှ သင်ရမည်"], en: ["Right to free basic education", "Only if rich", "Only for boys", "Only for adults"] }, correct: 0, explanation: { my: "ကလေးသူငယ်တိုင်း အခြေခံပညာကို အခမဲ့ သင်ကြားခွင့်ရှိသည်။", en: "Primary and basic education must be free and accessible to all children." } },
  { id: 5, icon: "fa-building-circle-xmark", question: { my: "အလုပ်ခွင်တွင် မတရား ပရိယာယ်ဖြင့် အလုပ်ထုတ်ခံရပါက မည်သို့ပြုလုပ်နိုင်သနည်း။", en: "What can you do if wrongfully terminated from work?" }, options: { my: ["အလုပ်သမားညှိနှိုင်းဖြေရှင်းရေးသို့ တိုင်ကြားနိုင်သည်", "ဘာမှမလုပ်နိုင်ပါ", "ကုမ္ပဏီကို မီးရှို့ရမည်", "ရဲစခန်းတွင် ရိုက်နှက်ရမည်"], en: ["Lodge a complaint to Labor Dispute Body", "Nothing can be done", "Burn the company", "Use violence"] }, correct: 0, explanation: { my: "အလုပ်သမားရေးရာ ခုံကောင်စီနှင့် ခုံရုံးများသို့ တိုင်ကြားနိုင်ပါသည်။", en: "You can submit grievances to relevant labor dispute committees." } },
  { id: 6, icon: "fa-user-shield", question: { my: "မိမိ၏ ကိုယ်ရေးကိုယ်တာအချက်အလက်များကို ခွင့်ပြုချက်မရှိဘဲ သုံးစွဲပါက မည်သည့် အခွင့်အရေး ချိုးဖောက်ခံရသနည်း။", en: "Which right is violated if your personal data is used without permission?" }, options: { my: ["လုံခြုံမှုနှင့် ကိုယ်ရေးကိုယ်တာ ကာကွယ်ခွင့် (Privacy)", "လွတ်လပ်စွာ သွားလာခွင့်", "မဲပေးပိုင်ခွင့်", "ဘာသာရေးလွတ်လပ်ခွင့်"], en: ["Right to Privacy", "Freedom of movement", "Right to vote", "Freedom of religion"] }, correct: 0, explanation: { my: "ကိုယ်ရေးကိုယ်တာ အချက်အလက်များ လုံခြုံရေးသည် အခြေခံအခွင့်အရေးဖြစ်ပါသည်။", en: "Protection of personal information is guaranteed under Privacy Rights." } },
  { id: 7, icon: "fa-scale-balanced", question: { my: "အမျိုးသမီးနှင့် အမျိုးသား တူညီသော အလုပ်အတွက် လစာတူညီစွာ ရရှိသင့်ပါသလား။", en: "Should women and men receive equal pay for equal work?" }, options: { my: ["ရရှိသင့်သည် (Equal Pay for Equal Work)", "အမျိုးသားက ပိုရရမည်", "အမျိုးသမီးက ပိုရရမည်", "အလုပ်ရှင် သဘောအတိုင်း"], en: ["Yes, Equal Pay for Equal Work", "Men should always get more", "Women should get more", "At employer's absolute whim"] }, correct: 0, explanation: { my: "တူညီသော အလုပ်အတွက် တန်းတူညီမျှ လစာရရှိပိုင်ခွင့် ရှိသည်။", en: "Equal remuneration for work of equal value is a fundamental principle." } },
  { id: 8, icon: "fa-copyright", question: { my: "ဆန်းသစ်တီထွင်ထားသော စာအုပ် သို့မဟုတ် သီချင်းကို တရားမဝင် ကူးယူရောင်းချပါက မည်သည့်ဥပဒေဖြင့် ငြိစွန်းသနည်း။", en: "Copying someone's song or book illegally violates which law?" }, options: { my: ["မူပိုင်ခွင့်ဥပဒေ (Copyright Law)", "ယာဉ်စည်းကမ်းဥပဒေ", "အိမ်ငှားဥပဒေ", "သစ်တောဥပဒေ"], en: ["Intellectual Property / Copyright Law", "Traffic Law", "Tenancy Law", "Forest Law"] }, correct: 0, explanation: { my: "မူပိုင်ခွင့် (Copyright) သည် တီထွင်ဖန်တီးသူ၏ အခွင့်အရေးကို ကာကွယ်ပေးပါသည်။", en: "Copyright laws protect creators against unauthorized use." } },
  { id: 9, icon: "fa-people-group", question: { my: "ငြိမ်းချမ်းစွာ စုဝေးခွင့်နှင့် စူဝေးဆန္ဒထုတ်ဖော်ခွင့်သည် အခြေခံအခွင့်အရေး ဟုတ်ပါသလား။", en: "Is peaceful assembly a basic human right?" }, options: { my: ["ဟုတ်ပါသည်", "မဟုတ်ပါ", "ရာဇဝတ်မှုဖြစ်သည်", "သူဌေးများသာ လုပ်ခွင့်ရှိသည်"], en: ["Yes", "No", "Always a crime", "Only for wealthy people"] }, correct: 0, explanation: { my: "ငြိမ်းချမ်းစွာ စုဝေးခွင့် (Freedom of Peaceful Assembly) သည် လူ့အခွင့်အရေးဖြစ်ပါသည်။", en: "Everyone has the right to freedom of peaceful assembly and association." } },
  { id: 10, icon: "fa-handcuffs", question: { my: "လူတစ်ဦးကို ၎င်း၏ သဘောဆန္ဒမပါဘဲ အတင်းအဓမ္မ ခိုင်းစေခြင်း (Slave Labor) ပြုလုပ်ခွင့် ရှိပါသလား။", en: "Is forced labor legally permitted?" }, options: { my: ["လုံးဝ မရှိပါ", "ရှိပါသည်", "အစိုးရက ခိုင်းလျှင်ရသည်", "ပိုက်ဆံပေးလျှင် ရသည်"], en: ["No, strictly prohibited", "Yes", "Allowed if government orders", "Allowed if paid minimal fee"] }, correct: 0, explanation: { my: "ကျေးကျွန်ပြုခြင်းနှင့် အဓမ္မခိုင်းစေခြင်းကို အကြွင်းမဲ့ ပိတ်ပင်ထားသည်။", en: "Slavery and forced labor are strictly prohibited globally." } },
  { id: 11, icon: "fa-hospital", question: { my: "ကျန်းမာရေး စောင့်ရှောက်မှု ခံယူပိုင်ခွင့်သည် မည်သည့် အခွင့်အရေး အမျိုးအစားတွင် ပါဝင်သနည်း။", en: "Right to health care falls under which type of rights?" }, options: { my: ["လူမှုရေးနှင့် စီးပွားရေး အခွင့်အရေး", "နိုင်ငံရေး အခွင့်အရေး သာလျှင်", "ဘာသာရေး အခွင့်အရေး", "တရားစီရင်ရေး အခွင့်အရေး"], en: ["Social and Economic Right", "Political Right only", "Religious Right", "Judicial Right"] }, correct: 0, explanation: { my: "ကျန်းမာရေးစောင့်ရှောက်မှုသည် လူမှုရေးနှင့် စီးပွားရေးဆိုင်ရာ အခြေခံအခွင့်အရေးဖြစ်သည်၊၊", en: "Health care is a fundamental social and economic right." } },
  { id: 12, icon: "fa-comment-dots", question: { my: "လွတ်လပ်စွာ ထုတ်ဖော်ပြောဆိုခွင့် (Freedom of Speech) ၏ အဓိပ္ပာယ်မှာ မည်သည်နည်း။", en: "What is the meaning of Freedom of Speech?" }, options: { my: ["ဥပဒေဘောင်အတွင်း စိစစ်ခြင်းမရှိဘဲ မိမိအယူအဆ ထုတ်ဖော်ခွင့်", "သူတပါးကို မဟုတ်မမှန် စွပ်စွဲခွင့်", "အကြမ်းဖက်မှု လှုံ့ဆော်ခွင့်", "အမြဲတမ်း တိတ်ဆိတ်နေရခြင်း"], en: ["Right to express opinions legally without censorship", "Right to slander others", "Right to incite violence", "Remaining silent always"] }, correct: 0, explanation: { my: "လွတ်လပ်စွာ ထုတ်ဖော်ပြောဆိုခွင့်သည် ဥပဒေဘောင်အတွင်း အကြမ်းမဖက်ဘေ ထုတ်ဖော်ခွင့်ဖြစ်ပါသည်။", en: "Freedom of speech allows expressing ideas legally and peacefully." } },
  { id: 13, icon: "fa-house-user", question: { my: "မိမိ၏ နေအိမ်သို့ တရားရုံး ဝရမ်းမပါဘဲ ဝင်ရောက်ရှာဖွေခွင့် ရှိပါသလား။", en: "Can authorities search your home without a legal warrant?" }, options: { my: ["ဥပဒေအရ အထူးကိစ္စမှအပ မရှိပါ", "အမြဲတမ်း ရှိသည်", "အိမ်နီးနားချင်း ခွင့်ပြုလျှင် ရသည်", "ညဘက်တွင် ရသည်"], en: ["No, except special legal conditions", "Always allowed", "Allowed with neighbor permission", "Allowed at night"] }, correct: 0, explanation: { my: "နေအိမ်လုံခြုံပိုင်ခွင့်အရ ဥပဒေစိုးမိုးရေးအဖွဲ့များသည် ဝရမ်းမပါဘဲ မဝင်ရပါ၊၊", en: "Home privacy is protected; search warrants are generally required." } },
  { id: 14, icon: "fa-passport", question: { my: "မိမိနိုင်ငံအတွင်း လွတ်လပ်စွာ သွားလာခွင့်နှင့် နေထိုင်ခွင့် ရှိပါသလား။", en: "Do citizens have the right to freedom of movement within their country?" }, options: { my: ["ရှိပါသည်", "မရှိပါ", "မြို့တော်ဝန် ခွင့်ပြုမှရမည်", "ပတ်စပို့ပါမှ ရမည်"], en: ["Yes", "No", "Only with mayor approval", "Only with passport"] }, correct: 0, explanation: { my: "နိုင်ငံသားတိုင်း မိမိနိုင်ငံအတွင်း လွတ်လပ်စွာ သွားလာခွင့်ရှိသည်။", en: "Everyone has the right to freedom of movement within state borders." } },
  { id: 15, icon: "fa-newspaper", question: { my: "သတင်းမီဒီယာ လွတ်လပ်ခွင့် (Freedom of Press) ၏ အရေးပါပုံမှာ မည်သည်နည်း။", en: "Why is Freedom of the Press important?" }, options: { my: ["အစိုးရနှင့် တာဝန်ရှိသူများကို စောင့်ကြည့်ထောက်ပြနိုင်ရန်", "သတင်းအမှားများ ဖြန့်ရန်", "လူထုကို ခြိမ်းခြောက်ရန်", "ကြော်ငြာများသာ ပြသရန်"], en: ["To hold authority accountable", "To spread fake news", "To threaten public", "To show ads only"] }, correct: 0, explanation: { my: "မီဒီယာလွတ်လပ်ခွင့်သည် ဒီမိုကရေစီ၏ စတုတ္ထမဏ္ဍိုင်ဖြစ်ပါသည်။", en: "Press freedom serves as a vital check on state authority." } },
  { id: 16, icon: "fa-shield-halved", question: { my: "ဖမ်းဆီးခံရသူတစ်ဦးတွင် ရှေ့နေနှင့် တိုင်ပင်ခွင့် မည်သည့်အချိန်တွင် ရရှိသနည်း။", en: "When does a detained person have the right to consult a lawyer?" }, options: { my: ["ဖမ်းဆီးခံရသည်နှင့် ချက်ချင်း", "ထောင်ဒဏ်ကျပြီးမှ", "တစ်နှစ်ကြာမှ", "တရားသူကြီး သနားမှ"], en: ["Immediately upon arrest", "Only after sentencing", "After one year", "At judge's mercy"] }, correct: 0, explanation: { my: "ဖမ်းဆီးခံရသူတိုင်း တရားဥပဒေအကာအကွယ်နှင့် ရှေ့နေငှားရမ်းခွင့် ချက်ချင်းရှိသည်။", en: "Right to legal counsel applies immediately upon detention." } },
  { id: 17, icon: "fa-child", question: { my: "ကလေးသူငယ်အခွင့်အရေးများဆိုင်ရာ သဘောတူစာချုပ် (CRC) တွင် မည်သည့်အချက် ပါဝင်သနည်း။", en: "What is included in the Convention on the Rights of the Child (CRC)?" }, options: { my: ["ကလေးများ အသက်ရှင်သန်ခွင့်နှင့် ဖွံ့ဖြိုးတိုးတက်ခွင့်", "ကလေးများကို အလုပ်ကြမ်းခိုင်းခွင့်", "ကျောင်းမထားဘဲ ထားခွင့်", "ကလေးများကို ပြစ်ဒဏ်ကြီးလေးစွာ ပေးခွင့်"], en: ["Child survival and development rights", "Child labor rights", "Right to deny schooling", "Right to impose harsh punishment"] }, correct: 0, explanation: { my: "CRC သည် ကလေးများ의 ဘေးကင်းရေးနှင့် သင်ယူခွင့်ကို အကာအကွယ်ပေးသည်။", en: "CRC ensures child protection, survival, and healthy development." } },
  { id: 18, icon: "fa-vote-yea", question: { my: "ဒီမိုကရေစီစနစ်တွင် မဲပေးပိုင်ခွင့် (Right to Vote) သည် မည်သူ들과 သက်ဆိုင်သနည်း။", en: "Who possesses the Right to Vote in a democracy?" }, options: { my: ["ဥပဒေအရ သတ်မှတ်ထားသော သက်ပြည့်နိုင်ငံသား အားလုံး", "ပညာတတ်များသာ", "သူဌေးများသာ", "အမျိုးသားများသာ"], en: ["All eligible adult citizens", "Educated only", "Wealthy only", "Men only"] }, correct: 0, explanation: { my: "တန်းတူညီမျှ မဲပေးပိုင်ခွင့်သည် သက်ပြည့်နိုင်ငံသားတိုင်း၏ အခွင့်အရေးဖြစ်သည်။", en: "Universal suffrage guarantees vote to all eligible citizens." } },
  { id: 19, icon: "fa-earth-americas", question: { my: "ကမ္ဘာ့လူ့အခွင့်အရေး ကြေညာစာတမ်း (UDHR) ကို မည်သည့်နှစ်တွင် အတည်ပြုခဲ့သနည်း။", en: "In which year was the Universal Declaration of Human Rights (UDHR) adopted?" }, options: { my: ["၁၉၄၈ ခုနှစ်", "၁၉၅၀ ခုနှစ်", "၁၉၃၉ ခုနှစ်", "၂၀၀၀ ခုနှစ်"], en: ["1948", "1950", "1939", "2000"] }, correct: 0, explanation: { my: "ကုလသမဂ္ဂမှ ၁၉၄၈ ခုနှစ် ဒီဇင်ဘာ ၁၀ ရက်တွင် အတည်ပြုခဲ့သည်။", en: "UN adopted the UDHR on December 10, 1948." } },
  { id: 20, icon: "fa-venus-mars", question: { my: "ခွဲခြားဆက်ဆံခံရမှုမှ ကင်းလွတ်ခွင့် (Right to Non-Discrimination) ဆိုသည်မှာ မည်သည်နည်း။", en: "What does the Right to Non-Discrimination mean?" }, options: { my: ["လူမျိုး၊ ဘာသာ၊ လိင် မခွဲခြားဘဲ တန်းတူအခွင့်အရေးရရှိခြင်း", "လူနည်းစုများကို နှိမ့်ချခြင်း", "အထူးအခွင့်အရေး ပေးခြင်း", "အချို့ကိုသာ ကာကွယ်ပေးခြင်း"], en: ["Equal rights regardless of race, religion, or gender", "Lowering minorities", "Special privilege for few", "Protecting select groups"] }, correct: 0, explanation: { my: "လူတိုင်း လူသားဖြစ်မှုအပေါ် မူတည်၍ တန်းတူ အခွင့်အရေး ရရှိရမည်။", en: "Everyone is entitled to rights without distinction of any kind." } },
  { id: 21, icon: "fa-circle-dollar-to-slot", question: { my: "အနည်းဆုံး အခကြေးငွေ (Minimum Wage) သတ်မှတ်ခြင်း၏ ရည်ရွယ်ချက်မှာ မည်သည်နည်း။", en: "What is the primary purpose of Minimum Wage legislation?" }, options: { my: ["အလုပ်သမားများ သင့်တင့်သော လူနေမှုအဆင့်အတန်း ရရှိရန်", "အလုပ်ရှင်များကို ကြွယ်ဝစေရန်", "ကုန်ဈေးနှုန်း တက်စေရန်", "အလုပ်လက်မဲ့ တိုးစေရန်"], en: ["Ensure workers basic decent living standard", "Enrich employers", "Increase inflation", "Increase unemployment"] }, correct: 0, explanation: { my: "အနည်းဆုံး လစာသည် အလုပ်သမားများ၏ ရပိုင်ခွင့်ကို ကာကွယ်ပေးသည်။", en: "Minimum wage protects workers from unduly low pay." } },
  { id: 22, icon: "fa-umbrella", question: { my: "ဒုက္ခသည်များ ခေတ္တခိုလှုံခွင့် (Right to Asylum) ကို မည်သည့်အချိန်တွင် တောင်းခံနိုင်သနည်း။", en: "When can someone apply for the Right to Asylum?" }, options: { my: ["မိမိနိုင်ငံတွင် ညှဉ်းပန်းနှိပ်စက်မှု ခံရမည့် အန္တရာယ်ရှိချိန်", "အပျော်ခရီး ထွက်လိုချိန်", "စီးပွားရေး တွက်ချေမကိုက်ချိန်", "ကျောင်းတက်လိုချိန်"], en: ["When facing persecution in home country", "For vacation travel", "For business reasons", "To attend school"] }, correct: 0, explanation: { my: "ဘေးအန္တရာယ်နှင့် နှိပ်စက်မှုမှ လွတ်မြောက်ရန် ခိုလှုံခွင့် တောင်းခံနိုင်သည်။", en: "Everyone has the right to seek asylum from persecution." } },
  { id: 23, icon: "fa-leaf", question: { my: "သန့်ရှင်းသော ပတ်ဝန်းကျင်တွင် နေထိုင်ခွင့်သည် လူ့အခွင့်အရေး ဟုတ်ပါသလား။", en: "Is the right to a clean environment recognized as a human right?" }, options: { my: ["ဟုတ်ပါသည် (Right to a Healthy Environment)", "မဟုတ်ပါ", "စက်ရုံပိုင်ရှင်များသာ ဆုံးဖြတ်ရမည်", "သစ်တောဌာနသာ သက်ဆိုင်သည်"], en: ["Yes (Right to a Healthy Environment)", "No", "Only factory owners decide", "Only forest department"] }, correct: 0, explanation: { my: "သန့်ရှင်း ဘေးကင်းသော ပတ်ဝန်းကျင်သည် အခြေခံ လူ့အခွင့်အရေးဖြစ်ပါသည်။", en: "UN recognizes clean, healthy environment as a human right." } },
  { id: 24, icon: "fa-wheelchair", question: { my: "မသန်စွမ်းသူများ၏ အခွင့်အရေးများ (CRPD) အရ မည်သို့ စီစဉ်ပေးရမည်နည်း။", en: "Under CRPD, what accessibility provisions are required for persons with disabilities?" }, options: { my: ["အများပြည်သူဆိုင်ရာ နေရာများတွင် ဝင်ရောက်အသုံးပြုနိုင်အောင် စီစဉ်ပေးခြင်း", "၎င်းတို့အား သီးခြားခွဲထားခြင်း", "အလုပ်လုပ်ခွင့် ပိတ်ပင်ခြင်း", "ကူညီပေးရန် ငြင်းဆန်ခြင်း"], en: ["Ensure accessibility in public spaces", "Segregate them", "Bar them from work", "Refuse assistance"] }, correct: 0, explanation: { my: "မသန်စွမ်းသူများ အတားအဆီးမရှိ ဝင်ရောက် အသုံးပြုနိုင်ရန် ဖန်တီးပေးရမည်။", en: "Barrier-free environment must be provided for all ability levels." } },
  { id: 25, icon: "fa-shield-cat", question: { my: "တရားမဝင် ဖမ်းဆီးထိန်းသိမ်းခြင်းမှ ကင်းလွတ်ခွင့် (Freedom from Arbitrary Arrest) သည် မည်သည်နည်း။", en: "What is Freedom from Arbitrary Arrest?" }, options: { my: ["ခိုင်လုံသော ဥပဒေအကြောင်းအရင်းမပါဘဲ ဖမ်းဆီးခွင့်မရှိခြင်း", "ရဲက ကြိုက်သလို ဖမ်းပိုင်ခွင့်ရှိခြင်း", "ပြစ်မှုကျူးလွန်သူကို မဖမ်းရခြင်း", "မည်သူမျှ ထောင်မကျခြင်း"], en: ["Cannot be arrested without valid legal cause", "Police arrest freely", "No criminal can be caught", "Nobody ever goes to jail"] }, correct: 0, explanation: { my: "တရားဥပဒေ စိုးမိုးရေးအရ ဝရမ်းနှင့် သက်သေမပါဘဲ မဖမ်းရပါ။", en: "Arrests must strictly conform to procedure established by law." } },
  { id: 26, icon: "fa-laptop-code", question: { my: "အင်တာနက် အသုံးပြုခွင့်နှင့် သတင်းအချက်အလက် ရယူခွင့်သည် မည်သည့် အခွင့်အရေးနည်း။", en: "Internet access and right to information are classified as:" }, options: { my: ["သတင်းအချက်အလက် ရယူခွင့်နှင့် ထုတ်ဖော်ခွင့်", "ဇိမ်ခံပစ္စည်း သာလျှင်", "အစိုးရ သီးသန့် အခွင့်အရေး", "ဥပဒေမဲ့ ကိစ္စ"], en: ["Right to Information and Freedom of Expression", "Luxury only", "Government privilege", "Illegal activity"] }, correct: 0, explanation: { my: "အင်တာနက် သုံးစွဲခွင့်သည် ခေတ်သစ် အချက်အလက် သိရှိခွင့် အဓိက သော့ချက်ဖြစ်သည်၊၊", en: "Access to the internet is vital for realizing right to information." } },
  { id: 27, icon: "fa-ban-smoking", question: { my: "အများပြည်သူဆိုင်ရာ နေရာများတွင် ဆေးလိပ်မသောက်ရ စည်းကမ်းသည် မည်သည့် အခွင့်အရေးကို ကာကွယ်သနည်း။", en: "Public smoking bans protect which human right?" }, options: { my: ["အခြားသူများ၏ ကျန်းမာရေးနှင့် ဘေးကင်းခွင့်", "ဆေးလိပ်သောက်သူ၏ လွတ်လပ်ခွင့်", "စီးပွားရေးဆိုင်ရာ အခွင့်အရေး", "နားနေခွင့်"], en: ["Right to Health and Safety of others", "Smoker's freedom", "Economic rights", "Right to rest"] }, correct: 0, explanation: { my: "အများပြည်သူ၏ ကျန်းမာရေးသည် တစ်ဦးတည်း လွတ်လပ်ခွင့်ထက် ပိုမို အရေးပါ၊၊", en: "Public health safeguards take precedence over personal habit rights." } },
  { id: 28, icon: "fa-book-open-reader", question: { my: "တိုင်းရင်းသား မိခင်ဘာသာစကားဖြင့် သင်ယူခွင့်သည် မည်သည့် အခွင့်အရေးတွင် ပါဝင်သနည်း။", en: "Learning in one's mother tongue falls under which rights?" }, options: { my: ["ယဉ်ကျေးမှုနှင့် ပညာရေး အခွင့်အရေး", "နိုင်ငံရေး အခွင့်အရေး သာလျှင်", "တရားစီရင်ရေး အခွင့်အရေး", "စီးပွားရေး အခွင့်အရေး"], en: ["Cultural and Educational Rights", "Political Right only", "Judicial Right", "Economic Right"] }, correct: 0, explanation: { my: "တိုင်းရင်းသား စာပေနှင့် ယဉ်ကျေးမှု ထိန်းသိမ်းပိုင်ခွင့် အပြည့်အဝ ရှိသည်။", en: "Minority groups have rights to preserve language and culture." } },
  { id: 29, icon: "fa-hand-fist", question: { my: "ညှဉ်းပန်းနှိပ်စက်မှု ပိတ်ပင်ရေး (Freedom from Torture) သည် မည်မျှ အရေးပါသနည်း။", en: "How absolute is the Prohibition of Torture?" }, options: { my: ["မည်သည့် အခြေအနေတွင်မျှ ပြုလုပ်ခွင့်မရှိပါ (Absolute Right)", "စစ်ဖြစ်လျှင် ပြုလုပ်နိုင်သည်", "အရေးပေါ် အခြေအနေတွင် ရသည်", "အထက်အမိန့်ပါက ရသည်"], en: ["Absolute right, no exception allowed", "Allowed in war", "Allowed in emergency", "Allowed if ordered"] }, correct: 0, explanation: { my: "ညှဉ်းပန်းနှိပ်စက်မှုကို ကမ္ဘာ့ဥပဒေအရ လုံးဝ ခွင့်မပြုပါ (Absolute Right)။", en: "Torture is strictly prohibited without any exception globally." } },
  { id: 30, icon: "fa-bed", question: { my: "အလုပ်သမားတစ်ဦးတွင် အားလပ်ရက်နှင့် အနားယူခွင့် (Right to Rest and Leisure) ရှိပါသလား။", en: "Do workers have a Right to Rest and Leisure?" }, options: { my: ["ရှိပါသည် (လစာပါ လွှတ်ရက်များ အပါအဝင်)", "မရှိပါ (အမြဲ အလုပ်လုပ်ရမည်)", "အလုပ်ရှင် သနားမှ ရမည်", "ညဘက်သာ အနားယူရမည်"], en: ["Yes (including paid holidays)", "No (must work non-stop)", "Only if employer is generous", "Only at night"] }, correct: 0, explanation: { my: "အနားယူခွင့်နှင့် သင့်တင့်သော အလုပ်ချိန်သည် အလုပ်သမား အခွင့်အရေးဖြစ်သည်။", en: "Right to rest includes reasonable working hours and periodic paid holidays." } }
];;
  const questions = [
    ...coreQuestions.map((question, index) => ({ ...question, id: `core-${index + 1}` })),
    ...importedQuestions.map((question) => ({
      id: `community-${question.id}`,
      topic: question.id <= 10 ? 'Everyday rights' : question.id <= 20 ? 'Rights in practice' : 'Rights and protections',
      icon: question.icon,
      correct: question.correct,
      en: { q: question.question.en, o: question.options.en, e: question.explanation.en },
      my: { q: question.question.my, o: question.options.my, e: question.explanation.my }
    }))
  ];

  // Each level draws ten unused questions from a larger pool. A participant
  // will not receive the same question again until that level's pool is used.
  const difficultyLevels = {
    guided: { count: 10, includes: (question) => question.id.startsWith('core-') ? Number(question.id.slice(5)) <= 8 : Number(question.id.slice(10)) <= 14 },
    standard: { count: 10, includes: (question) => question.id.startsWith('core-') ? Number(question.id.slice(5)) >= 5 : Number(question.id.slice(10)) >= 8 && Number(question.id.slice(10)) <= 24 },
    challenge: { count: 10, includes: (question) => question.id.startsWith('core-') ? Number(question.id.slice(5)) >= 9 : Number(question.id.slice(10)) >= 15 }
  };
  const achievementKey = 'hrhQuizAchievements';
  const questionHistoryKey = 'hrhQuizQuestionHistoryV2';

  const labels = {
    en: { question: 'Question', of: 'of', next: 'Next question', finish: 'See my result', explanation: 'Why this is correct', correct: 'Correct answer', incorrect: 'Not quite', best: 'Best score', result: 'Your result', foundation: 'Foundation badge', advocate: 'Advocate badge', guardian: 'Guardian badge', foundationNote: 'A strong starting point—keep exploring the essentials.', advocateNote: 'You know the core rights. Keep building your knowledge.', guardianNote: 'Excellent work. You have demonstrated strong rights knowledge.' },
    my: { question: 'မေးခွန်း', of: 'ခုအနက်', next: 'နောက်မေးခွန်း', finish: 'ရလဒ်ကြည့်ရန်', explanation: 'ရှင်းလင်းချက်', correct: 'မှန်ကန်ပါသည်', incorrect: 'ထပ်မံလေ့လာကြည့်ပါ', best: 'အကောင်းဆုံးရမှတ်', result: 'သင်၏ရလဒ်', foundation: 'အခြေခံ တံဆိပ်', advocate: 'ထောက်ခံသူ တံဆိပ်', guardian: 'ကာကွယ်သူ တံဆိပ်', foundationNote: 'ကောင်းသောအစပြုမှုဖြစ်ပါသည်—အခြေခံအကြောင်းအရာများကို ဆက်လက်လေ့လာပါ။', advocateNote: 'အဓိကအခွင့်အရေးများကို နားလည်ထားပါသည်။ အသိပညာကို ဆက်လက်တိုးတက်စေပါ။', guardianNote: 'အလွန်ကောင်းပါသည်။ လူ့အခွင့်အရေးဆိုင်ရာ အသိပညာခိုင်မာကြောင်း ပြသနိုင်ခဲ့ပါသည်။' }
  };

  const el = (id) => document.getElementById(id);
  const shuffle = (items) => [...items].sort(() => Math.random() - .5);
  let language = document.body.classList.contains('lang-my') ? 'my' : 'en';
  let difficulty = 'guided';
  let round = [];
  let index = 0;
  let answers = [];
  let roundResult = null;

  const getCopy = () => labels[language];
  const myanmarDigits = '၀၁၂၃၄၅၆၇၈၉';
  const formatQuizNumber = (value, maximumFractionDigits = 0) => {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits,
      minimumFractionDigits: maximumFractionDigits > 0 ? maximumFractionDigits : 0
    }).format(Number(value) || 0);
    return language === 'my' ? formatted.replace(/\d/g, (digit) => myanmarDigits[digit]) : formatted;
  };
  const bestScore = () => Number(localStorage.getItem('hrhQuizBest') || 0);
  const updateBest = (percent) => { if (percent > bestScore()) localStorage.setItem('hrhQuizBest', String(percent)); };
  const show = (element, visible) => { element.hidden = !visible; };
  const getQuestionHistory = () => {
    try {
      const history = JSON.parse(localStorage.getItem(questionHistoryKey));
      return history && typeof history === 'object' ? history : {};
    } catch (_) { return {}; }
  };
  const saveQuestionHistory = (history) => localStorage.setItem(questionHistoryKey, JSON.stringify(history));

  const getAchievements = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(achievementKey));
      return { unlocked: Array.isArray(saved?.unlocked) ? saved.unlocked : [], completedLevels: Array.isArray(saved?.completedLevels) ? saved.completedLevels : [] };
    } catch (_) { return { unlocked: [], completedLevels: [] }; }
  };
  const saveAchievements = (progress) => localStorage.setItem(achievementKey, JSON.stringify(progress));
  const achievementNames = {
    en: { explorer: 'First Step', foundation: 'Foundation', advocate: 'Advocate', guardian: 'Guardian', unlocked: 'Unlocked', locked: 'Locked', count: 'unlocked' },
    my: { explorer: 'ပထမခြေလှမ်း', foundation: 'အခြေခံ', advocate: 'ထောက်ခံသူ', guardian: 'ကာကွယ်သူ', unlocked: 'ရရှိပြီး', locked: 'မရရှိသေး', count: 'ရရှိပြီး' }
  };
  const achievementDescriptions = {
    en: { explorer: 'You completed your first Human Rights Quiz round.', foundation: 'You scored 70% or higher in one quiz round.', advocate: 'You scored 90% or higher in one quiz round.', guardian: 'You completed Guided, Standard, and Challenge difficulty.' },
    my: { explorer: 'သင့်ပထမဆုံး လူ့အခွင့်အရေး ဉာဏ်စမ်းကို ပြီးဆုံးအောင် ဖြေဆိုနိုင်ခဲ့ပါသည်။', foundation: 'ဉာဏ်စမ်းတစ်ကြိမ်တွင် ၇၀% နှင့်အထက် ရရှိခဲ့ပါသည်။', advocate: 'ဉာဏ်စမ်းတစ်ကြိမ်တွင် ၉၀% နှင့်အထက် ရရှိခဲ့ပါသည်။', guardian: 'အခြေခံ၊ ပုံမှန်နှင့် စိန်ခေါ်မှု အဆင့်အားလုံးကို ပြီးဆုံးအောင် ဖြေဆိုနိုင်ခဲ့ပါသည်။' }
  };
  const renderAchievements = () => {
    const progress = getAchievements();
    document.querySelectorAll('[data-achievement]').forEach((card) => {
      const unlocked = progress.unlocked.includes(card.dataset.achievement);
      card.classList.toggle('is-unlocked', unlocked);
      const state = card.querySelector('.achievement-card__state');
      state.textContent = achievementNames[language][unlocked ? 'unlocked' : 'locked'];
    });
    el('achievement-count').textContent = `${progress.unlocked.length} / 4 ${achievementNames[language].count}`;
  };
  const recordAchievements = (percent) => {
    const progress = getAchievements();
    const unlockedNow = [];
    const unlock = (key) => { if (!progress.unlocked.includes(key)) { progress.unlocked.push(key); unlockedNow.push(key); } };
    if (!progress.completedLevels.includes(difficulty)) progress.completedLevels.push(difficulty);
    unlock('explorer');
    if (percent >= 70) unlock('foundation');
    if (percent >= 90) unlock('advocate');
    if (progress.completedLevels.length === Object.keys(difficultyLevels).length) unlock('guardian');
    saveAchievements(progress);
    renderAchievements();
    return unlockedNow;
  };
  const showAchievementPopover = (unlocked) => {
    if (!unlocked.length) return;
    const key = unlocked[unlocked.length - 1];
    const popover = el('achievement-popover');
    el('achievement-popover-title').textContent = achievementNames[language][key];
    el('achievement-popover-description').textContent = achievementDescriptions[language][key];
    popover.hidden = false;
    document.body.classList.add('achievement-popover-open');
    popover.querySelector('button[data-close-achievement]')?.focus();
  };
  const closeAchievementPopover = () => {
    el('achievement-popover').hidden = true;
    document.body.classList.remove('achievement-popover-open');
  };

  const renderBest = () => {
    const score = bestScore();
    el('best-score').textContent = score ? `${formatQuizNumber(score)}%` : '—';
  };

  const startRound = () => {
    const level = difficultyLevels[difficulty];
    const pool = questions.filter(level.includes);
    const history = getQuestionHistory();
    const previouslyUsed = new Set(Array.isArray(history[difficulty]) ? history[difficulty] : []);
    let available = pool.filter((question) => !previouslyUsed.has(question.id));

    // Start a new cycle only after this participant has used the level's pool.
    if (available.length < level.count) {
      history[difficulty] = [];
      available = [...pool];
    }

    const selected = shuffle(available).slice(0, level.count);
    history[difficulty] = [...new Set([...(history[difficulty] || []), ...selected.map((question) => question.id)])];
    saveQuestionHistory(history);
    round = selected.map((question) => ({ ...question, order: shuffle([0, 1, 2, 3]) }));
    index = 0;
    answers = new Array(round.length).fill(null);
    roundResult = null;
    show(el('quiz-intro'), false);
    show(el('quiz-result'), false);
    show(el('quiz-question'), true);
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderQuestion = () => {
    const question = round[index];
    const t = getCopy();
    const answer = answers[index];
    el('question-count').textContent = `${t.question} ${formatQuizNumber(index + 1)} ${t.of} ${formatQuizNumber(round.length)}`;
    el('question-topic').textContent = question.topic;
    el('progress-fill').style.width = `${((index + 1) / round.length) * 100}%`;
    el('question-icon').className = `fa-solid ${question.icon}`;
    el('question-text').textContent = question[language].q;
    const options = el('answer-options');
    options.replaceChildren();
    question.order.forEach((optionIndex, displayIndex) => {
      const button = document.createElement('button');
      const wasAnswered = answer !== null;
      button.type = 'button';
      button.className = 'answer-option';
      button.innerHTML = `<span class="answer-option__key">${String.fromCharCode(65 + displayIndex)}</span><span>${question[language].o[optionIndex]}</span>`;
      button.setAttribute('aria-pressed', String(answer === optionIndex));
      if (wasAnswered) {
        button.disabled = true;
        if (optionIndex === question.correct) button.classList.add('is-correct');
        if (answer === optionIndex && answer !== question.correct) button.classList.add('is-wrong');
      } else button.addEventListener('click', () => answerQuestion(optionIndex));
      options.append(button);
    });
    const feedback = el('answer-feedback');
    if (answer !== null) {
      feedback.hidden = false;
      feedback.innerHTML = `<strong>${answer === question.correct ? `✓ ${t.correct}` : `↗ ${t.incorrect}`}</strong>${t.explanation}: ${question[language].e}`;
    } else feedback.hidden = true;
    el('previous-question').disabled = index === 0;
    const next = el('next-question');
    next.disabled = answer === null;
    el('next-label').innerHTML = index === round.length - 1 ? `<span class="lang-en">${labels.en.finish}</span><span class="lang-my">${labels.my.finish}</span>` : `<span class="lang-en">${labels.en.next}</span><span class="lang-my">${labels.my.next}</span>`;
  };

  const answerQuestion = (optionIndex) => { if (answers[index] !== null) return; answers[index] = optionIndex; renderQuestion(); };
  const changeQuestion = (direction) => { index += direction; renderQuestion(); };

  const showResult = () => {
    const isFirstResult = !roundResult;
    if (isFirstResult) {
      const correctCount = round.reduce((sum, question, position) => sum + (answers[position] === question.correct ? 1 : 0), 0);
      const percent = Math.round((correctCount / round.length) * 100);
      updateBest(percent);
      roundResult = { correctCount, percent, unlockedNow: recordAchievements(percent) };
    }
    const { correctCount, percent, unlockedNow } = roundResult;
    renderBest();
    const t = getCopy();
    const tier = percent >= 90 ? 'guardian' : percent >= 70 ? 'advocate' : 'foundation';
    const tierTitle = t[tier];
    const tierNote = t[`${tier}Note`];
    el('result-title').textContent = t.result;
    el('result-score').innerHTML = `<strong>${formatQuizNumber(correctCount)} / ${formatQuizNumber(round.length)} · ${formatQuizNumber(percent)}%</strong>`;
    el('result-medallion').className = `result-medallion result-medallion--${tier}`;
    el('earned-badge').className = `earned-badge earned-badge--${tier}`;
    el('earned-badge').innerHTML = `<span class="earned-badge__seal">${tier === 'guardian' ? 'III' : tier === 'advocate' ? 'II' : 'I'}</span><span class="earned-badge__copy"><strong>${tierTitle}</strong><small>${tierNote}</small></span>`;
    const unlockedNotice = el('achievement-unlock');
    if (unlockedNow.length) {
      unlockedNotice.hidden = false;
      unlockedNotice.innerHTML = `<i class="fa-solid fa-sparkles"></i> ${language === 'my' ? 'တံဆိပ်အသစ် ရရှိပါသည် — ' : 'New achievement unlocked — '}${unlockedNow.map((key) => achievementNames[language][key]).join(', ')}`;
    } else unlockedNotice.hidden = true;
    show(el('quiz-question'), false);
    show(el('quiz-result'), true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isFirstResult) window.setTimeout(() => showAchievementPopover(unlockedNow), 420);
  };

  el('start-quiz').addEventListener('click', startRound);
  el('restart-quiz').addEventListener('click', startRound);
  document.querySelectorAll('[data-difficulty]').forEach((button) => button.addEventListener('click', () => {
    difficulty = button.dataset.difficulty;
    document.querySelectorAll('[data-difficulty]').forEach((option) => { const selected = option === button; option.classList.toggle('is-selected', selected); option.setAttribute('aria-pressed', String(selected)); });
  }));
  el('previous-question').addEventListener('click', () => { if (index > 0) changeQuestion(-1); });
  el('next-question').addEventListener('click', () => { if (answers[index] === null) return; if (index === round.length - 1) showResult(); else changeQuestion(1); });
  document.querySelectorAll('[data-close-achievement]').forEach((button) => button.addEventListener('click', closeAchievementPopover));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !el('achievement-popover').hidden) closeAchievementPopover(); });
  document.addEventListener('hrh:languagechange', (event) => { language = event.detail?.language === 'my' ? 'my' : 'en'; renderBest(); renderAchievements(); if (round.length && !el('quiz-question').hidden) renderQuestion(); if (round.length && !el('quiz-result').hidden) showResult(); });
  renderBest();
  renderAchievements();
});
