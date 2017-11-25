
// ===================
// ACCUMULATORS
// ===================

/**
* Creates an array containing the members in
*     `memberList` that pass `memberTest()`
*/
const getEveryMember = function ( memberList, memberTest ) {

  var members   = [];

  for ( let memi = 0; memi < memberList.length; memi++ ) {

    let member = memberList[ memi ];
    if ( memberTest( member ) ) {
      members.push( member );
    }

  }

  return members;

};  // End getEveryMember()


/**
* Creates an array containing the members in
*     a `client`s household at that `timeframe`,
*     'current' or 'future', that pass `memberTest()`
*/
const getEveryMemberOfHousehold = function ( client, timeframe, memberTest ) {
  var household = client[ timeframe + 'Household' ];
  return getEveryMember( household, memberTest );
};  // End getEveryMemberOfHousehold()


// ===================
// TESTERS
// ===================

// --- HEAD OR SPOUSE --- \\

const isHeadOrSpouse = function ( member ) {
  return member.role === 'head' || member.role === 'spouse';
};  // End isHeadOrSpouse()


const isNotHeadOrSpouse = function ( member ) {
  return member.role !== 'head' && member.role !== 'spouse';
};  // End isNotHeadOrSpouse()


const getHeadOrSpouseMembers = function ( memberList ) {
  return getEveryMember( memberList, isHeadOrSpouse );
};  // End getHeadOrSpouseMembers()


const getHeadOrSpouseOfHousehold = function ( client, timeframe ) {
  return getEveryMemberOfHousehold( client, timeframe, isHeadOrSpouse );
};  // End getHeadOrSpouseOfHousehold()


// --- DEPENDENTS --- \\
/**
 * @todo Is it possible for people older than 18 to still be dependents?
 *     I think that on tax forms it's possible to claim people as
 *     dependents until age 26. */

const isDependent = function ( member ) {
  return (member.age <= 18 || member.disabled) && isNotHeadOrSpouse( member );
};  // End isDependent()


const getDependentMembers = function ( memberList ) {
  return getEveryMember( memberList, isDependent );
};  // End getDependentMembers()


const getDependentsOfHousehold = function ( client, timeframe ) {
  return getEveryMemberOfHousehold( client, timeframe, isDependent );
};  // End getDependentsOfHousehold()


// --- DISABLED --- \\

const isDisabled = function ( member ) {
  return member.disabled;
};  // End isDisabled()


const getDisabledMembers = function ( memberList ) {
  return getEveryMember( memberList, isDisabled );
};  // End getDisabledMembers()


const getDisabledOfHousehold = function ( client, timeframe ) {
  return getEveryMemberOfHousehold( client, timeframe, isDisabled );
};  // End getDisabledOfHousehold()


// --- 12 OR UNDER --- \\
// Yes, this is a thing because we had to split stuff up
// strangely to accommodate mutliple programs more easily
const isUnder13 = function ( member ) {
  return member.age <= 12;
};  // End isUnder13()


const getUnder13Members = function ( memberList ) {
  return getEveryMember( memberList, isUnder13 );
};  // End getUnder13Members()


const getUnder13OfHousehold = function ( client, timeframe ) {
  return getEveryMemberOfHousehold( client, timeframe, isUnder13 );
};  // End getUnder13OfHousehold()


export {
  getEveryMember,
  getEveryMemberOfHousehold,
  
  isHeadOrSpouse,
  isNotHeadOrSpouse,
  getHeadOrSpouseMembers,
  getHeadOrSpouseOfHousehold,

  isDependent,
  getDependentMembers,
  getDependentsOfHousehold,
  
  isDisabled,
  getDisabledMembers,
  getDisabledOfHousehold,

  isUnder13,
  getUnder13Members,
  getUnder13OfHousehold,
};
