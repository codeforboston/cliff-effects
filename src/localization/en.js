export default {

  langName: `English`,
  langCode: `en`,

  header: {},

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
    whoMadeThis1_v1:      [
      `This application is part of a project made possible by a Boston Foundation Open Door Grant to the University of Massachusetts Boston's `,
      { name: `__centerForSocialPolicy__` },
      `, in close partnership with `,
      { name: `__projectHope__` },
      ` and `,
      { name: `__codeForBoston__` },
      `. The Center for Social Policy is the lead partner for the `,
      { name: `__onSolidGroundCoalition__` },
      `.`,
    ],
    whoMadeThis2_v1: [
      `The code base is being maintained on `,
      { name: `__github__` },
      ` by `,
      { name: `__codeForBoston__` },
      ` volunteers. For more information or to report a bug, please contact `,
      { name: `__contactEmail__` },
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
      title:           `Household`,
      clarifier:       `Information about the members of your household.`,
      role:            `Role`,
      age:             `Age`,
      disabled:        `Disabled`,
      headOfHousehold: `Head of Household`,
      addMember:       `Add a member`,
      spouse:          `Spouse of Head of Household`,
      childOther:      `Child/Other Household Member`,
      previous:        `Previous`,
      next:            `Next`,
    },

    currentIncome: {
      title:                  `Current Household Income`,
      clarifier:              `Income that you collected in the past 12 months.`,
      explainSnapCalculation: `This prototype will attempt to make its own calculations for SNAP amount`,
      earnedIncome:           {
        label: `Earned income`,
        hint:  `Earned income is how much you and your family get paid from working`,
      },
      TAFDC: {
        label: `TAFDC`,
        hint:  `Transitional Aid to Families with Dependent Children provides short-term financial assistance to families with children`,
      },
      SSI: {
        label: `SSI`,
        hint:  `Supplemental Security Income is a federal program that provides financial and health care assistance to people 65 and over, or people who are blind or disabled`,
      },
      SSDI: {
        label: `SSDI`,
        hint:  `Social Security Disability Income is a federal program to help people with disabilities`,
      },
      childSupport: {
        label: `Child support recieved`,
        hint:  `Child support is money paid to you by a former spouse to help your child`,
      },
      unemployment: {
        label: `Unemployment`,
        hint:  `Unemployment benefits provide income to people who have been laid off`,
      },
      workersComp: {
        label: `Worker's compensation`,
        hint:  `Worker's Compensation provides assistance for people who have been injured on the job`,
      },
      pension: {
        label: `Pension`,
        hint:  `A pension provides income to retirees, usually from their former employers`,
      },
      socialSecurity: {
        label: `Social security`,
        hint:  `Social Security is a federal program that provides assistance to retirees`,
      },
      alimony: {
        label: `Alimony`,
        hint:  `Alimony is money paid by one spouse to the other after a divorce`,
      },
      otherIncome: {
        label: `Other income`,
        hint:  `Please note income you may have from sources that are not listed above`,
      },
      previous: `Previous`,
      next:     `Next`,
    },

    currentExpenses: {
      title:                           `Current Household Expenses`,
      unreimbursedNonMedicalChildCare: {
        sectionHeading:    `Reasonable Unreimbursed Non-Medical Child(ren) Care`,
        subheading:        `A "child" is a person 12 or younger. Don't include amounts that are paid for by other benefit programs.`,
        columnExpenseType: `Expense`,
        childDirectCare:   {
          label: `Direct care costs`,
          hint:  `How much do you pay for child care out of pocket?`,
        },
        childBeforeAndAfterSchoolCare: {
          label: `Before- and after-school care`,
          hint:  `How much do you pay for child care for times before or after school?`,
        },
        childTransportation: {
          label: `Transportation costs`,
          hint:  `How much do you pay for transportation?`,
        },
        childOtherCare: {
          label: `Other care`,
          hint:  `How much do you pay for other child care?`,
        },
        doEarnBecauseOfChildCare: `Does child care allow you to make additional income?`,
        earnedBecauseOfChildCare: `Income made possible by childcare expenses`,
      },
      childSupport: {
        sectionHeading:      `Child Support`,
        columnExpenseType:   `Expense`,
        childSupportPaidOut: {
          legallyObligated: `Legally obligated`,
          childSupport:     ` child support`,
        },
      },
      housing: {
        sectionHeading:      `Housing`,
        monthlyContractRent: {
          label: `Monthly Contract Rent (the total rent for your apartment)`,
          hint:  `The total rent for your apartment`,
        },
        monthlyRentShare: {
          label: `Your Monthly Rent Share (how much of the total rent you have to pay)`,
          hint:  `How much of the total rent you have to pay`,
        },
        utilitiesSubheading: `Which of these utilities do you pay for?`,
        climateControl:      {
          label: `Heating or cooling (e.g. A/C during summer)`,
          hint:  `How much do you pay if you have a separate bill for heating and/or cooling`,
        },
        nonHeatElectricity: {
          label: `Electricity for non-heating purposes`,
          hint:  `How much do you pay for any electric usage (other than for heat)`,
        },
        phone: {
          label: `Telephone service`,
          hint:  `How much do you pay for basic telephone service`,
        },
        fuelAssistance: {
          labelText: `Do you get Fuel Assistance?`,
          hint:      `Fuel Assistance helps you pay for heating fuel`,
        },
      },
      previous: `Previous`,
      next:     `Next`,
    },

    predictions: {
      title_v1:                   `What Might Happen?`,
      futureIncomeQuestion_v1:    `How much money would you get paid in the future? (You can try different amounts)`,
      tabTitleChanges_v1:         `Changes`,
      tabTitleChangesChart_v1:    `Changes Chart`,
      tabTitleStackedIncomes_v1:  `Stacked Incomes`,
      tabTitleBenefitPrograms_v1: `Benefit Programs`,
      chartsHeader_v1:            `With the new pay, how could your benefits change?`,
      warningMessage_v2:          `This tool is in testing and these numbers might not be right. If they're not, please `,
      submitFeedback_v2:          `let us know`,

      benefitsTableTitle_v1:    `Changes`,
      columnBenefit_v1:         `Benefit`,
      columnCurrentBenefits_v1: `Current Benefits`,
      columnNewEstimate_v1:     `New Estimate`,
      columnDifference_v1:      `Difference`,
      rowSNAP_v1:               `SNAP`,
      rowSection8_v1:           `Section 8 Housing`,
      rowTotalBenefits_v1:      `Total Benefits`,
      rowIncome_v1:             `Income`,
      rowNetTotal_v1:           `Net Total`,
      perMonth_v1:              ` / month`,
      dollarSign_v1:            `$`,
    },
  },
};
