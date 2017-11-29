const cashflow = require('../../utils/cashflow');

// Sample clients to use in these tests.

const testClientList = [
  {
    name: 'John H.',
    lastVisit: '1 May 2017',
    clientId: 12345,
    image: 'http://react.semantic-ui.com/assets/images/avatar/large/matthew.png',
    dob: '1/1/1997',
    zipCode: '02210',
    current: {
      SSDI: 99
    },
    visits: [
        {
            date: '7/14/16',
            benefits: 'SNAP, MassHealth, Section 8'
        },
        {
            date: '5/1/17',
            benefits: 'SNAP, MassHealth'
        },
    ],
  },
  {
    name: 'Sarah M.',
    lastVisit: '12 June 2016',
    clientId: 54321,
    image: 'http://react.semantic-ui.com/assets/images/avatar/large/jenny.jpg',
    dob: '1/1/1997',
    zipCode: '02210',
    current: {
      SSDI: 151
    }, 
    visits:[],
  }
]

// Start with some exceedingly simple tests. 

test('Current SSDI cashflow 1', () => {
	expect(cashflow.toCashflow(testClientList[0], 'current', 'SSDI')).toBe(99);
});

test('Current SSDI cashflow 2', () => {
	expect(cashflow.toCashflow(testClientList[0], 'current', 'SSDI')).toBe(99);
});

/** 
* Test toCashFlow method.
* For now, there are just test descriptions. 
* These cannot be implemented until the client object is ready. 
*/

// Create a test client, setting new values for every prop for current values. 

// Use toCashFlow to fetch each current property on the test client, confirming that 
// it's the value we expect. 

// Use toCashFlow to fetch each future property on the test client, confirming that 
// it's the value we expect. 

