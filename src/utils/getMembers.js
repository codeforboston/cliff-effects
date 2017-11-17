
// ===================
// ACCUMULATORS
// ===================

/**
* Creates an array containing the members in
*     `memberList` that pass `memberTest()`
*/
const getPassingMembers = function ( memberList, memberTest ) {

  var members   = [];

  for ( let memi = 0; memi < memberList.length; memi++ ) {

    let member = memberList[ memi ];
    if ( memberTest( member ) ) {
      members.push( member );
    }

  }

  return members;

};  // End getPassingMembers()


/**
* Creates an array containing the members in
*     a `client`s household at that `timeframe`,
*     'current' or 'future', that pass `memberTest()`
*/
const getPassingOfHousehold = function ( client, timeframe, memberTest ) {
  var household = client[ timeframe + 'Household' ];
  return getPassingMembers( household, memberTest );
};  // End getPassingMembers()


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
  return getPassingMembers( memberList, isHeadOrSpouse );
};  // End getHeadOrSpouseMembers()


const getHeadOrSpouseOfHousehold = function ( client, timeframe ) {
  return getPassingOfHousehold( client, timeframe, isHeadOrSpouse );
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
  return getPassingMembers( memberList, isDependent );
};  // End getDependentMembers()


const getDependentsOfHousehold = function ( client, timeframe ) {
  return getPassingOfHousehold( client, timeframe, isDependent );
};  // End getDependentsOfHousehold()


// --- DISABLED --- \\

const isDisabled = function ( member ) {
  return member.disabled;
};  // End isDisabled()


const getDisabledMembers = function ( memberList ) {
  return getPassingMembers( memberList, isDisabled );
};  // End getDisabledMembers()


const getDisabledOfHousehold = function ( client, timeframe ) {
  return getPassingOfHousehold( client, timeframe, isDisabled );
};  // End getDisabledOfHousehold()


export {
  getPassingMembers,
  getPassingOfHousehold,
  
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
};
