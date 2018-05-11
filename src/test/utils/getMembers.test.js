import {
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
} from '../../utils/getMembers';

// getEveryMember(array, fn) = array.filter(fn)
test('getEveryMember()', () => {
  expect(getEveryMember([
    0,
    1,
    0, 
  ], (val) => {return val === 0;})).toHaveLength(2);
});

test('getEveryMember() empty result', () => {
  expect(getEveryMember([
    1,
    1,
    1, 
  ], (value) => {return value === 0;})).toEqual([
  ]);
});

// getEveryMemberOfHousehold(obj, fn) = obj.household.filter(fn)
test('getEveryMemberOfHousehold()', () => {
  const client = {
    household: [
      0,
      1,
      0,
    ], 
  };
  expect(getEveryMemberOfHousehold(client, (val) => {return val === 0;})).toHaveLength(2);
});

describe('head or spouse', () => {
  const headOrSpouse = [
    'head',
    'spouse', 
  ].map((role) => {return {
    m_role: role, 
  };});
  const notHeadOrSpouse = [
    'Head',
    'member',
    '', 
  ].map((role) => {return {
    m_role: role,
  };});
  const allMembers = headOrSpouse.concat(notHeadOrSpouse);

  test('isHeadOrSpouse()', () => {
    headOrSpouse.forEach((member) => {return expect(isHeadOrSpouse(member)).toBe(true);});
    notHeadOrSpouse.forEach((member) =>
    {return expect(isHeadOrSpouse(member)).toBe(false);}
    );
  });

  // !isHeadOrSpouse()
  test('isNotHeadOrSpouse()', () => {
    headOrSpouse.forEach((member) =>
    {return expect(isNotHeadOrSpouse(member)).toBe(false);}
    );
    notHeadOrSpouse.forEach((member) =>
    {return expect(isNotHeadOrSpouse(member)).toBe(true);}
    );
  });

  test('getHeadOrSpouseMembers()', () => {
    expect(getHeadOrSpouseMembers(allMembers)).toHaveLength(2);
  });

  test('getHeadOrSpouseOfHousehold()', () => {
    const client = {
      household: allMembers, 
    };
    expect(getHeadOrSpouseOfHousehold(client)).toHaveLength(2);
  });
});

describe('dependents', () => {
  const dependents = [
    {
      m_age: 18,
      m_role: 'member', 
    },
    {
      m_age: 17,
      m_role: 'member', 
    },
    {
      m_age: 19,
      m_disabled: true,
      m_role: 'member', 
    },
  ];
  const notDependents = [
    {
      m_age: 18,
      m_role: 'head', 
    },
    {
      m_age: 18,
      m_role: 'spouse', 
    },
    {
      m_age: 19,
      m_disabled: true,
      m_role: 'head', 
    },
    {
      m_age: 19,
      m_disabled: true,
      m_role: 'spouse', 
    },
    {
      m_age: 19,
      m_disabled: false,
      m_role: 'member', 
    },
    {
      m_age: 26,
      m_disabled: false,
      m_role: 'member', 
    },
  ];
  const allMembers = dependents.concat(notDependents);

  test('isDependent()', () => {
    dependents.forEach((member) => {return expect(isDependent(member)).toBe(true);});
    notDependents.forEach((member) => {return expect(isDependent(member)).toBe(false);});
  });

  test('getDependentMembers()', () => {
    expect(getDependentMembers(allMembers)).toHaveLength(dependents.length);
  });

  test('getDependentsOfHousehold()', () => {
    const client = {
      household: allMembers, 
    };
    expect(getDependentsOfHousehold(client)).toHaveLength(dependents.length);
  });
});

describe('disabled', () => {
  const disabled = {
    m_disabled: true, 
  };
  const notDisabled = {
    m_disabled: false, 
  };
  const allMembers = [
    disabled,
    notDisabled,
    notDisabled, 
  ];

  test('isDisabled()', () => {
    expect(isDisabled(disabled)).toBe(true);
    expect(isDisabled(notDisabled)).toBe(false);
  });

  test('getDisabledMembers()', () => {
    expect(getDisabledMembers(allMembers)).toHaveLength(1);
  });

  test('getDisabledOfHousehold()', () => {
    const client = {
      household: allMembers, 
    };
    expect(getDisabledOfHousehold(client)).toHaveLength(1);
  });
});

describe('under 13', () => {
  const under13 = [
    11,
    12, 
  ].map((age) => {return {
    m_age: age, 
  };});
  const over12 = [
    13,
    14,
    77,
  ].map((age) => {return {
    m_age: age, 
  };});
  const allMembers = under13.concat(over12);

  test('isUnder13()', () => {
    under13.forEach((member) => {return expect(isUnder13(member)).toBe(true);});
    over12.forEach((member) => {return expect(isUnder13(member)).toBe(false);});
  });

  test('getUnder13Members()', () => {
    expect(getUnder13Members(allMembers)).toHaveLength(under13.length);
  });

  test('getUnder13OfHousehold()', () => {
    const client = {
      household: allMembers, 
    };
    expect(getUnder13OfHousehold(client)).toHaveLength(under13.length);
  });
});
