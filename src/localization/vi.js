const vi = {

  langName: `Tiếng Việt`,   // Change this to the name of your language (written in your language)
  langCode: `vi`,

  header: {},

  footer: {
    'header_v1': [
      {
        name: `__githubRepoLink__`,
        text: `Công Cụ Cliff Effects`,
      },
    ],
    'cfbCredit_v1': [
      `Được làm với `,
      { name: `__heartIcon__` },
      ` bởi Code for Boston`,
    ],
  },

  homePage: {
    'appName_v1':          `Công Cụ Cliff Effects`,
    'prototypeNote_v1':    `NGUYÊN MẪU HƯỚNG DẪN*`,
    'cautionaryNote_v1':   `*Dụng cụ này là mẫu đầu tiên và không nên dùng để quyết định việc tài chính`,
    'toFirstInputPage_v1': `Bắt Đầu Dùng`,
    'toAboutPage_v1':      `Tìm Hiểu Thêm`,
  },

  aboutPage: {
    'aboutPageHeader_v1': `Tìm Hiểu Thêm Về Công Cụ Cliff Effects`,

    'whatForHeader_v1':        `Cái công cụ này cho ai?`,
    'whatForImportantNote_v1': [
      {
        name: `__importantNote__`,
        text: `Lưu Ý Quan Trọng:`,
      },
      // v2: `This application is a minimum viable product. It should not be used as the only tool to understand a client's SNAP or Section 8 financial situation, or for any other public assistance program. It's made by volunteers with limited time and the tool may not be up to date with the current regulations.`,
      `Ứng dụng này là sản phẩm hữu hiệu thiểu. Bạn không nên dùng dụng cụ này là dụng cụ duy nhất để hiểu biết tình hình tài chính của chương trình phiếu mua hàng SNAP hoặc của chương trình Section 8 Housing liên quan với khách, hoặc dùng cho chương trình hỗ trợ công cộng khác.`,
    ],
    'whatFor_v2': [
      `Công cụ này có thể giúp người dùng xem sự thay đổi trong các quyền lợi nhân được từ trợ cấp công cộng từ phiếu mua hàng SNAP (Supplemental Nutrition Assistance Program) và chương trình Section 8 Housing nếu mà tiền lương của khách bị thay đổi. Cái ứng dụng này được thiết kế cho người quản lý hồ sơ tại `,
      { name: `__projectHope__` },
      ` với mục đích để giúp đoán những thay đổi trong các quyền lợi của khách.`,
    ],

    'whyHeader_v1': `Tại sao công cụ này quan trọng?`,
    // v2: All the ways that benefits interact with a family's circumstances and with each other are impossible for one person to calculate accurately. A family making fanancial choices these days is making them blind. We're exploring ways to deal with this issue of complexity and help families better understand and predict their situation.
    'why1_v1':      `Hiệu ứng vách đá này xảy ra khi có sự thay đổi nhỏ trong hoàn cảnh của hộ gia đình - như tăng tiền lương nhẹ - và cái đó làm giảm lợi ích của họ một cách không cân xứng. Hộ gia đình đang làm việc để tăng lượng của họ, nhưng cuối cùng họ sẽ bị lỗ với tiền nhân được hàng tháng. Những cái hiệu ứng vách đá ngăn chặn nhiều gia đình thực sự rời khỏi chương trình hỗ trợ công cộng.`,
    // v2: A cliff effect occurs when a slight change in a household’s circumstances - say, a slight pay raise - disproportionately lowers their benefits. Some situations can leave a family earning more, but bringing in less money all together. Sometimes these cliff effects prevent many families from actually getting off of public assistance programs. A lot of people are working to improve the situation, but there's a lot of work left to do. SNAP itself underwent some major changes in the past few years that aim to improve the course of that benefit. Below are links to more information specifically about cliff effects relevant to 2017 and before.
    'why2_v1':      `Những hiệu ứng vách đá cũng khó để dự đoán. Các tương tác giữa tiền lương, số người trong hộ nhà đinh, và nhiều tiêu chí khác, cũng như các hiệu ứng mà mỗi chương trình đã tác động lẫn nhau kết quả cách bất ngờ. Chúng tôi đang tìm cách giải quyết vấn đề phức tạp này và giúp các gia đình hiểu rõ hơn và dự đoán tình hình của họ.`,

    'videoLinkText_v1':    `Phim dài hai phút mô tả hiệu ứng vách đá`,
    'quantLinkText_v1':    `Những kịch bản định lượng thể hiện hiệu ứng vách đá`,
    'benefitsLinkText_v1': `Phân tích các lợi ích khác nhau được cung cấp trong MA`,

    'howToUseHeader_v1': `Cách sử dụng công cụ này?`,
    'howToUse_v1':       `Đi từng bước một để thêm thông tin về lợi ích hiện tại của khách, hộ gia đình, tiền lương, và các thông tin liên quan khác. Thông tin này sẽ được sử dụng để dự đoán số tiền trợ cấp. Lúc mà bạn đến trang cuối, hãy thay đổi số tiền ở trong ô “Tiền Lương Trong Tương Lai” để xem thấy đổi tiền lương sẽ gây ra thay đổi về số tiền trợ cấp như sao. Hiện tại, các chương trình phiếu mua hàng SNAP và chương trình Section 8 Housing đều có sẵn. Lưu ý rằng các dự đoán có thể không khớp trục tiếp với số tiền trợ cấp hiện tại của khách. Trọng tâm của ứng dụng là số lượng thay đổi xảy ra trong lợi ích khi có thay đổi về mức lương của tiền lương.`,
    'howToUseNote_v1':   [
      `Xin lưu ý rằng ứng dụng này không lưu trữ dữ liệu người dùng, vì vậy `,
      {
        name: `__refreshWarning__`,
        text: `nếu bạn cập nhật trang, dữ liệu bạn đã nhập vào sẽ bị mất.`,
      },
      ` Mỗi khi bạn khởi động ứng dụng, dữ liệu người dùng của bạn sẽ đặt lại.`,
    ],

    'whoMadeThisHeader_v1': `Ai là những người ủng hộ sáng kiến này?`,
    'whoMadeThis1_v1':      [
      `Ứng dụng này là một phần của dự án được thực hiện bởi thành phố Boston’s Foundation Open Door tiền trợ cấp cho trường đại học University of Massachusetts Boston's `,
      { name: `__centerForSocialPolicy__` },
      `, hợp tác chặt chẽ với `,
      { name: `__projectHope__` },
      ` và `,
      { name: `__codeForBoston__` },
      `. Trung Tâm Chính Sách Xã Hội là đối tác chính cho `,
      { name: `__onSolidGroundCoalition__` },
      `.`,
    ],
    'whoMadeThis2_v1': [
      `Bộ mã này đang được duy trì trên `,
      { name: `__github__` },
      ` bởi các tình nguyện viên tại `,
      { name: `__codeForBoston__` },
      `. Để biết thêm thông tin hoặc báo cáo sự cố, vui lòng liên lạc `,
      { name: `__contactEmail__` },
      `.`,
    ],
    'whoMadeThis3_v1': [
      `Đây là một lời cảm ơn đặc biệt đến tất cả các tình nguyện viên tại Code for Boston đã mang đến cho bạn ứng dụng này, đặc biệt là `,
      { name: `__namesExceptLast__` },
      `, và `,
      { name: `__lastName__` },
      `.`,
    ],
  },

  visitPage: {
    'previous_v1':  `Trang Trước`,
    'next_v1':      `Trang Kế Tiếp`,
    'newClient_v1': `Khách Mới`,

    stepBar: {
      'currentBenefits_v1': `Lợi Ích Hiện Tại`,
      'household_v1':       `Hộ Gia Đình`,
      'currentIncome_v1':   `Tiền Lương`,
      'currentExpenses_v1': `Chi Phí`,
      'predictions_v1':     `Dự Đoán`,
    },

    formHelpers: {
      'weekly_v1':   `Hàng Tuần`,
      'monthly_v1':  `Hàng Tháng`,
      'yearly_v1':   `Hàng Năm`,
      'yesLabel_v1': `Vâng`,
      'noLabel_v1':  `Không`,
    },

    currentBenefits: {
      currentBenefits_v1:    `Lợi Ích Hiện Tại`,
      selectBenefits_v1:     `Chọn những lợi ích bạn hiện đang nhận được`,
      has_section8_label_v1: `Bạn có chương trình Section 8 Housing không?`,
      has_snap_label_v1:     `Bạn có chương trình phiếu mua hàng SNAP không?`,
    },

    household: {
      title_v1:           `Hộ Gia Đình`,
      clarifier_v1:       `Thông tin về các thành viên trong hộ gia đình của bạn.`,
      role_v1:            `Vai`,
      age_v1:             `Tuổi Tác`,
      disabled_v1:        `Tàn Tật`,
      headOfHousehold_v1: `Chủ Hộ`,
      addMember_v1:       `Thêm Thành Viên`,
      spouse_v1:          `Vợ/Chồng của Chủ Hộ`,
      childOther_v1:      `Trẻ Em/Thành Viên Khác Trong Gia Đình`,
      previous_v1:        `Trang Trước`,
      next_v1:            `Trang Kế Tiếp`,
    },

    currentIncome: {
      title_v1:                  `Lượng hiện tại của hộ gia đình`,
      clarifier_v1:              `Tiền lương bạn đã thu được trong 12 tháng qua.`,
      explainSnapCalculation_v1: `Nguyên mẫu này sẽ tính toán số tiền nhận được từ chương trình phiếu mua hàng SNAP`,
      earnedIncome:              {
        label_v1: `Tiền lương kiếm được`,
        hint_v1:  `Tiền lương kiếm được là bao nhiêu bạn và gia đình bạn được trả lúc đi làm`,
      },
      TAFDC: {
        label_v1: `TAFDC`,
        hint_v1:  `Chương trình TAFDC (Transitional Aid to Families with Dependent Children) cung cấp hỗ trợ tài chính trong thời gian ngắn cho các gia đình có con`,
      },
      SSI: {
        label_v1: `SSI`,
        hint_v1:  `Chương trình liên bang SSI (Supplemental Security Income) cung cấp hỗ trợ tài chính và chăm sóc sức khỏe cho những người từ 65 tuổi trở lên, hoặc những người bị mù hoặc tàn tật`,
      },
      SSDI: {
        label_v1: `SSDI`,
        hint_v1:  `Chương trình liên bang SSDI (Social Security Disability Income) giúp đỡ người tàn tật`,
      },
      childSupport: {
        label_v1: `Tiền hỗ trợ trẻ em nhận được`,
        hint_v1:  `Tiền hỗ trợ trẻ em là tiền trả cho bạn bởi người phối ngẫu để giúp con bạn`,
      },
      unemployment: {
        label_v1: `Tiến thất nghiệp`,
        hint_v1:  `Tiền trợ cấp thất nghiệp cung cấp thu nhập cho những người đã bị sa thải`,
      },
      workersComp: {
        label_v1: `Tiền bồi thường lao động`,
        hint_v1:  `Tiền bồi thường lao động cung cấp hỗ trợ cho những người đã bị thương  trong công việc`,
      },
      pension: {
        label_v1: `Tiền lương hưu`,
        hint_v1:  `Tiền lương hưu cung cấp thu nhập cho người về hưu, thường là từ các chủ trước của họ`,
      },
      socialSecurity: {
        label_v1: `Tiền an ninh xã hội`,
        hint_v1:  `Tiền an ninh xã hội là một chương trình liên bang cung cấp hỗ trợ cho người về hưu`,
      },
      alimony: {
        label_v1: `Tiền cấp dưởng`,
        hint_v1:  `Tiền cấp dưởng là tiền do vợ/chồng trả tiền cho người kia sau khi ly dị`,
      },
      otherIncome: {
        label_v1: `Thu nhập khác`,
        hint_v1:  `Xin vui lòng cho biết thu nhập bạn có thể có từ các nguồn không được liệt kê ở trên`,
      },
      previous_v1: `Trang Trước`,
      next_v1:     `Trang Kế Tiếp`,
    },

    currentExpenses: {
      title_v1:                        `Chỉ phí hộ gia đình hiện tại`,
      unreimbursedNonMedicalChildCare: {
        sectionHeading_v1:    `Tiền hợp lý không được bồi thường để chăm sóc trẻ em cho việc không liên quan với y tế`,
        subheading_v1:        `Một “đứa trẻ” là một người tự 12 tuổi trở xuống. Xin đừng bao gồm số tiền được trả bởi các chương trình quyền lợi khác.`,
        columnExpenseType_v1: `Tiền Chi Phi`,
        childDirectCare:      {
          label_v1: `Tiền chi phí trực tiếp cho việc chăm sóc`,
          hint_v1:  `Bạn trả bao nhiêu cho việc hỗ trợ trẻ em ra khỏi túi?`,
        },
        childBeforeAndAfterSchoolCare: {
          label_v1: `Tiền chăm sóc trước và sau giờ học`,
          hint_v1:  `Bạn trả bao nhiêu cho việc giữ trẻ trước hoặc sau giờ học?`,
        },
        childTransportation: {
          label_v1: `Tiền chi phí cho sự chuyên chở`,
          hint_v1:  `Bạn trả bao nhiêu cho việc chuyên chở?`,
        },
        childOtherCare: {
          label_v1: `Tiền cho việc chăm sóc khác`,
          hint_v1:  `Bạn trả bao nhiêu cho bất kỳ dịch vụ khác để chăm sóc trẻ?`,
        },
        doEarnBecauseOfChildCare_v1: `Các dịch vụ giữ trẻ em có cho phép bạn kiếm thêm thu nhập hay không?`,
        earnedBecauseOfChildCare_v1: `Thu nhập thực hiện được do chi phí chăm sóc trẻ em`,
      },
      childSupport: {
        sectionHeading_v1:    `Hỗ Trợ Trẻ Em`,
        columnExpenseType_v1: `Tiền Chi Phi`,
        childSupportPaidOut:  {
          legallyObligated_v1: `Bắt buộc về mặt pháp lý`,
          childSupport_v1:     ` hỗ trợ trẻ em`,
        },
      },
      housing: {
        sectionHeading_v1:   `Việc Nhà Ở`,
        monthlyContractRent: {
          label_v1: `Hợp Đồng Thuê Hàng Tháng (tổng số tiền thuê nhà của bạn)`,
          hint_v1:  `Tổng số tiền thuê nhà hàng tháng của bạn`,
        },
        monthlyRentShare: {
          label_v1: `Chia sẻ của tiền thuê nhà hàng tháng của bạn (tổng số tiền thuê bạn phải trả nếu bạn chia sẻ tiền chi phí)`,
          hint_v1:  `Bạn phải trả bao nhiêu trong tổng số tiền thuê nhà`,
        },
        utilitiesSubheading_v1: `Trong những ngành phục vụ công cộng, bạn trả tiền cho những cái nào?`,
        climateControl:         {
          label_v1: `Tiền Cho Sưởi Ấm Hoặc Làm Mát (ví dụ máy lạnh  trong mùa hè)`,
          hint_v1:  `Bạn trả bao nhiêu tiền nếu bạn có hóa đơn riêng để sưởi ấm và/hoặc làm mát`,
        },
        nonHeatElectricity: {
          label_v1: `Sử dụng điện cho mục đích không sưởi ấm`,
          hint_v1:  `Bạn trả bao nhiêu tiền cho bất kỳ việc sử dụng điện (ngoài sự dũng cho sưởi ấm)`,
        },
        phone: {
          label_v1: `Dịch vụ điện thoại`,
          hint_v1:  `Bạn trả bao nhiêu cho dịch vụ điện thoại cơ bản`,
        },
        fuelAssistance: {
          label_v1: `Bạn có được hỗ trợ nhiên liệu không?`,
          hint_v1:  `Hỗ trợ nhiên liệu giúp bạn trả tiền cho sử sưởi ấm nhiên liệu`,
        },
      },
      previous_v1: `Trang Trước`,
      next_v1:     `Trang Kế Tiếp`,
    },

    predictions: {
      'title_v1':                   `Chuyện Gì Có Thể Xảy Ra?`,
      'futureIncomeQuestion_v1':    `Bạn sẽ được trả bao nhiêu tiền trong tương lai? (Bạn có thể thử số tiền khác nhau)`,
      'tabTitleChanges_v1':         `Những Thay Đổi`,
      'tabTitleChangesChart_v1':    `Biểu Đồ Của Những Thay Đổi`,
      'tabTitleStackedIncomes_v1':  `Xếp Chồng Tiền Thu Nhập Lên Nhau`,
      'tabTitleBenefitPrograms_v1': `Chương Trình Lợi Ích`,
      'chartsHeader_v1':            `Với việc tăng lương, lợi ích của bạn có thể thay đổi như thế nào?`,
      'warningMessage_v1':          `Công cụ này đang được thử nghiệm và những con số này có thể không đúng. Nếu chúng không đúng, xin vui lòng gửi cho chúng tôi phản hồi của bạn.`,
      'submitFeedback_v1':          `Gửi Phản Hồi`,

      beforeMoney_v1:             ``,
      afterMoney_v1:              `$`,
      thousandsSeparator_v0:      `,`,
      beforeMoneyWithTime_v1:     ` / tháng`,
      afterMoneyWithTime_v1:      `$`,
      xAxisTitleEnd_v0:           ` Pay`,
      panInstructions_v0:         `To pan, hold 'alt' while you click and drag`,
      currentPayPlotLineLabel_v0: `Current pay:`,
      noBenefitsSelected_v0:      `No public benefit programs have been selected`,

      'benefitsTableTitle_v1':    `Những Thay Đổi`,
      'columnBenefit_v1':         `Lợi Ích `,
      'columnCurrentBenefits_v1': `Lợi Ích Hiện Tại`,
      'columnNewEstimate_v1':     `Ước Tính Mới`,
      'columnDifference_v1':      `Sự Khác Biệt`,
      'rowSNAP_v1':               `Chương Trình Phiếu Mua Hàng SNAP`,
      'rowSection8_v1':           `Chương Trình Section 8 Housing`,
      'rowTotalBenefits_v1':      `Tổng Lợi Ích`,
      rowEarned_v1:               `Tiền Thu Nhập`,
      rowNetTotal_v1:             `Tổng số tiền sau khi chi phí`,

      stackedBarGraphTitle_v1: `Đồ Thị Về Việc Thay Đổi`,
      moneyInAsPayChanges_v1:  `Tiền Nhận Được Lúc Mà Thay Đổi Thu Nhập`,

      stackedAreaGraphTitle_v1: `Xếp Chồng Tiền Thu Nhập Lên Nhau`,
      allMoneyComingIn_v1:      `Tổng Tiền Nhận Được Lúc Mà Thay Đổi Thu Nhập`,

      benefitProgramsTitle_v1: `Số tiền trợ cấp của cá nhân nhận được cho gia đình lúc mà thay đổi thu nhập`,
      benefitValue_v1:         `Giá Trị Của Lợi Ích ($)`,

      totalMoney_v1:    `Tổng Số Tiền Nhận Được ($)`,
      weeklyPay_v1:     `Tiền Lương Hàng Tuần ($)`,
      monthlyPay_v1:    `Tiền Lương Hàng Tháng ($)`,
      yearlyPay_v1:     `Tiền Lương Hàng Năm ($)`,
      hasPay_v1:        `Tiền Lương`,
      hasSNAP_v1:       `Chương Trình Phiếu Mua Hàng SNAP`,
      hasSection8_v1:   `Chương Trình Section 8 Housing`,
      futurePayLine_v1: `Tiền Lương Trong Tương Lai`,
      buttonWeekly_v1:  `Hàng Tuần`,
      buttonMonthly_v1: `Hàng Tháng`,
      buttonYearly_v1:  `Hàng Năm`,
    },
  },
};  // ends vi


export { vi };
