export default {

  langName: `English`,
  langCode: `en`,

  header: {
    homeNav_v1:   `Home`,
    aboutNav_v1:  `About`,
    githubNav_v1: [
      {
        name: `__githubRepoLink__`,
        text: `GitHub`,
      },
    ],
  },

  footer: {
    header_v1: [
      {
        name: `__githubRepoLink__`,
        text: `Cliff Effects Tool`,
      },
    ],
    cfbCredit_v1: [
      `Made with `,
      { name: `__heartIcon__` },
      ` by Code for Boston`,
    ],
  },

  homePage: {
    appName_v1:          `Cliff Effects Tool`,
    prototypeNote_v1:    `GUIDANCE PROTOTYPE*`,
    cautionaryNote_v1:   `*This is a prototype and should not be used to make financial decisions`,
    toFirstInputPage_v1: `Get Started`,
    toAboutPage_v1:      `Learn More`,
  },

  aboutPage: {
    aboutPageHeader_v1: `About the Cliff Effects Tool`,

    whatForHeader_v1:        `What is this tool for?`,
    whatForImportantNote_v1: [
      {
        name: `__importantNote__`,
        text: `Important Note:`,
      },
      `This application is a minimum viable product. It should not be used as the sole tool to understand a client's SNAP or Section 8 financial situation, or for any other public assistance program.`,
    ],
    whatFor_v2: [
      `This tool can help show how a change in income affects how much someone receives in public assistance from SNAP (Supplemental Nutrition Assistance Program) and Section 8 Housing Voucher benefits. It was designed for the case managers at `,
      { name: `__projectHope__` },
      ` with the aim of helping to predict changes in their clients' benefits.`,
    ],

    whyHeader_v1: `Why is this tool important?`,
    why1_v1:      `A cliff effect occurs when a slight change in a household’s circumstances - say, a slight pay raise - disproportionately lowers their benefits. The household is working to increase what they earn, but they end up with a net loss that actually puts them further behind. These cliff effects prevent many families from actually getting off of public assistance programs.`,
    why2_v1:      `Cliff effects are also difficult to predict. The interactions between income, household size, many other criteria, as well as the effects of the programs themselves impact each other in unexpected ways. We're exploring ways to deal with this issue of complexity and help families better understand and predict their situation.`,

    videoLinkText_v1:    `Two-minute video describing cliff effects`,
    quantLinkText_v1:    `Quantitative scenarios demonstrating cliff effects`,
    benefitsLinkText_v1: `Breakdown of different benefits offered in MA`,

    howToUseHeader_v1: `How do I use this tool?`,
    howToUse_v1:       `Go step-by-step to add information about a client's current benefits, household, income, and other relevant information. This information will be used to predict the client's approximate benefit amount. When you reach the end, change the 'Future Income' amount to see how a change in earned income will cause a change in benefit amount. Currently, the SNAP and Section 8 Housing Voucher programs are both available. Note that predictions may not directly match up with a client’s current benefit amount. The app’s focus is the amount of change that occurs in benefits when there are changes in earned income.`,
    howToUseNote_v1:   [
      `Please note that this app does not store user data, so `,
      {
        name: `__refreshWarning__`,
        text: `if you refresh the page the data you've entered will be lost.`,
      },
      ` Each time you go through the app, it's a clean slate.`,
    ],

    whoMadeThisHeader_v1: `Who is behind this?`,
    whoMadeThis1_v2:      [
      `The code base is being developed on `,
      { name: `__github__` },
      ` by `,
      { name: `__codeForBoston__` },
      ` volunteers. For more information or to report a bug, please contact `,
      { name: `__contactEmail__` },
      `.`,
    ],
    whoMadeThis2_v2: [
      `This application was originally part of a project made possible by a Boston Foundation Open Door Grant to the University of Massachusetts Boston's `,
      { name: `__centerForSocialPolicy__` },
      `, in close partnership with `,
      { name: `__projectHope__` },
      ` and `,
      { name: `__codeForBoston__` },
      `.`,
    ],
    whoMadeThis3_v1: [
      `Here's a special thank you to all the Code for Boston volunteers who brought you this application, especially `,
      { name: `__namesExceptLast__` },
      `, and `,
      { name: `__lastName__` },
      `.`,
    ],
  },

  visitPage: {
    previous_v1:  `Previous`,
    next_v1:      `Next`,
    newClient_v1: `New Client`,

    stepBar: {
      currentBenefits_v1: `Current Benefits`,
      household_v1:       `Household`,
      currentIncome_v1:   `Income`,
      currentExpenses_v1: `Expenses`,
      predictions_v1:     `Predictions`,
    },

    formHelpers: {
      weekly:   `Weekly`,
      monthly:  `Monthly`,
      yearly:   `Yearly`,
      yesLabel: `Yes`,
      noLabel:  `No`,
    },

    currentBenefits: {
      currentBenefits_v1:  `Current Benefits`,
      selectBenefits_v1:   `Select the benefits you currently receive`,
      hasSection8Label_v1: `Do you have Section 8 Housing?`,
      hasSection8Hint_v1:  `Section 8 provides rental housing assistance.`,
      hasSnapLabel_v1:     `Do you have SNAP?`,
      hasSnapHint_v1:      `SNAP provides assistance with buying food`,
    },

    household: {
      title_v1:           `Household`,
      clarifier_v1:       `Information about the members of your household.`,
      role_v1:            `Role`,
      age_v1:             `Age`,
      disabled_v1:        `Disabled`,
      headOfHousehold_v1: `Head of Household`,
      addMember_v1:       `Add a member`,
      spouse_v1:          `Spouse of Head of Household`,
      childOther_v1:      `Child/Other Household Member`,
      previous_v1:        `Previous`,
      next_v1:            `Next`,
    },

    currentIncome: {
      title_v1:                  `Current Household Income`,
      clarifier_v1:              `Income that you collected in the past 12 months.`,
      explainSnapCalculation_v1: `This prototype will attempt to make its own calculations for SNAP amount`,
      earnedIncome:              {
        label_v1: `Earned income`,
        hint_v1:  `Earned income is how much you and your family get paid from working`,
      },
      TAFDC: {
        label_v1: `TAFDC`,
        hint_v1:  `Transitional Aid to Families with Dependent Children provides short-term financial assistance to families with children`,
      },
      SSI: {
        label_v1: `SSI`,
        hint_v1:  `Supplemental Security Income is a federal program that provides financial and health care assistance to people 65 and over, or people who are blind or disabled`,
      },
      SSDI: {
        label_v1: `SSDI`,
        hint_v1:  `Social Security Disability Income is a federal program to help people with disabilities`,
      },
      childSupport: {
        label_v1: `Child support recieved`,
        hint_v1:  `Child support is money paid to you by a former spouse to help your child`,
      },
      unemployment: {
        label_v1: `Unemployment`,
        hint_v1:  `Unemployment benefits provide income to people who have been laid off`,
      },
      workersComp: {
        label_v1: `Worker's compensation`,
        hint_v1:  `Worker's Compensation provides assistance for people who have been injured on the job`,
      },
      pension: {
        label_v1: `Pension`,
        hint_v1:  `A pension provides income to retirees, usually from their former employers`,
      },
      socialSecurity: {
        label_v1: `Social security`,
        hint_v1:  `Social Security is a federal program that provides assistance to retirees`,
      },
      alimony: {
        label_v1: `Alimony`,
        hint_v1:  `Alimony is money paid by one spouse to the other after a divorce`,
      },
      otherIncome: {
        label_v1: `Other income`,
        hint_v1:  `Please note income you may have from sources that are not listed above`,
      },
      previous_v1: `Previous`,
      next_v1:     `Next`,
    },

    currentExpenses: {
      title_v1:                        `Current Household Expenses`,
      unreimbursedNonMedicalChildCare: {
        sectionHeading_v1:    `Reasonable Unreimbursed Non-Medical Child(ren) Care`,
        subheading_v1:        `A "child" is a person 12 or younger. Don't include amounts that are paid for by other benefit programs.`,
        columnExpenseType_v1: `Expense`,
        childDirectCare:      {
          label_v1: `Direct care costs`,
          hint_v1:  `How much do you pay for child care out of pocket?`,
        },
        childBeforeAndAfterSchoolCare: {
          label_v1: `Before- and after-school care`,
          hint_v1:  `How much do you pay for child care for times before or after school?`,
        },
        childTransportation: {
          label_v1: `Transportation costs`,
          hint_v1:  `How much do you pay for transportation?`,
        },
        childOtherCare: {
          label_v1: `Other care`,
          hint_v1:  `How much do you pay for other child care?`,
        },
        doEarnBecauseOfChildCare_v1: `Does child care allow you to make additional income?`,
        earnedBecauseOfChildCare_v1: `Income made possible by childcare expenses`,
      },
      childSupport: {
        sectionHeading_v1:    `Child Support`,
        columnExpenseType_v1: `Expense`,
        childSupportPaidOut:  {
          legallyObligated_v1: `Legally obligated`,
          childSupport_v1:     ` child support`,
        },
      },
      housing: {
        sectionHeading_v1:   `Housing`,
        monthlyContractRent: {
          label_v1: `Monthly Contract Rent (the total rent for your apartment)`,
          hint_v1:  `The total rent for your apartment`,
        },
        monthlyRentShare: {
          label_v1: `Your Monthly Rent Share (how much of the total rent you have to pay)`,
          hint_v1:  `How much of the total rent you have to pay`,
        },
        utilitiesSubheading: `Which of these utilities do you pay for?`,
        climateControl:      {
          label_v1: `Heating or cooling (e.g. A/C during summer)`,
          hint_v1:  `How much do you pay if you have a separate bill for heating and/or cooling`,
        },
        nonHeatElectricity: {
          label_v1: `Electricity for non-heating purposes`,
          hint_v1:  `How much do you pay for any electric usage (other than for heat)`,
        },
        phone: {
          label_v1: `Telephone service`,
          hint_v1:  `How much do you pay for basic telephone service`,
        },
        fuelAssistance: {
          label_v1: `Do you get Fuel Assistance?`,
          hint_v1:  `Fuel Assistance helps you pay for heating fuel`,
        },
      },
      previous_v1: `Previous`,
      next_v1:     `Next`,
    },

    predictions: {
      title_v1:                   `What Might Happen?`,
      futureIncomeQuestion_v1:    `How much money would you get paid in the future? (You can try different amounts)`,
      tabTitleChanges_v1:         `Changes`, // see Predictions.js
      tabTitleChangesChart_v1:    `Changes Chart`, // see Predictions.js
      tabTitleStackedIncomes_v1:  `Stacked Incomes`, // see Predictions.js
      tabTitleBenefitPrograms_v1: `Benefit Programs`, // see Predictions.js
      chartsHeader_v1:            `With the new pay, how could your benefits change?`,
      warningMessage_v2:          `This tool is in testing and these numbers might not be right. If they're not, please `,
      submitFeedback_v2:          `let us know`,
      // Text Summary:
      summaryTitle_v1:            `Summary`,
      noBenefitsChosen_v1:        `On the first page of questions you didn't choose any of the benefits. If you're not getting any benefits now, this tool can't tell you if you will get any in the future. If you're trying to find help getting into a benefit program, try searching for "social services" in your local area.`,
      noFutureChange_v1:          `There is no change in your household's pay, so there's no change in your benefits.`,
      period_v1:                  `.`,
      eachTimeInterval_v1:        `a month`,  // `eachTime`?
      detailsHeader_v1:           `What could happen?`,
      nowEarn_v1:                 `Right now you earn`,
      nowBenefitsTotalIs_v1:      `and this tool says that your benefits all add up to about`,
      nowTotalIs_v1:              `All together, it says you bring in about`,
      newEarn_v1:                 `If your household's pay changes to`,
      newBenefitsTotalIs_v1:      `this tool says your benefits might add up to about`,
      newBenefitDetailsIntro_v1:  `This is how your benefits might change:`,
      from_v1:                    `might change from about`,
      to_v1:                      `to about`,
      feedbackAsk_v1:             `Are these numbers right? Please `,
      summaryHeader_v1:           `What could it add up to?`,
      newTotalIs_v1:              `If this tool is right, you might bring in about`,
      resultIs_v1:                `That's`,
      moreThan_v1:                `more than before.`,
      lessThan_v1:                `less than before.`,
      sameAs_v1:                  `the same as before.`,
      noCliff_v1:                 `After this, the tool says you could keep bringing in more with each raise.`,
      cliffEndHeader_v1:          `When could things get better?`,
      ifGetTo_v1:                 `The tool says that if you can get to where your household makes about`,
      willGet_v1:                 `you could bring in about`,
      moreIn_v1:                  `more each month all together.`,
      findHelp_v1:                `If you're worried about these results, please search for "social services" in your area to try to find a local case manager.`,
      printButton_v1:             `Print`,
      // Benefits Table:
      benefitsTableTitle_v1:      `Changes`, // see line 265 above
      columnBenefit_v1:           `Benefit`, // see BenefitsTable.js
      columnCurrentBenefits_v1:   `Current Benefits`, // see BenefitsTable.js
      columnNewEstimate_v1:       `New Estimate`, // see BenefitsTable.js
      columnDifference_v1:        `Difference`, // see BenefitsTable.js
      rowSNAP_v1:                 `SNAP`, // see BenefitsTable.js
      rowSection8_v1:             `Section 8 Housing`, // see BenefitsTable.js
      rowTotalBenefits_v1:        `Total Benefits`, // see BenefitsTable.js
      rowIncome_v1:               `Income`, // see BenefitsTable.js
      rowNetTotal_v1:             `Net Total`, // see BenefitsTable.js
      beforeMoney_v1:             `$`, // see BenefitsTable.js multiple lines
      afterMoney_v1:              ` / month`, // see BenefitsTable.js multiple lines
      // Stacked Bar Graph:
      stackedBarGraphTitle_v1:    `Changes Chart`, // see line 266 above
      moneyInAsIncomeChanges_v1:  `Money Coming In as Income Changes`, // see StackedBarGraph.js
      // Stacked Area Graph:
      stackedAreaGraphTitle_v1:   `Stacked Incomes`, // see line 267 above
      allMoneyComingIn_v1:        `All Money Coming In as Income Changes`, // see StackedAreaGraph.js
      // Benefit Programs Graph, showing benefit programs as lines not areas:
      benefitProgramsTitle_v1:    `Individual Benefit Amounts for Household as Income Changes`, // maybe rename as benefitProgramsSubTitle_v1 ? see also BenefitsLineGraph.js
      benefitValue_v1:            `Benefit Value ($)`, // see BenefitsLineGraph.js
      // Snippets that are used in more than one chart, table, or graph:
      totalMoney_v1:              `Total Money Coming In ($)`, // see StackedAreaGraph.js, StackedBarGraph.js
      weeklyIncome_v1:            `Weekly Income ($)`,
      monthlyIncome_v1:           `Monthly Income ($)`,
      yearlyIncome_v1:            `Yearly Income ($)`,
      hasIncome_v1:               `Income`,
      hasSNAP_v1:                 `SNAP`,
      hasSection8_v1:             `Section 8`, 
      futureIncomeLine_v1:        `Future Income`, // see VerticalLine.js
      buttonWeekly_v1:            `Weekly`, // see cashflow.js, GraphTimeButtons
      buttonMonthly_v1:           `Monthly`, // see cashflow.js, GraphTimeButtons
      buttonYearly_v1:            `Yearly`, // see cashflow.js, GraphTimeButtons
    },

    warningModal: {
      header_v1:              `IMPORTANT!`,
      warning_v1:             `This tool is in testing.  Predictions should not be used to make financial decisions.`,
      buttonAcceptWarning_v1: `Continue`,
      buttonCancel_v1:        `Cancel`,
      formInstructions_v1:    `Please indicate you understand the following:`,
      checkboxLabel1:         `This tool is not finished.`,
      checkboxLabel2:         `I can't count on what this tool tells me.`,
    },

  },
};
