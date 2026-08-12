/* Human Rights Hub quiz: local, accessible, bilingual and score-aware. */
document.addEventListener('DOMContentLoaded', () => {
  const questions = [
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

  const difficultyLevels = {
    guided: { count: 6, topics: ['UDHR', 'Article 1', 'Article 3', 'Article 5', 'Article 7', 'Article 8', 'Article 12', 'Article 15', 'Article 18', 'Article 26'] },
    standard: { count: 8, topics: ['Article 3', 'Article 5', 'Article 7', 'Article 8', 'Article 12', 'Article 14', 'Article 15', 'Article 18', 'Article 19', 'Article 20', 'Article 23', 'Article 24', 'Article 25', 'Article 26'] },
    challenge: { count: 10, topics: ['UDHR', 'Article 1', 'Article 3', 'Article 5', 'Article 7', 'Article 8', 'Article 12', 'Article 14', 'Article 15', 'Article 18', 'Article 19', 'Article 20', 'Article 23', 'Article 24', 'Article 25', 'Article 26'] }
  };
  const achievementKey = 'hrhQuizAchievements';

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
  const bestScore = () => Number(localStorage.getItem('hrhQuizBest') || 0);
  const updateBest = (percent) => { if (percent > bestScore()) localStorage.setItem('hrhQuizBest', String(percent)); };
  const show = (element, visible) => { element.hidden = !visible; };

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
    el('best-score').textContent = score ? `${score}%` : '—';
  };

  const startRound = () => {
    const level = difficultyLevels[difficulty];
    round = shuffle(questions.filter((question) => level.topics.includes(question.topic))).slice(0, level.count).map((question) => ({ ...question, order: shuffle([0, 1, 2, 3]) }));
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
    el('question-count').textContent = `${t.question} ${index + 1} ${t.of} ${round.length}`;
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
    el('result-score').innerHTML = `<strong>${correctCount} / ${round.length} · ${percent}%</strong>`;
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
