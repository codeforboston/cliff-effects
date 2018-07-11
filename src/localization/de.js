export default {

  langName: `Deutsch`,
  langCode: `de`,

  header: {},

  footer: {
    header:    `Cliff Effects Tool`,
    cfbCredit: [
      `Mit `,
      { name: `__heartIcon__` },
      ` von Code for Boston gemacht`, 
    ],
  },

  homePage: {
    appName:          `Cliff Effects Werkzeug`,
    prototypeNote:    `Ein Prototyp für Beratungshilfe*`,
    cautionaryNote:   `*Dieses Werkzeug ist ein Prototyp.  Bitte diesen Prototyp nicht benutzen, Ihre Entsheidungen fest zu machen.`,
    toFirstInputPage: `Beginnen`,
    toAboutPage:      `Mehr lernen`,
  },

  aboutPage: {
    aboutPageHeader: `Über dieses Cliff Effects Werkzeug`,
    
    whatForHeader: `Wozu benutzt man dieses Werkzeug?`,
    
    whatForImportantNote1A: `Wichtige Anmerkung: `,
    whatForImportantNote1B: `Diese Anwendung ist ein Minimum Viable Product (minimal überlebensfähiges Produkt). Sie sollte nicht als das einzige Werkzeug benutzt werden, um die SNAP- oder Section-8- (oder irgendein anderes Sozialhilfeprogramm-) finanzielle Situation eines Klienten zu verstehen.`,
    
    whatFor1A: `Dieses Werkzeug kann zeigen helfen, wie eine Einkommensveränderung sich auf die Sozialhilfe von SNAP und Section-8-Wohnungsgutschein auswirkt. Es wurde für die Sozialarbeiter an dem `,
    whatFor1B: ` gedacht, um ihnen zu helfen, die Veränderungen von den Klientenunterstützungen vorherzusehen.`,
    
    whyImportantHeader: `Warum ist dieses Werkzeug wichtig?`,
    
    why1: `Ein Cliff Effect sich ereignet, als eine kleine Veränderung von der Situation eines Haushalts (z.B. eine oberflächliche Lohnerhöhung) den Wert der Unterstützung in einer unangemessenen Weise senkt. Die Familie arbeitet, um ihre Einkommen sich zu verbessern, aber am Ende bekommt sie einen Nettoverlust, der sie eigentlich in eine schwerere Situation stellt. Diese Cliff Effects hindern viele Familien daran, das Bekommen von Sozialhilfe eigentlich zu enden.`,
    
    why2: `Die Cliff Effects sind schwer vorherzusehen. Die Interaktionen zwischen dem Einkommen, der Nummer von Personnen im Haushalt, vielen verschiedenen anderen Krieterien, und den Auswirkungen der Programmen selbst haben Auswirkungen aufeinander in unerwarteten Weisen. Wir suchen Methoden, um dieses Problem sich mit der Komplexität zu befassen, und die Familien ihre Situationen besser zu verstehen und vorherzusehen.`,
    
    linkText1: `Ein zweiminutenlanges Video über Cliff Effects`,
    linkText2: `Manche Quantitative Szenarios, die Cliff Effects demonstrieren`,
    linkText3: `Eine Aufgliederung von verschiedenen Sozialhilfeprogrammen im Bundesstaat ` +
      `Massachusetts`,
    
    howToUseHeader: `Wie benutze ich dieses Werkzeug?`,
    
    howToUse1: `Gehen Sie Schritt für Schritt, Informationen über eines Klienten gegenwärtigen Unterstützungen, Haushalt, Einkommen, und andere wichtige Information in das Formular auszufüllen. Diese Informationen werden benutzt werden, um die umgefähre Unterstützung vom Klienten vorherzusehen. Als Sie zum Ende kommen, wechseln Sie den Betrag vom 'Einkommen in Zukunft', um die daraus resultierende Veränderung des Unterstützungsbetrag zu sehen. Zu dieser Zeit können Sie Auswirkungen für die Programmen SNAP und Section 8 Housing Voucher sehen. Bitte bemerken Sie, daß die Vorhersagen sich vielleicht nicht direkt zu dem gegenwärtigen Unterstützungsbetrag eines Klienten passen. Das Ziel der Anwendung ist der Betrag von dem Unterstützungswechsel, das sich ereignet, als es Einkommenwechsel gibt.`,
    
    howToUseRefreshNote1A: `Bitte bemerken Sie, daß diese Anwendung die Benutzerdaten nicht behaltet. `,
    hotToUseRefreshNote1B: `Wenn Sie die Webseite wieder aufnehmen, wird Ihre Daten verloren werden. `,
    howToUseRefreshNote1C: `Jedes Mal, wenn Sie die Anwendung verwenden, gibt die Anwendung Ihnen ein neues, leeres Formular.`,
    
    whoMadeThisHeader: `Wer entwickelt diese Anwendung?`,
    
    whoMadeThis1A: `Diese Anwendung ist ein Teil eines Projektes, das möglich mit dem Geben einen Open Door Grant (Zuschuß) von der Stiftung Boston Foundation an das `,
    whoMadeThis1B: ` an der University of Massachusetts Boston ist. Das Center for Social Policy arbeitet mit den Organisationen `,
    whoMadeThis1C: ` und `,
    whoMadeThis1D: `.  Das Center for Social Policy ist der Hauptpartner für das `,
    whoMadeThis1E: `.`,
    
    whoMadeThis2A: `Die Freiwilligen von `,
    whoMadeThis2B: ` erhalten die Codebasis auf `,
    whoMadeThis2C: ` aufrecht. Für weitere Auskunft treten Sie bitte in Verbindung mit `,
    whoMadeThis2D: `.`,
    
    whoMadeThis3Intro: `Wir möchten den folgenden Freiwilligen von Code for Boston besonders danken: `,
    whoMadeThis3Names: `Annie LaCourt, Isaac Chansky, Michelle Bernstein, Alec Danaher, Sasha Maryl, Drew Love, Liani Lye, Andrew Cunningham, Liam Morley, Nick Francisci, Stephen Chin, Shameek Poddar, Will McIntosh, Andrew Seeder, Ben Lewis, Don Blair, Ethan Strominger, Nick Lee, Jonathan Marcus, Emily Wasserman, Ethan Blackwood,`,
    whoMadeThis3And:       ` und `,
    whoMadeThis3FinalName: `Valerie Kenyon`,
    whoMadeThisPeriod:     `.`,
  },

  visitPage: {
    currentBenefits: {
      hasSection8: {
        label: `Haben Sie Section 8 Housing?`,
        hint:  `Section 8 gibt Hilfe für die Miete`,
      },
      hasSnap: {
        label: `Haben Sie SNAP?`,
        hint:  `SNAP gibt Hilfe für das Essenkaufen`,
      },
    },

    household: {},

    currentIncome: {
      earnedIncome: {
        label: `Einkommen von der Arbeit`,
        hint:  `Einkommen von der Arbeit`,
      },
      TAFDC: {
        label: `TAFDC`,
        hint:  `TAFDC (Transitional Aid to Families with Dependent Children) ist ein Programm von dem Bundesstaat Massachusetts, das Familien mit Kindern während einer kurzen Zeit hilft`,
      },
      SSI: {
        label: `SSI`,
        hint:  `SSI (Supplemental Security Income) ist ein Programm von der amerikanischen Bundesregierung, das finanzielle und medizinische Hilfe den Leuten gibt, die blind, behindert oder älter als 65 Jahre sind`,
      },
      SSDI: {
        label: `SSDI`,
        hint:  `SSDI (Social Security Disability Income) ist ein Program von der amerikanischen Bundesregierung, das behinderten Leuten hilft`,
      },
      childSupport: {
        label: `Bekommene Kinderunterstützung`,
        hint:  `Kinderunterstützung ist Geld, das Ihr(e) ehemalige(r) Herr/Frau Ihnen gibt, um Ihre Kinder zu unterstützen`,
      },
      unemployment: {
        label: `Arbeitslosenunterstützung`,
        hint:  `Arbeitslosenunterstützung hilft Leuten, die ihre Arbeit verloren haben`,
      },
      workersComp: {
        label: `Arbeitsunfallversicherung`,
        hint:  `Arbeitsunfallversicherung hilft Leuten, die einen Unfall bei der Arbeit haben`,
      },
      pension: {
        label: `Rente`,
        hint:  `Eine Rente gibt Einkommen einer Person, die sich aus Altersgründen aus der Karriere zurückzieht`,
      },
      socialSecurity: {
        label: `Staatliche Rentenversicherung`,
        hint:  `Staatliche Rentenversicherung ist ein Program von der amerikanischen Bundesregierung, das den Rentnern hilft`,
      },
      alimony: {
        label: `Unterhaltszahlung`,
        hint:  `Unterhaltszahlung ist Geld, das eine Person der zweiten Person nach einer Ehescheidung bezahlt`,
      },
      otherIncome: {
        label: `Anderes Einkommen`,
        hint:  `Bitte bemerken Sie hier irgendwelches Einkommen aus anderen Quellen, die nicht schon bemerkt werden`,
      },
    },
  },
};

