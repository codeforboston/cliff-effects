const de = {

  langName: `Deutsch`,
  langCode: `de`,

  header: {},

  footer: {
    header_v1: [
      {
        name: `__githubRepoLink__`,
        text: `Cliff Effects Werkzeug`,
      },
    ],
    cfbCredit_v1: [
      `Mit `,
      { name: `__heartIcon__` },
      ` von Code for Boston gemacht`, 
    ],
  },

  homePage: {
    appName_v1:          `Cliff Effects Werkzeug`,
    prototypeNote_v1:    `Ein Prototyp für Beratungshilfe*`,
    cautionaryNote_v1:   `*Dieses Werkzeug ist ein Prototyp.  Bitte diesen Prototyp nicht benutzen, Ihre Entscheidungen fest zu machen.`,
    toFirstInputPage_v1: `Beginnen`,
    toAboutPage_v1:      `Mehr lernen`,
  },

  aboutPage: {
    aboutPageHeader_v1: `Über dieses Cliff Effects Werkzeug`,

    whatForHeader_v1:        `Wozu benutzt man dieses Werkzeug?`,
    whatForImportantNote_v1: [
      {
        name: `__importantNote__`,
        text: `Wichtige Anmerkung: `,
      },
      `Diese Anwendung ist ein Minimum Viable Product (minimal überlebensfähiges Produkt). Sie sollte nicht als das einzige Werkzeug benutzt werden, um die SNAP- oder Section-8- (oder irgendein anderes Sozialhilfeprogramm-) finanzielle Situation eines Klienten zu verstehen.`,
    ],
    whatFor_v2: [
      `Dieses Werkzeug kann zeigen helfen, wie eine Einkommensveränderung sich auf die Sozialhilfe von SNAP (Supplemental Nutrition Assistance Program = Programm für ergänzende Ernährungshilfe) und Section 8 Housing Voucher (= Wohnungsgutschein) auswirkt. Es wurde für die Sozialarbeiter an dem `,
      { name: `__projectHope__` },
      ` entworfen, um ihnen zu helfen, die Veränderungen von den Unterstützungen der Klienten vorherzusehen.`,
    ],

    whyHeader_v1: `Warum ist dieses Werkzeug wichtig?`,
    why1_v1:      `Ein Cliff Effect sich ereignet, als eine kleine Veränderung von der Situation eines Haushalts (z.B. eine oberflächliche Lohnerhöhung) den Wert der Unterstützung in einer unangemessenen Weise senkt. Die Familie arbeitet, um ihre Einkommen sich zu verbessern, aber am Ende bekommt sie einen Nettoverlust, der sie eigentlich in eine schwierigere Situation stellt. Diese Cliff Effects hindern viele Familien daran, das Bekommen von Sozialhilfe eigentlich zu enden.`,
    why2_v1:      `Die Cliff Effects sind schwer vorherzusehen. Die Interaktionen zwischen dem Einkommen, der Anzahl der Personen im Haushalt, vielen verschiedenen anderen Kriterien und den Auswirkungen der Programmen selbst haben Auswirkungen aufeinander in unerwarteten Weisen. Wir suchen Methoden, um dieses Problem sich mit der Komplexität zu befassen und den Familien zu helfen, ihre Situationen besser zu verstehen und vorherzusehen.`,

    videoLinkText_v1:    `Ein zweiminutenlanges Video über Cliff Effects`,
    quantLinkText_v1:    `Manche quantitative Szenarios, die Cliff Effects demonstrieren`,
    benefitsLinkText_v1: `Eine Aufgliederung von verschiedenen Sozialhilfeprogrammen im Bundesstaat Massachusetts`,

    howToUseHeader_v1: `Wie benutze ich dieses Werkzeug?`,
    howtoUse_v1:       `Gehen Sie Schritt für Schritt, Informationen über eines Klienten gegenwärtigen Unterstützungen, Haushalt, Einkommen und andere wichtige Information in das Formular auszufüllen. Diese Informationen werden benutzt werden, um die ungefähre Unterstützung des Klienten vorherzusehen. Als Sie zum Ende kommen, wechseln Sie den Betrag vom 'Einkommen in Zukunft', um die daraus resultierende Veränderung des Unterstützungsbetrag zu sehen. Zu dieser Zeit können Sie Auswirkungen für die Programmen SNAP und Section 8 Housing Voucher sehen. Bitte bemerken Sie, daß die Vorhersagen sich vielleicht nicht direkt zu dem gegenwärtigen Unterstützungsbetrag eines Klienten passen. Das Ziel der Anwendung ist der Betrag von dem Unterstützungswechsel, das sich ereignet, als es manche Einkommenwechsel gibt.`,
    howToUseNote_v1:   [
      `Bitte bemerken Sie, daß diese Anwendung die Benutzerdaten nicht behaltet. `,
      {
        name: `__refreshWarning__`,
        text: `Wenn Sie die Webseite wieder aufnehmen, wird Ihre Daten verloren werden. `,
      },
      `Jedes Mal, wenn Sie die Anwendung verwenden, gibt die Anwendung Ihnen ein neues, leeres Formular.`,
    ],

    whoMadeThisHeader_v1: `Wer entwickelt diese Anwendung?`,
    whoMadeThis1_v1:      [
      `Diese Anwendung ist ein Teil eines Projektes, das möglich mit dem Geben einen Open Door Grant (Zuschuß) von der Stiftung Boston Foundation an das Center for Social Policy an der University of Massachusetts Boston ist. Das `,
      { name: `__centerForSocialPolicy__` },
      `, arbeitet mit den Organisationen `,
      { name: `__projectHope__` },
      ` und `,
      { name: `__codeForBoston__` },
      `. Das Center for Social Policy ist der Hauptpartner für das `,
      { name: `__onSolidGroundCoalition__` },
      `.`,
    ],
    whoMadeThis2_v1: [
      `Die Codebasis wird auf `,
      { name: `__github__` },
      ` von den Freiwilligen von `,
      { name: `__codeForBoston__` },
      ` aufrechterhalten. Für weitere Auskunft oder einen Programmfehler zu melden, treten Sie bitte in Verbindung mit `,
      { name: `__contactEmail__` },
      `.`,
    ],
    whoMadeThis3_v1: [
      `Wir möchten den folgenden Freiwilligen von Code for Boston besonders danken: `,
      { name: `__namesExceptLast__` },
      ` und `,
      { name: `__lastName__` },
      `.`,
    ],
  },

  visitPage: {
    previous_v1:  `Vorherige Seite`,
    next_v1:      `Nächste Seite`,
    newClient_v1: `Neuer Klient`,

    stepBar: {
      currentBenefits_v1: `Gegenwärtige Sozialhilfe`,
      household_v1:       `Haushalt`,
      currentIncome_v1:   `Einkommen`,
      currentExpenses_v1: `Kosten (des Haushalts)`,
      predictions_v1:     `Prognosen`,
    },

    formHelpers: {
      weekly:   `Wöchentlich`,
      monthly:  `Monatlich`,
      yearly:   `Jährlich`,
      yesLabel: `Ja`,
      noLabel:  `Nein`,
    },

    currentBenefits: {
      currentBenefits_v1:  `Gegenwärtige Sozialhilfe`,
      selectBenefits_v1:   `Auswählen Sie jene Sozialhilfe Programmen, die Sie in der Gegenwart bekommen.`,
      hasSection8Label_v1: `Haben Sie Section 8 Housing?`,
      hasSection8Hint_v1:  `Section 8 gibt Hilfe für die Miete`,
      hasSnapLabel_v1:     `Haben Sie SNAP?`,
      hasSnapHint_v1:      `SNAP gibt Hilfe für das Essenkaufen`,
    },

    household: {
      title_v1:           `Haushalt`,
      clarifier_v1:       `Daten über die Mitglieder von Ihrem Haushalt.`,
      householdHeader_v1: `Haushalt`,
      householdIntro_v1:  `Daten über die Mitglieder von Ihrem Haushalt.`,
      role_v1:            `Rolle`,
      age_v1:             `Alter`,
      disabled_v1:        `Behindert`,
      headOfHousehold_v1: `Haushaltsvorstand`,
      addMember_v1:       `Fügen Sie ein Familienmitglied hinzu`,
      spouse_v1:          `Ehepartner des Haushaltsvorstandes`,
      childOther_v1:      `Kind/Anderes Haushaltsmitglied`,
      previous_v1:        `Vorherige Seite`,
      next_v1:            `Nächste Seite`,
    },

    currentIncome: {
      title_v1:                  `Gegenwärtiges Haushaltseinkommen`,
      clarifier_v1:              `Einkommen, das Sie in den vorherigen 12 Monaten bekommen haben.`,
      explainSnapCalculation_v1: `Dieser Prototyp wird versuchen, seine eigenen Berechnungen für den SNAP-Betrag zu machen`,
      earnedIncome:              {
        label_v1: `Einkommen von der Arbeit`,
        hint_v1:  `Einkommen von der Arbeit`, // In German, this hint is already self-explanatory from the label
      },
      TAFDC: {
        label_v1: `TAFDC`,
        hint_v1:  `TAFDC (Transitional Aid to Families with Dependent Children = Übergangshilfe für Familien mit unselbständigen Kindern) ist ein Programm von dem Bundesstaat Massachusetts, das Familien mit Kindern während einer kurzen Zeit hilft`,
      },
      SSI: {
        label_v1: `SSI`,
        hint_v1:  `Supplemental Security Income (= zusätzliches Sicherheitseinkommen) ist ein Programm von der amerikanischen Bundesregierung, das finanzielle und medizinische Hilfe den Leuten gibt, die blind, behindert oder älter als 65 Jahre sind`,
      },
      SSDI: {
        label_v1: `SSDI`,
        hint_v1:  `Social Security Disability Income (= Sozialversicherung für den Behinderten) ist ein Programm von der amerikanischen Bundesregierung, das behinderten Leuten hilft`,
      },
      childSupport: {
        label_v1: `Bekommene Kinderunterstützung`,
        hint_v1:  `Kinderunterstützung ist Geld, das Ihr ehemaliger Ehepartner Ihnen gibt, um Ihre Kinder zu unterstützen`,
      },
      unemployment: {
        label_v1: `Arbeitslosenversicherung`,
        hint_v1:  `Arbeitslosenversicherung hilft den Leuten, die ihre Arbeit verloren haben`,
      },
      workersComp: {
        label_v1: `Arbeitsunfallversicherung`,
        hint_v1:  `Arbeitsunfallversicherung hilft den Leuten, die einen Unfall bei der Arbeit haben`,
      },
      pension: {
        label_v1: `Rente`,
        hint_v1:  `Die Rente gibt den Rentnern ein Einkommen, das von den ehemaligen Arbeitgebern bezahlt wird`,
      },
      socialSecurity: {
        label_v1: `Social security`,
        hint_v1:  `Social Security (= Staatliche Rentenversicherung) ist ein Programm von der amerikanischen Bundesregierung, das den Rentnern die Einkommenshilfe gibt`,
      },
      alimony: {
        label_v1: `Unterhaltszahlung`,
        hint_v1:  `Unterhaltszahlung ist Geld, das eine Person der zweiten Person nach einer Ehescheidung bezahlt`,
      },
      otherIncome: {
        label_v1: `Anderes Einkommen`,
        hint_v1:  `Bitte bemerken Sie hier irgendwelches Einkommen aus anderen Quellen, die Sie nicht schon bemerkt haben`,
      },
      previous_v1: `Vorherige Seite`,
      next_v1:     `Nächste Seite`,
    },

    currentExpenses: {
      title_v1:                        `Gegenwärtige Haushaltskosten`,
      unreimbursedNonMedicalChildCare: {
        sectionHeading_v1:    `Angemessene Kinderbetreuung, die nicht zurückgezahlte und nicht medizinische ist`,
        subheading_v1:        `Ein "Kind" ist ein Mensch, der jünger als 12 Jahre ist. Bitte nicht einfügen Beträge, die andere Sozialprogrammen bezahlen.`,
        columnExpenseType_v1: `Kosten`,
        childDirectCare:      {
          label_v1: `Direkte Betreuungskosten`,
          hint_v1:  `Wieviel bezahlen Sie aus Ihrer eigenen Tasche?`,
        },
        childBeforeAndAfterSchoolCare: {
          label_v1: `Betreuungskosten für die Zeiten außerhalb der Schulzeit`,
          hint_v1:  `Wieviel bezahlen Sie für die Kinderbetreuung für jene Zeiten außerhalb der Schulzeit?`,
        },
        childTransportation: {
          label_v1: `Transportkosten`,
          hint_v1:  `Wieviel bezahlen Sie für den Transport (der Kinder)?`,
        },
        childOtherCare: {
          label_v1: `Andere Betreuungskosten`,
          hint_v1:  `Wieviel bezahlen Sie für andere Kinderbetreuungskosten?`,
        },
        doEarnBecauseOfChildCare_v1: `Gibt die Kinderbetreuung Ihnen die Möglichkeit, anderes Einkommen zu machen?`,
        earnedBecauseOfChildCare_v1: `Einkommen, das die Kinderbetreuung möglich macht`,
      },
      childSupport: {
        sectionHeading_v1:    `Kinderunterstützung`,
        columnExpenseType_v1: `Kosten`,
        childSupportPaidOut:  {
          legallyObligated_v1: `Gesetzlich verpflichtete`,
          childSupport_v1:     ` Kinderunterstützung`,
        },
      },
      housing: {
        sectionHeading_v1:   `Wohnung`,
        monthlyContractRent: {
          label_v1: `Monatliche Vertragsmiete (die Gesamtmiete für Ihre Wohnung)`,
          hint_v1:  `Die Gesamtmiete für Ihre Wohnung`,
        },
        monthlyRentShare: {
          label_v1: `Ihrer monatliche Mietanteil (Wieviel Sie von der Gesamtmiete bezahlen müssen)`,
          hint_v1:  `Wieviel müssen Sie von der Gesamtmiete bezahlen?`,
        },
        utilitiesSubheading: `Für welche Rechnungen bezahlen Sie?`,
        climateControl:      {
          label_v1: `Die Heizung oder das Kühlsystem (z.B. die Klimaanlage im Sommer)`,
          hint_v1:  `Wieviel bezalhen Sie, wenn Sie eine gesonderte Rechnung für die Heizung und/oder das Kühlsystem haben?`, 
        },
        nonHeatElectricity: {
          label_v1: `Stromrechnung für die Zwecke außer der Heizung`,
          hint_v1:  `Wieviel bezahlen Sie für irgendwelche Stromrechnung (außer der Stromrechnung für die Heizung)`,
        },
        phone: {
          label_v1: `Der Telefondienst`,
          hint_v1:  `Wieviel bezahlen Sie für den grundlegenden Telefondienst?`,
        },
        fuelAssistance: {
          label_v1: `Bekommen Sie Treibstoffunterstützung?`,
          hint_v1:  `Die Treibstoffunterstützung hilft Ihnen mit den Erdgas- oder Ölkosten`,
        },
        previous_v1: `Vorherige Seite`,
        next_v1:     `Nächste Seite`,
      },
    },

    predictions: {
      title_v1:                   `Was kann passieren?`,
      futureIncomeQuestion_v1:    `Wieviel Geld würden Sie in der Zukunft bezahlt werden? (Sie können verschiedene Beträge probieren)`,
      tabTitleChanges_v1:         `Tabelle der Wechseldaten`,
      tabTitleChangesChart_v1:    `Gestapeltes Balkendiagramm der Veränderungen`,
      tabTitleStackedIncomes_v1:  `Die gestapelten Einkommen`,
      tabTitleBenefitPrograms_v1: `Kartesisches Diagramm mit den Wechseln der Sozialhilfe Programmen`,
      chartsHeader_v1:            `Wie können Ihre Sozialhilfe Programmen mit dem neuen Einkommen ändern?`,
      warningMessage_v1:          `Dieses Werkzeug ist im Testzustand. Vielleicht sind diese Zahlen nicht richtig. Wenn die Zahlen falsch sind, möchten wir Ihre Rückmeldungen bekommen.`,
      submitFeedback_v1:          `Geben Sie Ihre Rückmeldungen`,
      // added the following snippets Friday 2018_9_7
      // Benefits Table:
      benefitsTableTitle_v1:      `Veränderungen`,
      columnBenefit_v1:           `Sozialhilfe`, // see BenefitsTable.js
      columnCurrentBenefits_v1:   `Gegenwärtige Sozialhilfe`, // see BenefitsTable.js
      columnNewEstimate_v1:       `Neue Schätzung`, // see BenefitsTable.js
      columnDifference_v1:        `Unterschied`, // see BenefitsTable.js
      rowSNAP_v1:                 `SNAP`, // see BenefitsTable.js
      rowSection8_v1:             `Section 8 Housing (Wohnung)`, // see BenefitsTable.js
      rowTotalBenefits_v1:        `Gesamte Sozialhilfe`, // see BenefitsTable.js
      rowEarned_v2:               `Verdientes Einkommen`, // see BenefitsTable.js
      rowNetTotal_v1:             `Netto-Summe`, // see BenefitsTable.js
      beforeMoney_v1:             `$`, // see BenefitsTable.js multiple lines
      afterMoney_v1:              ` pro Monat`, // see BenefitsTable.js multiple lines
      // Stacked Bar Graph:
      stackedBarGraphTitle_v1:    `Gestapeltes Balkendiagramm der Veränderungen`,
      moneyInAsPayChanges_v2:     `Einkommendes Geld, als der Lohn ändert`, // see StackedBarGraph.js
      // Stacked Area Graph:
      stackedAreaGraphTitle_v1:   `Die gestapelten Einkommen`,
      allMoneyComingIn_v2:        `Alle einkommenden Gelder, als der Lohn ändert`, // see StackedAreaGraph.js
      // Benefit Programs Graph, showing benefit programs as lines not areas:
      benefitProgramsTitle_v2:    `Individuelle Sozialhilfsbeträge für den Haushalt, als der Lohn ändert`, // maybe rename as benefitProgramsSubTitle_v1 ? see also BenefitsLineGraph.js
      benefitValue_v1:            `Sozialhilfswert ($)`, // see BenefitsLineGraph.js
      // Snippets that are used in more than one chart, table, or graph:
      totalMoney_v1:              `Gesamteinkommendes Geld ($)`, // see StackedAreaGraph.js, StackedBarGraph.js
      weeklyPay_v2:               `Wöchentlicher Lohn ($)`,
      monthlyPay_v2:              `Monatlicher Lohn ($)`,
      yearlyPay_v2:               `Jährlicher Lohn ($)`,
      hasPay_v2:                  `Lohn`,
      hasSNAP_v1:                 `SNAP`,
      hasSection8_v1:             `Section 8`, 
      futurePayLine_v2:           `Zukünftiger Lohn`, // see VerticalLine.js
      buttonWeekly_v1:            `Wöchentlich`, // see cashflow.js, GraphTimeButtons
      buttonMonthly_v1:           `Monatlich`, // see cashflow.js, GraphTimeButtons
      buttonYearly_v1:            `Jährlich`, // see cashflow.js, GraphTimeButton
    },
  },
};  // ends de


export { de };
