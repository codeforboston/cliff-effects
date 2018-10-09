
// ===================
// ACCUMULATORS
// ===================

/**
* Creates an array containing the members in
*     `memberList` that pass `memberTest()`
*/
const getEveryMember = function (memberList, memberTest, comparisonData) {

  var members   = [];

  for (let memi = 0; memi < memberList.length; memi++) {

    let member = memberList[ memi ];
    if (memberTest(member, comparisonData)) {
      members.push(member);
    }

  }

  return members;

};  // End getEveryMember()


/**
 * Creates an array containing the members in
 *     a `client`s household that pass `memberTest()`
 */
const getEveryMemberOfHousehold = function (client, memberTest, comparisonData) {
  var household = client.household;
  return getEveryMember(household, memberTest, comparisonData);
};  // End getEveryMemberOfHousehold()


// ===================
// TESTERS
// ===================

// --- HEAD OR SPOUSE --- \\

const isHeadOrSpouse = function (member) {
  return member.m_role === 'head' || member.m_role === 'spouse';
};  // End isHeadOrSpouse()


const isNotHeadOrSpouse = function (member) {
  return member.m_role !== 'head' && member.m_role !== 'spouse';
};  // End isNotHeadOrSpouse()


const getHeadOrSpouseMembers = function (memberList) {
  return getEveryMember(memberList, isHeadOrSpouse);
};  // End getHeadOrSpouseMembers()


const getHeadOrSpouseOfHousehold = function (client) {
  return getEveryMemberOfHousehold(client, isHeadOrSpouse);
};  // End getHeadOrSpouseOfHousehold()


// --- DEPENDENTS --- \\
/**
 * @todo Is it possible for people older than 18 to still be dependents?
 *     I think that on tax forms it's possible to claim people as
 *     dependents until age 26. */

const isDependent = function (member) {
  return (member.m_age <= 18 || member.m_disabled) && isNotHeadOrSpouse(member);
};  // End isDependent()


const getDependentMembers = function (memberList) {
  return getEveryMember(memberList, isDependent);
};  // End getDependentMembers()


const getDependentsOfHousehold = function (client) {
  return getEveryMemberOfHousehold(client, isDependent);
};  // End getDependentsOfHousehold()


// --- DISABLED --- \\

const isDisabled = function (member) {
  return member.m_disabled;
};  // End isDisabled()


const getDisabledMembers = function (memberList) {
  return getEveryMember(memberList, isDisabled);
};  // End getDisabledMembers()


const getDisabledOfHousehold = function (client) {
  return getEveryMemberOfHousehold(client, isDisabled);
};  // End getDisabledOfHousehold()


// --- 12 OR UNDER --- \\
// Yes, this is a thing because we had to split stuff up
// strangely to accommodate mutliple programs more easily
const isUnder13 = function (member) {
  return member.m_age <= 12;
};  // End isUnder13()


const getUnder13Members = function (memberList) {
  return getEveryMember(memberList, isUnder13);
};  // End getUnder13Members()


const getUnder13OfHousehold = function (client) {
  return getEveryMemberOfHousehold(client, isUnder13);
};  // End getUnder13OfHousehold()

const isYoungerThan = function (member, comparisonData) {
  // Can be number or object with correct prop
  var age = comparisonData.age || comparisonData;
  return member.m_age < age;
};

const getYoungerThan = function (client, age) {
  return getEveryMemberOfHousehold(client, isYoungerThan, { age: age });
};

const isOlderThan = function (member, comparisonData) {
  // Can be number or object with correct prop
  var age = comparisonData.age || comparisonData;
  // console.log(age, member.m_age);
  return member.m_age > age;
};

const getOlderThan = function (client, age) {
  return getEveryMemberOfHousehold(client, isOlderThan, { age: age });
};


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
  isYoungerThan,
  getYoungerThan,
  isOlderThan,
  getOlderThan,
};
