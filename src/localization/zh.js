export default {

  version:  `0.1`,
  langName: `中文`,   // Change this to the name of your language (written in your language)
  langCode: `zh`,

  header: {},

  footer: {
    header: [
      {
        name: `__githubRepoLink__`,
        text: `懸崖效應工具`,
      },
    ],
    'cfbCredit_v1.0': [
      `由 Code for Boston 用 `,
      { name: `__heartIcon__` },
      ` 製作`, 
    ],
  },

  homePage: {
    'appName_v1.0':          `懸崖效應工具`,
    'prototypeNote_v1.0':    `指導測試版*`,
    'cautionaryNote_v1.0':   `*測試版，請勿用此程序作經濟決定`,
    'toFirstInputPage_v1.0': `開始`,
    'toAboutPage_v1.0':      `了解更多`,
  },

  aboutPage: {
    'aboutPageHeader_v1.0': `關於懸崖效應工具`,

    'whatForHeader_v1.0':        `這個工具用來做什麽？`,
    'whatForImportantNote_v1.0': [
      {
        name: `__importantNote__`,
        text: `重要説明：`,
      },
      `本程序為一個最少可行產品，僅供參考。請勿用此作爲唯一工具來理解客戶的 SNAP 或 Section 8 經濟條件，以及任何其他公共資助項目。`,
    ],
    'whatFor_v2.0': [
      `本工具有助于查明收入變化對 SNAP (Supplemental Nutrition Assistance Program) 以及 Section 8 住宅劵資助提供的公共補償額度的影響。其為 `,
      { name: `__projectHope__` },
      ` 個案經理製作以幫助預測客戶補助的變化。`,
    ],

    'whyHeader_v1.0': `這個工具爲什麽重要？`,
    'why1_v1.0':      `懸崖效應發生于一個家庭經濟情況的微小改變，比如少額漲薪，不成比例地降低其補助額度。此家庭在試著增加其收入水平，卻實際上損失了收入，從而使其處在更大劣勢。這樣的懸崖效應阻止很多家庭離開公共補助項目。`,
    'why2_v1.0':      `此外，懸崖效應也非常難預測。收入、家庭大小、其它因素、甚至項目本身，都可能意料不到地互相影響。我們在探索簡化這個難題的方式，從而幫助家庭更好理解和預測其自我狀況。`,

    'videoLinkText_v1.0':    `懸崖效應兩分鐘介紹視頻`,
    'quantLinkText_v1.0':    `用量化情景説明懸崖效應`,
    'benefitsLinkText_v1.0': `麻州多種補助項目解釋`,

    'howToUseHeader_v1.0': `我要怎麽用這個工具？`,
    'howtoUse_v1.0':       `一步步添加有關客戶目前補助、住宅、收入以及其他的信息。此信息會被用來預測客戶的大約補助額度。當您完成這些信息，改變“未來收入”額度以計算此收入變化對補助額度的影響。目前本程序支持 SNAP 以及 Section 8 住宅項目。請注意客戶目前補助額度的預測不一定準確。此程序的主要目標是以收入變化預測補助額度的對應變化。`,
    'howToUseNote_v1.0':   [
      `請注意：本程序不會保存任何用戶信息。`,
      {
        name: `__refreshWarning__`,
        text: `如果您刷新此界面，您將會失去所有已輸入信息。`,
      },
      `每次您打開本程序，它都會煥然一新。`,
    ],

    'whoMadeThisHeader_v1.0': `誰做了這個工具？`,
    'whoMadeThis1_v1.0':      [
      `本程序屬於一個更大項目，來自波士頓基金會給馬賽諸塞州大學波士頓 `,
      { name: `__centerForSocialPolicy__` },
      ` 的撥款，且和 `,
      { name: `__projectHope__` },
      ` 與 `,
      { name: `__codeForBoston__` },
      ` 緊密合作。社會政策中心是 `,
      { name: `__onSolidGroundCoalition__` },
      ` 的主要搭檔。`,
    ],
    'whoMadeThis2_v1.0': [
      `本程序代碼在 `,
      { name: `__github__` },
      ` 上的 `,
      { name: `__codeForBoston__` },
      ` 志願者維持。如需更多信息或報告漏洞，請聯係 `,
      { name: `__contactEmail__` },
      `。`,
    ],
    'whoMadeThis3_v1.0': [
      `特殊感謝 Code for Boston 志願者製作此工具，尤其是 `,
      { name: `__namesExceptLast__` },
      `, 以及 `,
      { name: `__lastName__` },
      `。`,
    ],
  },

  visitPage: {
    'previous_v1.0':  `上一頁`,
    'next_v1.0':      `下一頁`,
    'newClient_v1.0': `新客戶`,

    stepBar: {
      'currentBenefits_v1.0': `目前補助`,
      'household_v1.0':       `住宅`,
      'currentIncome_v1.0':   `收入`,
      'currentExpenses_v1.0': `支出`,
      'predictions_v1.0':     `預測值`,
    },

    formHelpers: {
      'weekly_v1.0':   `每周`,
      'monthly_v1.0':  `每月`,
      'yearly_v1.0':   `每年`,
      'yesLabel_v1.0': `是`,
      'noLabel_v1.0':  `否`,
    },

    currentBenefits: {
      'currentBenefits_v1.0': `目前補助`,
      'selectBenefits_v1.0':  `請選擇您目前獲得的補助`,
      'hasSection8_v1.0':     {
        label: `您是否擁有 Section 8 住房補貼？`,
        hint:  `Section 8 爲租房提供補貼。`,
      },
      'hasSnap_v1.0': {
        label: `您是否擁有糧食券 (SNAP)？`,
        hint:  `輔助營養援助計畫(糧食劵，SNAP)爲購買食品提供補貼`,
      },
    },

    household: {
      'title_v1.0':           `家庭`,
      'clarifier_v1.0':       `您的家庭成員信息。`,
      'householdHeader_v1.0': `家庭`,
      'householdIntro_v1.0':  `您的家庭成員信息。`,
      'role_v1.0':            `地位`,
      'age_v1.0':             `年齡`,
      'disabled_v1.0':        `殘疾`,
      'headOfHousehold_v1.0': `家庭負責人`,
      'addMember_v1.0':       `添加家庭成員`,
      'spouse_v1.0':          `家庭負責人之夫妻`,
      'childOther_v1.0':      `兒童或其它家庭成員`,
      'previous_v1.0':        `上一頁`,
      'next_v1.0':            `下一頁`,
    },

    currentIncome: {
      'title_v1.0':                  `目前家庭收入`,
      'clarifier_v1.0':              `最近12個月内收集的家庭收入`,
      'explainSnapCalculation_v1.0': `此原型程序會嘗試使用自有算法計算SNAP金額`,
      'earnedIncome_v1.0':           {
        label: `工作收入`,
        hint:  `工資收入 (Earned income) 是指來自工資或者自僱的收入`,
      },
      'TAFDC_v1.0': {
        label: `TAFDC`,
        hint:  `向有受撫養兒童的家庭發放的過渡性援助 (TAFDC) 是爲有受撫楊兒童的家庭提供的短期經濟援助`,
      },
      'SSI_v1.0': {
        label: `SSI`,
        hint:  `附加社會保障收入 (SSI) 是聯邦政府爲65週歲及以上的老人，以及任何年齡的失明或殘障認識提供的財政和健保補助`,
      },
      'SSDI_v1.0': {
        label: `SSDI`,
        hint:  `社會安全殘疾保險金 (SSDI) 是一項聯邦政府爲殘障人士提供幫助的項目`,
      },
      'childSupport_v1.0': {
        label: `子女撫養費`,
        hint:  `子女撫養費 (Child support) 是你的前任配偶爲你們的小孩所提供的經濟援助`,
      },
      'unemployment_v1.0': {
        label: `失業`,
        hint:  `失業救濟 (Unemployment benefits) 爲已經下崗的人羣提供收入`,
      },
      'workersComp_v1.0': {
        label: `勞工補償`,
        hint:  `勞工災害補償 (Worker’s Compensation) 爲在工作中受傷的人提供補助`,
      },
      'pension_v1.0': {
        label: `養老金`,
        hint:  `養老金 (Pension) 主爲已退休的僱員提供的收入，通常由前任僱主提供`,
      },
      'socialSecurity_v1.0': {
        label: `社會保障`,
        hint:  `社會保障 (Social Security) 是聯邦政府爲已退休人士提供的福利`,
      },
      'alimony_v1.0': {
        label: `贍養費`,
        hint:  `贍養費 (Alimony) 是離婚後夫妻一方向另一方提供的經濟資助`,
      },
      'otherIncome_v1.0': {
        label: `其它收入`,
        hint:  `請列出你所擁有的但爲在上方列出的收入`,
      },
    },

    currentExpenses: {
      'title_v1.0':                    `當前家庭支出`,
      unreimbursedNonMedicalChildCare: {
        'sectionHeading_v1.0':    `合理非医疗未偿金`,
        'subheading_v1.0':        `“兒童”指12嵗及以下兒童。請勿包括已被其他補償項目支付的資金。`,
        'columnExpenseType_v1.0': `支出`,
        'childDirectCare_v1.0':   {
          label: `直接看管支出`,
          hint:  `您自費花多少錢看管兒童？`,
        },
        'childBeforeAndAfterSchoolCare_v1.0': {
          label: `學前後看管支出`,
          hint:  `您花多少錢支付學前或學后兒童看管？`,
        },
        'childTransportation_v1.0': {
          label: `交通`,
          hint:  `您花多少錢支付交通費？`,
        },
        'childOtherCare_v1.0': {
          label: `另外支出`,
          hint:  `您花多少錢支付其它兒童看管費用？`,
        },
        'doEarnBecauseOfChildCare_v1.0': `您是否在利用兒童看管獲取額外收入？`,
        'earnedBecauseOfChildCare_v1.0': `因兒童看官獲取的收入`,
      },
      childSupport: {
        'sectionHeading_v1.0':      `兒童資助`,
        'columnExpenseType_v1.0':   `支出`,
        'childSupportPaidOut_v1.0': {
          legallyObligated: `法律責任`,
          childSupport:     `兒童資助`,
        },
      },
      housing: {
        'sectionHeading_v1.0':      `住宅`,
        'monthlyContractRent_v1.0': {
          label: `每月合同租金（您住宅的租金總額）`,
          hint:  `您住宅的租金總額`,
        },
        'monthlyRentShare_v1.0': {
          label: `每月租金分配（由您分擔支付縂租金的比例）`,
          hint:  `由您分擔支付縂租金的比例`,
        },
        'utilitiesSubheading_v1.0': `以下您需要支付哪些設備？`,
        'climateControl_v1.0':      {
          label: `供暖或空調設施`,
          hint:  `如需單獨支付供暖與空調設施，您需要支付的額度`,
        },
        'nonHeatElectricity_v1.0': {
          label: `電力（非供暖所用）`,
          hint:  `您需單獨支付的電費額度（除供暖用電）`,
        },
        'phone_v1.0': {
          label: `電話服務`,
          hint:  `您需單獨支付基本電話座機設施的額度`,
        },
        'fuelAssistance_v1.0': {
          labelText: `燃料資助`,
          hint:      `燃料資助幫助您支付供暖所用燃料`,
        },
      },
    },

    predictions: {},
  },
};

