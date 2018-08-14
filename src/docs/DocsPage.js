import './assets/bass.css';
import './assets/style.css';
import './assets/github.css';
import './assets/split.css';
import React from 'react';
import { Helmet } from 'react-helmet';

export default () => {
  return (
    <div>
      <Helmet>
        <html />
        <meta charset='utf-8' />
        <title>cliff-effects 0.1.0 | Documentation</title>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1' />
        <body className='documentation m0' />
      </Helmet>
      <div className='flex'>
        <div
          id='split-left'
          className='overflow-auto fs0 height-viewport-100'>
          <div className='py1 px2'>
            <h3 className='mb0 no-anchor'>cliff-effects</h3>
            <div className='mb1'><code>0.1.0</code></div>
            <input
              placeholder='Filter'
              id='filter-input'
              className='col12 block input'
              type='text' />
            <div id='toc'>
              <ul className='list-reset h5 py1-ul'>
              
                
                <li><a
                  href='#confirmer'
                  className="">
                  Confirmer
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#aboutcontent'
                  className="">
                  AboutContent
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#langcode'
                  className="">
                  langCode
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#returnsame'
                  className="">
                  returnSame
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#returnsame'
                  className="">
                  returnSame
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#toboolean'
                  className="">
                  toBoolean
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#valuefixers'
                  className=" toggle-sibling">
                  valueFixers
                  <span className='icon'>▸</span>
                </a>
                
                <div className='toggle-target display-none'>
                  
                  <ul className='list-reset py1-ul pl1'>
                    <li className='h5'><span>Static members</span></li>
                    
                    <li><a
                      href='#valuefixersearned'
                      className='regular pre-open'>
                        .earned
                    </a>
                    </li>
                    
                    <li><a
                      href='#valuefixershousing'
                      className='regular pre-open'>
                        .housing
                        </a>
                    </li>
                    
                  </ul>
                  
                  
                  
                  
                </div>
                
                </li>
              
                
                <li><a
                  href='#client_defaults'
                  className="">
                  CLIENT_DEFAULTS
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#housing'
                  className="">
                  housing
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#browserleavelistener'
                  className="">
                  BrowserLeaveListener
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#reactrouterleavelistener'
                  className="">
                  ReactRouterLeaveListener
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#errorlistener'
                  className="">
                  ErrorListener
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#feedbackprompt'
                  className="">
                  FeedbackPrompt
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#onleavecallback'
                  className="">
                  onLeaveCallback
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#incomeform'
                  className="">
                  IncomeForm
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#incomeform'
                  className="">
                  IncomeForm
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#incomeform'
                  className="">
                  IncomeForm
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#incomeform'
                  className="">
                  IncomeForm
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#ensurefuture'
                  className="">
                  ensureFuture
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#currentincomestep'
                  className="">
                  CurrentIncomeStep
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#cashflowcontainer'
                  className="">
                  CashFlowContainer
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#cashflowrow'
                  className="">
                  CashFlowRow
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#cashflowrow'
                  className="">
                  CashFlowRow
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#baseprops'
                  className="">
                  baseProps
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#monthlycashflowrow'
                  className="">
                  MonthlyCashFlowRow
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#sum'
                  className="">
                  sum
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#moneytowholenum'
                  className="">
                  moneyToWholeNum
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#limit'
                  className="">
                  limit
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#max'
                  className="">
                  max
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#monthly'
                  className="">
                  monthly
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#monthly'
                  className="">
                  monthly
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#tomoneystr'
                  className="">
                  toMoneyStr
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#tomoneystr'
                  className="">
                  toMoneyStr
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#housing'
                  className="">
                  Housing
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#ensurerouteandvalue'
                  className="">
                  ensureRouteAndValue
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#expensesformcontent'
                  className="">
                  ExpensesFormContent
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#isover12'
                  className="">
                  isOver12
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#'
                  className="" />
                
                </li>
              
                
                <li><a
                  href='#currentexpensesstep'
                  className="">
                  CurrentExpensesStep
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#currentexpensesstep'
                  className="">
                  CurrentExpensesStep
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#cashflowrowafterconfirm'
                  className="">
                  CashFlowRowAfterConfirm
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#headingwithdetail'
                  className="">
                  HeadingWithDetail
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#rowwithdetail'
                  className="">
                  RowWithDetail
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#geteverymember'
                  className="">
                  getEveryMember
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#geteverymemberofhousehold'
                  className="">
                  getEveryMemberOfHousehold
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#isdependent'
                  className="">
                  isDependent
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#values'
                  className="">
                  values
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getdependentcostsmonthly'
                  className="">
                  getDependentCostsMonthly
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getunder13expenses'
                  className="">
                  getUnder13Expenses
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getgrossunearnedincomemonthly'
                  className="">
                  getGrossUnearnedIncomeMonthly
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getsimplegrossincomemonthly'
                  className="">
                  getSimpleGrossIncomeMonthly
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#sumprops'
                  className="">
                  sumProps
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#unearned_income_sources'
                  className="">
                  UNEARNED_INCOME_SOURCES
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#updateclientvalue'
                  className="">
                  updateClientValue
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#predictionsstep'
                  className="">
                  PredictionsStep
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#client'
                  className="">
                  client
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#totalsrowheaderstyle'
                  className="">
                  totalsRowHeaderStyle
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getsnapbenefits'
                  className="">
                  getSNAPBenefits
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#ispassgrossincometest'
                  className="">
                  isPassGrossIncomeTest
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getnonutilitycosts'
                  className="">
                  getNonUtilityCosts
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getttps'
                  className="">
                  getTTPs
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getnetincome'
                  className="">
                  getNetIncome
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getadjustedincome'
                  className="">
                  getAdjustedIncome
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getdisabledandmedicalallowancessum'
                  className="">
                  getDisabledAndMedicalAllowancesSum
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#medicalexpenses'
                  className="">
                  medicalExpenses
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#dependentcare'
                  className="">
                  dependentCare
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#dependentcare'
                  className="">
                  dependentCare
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#snaphelpers'
                  className="">
                  SNAPhelpers
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getlimitbysize'
                  className="">
                  getLimitBySize
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getlimitbysize'
                  className="">
                  getLimitBySize
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getextraamount'
                  className="">
                  getExtraAmount
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#overagerate'
                  className="">
                  overageRate
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getmaxintkey'
                  className="">
                  getMaxIntKey
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#stackedbargraph'
                  className="">
                  StackedBarGraph
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getbenefittimeframes'
                  className="">
                  getBenefitTimeFrames
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getsection8benefit'
                  className="">
                  getSection8Benefit
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getsection8benefit'
                  className="">
                  getSection8Benefit
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#contractrent'
                  className="">
                  contractRent
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#oldadj'
                  className="">
                  oldAdj
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#ttps'
                  className="">
                  ttps
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#ccmin'
                  className="">
                  ccMin
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#handicapallowance'
                  className="">
                  handicapAllowance
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#verticalline'
                  className="">
                  VerticalLine
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#toyearlyfrom'
                  className="">
                  toYearlyFrom
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#toyearlyfrom'
                  className="">
                  toYearlyFrom
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#tomonthlyfrom'
                  className="">
                  toMonthlyFrom
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#toweeklyfrom'
                  className="">
                  toWeeklyFrom
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getdata'
                  className="">
                  getData
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getdatasets'
                  className="">
                  getDatasets
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#data'
                  className="">
                  data
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#columnheader'
                  className="">
                  ColumnHeader
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#memberbutton'
                  className="">
                  MemberButton
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#role'
                  className="">
                  Role
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#memberfield'
                  className="">
                  MemberField
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#getmembers'
                  className="">
                  getMembers
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#householdcontent'
                  className="">
                  HouseholdContent
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#householdstep'
                  className="">
                  HouseholdStep
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#spaceholder'
                  className="">
                  SpaceHolder
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#formbottomrow'
                  className="">
                  FormBottomRow
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#children'
                  className="">
                  children
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#formpartscontainer'
                  className="">
                  FormPartsContainer
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#contenth1'
                  className="">
                  ContentH1
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#'
                  className="" />
                
                </li>
              
                
                <li><a
                  href='#contentsubh1'
                  className="">
                  ContentSubH1
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#intervalcolumnheadings'
                  className="">
                  IntervalColumnHeadings
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#columnheading'
                  className="">
                  ColumnHeading
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#hasonlynonnegnumberchars'
                  className="">
                  hasOnlyNonNegNumberChars
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#hasonlynonnegnumberchars'
                  className="">
                  hasOnlyNonNegNumberChars
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#hasonlynonnegwholenumberchars'
                  className="">
                  hasOnlyNonNegWholeNumberChars
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#isnonnegnumber'
                  className="">
                  isNonNegNumber
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#isnonnegwholenumber'
                  className="">
                  isNonNegWholeNumber
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#isnonnegwholenumber'
                  className="">
                  isNonNegWholeNumber
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#currentbenefitscontent'
                  className="">
                  CurrentBenefitsContent
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#currentbenefitsstep'
                  className="">
                  CurrentBenefitsStep
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#bigbutton'
                  className="">
                  BigButton
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#controlledradioyesno'
                  className="">
                  ControlledRadioYesNo
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#managednumberfield'
                  className="">
                  ManagedNumberField
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#handleblur'
                  className="">
                  handleBlur
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#loadclient'
                  className="">
                  loadClient
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#customclient'
                  className="">
                  CustomClient
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#mergewith'
                  className="">
                  mergeWith
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#mergecustomizer'
                  className="">
                  mergeCustomizer
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#gettextforlanguage'
                  className="">
                  getTextForLanguage
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#react'
                  className="">
                  React
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#react'
                  className="">
                  React
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#interpolatetext'
                  className="">
                  interpolateText
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#interpolatesnippets'
                  className="">
                  interpolateSnippets
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#de'
                  className="">
                  DE
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#externallink'
                  className="">
                  ExternalLink
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#invalidmessage'
                  className="">
                  InvalidMessage
                  
                </a>
                
                </li>
              
                
                <li><a
                  href='#attentionarrow'
                  className="">
                  AttentionArrow
                  
                </a>
                
                </li>
              
              </ul>
            </div>
            <div className='mt1 h6 quiet'>
              <a href='http://documentation.js.org/reading-documentation.html'>Need help reading this?</a>
            </div>
          </div>
        </div>
        <div
          id='split-right'
          className='relative overflow-auto height-viewport-100'>
        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='confirmer'>
      Confirmer
              </h3>
    
    
            </div>
  

            <p>tl;dr:
This is a wrapper that temporarily hijacks React history.
            </p>
            <p>More details:
              <em>history</em>, which is used by <em>React Router</em> (<code>HashRouter</code>
in App.js), runs the function <code>getConfirmation()</code> every
time the user navigates away from a React 'page'.
Navigates to a different <code>Route</code>, that is. This is useful
for adding <code>onunload</code>-like prompts.
            </p>
            <p>We could do this in a way that would be persistent
throughout the site, but that became too hard to follow.
Instead we pass it down through <code>props</code>. When we're done
hijacking, we restore the old history behavior. We only
really use the non-default behavior, but we figure it's
probably good practice to restore the default behavior
when we're done with our special case.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>new Confirmer()</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='aboutcontent'>
      AboutContent
              </h3>
    
    
            </div>
  

            <p>Todo simplify the process of creating content for the 'About' page</p>

 
  
            <div className='pre p1 fill-light mt0'>AboutContent</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='langcode'>
      langCode
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>langCode</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='returnsame'>
      returnSame
              </h3>
    
    
            </div>
  

            <p>Transformers for transforming client
values into valid values.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>returnSame</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>newVal</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>state</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='returnsame'>
      returnSame
              </h3>
    
    
            </div>
  

            <p>Reused Functionality</p>

 
  
            <div className='pre p1 fill-light mt0'>returnSame</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>newVal</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>state</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='toboolean'>
      toBoolean
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>toBoolean</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>value</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='valuefixers'>
      valueFixers
              </h3>
    
    
            </div>
  

            <p>For every client property and
nested property.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>valueFixers</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  
            <div className='py1 quiet mt1 prose-big'>Static Members</div>
            <div className="clearfix">
  
              <div
                className='border-bottom'
                id='valuefixersearned'>
                <div className="clearfix small pointer toggle-sibling">
                  <div className="py1 contain">
                    <a className='icon pin-right py1 dark-link caret-right'>▸</a>
                    <span className='code strong strong truncate'>earned</span>
                  </div>
                </div>
                <div className="clearfix display-none toggle-target">
                  <section className='p2 mb2 clearfix bg-white minishadow'>

  

  
 
  
                    <div className='pre p1 fill-light mt0'>earned</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
                  </section>

                </div>
              </div>
  
              <div
                className='border-bottom'
                id='valuefixershousing'>
                <div className="clearfix small pointer toggle-sibling">
                  <div className="py1 contain">
                    <a className='icon pin-right py1 dark-link caret-right'>▸</a>
                    <span className='code strong strong truncate'>housing</span>
                  </div>
                </div>
                <div className="clearfix display-none toggle-target">
                  <section className='p2 mb2 clearfix bg-white minishadow'>

  

  
 
  
                    <div className='pre p1 fill-light mt0'>housing</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
                  </section>

                </div>
              </div>
  
            </div>

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='client_defaults'>
      CLIENT_DEFAULTS
              </h3>
    
    
            </div>
  

            <p>Default client values.
MUST ALWAYS BE VALID
            </p>
            <p>Note: A 'positive number' money value can have more than
two decimal places.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>CLIENT_DEFAULTS</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='housing'>
      housing
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>housing</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='browserleavelistener'>
      BrowserLeaveListener
              </h3>
    
    
            </div>
  

            <p>Ask the user for confirmation to leave the page.</p>

 
  
            <div className='pre p1 fill-light mt0'>new BrowserLeaveListener(props: any)</div>
   
  
  
            <p>
      Extends
      
        React.Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(any)</code>
	    {'{object}'}

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.isBlocking</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{boolean}'} - Whether the component should block
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.message</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{string}'} - The message the browser shows, maybe
                      </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='reactrouterleavelistener'>
      ReactRouterLeaveListener
              </h3>
    
    
            </div>
  

            <p><code>&#x3C;Prompt></code> waits, invisible, till a user navigates
to another React 'page', then triggers the
            <code>getUserConfirmation</code> prop that we gave it in
'App.js'. The standard functionality is very
limited, though. Its component will only show
two buttons, etc. We keep it in our code, but
for this specific purpose, we temporarily
use this component's parent's callback with
custom data. The parent component can use
that to decide what to do next.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>new ReactRouterLeaveListener(props: any)</div>
   
  
  
            <p>
      Extends
      
        React.Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(any)</code>
	    {'{object}'}

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.askForFeedback</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{function}'} - Right now we always trigger feedback
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.confirmer</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{Confirmer}'} - For hijacking standard functionality
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.isBlocking</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{boolean}'} - If true, interrupt navigation
                      </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='errorlistener'>
      ErrorListener
              </h3>
    
    
            </div>
  

            <p>Prompt for latest uncaught error.</p>

 
  
            <div className='pre p1 fill-light mt0'>new ErrorListener(props: any)</div>
   
  
  
            <p>
      Extends
      
        React.Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(any)</code>
	    {'{object}'}

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.callback</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{onLeaveCallback}'}
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.askForFeedback</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{function}'}
                      </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='feedbackprompt'>
      FeedbackPrompt
              </h3>
    
    
            </div>
  

            <p>Modal with three options: stay, leave, or submit feedback;</p>

 
  
            <div className='pre p1 fill-light mt0'>new FeedbackPrompt(props: any)</div>
   
  
  
            <p>
      Extends
      
        React.Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(any)</code>
	    {'{object}'}

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.callback</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{onLeaveCallback}'}
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.message</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{string}'}
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.open</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{boolean}'} - Whether the modal is visible.
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.isBlocking</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{boolean}'} - A secondary flag to control modal visibility.
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.leaveText</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{string}'}
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.stayText</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span>{'{string}'}
                                                 </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='onleavecallback'>
      onLeaveCallback
              </h3>
    
    
            </div>
  

            <p>Called with result of user interaction with on leave modal.
Receives true if the user chose to leave,
or false if the user chose to stay.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>onLeaveCallback(ok: any)</div>
   
  
            <p>
      Type:
              <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">Function</a>
            </p>
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>ok</span> <code className='quiet'>(any)</code>
	    {'{boolean}'} - Result of result of user interaction.

                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='incomeform'>
      IncomeForm
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>IncomeForm(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    See below

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.current</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.time</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='incomeform'>
      IncomeForm
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>IncomeForm</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.current</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.time</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='incomeform'>
      IncomeForm
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>IncomeForm</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.current</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.time</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='incomeform'>
      IncomeForm
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>IncomeForm(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): class</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    Values described below

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.future</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.time</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>class</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='ensurefuture'>
      ensureFuture
              </h3>
    
    
            </div>
  

            <p>Makes sure values are propagated to 'future' properties if needed</p>

 
  
            <div className='pre p1 fill-light mt0'>ensureFuture(evnt: any, inputProps: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>evnt</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>inputProps</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='currentincomestep'>
      CurrentIncomeStep
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>CurrentIncomeStep(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    See below.

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.navData</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.client</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='cashflowcontainer'>
      CashFlowContainer
              </h3>
    
    
            </div>
  

            <p>Contains cash flow inputs, their label, and any user feedback</p>

 
  
            <div className='pre p1 fill-light mt0'>CashFlowContainer(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.label</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.validRow</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.message</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='cashflowrow'>
      CashFlowRow
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>CashFlowRow</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.generic</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.timeState</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='cashflowrow'>
      CashFlowRow
              </h3>
    
    
            </div>
  

            <p>One row for cash flow inputs - weekly, monthly, yearly</p>

 
  
            <div className='pre p1 fill-light mt0'>CashFlowRow(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.generic</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.timeState</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='baseprops'>
      baseProps
              </h3>
    
    
            </div>
  

            <p>baseVal
Get the time ('future' or 'current') monthly value unless there is
none, in which case, get the 'current' monthly cash flow value
(to prefill future values with 'current' ones if needed).
            </p>

 
  
            <div className='pre p1 fill-light mt0'>baseProps</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='monthlycashflowrow'>
      MonthlyCashFlowRow
              </h3>
    
    
            </div>
  

            <p>One row for <em>one</em> cash flow input - a monthly value</p>

 
  
            <div className='pre p1 fill-light mt0'>MonthlyCashFlowRow(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.inputProps</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.baseValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.rowProps</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='sum'>
      sum
              </h3>
    
    
            </div>
  

            <p>For different kinds of math operations we need, some unconventional</p>

 
  
            <div className='pre p1 fill-light mt0'>sum</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>vals</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='moneytowholenum'>
      moneyToWholeNum
              </h3>
    
    
            </div>
  

            <p>This is how we've seen it done in MA tables</p>

 
  
            <div className='pre p1 fill-light mt0'>moneyToWholeNum</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>val</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='limit'>
      limit
              </h3>
    
    
            </div>
  

            <p>Turns a value into a float, limits it in between min and max, and
makes sure to return a number (not NaN).
            </p>

 
  
            <div className='pre p1 fill-light mt0'>limit</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>initialVal</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>minMax</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='max'>
      max
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>max</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='monthly'>
      monthly
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>monthly</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='monthly'>
      monthly
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>monthly</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='tomoneystr'>
      toMoneyStr
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>toMoneyStr</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>decimal</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='tomoneystr'>
      toMoneyStr
              </h3>
    
    
            </div>
  

            <p>Functions for making client values into values
that users will see.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>toMoneyStr</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>decimal</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='housing'>
      Housing
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>Housing(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.current</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>
                      </td>
                      <td className='break-word'><span>Client data of current user circumstances
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.type</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></code>
                      </td>
                      <td className='break-word'><span>'expense' or 'income', etc., for classes
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.time</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></code>
                      </td>
                      <td className='break-word'><span>'current' or 'future'
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></code>
                      </td>
                      <td className='break-word'><span>Sets state values
                      </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        React element

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='ensurerouteandvalue'>
      ensureRouteAndValue
              </h3>
    
    
            </div>
  

            <p>Makes sure values are propagated to 'current' properties if needed.</p>

 
  
            <div className='pre p1 fill-light mt0'>ensureRouteAndValue(evnt: any, inputProps: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>evnt</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>inputProps</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='expensesformcontent'>
      ExpensesFormContent
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>ExpensesFormContent(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.current</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>
                      </td>
                      <td className='break-word'><span>Client data of current user circumstances
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.time</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>
                      </td>
                      <td className='break-word'><span>'current' or 'future'
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>
                      </td>
                      <td className='break-word'><span>Sets state values
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        React element

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='isover12'>
      isOver12
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>isOver12(member: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>member</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='' />
    
    
            </div>
  

            <p>These medical expenses don't count for Section 8 unless
the disabled person is the head or spouse. From
            <a href="http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf">http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf</a>
Appendix B, item (D)
            </p>

 
  
            <div className='pre p1 fill-light mt0' />
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='currentexpensesstep'>
      CurrentExpensesStep
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>CurrentExpensesStep</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.navData</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.client</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='currentexpensesstep'>
      CurrentExpensesStep
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>CurrentExpensesStep(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></code>
                      </td>
                      <td className='break-word'><span>Setting client state
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.client</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>
                      </td>
                      <td className='break-word'><span>Object will all the data for calculating benefits
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.previousStep</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></code>
                      </td>
                      <td className='break-word'><span>Go to previous form step
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.nextStep</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></code>
                      </td>
                      <td className='break-word'><span>Go to next form step
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.navData</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        React element

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='cashflowrowafterconfirm'>
      CashFlowRowAfterConfirm
              </h3>
    
    
            </div>
  

            <p>Query the user before presenting a CashFlowRow</p>

 
  
            <div className='pre p1 fill-light mt0'>new CashFlowRowAfterConfirm(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></div>
   
  
  
            <p>
      Extends
      
        React.Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    See below

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.generic</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></code>
                      </td>
                      <td className='break-word'><span>The key of the value being set.
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.confirmLabel</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></code>
                      </td>
                      <td className='break-word'><span>Label for preceding confirmation.
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></code>
                      </td>
                      <td className='break-word'><span>Label for fields updating the value.
                                                 </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='headingwithdetail'>
      HeadingWithDetail
              </h3>
    
    
            </div>
  

            <p>Really it's a top component that has a question mark
next to it followed by a bottom one that starts
as hidden, but is revealed when the question mark
is clicked.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>new HeadingWithDetail(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</div>
   
  
  
            <p>
      Extends
      
        Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>
                      </td>
                      <td className='break-word'><span>Must have exactly two
children. The first is always visible. The second
is revealed when the icon is clicked and then hidden
when the icon is clicked again.
                                                 </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='rowwithdetail'>
      RowWithDetail
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>new RowWithDetail()</div>
   
  
  
            <p>
      Extends
      
        Component
      
            </p>
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='geteverymember'>
      getEveryMember
              </h3>
    
    
            </div>
  

            <p>Creates an array containing the members in
              <code>memberList</code> that pass <code>memberTest()</code>
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getEveryMember</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>memberList</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>memberTest</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='geteverymemberofhousehold'>
      getEveryMemberOfHousehold
              </h3>
    
    
            </div>
  

            <p>Creates an array containing the members in
a <code>client</code>s household that pass <code>memberTest()</code>
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getEveryMemberOfHousehold</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>memberTest</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='isdependent'>
      isDependent
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>isDependent</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>member</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='values'>
      values
              </h3>
    
    
            </div>
  

            <p>For all income and general cash flow getters and calculators</p>

 
  
            <div className='pre p1 fill-light mt0'>values</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getdependentcostsmonthly'>
      getDependentCostsMonthly
              </h3>
    
    
            </div>
  

            <p>Total MONTHLY dependent costs, including for those under and over
the age of 13 (does not include child support paid out).
Dependent = child or disabled adult
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getDependentCostsMonthly(client: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    <code>current</code>
 or 
                  <code>future</code>
 property of client data

                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>:
        Total dependent care expenses

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getunder13expenses'>
      getUnder13Expenses
              </h3>
    
    
            </div>
  

            <p>Client's total MONTHLY costs for dependents under 13
(does not include child support paid out).
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getUnder13Expenses(client: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    <code>current</code>
 or 
                  <code>future</code>
 property of client data

                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>:
        

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getgrossunearnedincomemonthly'>
      getGrossUnearnedIncomeMonthly
              </h3>
    
    
            </div>
  

            <p>Gets sum of all unearned monthly income of given client.</p>

 
  
            <div className='pre p1 fill-light mt0'>getGrossUnearnedIncomeMonthly(client: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    <code>current</code>
 or 
                  <code>future</code>
 property of client data

                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>:
        

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getsimplegrossincomemonthly'>
      getSimpleGrossIncomeMonthly
              </h3>
    
    
            </div>
  

            <p>Total monthly earned and unearned income with no deductions or
exclusions.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getSimpleGrossIncomeMonthly(client: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    <code>current</code>
 or 
                  <code>future</code>
 property of client data

                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>:
        Total earned and unearned monthly
income with no deductions or exclusions.

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='sumprops'>
      sumProps
              </h3>
    
    
            </div>
  

            <p>Returns the sum of the requested properties of of a given object</p>

 
  
            <div className='pre p1 fill-light mt0'>sumProps(obj: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>, props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array">array</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>obj</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    Has the properties named in 
                  <code>props</code>
 with number values.

                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array">array</a>)</code>
	    The names of some properties in 
                  <code>obj</code>
 with number values.

                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>:
        

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='unearned_income_sources'>
      UNEARNED_INCOME_SOURCES
              </h3>
    
    
            </div>
  

            <p>Arrays of names which can act as a base off of which
to build client property keys
            </p>

 
  
            <div className='pre p1 fill-light mt0'>UNEARNED_INCOME_SOURCES</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  
            <div className='py1 quiet mt1 prose-big'>Example</div>
    
      
            <pre className='p1 overflow-auto round fill-light'>{`<span className="hljs-keyword">var</span> gross = client[ timeframe + base + <span className="hljs-string">'Monthly'</span> ];`}</pre>
    
  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='updateclientvalue'>
      updateClientValue
              </h3>
    
    
            </div>
  

            <p>As per Project Hope input, for the first prototype we're only
including the ability to change earned income.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>updateClientValue</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='predictionsstep'>
      PredictionsStep
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>PredictionsStep(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    See below.

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.navData</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.client</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='client'>
      client
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>client</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='totalsrowheaderstyle'>
      totalsRowHeaderStyle
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>totalsRowHeaderStyle</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getsnapbenefits'>
      getSNAPBenefits
              </h3>
    
    
            </div>
  

            <p>Based on <a href="https://www.masslegalservices.org/SNAPCalculator">https://www.masslegalservices.org/SNAPCalculator</a></p>

 
  
            <div className='pre p1 fill-light mt0'>getSNAPBenefits</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>timeframe</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='ispassgrossincometest'>
      isPassGrossIncomeTest
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>isPassGrossIncomeTest</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getnonutilitycosts'>
      getNonUtilityCosts
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>getNonUtilityCosts(client: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getttps'>
      getTTPs
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>getTTPs(client: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getnetincome'>
      getNetIncome
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>getNetIncome(client: any, timeframe: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>timeframe</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getadjustedincome'>
      getAdjustedIncome
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>getAdjustedIncome(client: any, timeframe: any, net: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>timeframe</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>net</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getdisabledandmedicalallowancessum'>
      getDisabledAndMedicalAllowancesSum
              </h3>
    
    
            </div>
  

            <p>Medical allowance needs assistance allowance amounts
'#' refers to # item on form at Appendix B of <a href="http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf">http://www.tacinc.org/media/58886/S8MS%20Full%20Book.pdf</a>
'pg' refers to the written page number of <a href="https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf">https://portal.hud.gov/hudportal/documents/huddoc?id=DOC_11749.pdf</a> (gone)
Is using raw monthly values
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getDisabledAndMedicalAllowancesSum(client: any, timeframe: any, net: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>timeframe</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>net</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='medicalexpenses'>
      medicalExpenses
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>medicalExpenses</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='dependentcare'>
      dependentCare
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>dependentCare</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='dependentcare'>
      dependentCare
              </h3>
    
    
            </div>
  

            <p>May want to test this the same way as Expenses step does. More consistent?</p>

 
  
            <div className='pre p1 fill-light mt0'>dependentCare</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='snaphelpers'>
      SNAPhelpers
              </h3>
    
    
            </div>
  

            <p>NOTE: Bay State CAP not included as this prototype only deals with
changes in earned income
            </p>

 
  
            <div className='pre p1 fill-light mt0'>SNAPhelpers</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getlimitbysize'>
      getLimitBySize
              </h3>
    
    
            </div>
  

            <p>Getting or calculating data values by leveraging common data patterns
we've seen so far.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getLimitBySize</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>data</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>numItems</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>percent</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getlimitbysize'>
      getLimitBySize
              </h3>
    
    
            </div>
  

            <p>Calculate appropriate bracket/limit value (such as income
limit) by number of relevant items (such as number of
household members).
            </p>
            <p>===============================================================
WARNING: Be aware of what time scale (weekly, monthly or yearly)
            </p>
            <pre>{`<code>your data uses so that you can convert to the right values.
</code>`}
            </pre>
            <p>===============================================================</p>

 
  
            <div className='pre p1 fill-light mt0'>getLimitBySize(data: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>, numItems: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>, percent: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>?): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>data</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    Data to use to get a bracket/limit value.

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>data.0</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>
                      </td>
                      <td className='break-word'><span>Never known to equal more than 0 so far.
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>data.1</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>
                      </td>
                      <td className='break-word'><span>(Or any int key) Value of bracket/limit that
matches the number described by the key. For example, data.3 would be
the income limit value for a household with three members.
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>data.eachAdditional</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a> | <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a>)</code>
                      </td>
                      <td className='break-word'><span>Usually an amount to
add for each person or item over the maximum hardcoded limits. Can be a
function to calculate said amount based on number of extra items.
                                                 </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>numItems</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</code>
	    Number of items (for example, household size).

                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>percent</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>?)</code>
	    Multiplies the result before sending it back.
You'd pass in 100% as 
                  <code>100</code>
.

                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Data value determined for the number of items, numItems, wanted.

      
    
  

  

  
            <div className='py1 quiet mt1 prose-big'>Example</div>
    
      
            <pre className='p1 overflow-auto round fill-light'>{`Using household size to get federal poverty income limit:
<span className="hljs-keyword">var</span> fedPovertyGuidelines = { <span className="hljs-number">0</span>: <span className="hljs-number">0</span>, <span className="hljs-number">1</span>: <span className="hljs-number">12060</span>, <span className="hljs-number">2</span>: <span className="hljs-number">16240</span>,
   <span className="hljs-attr">eachAdditional</span>: <span className="hljs-number">4180</span> };
getLimitBySize( fedPovertyGuidelines, <span className="hljs-number">1</span> );  <span className="hljs-comment">// 12060</span>
getLimitBySize( fedPovertyGuidelines, <span className="hljs-number">2</span> );  <span className="hljs-comment">// 16240</span>
getLimitBySize( fedPovertyGuidelines, <span className="hljs-number">3</span> );  <span className="hljs-comment">// 20420</span>`}
            </pre>
    
  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getextraamount'>
      getExtraAmount
              </h3>
    
    
            </div>
  

            <p>Deals with different value types for data.eachAdditional</p>

 
  
            <div className='pre p1 fill-light mt0'>getExtraAmount(data: any, numExtra: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>, eachAdditional: (<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a> | <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a>)): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>data</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>numExtra</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</code>
	    Number of extra items

                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>eachAdditional</span> <code className='quiet'>((<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a> | <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a>))</code>
	    Either a number value to add
for each extra item or a function that will return that number.

                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a></code>:
        The amount created by those extra items.

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='overagerate'>
      overageRate
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>overageRate</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getmaxintkey'>
      getMaxIntKey
              </h3>
    
    
            </div>
  

            <p>Of the keys in an object that can be converted to integers,
return the highest converted value.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getMaxIntKey(data: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>data</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='stackedbargraph'>
      StackedBarGraph
              </h3>
    
    
            </div>
  

            <p>Visual representation of the table</p>
            <p>Alternatives:
1. Stacked area graph for two data points
2. Line graph of difference of just total money coming in
            </p>

 
  
            <div className='pre p1 fill-light mt0'>StackedBarGraph</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    full client object, with current
and future. All client props are needed.

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>client.client</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getbenefittimeframes'>
      getBenefitTimeFrames
              </h3>
    
    
            </div>
  

            <p>Abstracts current and future program and
income values on Predictions form
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getBenefitTimeFrames</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>benefitCheck</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>benefitsFunc</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getsection8benefit'>
      getSection8Benefit
              </h3>
    
    
            </div>
  

            <p>Can only be useful in predicting future subisdy amounts.</p>
            <p>Uses old and new cash flow data, return new subsidy amount,
include new rent share.
            </p>
            <p>var diff = new min ttp - old min ttp;
var new rent share = old rent share + diff;
var new subsidy = contract rent - new rent share
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getSection8Benefit(client: any, timeframe: any)</div>
   
  
  

  
  
  
  
  
            <div>Since: 09/2017

With Project Hopes&#39;s guidance, we&#39;re using old known values (as
known as they can get) to derive new values.
            </div>

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>timeframe</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getsection8benefit'>
      getSection8Benefit
              </h3>
    
    
            </div>
  

            <p>Properties <code>client</code> object is required to have to get a valid
result. This doesn't mean the user filled in all the data, just
that the object passed into here contains everything needed in the
form that it's needed.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getSection8Benefit</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>timeframe</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='contractrent'>
      contractRent
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>contractRent</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='oldadj'>
      oldAdj
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>oldAdj</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='ttps'>
      ttps
              </h3>
    
    
            </div>
  

            <p>TTP = 'total tenant payment'. One place (pg 59) calls this min ttp
but another (Appendix B) calls it max. Second makes more sense.
Represents max rent share.
            </p>
            <p>Note: welfare rent and PHA min rent are not known and so not
included in the test. MA may not have welfare rent and PHA min
can be waived.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>ttps</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='ccmin'>
      ccMin
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>ccMin</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='handicapallowance'>
      handicapAllowance
              </h3>
    
    
            </div>
  

            <p>Only keep going if there's a disabled/elderly head or spouse (or sole member)</p>

 
  
            <div className='pre p1 fill-light mt0'>handicapAllowance</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='verticalline'>
      VerticalLine
              </h3>
    
    
            </div>
  

            <p>Returns a dashed vertical line at a given
horizontal position with a given label. For
use with anything using the same API as
react-chartjs-2.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>new VerticalLine()</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='toyearlyfrom'>
      toYearlyFrom
              </h3>
    
    
            </div>
  

            <p>Convert (usually money) amounts between weekly, monthly, and yearly amounts.</p>

 
  
            <div className='pre p1 fill-light mt0'>toYearlyFrom(amount: any, startTimescale: any)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>amount</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>startTimescale</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='toyearlyfrom'>
      toYearlyFrom
              </h3>
    
    
            </div>
  

            <p>Returns <code>amount</code> converted from whatever 'timescale' it was before
to a yearly amount
            </p>

 
  
            <div className='pre p1 fill-light mt0'>toYearlyFrom(amount: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>, startTimescale: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>amount</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</code>
	    numeric value to be converted

                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>startTimescale</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
	    timescale of the original
value. Can be 'weekly', 'monthly', or 'yearly'.

                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='tomonthlyfrom'>
      toMonthlyFrom
              </h3>
    
    
            </div>
  

            <p>Returns <code>amount</code> converted from whatever 'timescale' it was before
to a monthly amount
            </p>

 
  
            <div className='pre p1 fill-light mt0'>toMonthlyFrom(amount: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>, startTimescale: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>amount</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</code>
	    numeric value to be converted

                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>startTimescale</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
	    timescale of the original
value. Can be 'weekly', 'monthly', or 'yearly'.

                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='toweeklyfrom'>
      toWeeklyFrom
              </h3>
    
    
            </div>
  

            <p>Returns <code>amount</code> converted from whatever 'timescale' it was before
to a weekly amount
            </p>

 
  
            <div className='pre p1 fill-light mt0'>toWeeklyFrom(amount: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>, startTimescale: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>amount</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number">number</a>)</code>
	    numeric value to be converted

                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>startTimescale</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a>)</code>
	    timescale of the original
value. Can be 'weekly', 'monthly', or 'yearly'.

                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getdata'>
      getData
              </h3>
    
    
            </div>
  

            <p>Returns various arrays of values over change in income</p>

 
  
            <div className='pre p1 fill-light mt0'>getData</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getdatasets'>
      getDatasets
              </h3>
    
    
            </div>
  

            <p>Returns the graph data formated in a way our graph library understands.</p>

 
  
            <div className='pre p1 fill-light mt0'>getDatasets</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>xRange</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>client</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>multiplier</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>activePrograms</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>extraProps</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='data'>
      data
              </h3>
    
    
            </div>
  

            <p>Need a new object so client's data doesn't get changed.</p>

 
  
            <div className='pre p1 fill-light mt0'>data</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='columnheader'>
      ColumnHeader
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>ColumnHeader(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.columnNum</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='memberbutton'>
      MemberButton
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>MemberButton(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.basic</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.color</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.iconName</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.className</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.onClick</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='role'>
      Role
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>Role(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.member</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.setMember</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='memberfield'>
      MemberField
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>MemberField($0: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>, indx: any, props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.household</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.time</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.setHousehold</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>indx</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='getmembers'>
      getMembers
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>getMembers(current: any, time: any, setHousehold: any, updateClientValue: any, snippets: any, props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>current</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>time</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>setHousehold</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>updateClientValue</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>snippets</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='householdcontent'>
      HouseholdContent
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>HouseholdContent(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.current</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.time</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='householdstep'>
      HouseholdStep
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>HouseholdStep(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.navData</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.client</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='spaceholder'>
      SpaceHolder
              </h3>
    
    
            </div>
  

            <p>For styling spacing between elements when needed.</p>

 
  
            <div className='pre p1 fill-light mt0'>SpaceHolder</div>
   
  
  

  
  
  
  
  
  

  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='formbottomrow'>
      FormBottomRow
              </h3>
    
    
            </div>
  

            <p>The row containing the big buttons at the bottom of each
form section, such as 'Previous', 'Next', and 'New Client'.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>FormBottomRow(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    One object for each button

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.left</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.middle</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.right</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='children'>
      children
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>children</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='formpartscontainer'>
      FormPartsContainer
              </h3>
    
    
            </div>
  

            <p>Constructor for all the stuff that's supposed to go inside
the Form Component. Does not include the <code>&#x3C;Form></code> Component
as a container because it looks like that needs to be unique
(the 'CurrentBenefitsStep' gives it <code>size='massive'</code>).
            </p>

 
  
            <div className='pre p1 fill-light mt0'>FormPartsContainer(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.title</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.clarifier</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.navData</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='contenth1'>
      ContentH1
              </h3>
    
    
            </div>
  

            <p>h1 styles available for form (and other) text.</p>

 
  
            <div className='pre p1 fill-light mt0'>ContentH1(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.subheading</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='' />
    
    
            </div>
  

            <p>div here to make sure header margin doesn\'t collapse</p>

 
  
            <div className='pre p1 fill-light mt0' />
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='contentsubh1'>
      ContentSubH1
              </h3>
    
    
            </div>
  

            <p>A clearer way than a ternary operator to have a possible
subheader and separate styling.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>ContentSubH1(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='intervalcolumnheadings'>
      IntervalColumnHeadings
              </h3>
    
    
            </div>
  

            <p>Weekly/Monthly/Yearly headings combined for the
top of columns that need those time intervals.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>IntervalColumnHeadings(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.type</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='columnheading'>
      ColumnHeading
              </h3>
    
    
            </div>
  

            <p>Style for text at the tops of columns, like
cashflow or household columns.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>ColumnHeading(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.type</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.colName</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.style</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='hasonlynonnegnumberchars'>
      hasOnlyNonNegNumberChars
              </h3>
    
    
            </div>
  

            <p>Set of validating functions for making sure
value are what they need to be. Just for
numbers right now.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>hasOnlyNonNegNumberChars</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>str</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='hasonlynonnegnumberchars'>
      hasOnlyNonNegNumberChars
              </h3>
    
    
            </div>
  

            <p>Returns true if a string only contains characters for a nonnegative number</p>

 
  
            <div className='pre p1 fill-light mt0'>hasOnlyNonNegNumberChars</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>str</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='hasonlynonnegwholenumberchars'>
      hasOnlyNonNegWholeNumberChars
              </h3>
    
    
            </div>
  

            <p>Returns true if a string only contains characters for a nonnegative whole number</p>

 
  
            <div className='pre p1 fill-light mt0'>hasOnlyNonNegWholeNumberChars</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>str</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='isnonnegnumber'>
      isNonNegNumber
              </h3>
    
    
            </div>
  

            <p>Returns true if a string represents a positve number (integer or float)</p>

 
  
            <div className='pre p1 fill-light mt0'>isNonNegNumber</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>str</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='isnonnegwholenumber'>
      isNonNegWholeNumber
              </h3>
    
    
            </div>
  

            <p>Returns true if a string represents a positive integer</p>

 
  
            <div className='pre p1 fill-light mt0'>isNonNegWholeNumber</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>str</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='isnonnegwholenumber'>
      isNonNegWholeNumber
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>isNonNegWholeNumber</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>str</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='currentbenefitscontent'>
      CurrentBenefitsContent
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>CurrentBenefitsContent(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    See below.

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.current</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='currentbenefitsstep'>
      CurrentBenefitsStep
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>CurrentBenefitsStep(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    See below.

                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.updateClientValue</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.navData</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.client</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.snippets</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a></code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='bigbutton'>
      BigButton
              </h3>
    
    
            </div>
  

            <p>A big button. Right now, just used in the bottom row of
form sections
            </p>

 
  
            <div className='pre p1 fill-light mt0'>BigButton(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>): any</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.buttonProps</span> <code className='quiet'>...any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  
    
            <div className='py1 quiet mt1 prose-big'>Returns</div>
            <code>any</code>:
        Component

      
    
  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='controlledradioyesno'>
      ControlledRadioYesNo
              </h3>
    
    
            </div>
  

            <p>Yes/no toggleable radio button group with a label</p>

 
  
            <div className='pre p1 fill-light mt0'>ControlledRadioYesNo(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</div>
   
  
  
            <p>
      Extends
      
        Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='managednumberfield'>
      ManagedNumberField
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>new ManagedNumberField(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</div>
   
  
  
            <p>
      Extends
      
        Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.name</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></code>
                      </td>
                      <td className='break-word'><span>For HTML name property
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.className</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String">string</a></code>
                      </td>
                      <td className='break-word'><span>HTML class names
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.otherData</span> <code className='quiet'>any?</code>
                      </td>
                      <td className='break-word'><span>Sent back to 
                        <code>store()</code>
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.format</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></code>
                      </td>
                      <td className='break-word'><span>Given 
                        <code>value</code>
. Must return what you want shown in the number field.
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.validate</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></code>
                      </td>
                      <td className='break-word'><span>Given 
                        <code>value</code>
. Must return boolean.
                                                 </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.store</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">function</a></code>
                      </td>
                      <td className='break-word'><span>Given an event, 
                        <code>value</code>
, 
[
                        <code>otherData</code>
]
                      </span>
                      </td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='handleblur'>
      handleBlur
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>handleBlur</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='loadclient'>
      loadClient
              </h3>
    
    
            </div>
  

            <p>Load previous session from object.</p>

 
  
            <div className='pre p1 fill-light mt0'>loadClient(clientContainer: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</div>
   
  
            <p>
      Type:
              <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function">Function</a>
            </p>
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>clientContainer</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    Object containing previous session as 
                  <code>client</code>
.

                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='customclient'>
      CustomClient
              </h3>
    
    
            </div>
  

            <p>Form which loads previous session from JSON.</p>

 
  
            <div className='pre p1 fill-light mt0'>new CustomClient(props: <a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</div>
   
  
  
            <p>
      Extends
      
        React.Component
      
            </p>
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>props</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.mayLoadCustomClient</span> <code className='quiet'><a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean">boolean</a></code>
                      </td>
                      <td className='break-word'><span>Whether form should be visible
                      </span>
                      </td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>props.loadClient</span> <code className='quiet'><a href="#loadclient">loadClient</a></code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='mergewith'>
      mergeWith
              </h3>
    
    
            </div>
  

            <p>Returns a translator based on the language given</p>

 
  
            <div className='pre p1 fill-light mt0'>mergeWith</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='mergecustomizer'>
      mergeCustomizer
              </h3>
    
    
            </div>
  

            <p>Customizes Lodash's mergeWith function to replace arrays completely
(to avoid arrays of English strings being mixed with arrays of translated
strings, if they happen to have different lengths).
            </p>

 
  
            <div className='pre p1 fill-light mt0'>mergeCustomizer</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>objValue</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>srcValue</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='gettextforlanguage'>
      getTextForLanguage
              </h3>
    
    
            </div>
  

            <p>Returns the object named by langName that contains
the text snippets of that language. If that language
doesn't exist, it warns the coder and returns English.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>getTextForLanguage</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>langCode</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='react'>
      React
              </h3>
    
    
            </div>
  

            <p>Allows insertion of provided components at specified points in a translated text block.</p>

 
  
            <div className='pre p1 fill-light mt0'>React</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='react'>
      React
              </h3>
    
    
            </div>
  

            <p>Contains inline components that can be substituted into snippets
using the interpolation functions in utls/interpolation.js. See en.js
for examples of usage.
            </p>

 
  
            <div className='pre p1 fill-light mt0'>React</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='interpolatetext'>
      interpolateText
              </h3>
    
    
            </div>
  

            <p>Interpolate components into a single text block (specified as an array)</p>

 
  
            <div className='pre p1 fill-light mt0'>interpolateText</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>template</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>components</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>langCode</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='interpolatesnippets'>
      interpolateSnippets
              </h3>
    
    
            </div>
  

            <p>Recursively interpolate each template in a snippets object</p>

 
  
            <div className='pre p1 fill-light mt0'>interpolateSnippets</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>snippets</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>components</span> <code className='quiet'>(any)</code>
	    
                </div>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='de'>
      DE
              </h3>
    
    
            </div>
  

            <p>Contains and exports all the languages</p>

 
  
            <div className='pre p1 fill-light mt0'>DE</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='externallink'>
      ExternalLink
              </h3>
    
    
            </div>
  

            <p>Link that opens new tab</p>

 
  
            <div className='pre p1 fill-light mt0'>ExternalLink</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.href</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.children</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='invalidmessage'>
      InvalidMessage
              </h3>
    
    
            </div>
  

            <p>Adds an option for an 'invalid input' message to the right of the last element</p>

 
  
            <div className='pre p1 fill-light mt0'>InvalidMessage</div>
   
  
  

  
  
  
  
  
  

  
            <div className='py1 quiet mt1 prose-big'>Parameters</div>
            <div className='prose'>
      
              <div className='space-bottom0'>
                <div>
                  <span className='code bold'>$0</span> <code className='quiet'>(<a href="https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object">Object</a>)</code>
	    
                </div>
          
                <table className='mt1 mb2 fixed-table h5 col-12'>
                  <colgroup>
                    <col width='30%' />
                    <col width='70%' />
                  </colgroup>
                  <thead>
                    <tr className='bold fill-light'>
                      <th>Name</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody className='mt1'>
              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.validRow</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                    <tr>
                      <td className='break-word'><span className='code bold'>$0.message</span> <code className='quiet'>any</code>
                      </td>
                      <td className='break-word'><span /></td>
                    </tr>


              
                  </tbody>
                </table>
          
              </div>
      
            </div>
  

  

  

  

  

  

  

  
          </section>

        
          
          <section className='p2 mb2 clearfix bg-white minishadow'>

  
            <div className='clearfix'>
    
              <h3
                className='fl m0'
                id='attentionarrow'>
      AttentionArrow
              </h3>
    
    
            </div>
  

  
 
  
            <div className='pre p1 fill-light mt0'>AttentionArrow</div>
   
  
  

  
  
  
  
  
  

  

  

  

  

  

  

  

  
          </section>

        
        </div>
      </div>
      <script src='assets/anchor.js' />
      <script src='assets/split.js' />
      <script src='assets/site.js' />
    </div>);
};
