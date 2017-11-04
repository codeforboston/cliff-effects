import React from 'react';

// Set up to do nested props in a way that doesn't need
// us to list all the props manually. Is that good? Is that bad?
// Note: Must make sure all non-primitive-value props
// are created at start.

// ================
// PROCESSING
// ================
var process = {};
process.current_incomes_earned = function ( client, value, setInputValue ) {
  var cInput  = client.input.current,
      cProcsd = client.processed.current;

  console.log( client );
  if ( !cInput.incomes ) { cInput.incomes = {}; }
  if ( setInputValue ) { cInput.incomes.earned = parseInt( value, 10 ); }
  if ( !cProcsd.incomes ) { cProcsd.incomes = {}; }
  
  var ciInput  = cInput.incomes,
      ciProcsd = cProcsd.incomes;
  
  // `undefined` will make NaN
  ciProcsd.earned = getMoney( ciInput.earned );

  // Propagate values to future if needed
  return process.future_incomes_earned( client, value, false );
};  // End process.current_incomes_earned()


process.future_incomes_earned = function ( client, value, setInputValue ) {
  var fInput  = client.input.future,
      fProcsd = client.processed.future;

  if ( !fInput.incomes ) { fInput.incomes = {}; }
  if ( setInputValue ) { fInput.incomes.earned = parseInt( value, 10 ); }
  if ( !fProcsd.incomes ) { fProcsd.incomes = {}; }
  
  var fiInput  = fInput.incomes,
      fiProcsd = fProcsd.incomes;

  if ( isNaN( fiInput.earned ) || fiInput.earned === null ) {
    fiProcsd.earned = client.processed.current.incomes.earned;
    if ( typeof fiProcsd.earned !== 'number' || isNaN( fiProcsd.earned ) ) {
      throw new TypeError('`current` values should be created before `future` values.');
    }
  } else {
    fiProcsd.earned = getMoney( fiInput.earned );
  }

  return {...client};
};  // End process.future_incomes_earned()


// ================
// CALC HELPERS
// ================
var getMoney = function ( val ) {
  // `undefined` or `null` will make NaN
  var money = parseInt( val, 10 );

  if ( isNaN( money ) || money < 0 ) {
    money = 0;
  } else {
    // Forget about cents for this exercise
    // Anyway, this may be how '...HouseholdSize' prop works
    if ( money % 1 !== 0 ) {
      money = Math.floor( money );
    }
  }

  return money;
};  // End getMoney()




// ================
// REACT
// ================

class IncomeComponent extends React.Component {
  constructor ( props ) {
    super( props );
    this.client     = props.client;
    this.timeframe  = props.timeframe;
    this.id         = props.timeframe.toLowerCase() + '_incomes_earned'
    this.onChange   = props.onChange;
    var fakeEvent = { target: { id: this.id, value: undefined } }
    this.onChange( fakeEvent );
  }
  
  render () {
    var client = this.client;
    console.log('--------', client.processed[ this.timeframe.toLowerCase() ].incomes)
    var incomes = client.processed[ this.timeframe.toLowerCase() ].incomes;
    
    return (
      <div>
        <span>{this.timeframe} Earned Income: </span>
        <input type="number" id={ this.id }
          value={ incomes ? incomes.earned : '0.00' }
          onChange={ this.onChange }/>
        <br />
      </div>
    );
  }
};


class ProcessTest extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
        input: { current: {}, future: {} },
        processed: { current: {}, future: {} }
    };
  }

  handleChange( evnt ) {
    // console.log('doing', JSON.stringify(evnt));
    // console.log( evnt.target.id, evnt.target.value, process[evnt.target.id](client, evnt.target.value, true) );   
    // This is for when state has more stuff in it, not just replace
    var key = evnt.target;
    console.log( 'doin', key.id, key.value, evnt );
    this.setState(function (prevState, props) {
      console.log('doing', JSON.stringify(evnt));
      return {...process[key.id]( prevState, key.value, true )};
    }, function (thing1, thing2) {
      console.log(this);
    });
  }
  
  render(){
    // var data = this.state;
    var data = this.state.processed.current;
    return (
      <div>
        <IncomeComponent client={this.state} timeframe={'Current'} onChange={(evnt) =>  {
        	console.log('handling', evnt);
        	this.handleChange(evnt)
        }}/>
        <IncomeComponent client={this.state} timeframe={'Future'} onChange={(evnt) =>  {
        	console.log('handling', evnt);
        	this.handleChange(evnt)
        }}/>
        <div>{JSON.stringify(data, null, 3)}</div>
      </div>
    )
  } 
}


export { ProcessTest };
