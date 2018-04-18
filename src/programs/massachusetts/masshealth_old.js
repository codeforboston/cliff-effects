
/** Determines whether a Project Hope client has eligibility for MA health insurance.
 * Constructs a UserProfile Object which uses three helper Objects:
 * QualifyingConditionsBlob, CitizenshipInfoBlob, and EligibilityMatrix. 
 * The first two Objects assist in constructing the third and the UserProfile
 * method eligibleFor returns the EligibilityMatrix. 
 *
 *
 */



/**
 * Income thresholds for different household sizes. Arrays are ordered by family size. I.e. INCOME_THRESHOLDS[0]
 * corresponds to the income thresholds for a family of 1. If that value is [0, 15528, 35017, 46880] then the first
 * income level would be 0 to $15,527, second $15,528 to $35,016, etc.
 */

const INCOME_THRESHOLDS = [
    [0, 15528, 35017, 46880],
    [0, 20928, 47197, 62928],
    [0, 26328, 59377, 79164],
    [0, 31728, 71556, 95400],
    [0, 37128, 83736, 111648],
    [0, 42528, 95916, 127884],
    [0, 47928, 108096, 144120],
    [0, 53328, 120276, 160368]
]




/**
 * Helper object for constructing UserProfile Object
 *
 * @typedef CitizenshipInfoBlob
 * @property {Boolean} usCitizen
 * @property {Boolean} usAlien
 * @property {Boolean} massResident
 *
 * @method _isCitizen
 * @method _isAlien
 * @method _isMassResident
 * @method _hasResidency
 *
 * @return CitizenshipInfoBlob
 *
 */


class CitizenshipInfoBlob( usCitizen = true , usAlien = false , massResident = true ) 
{
    // saved data
    this.usCitizen      = usCitizen;
    this.usAlien        = usAlien;
    this.massResident   = massResident;
    // private accessor methods
    this._isCitizen      = function() { return this.usCitizen; };
    this._isAlien        = function() { return this.usAlien; };
    this._isMassResident = function() { return this.massResident; };
    // is this person ineligible due to citizenship or residency requirements?
    this._hasResidency = function()
    { 
	if (!this._isCitizen() && !this._isAlien()) // applicant disqualified if neither citizen or legal alien
	{
	    return false;
	}
	else if (!this._isMassResident()) // applicant must be legal alien or citizen...do they live in MA?
	{
	    return false;	// not a resident? they are disqualified 
	}
	else
	{
	    return true;	// they are a resident? they qualify!
	}
    };
}


/**
 * Helper object for constructing UserProfile Object
 *
 * @typedef QualifyingConditionsBlob
 * @property {Boolean} pregnant
 * @property {Boolean} disabled
 * @property {Boolean} breastCancer
 * @property {Boolean} cervicalCancer
 * @property {Boolean} caretaker
 * @property {Boolean} HIV
 *
 *
 * @method _isPregnant
 * @method _isDisabled
 * @method _hadBreastCancer
 * @method _hadCervicalCancer
 * @method _isCaretaker
 * @method _isHIVpositive
 * @method _hasQualifyingCondition
 *
 * @return QualifyingConditionsBlob
 */

class QualifyingConditionsBlob(pregnant = false, disabled = false,
                                  breastCancer = false, cervicalCancer = false,
                                  caretaker = false, HIVpositive = false )
{
    // saved data
    this.pregnant          = pregnant;
    this.disabled          = disabled;
    this.breastCancer      = breastCancer;
    this.cervicalCancer    = cervicalCancer;
    this.caretaker         = caretaker;
    this.HIVpositive       = HIVpositive;

    // accessor methods
    this._isPregnant        = function() { return this.pregnant; };
    this._isDisabled        = function() { return this.disabled; };
    this._hadBreastCancer   = function() { return this.breastCancer; };
    this._hadCervicalCancer = function() { return this.cervicalCancer; };
    this._isCaretaker       = function() { return this.caretaker; };
    this._isHIVpositive     = function() { return this.HIVpositive; };

    // does this person have at least one qualifying condition?
    this._hasQualifyingCondition = function()
    {
	if (this._isPregnant() || this._isDisabled() || this._hadBreastCancer()
	    || this._hadCervicalCancer() || this._isCaretaker() || this._isHIVpositive()) {
	    
	    return true;
	}
	else {
	    return false;
	}
	    
    };

}      


 /**
  * Returns a recipient's eligibility matrix as determined by the given set of parameters
  * 
  * @property {Boolean} massHealth
  * @property {Boolean} massHealthCarePlus
  * @property {Boolean} connectorCare
  * @property {Boolean} qualifiedPlanWithHelp
  * @property {Boolean} qualifiedPlan
  *
  * @return {EligibilityMatrix}
  */
class EligibilityMatrix(incomeLevel, hasQualifyingCondition, hasResidency, age, hasMinCreditableCoverage) 
{

    var eligibility = { massHealth: false, massHealthCarePlus: false, connectorCare: false, qualifiedPlanWithHelp : false, qualifiedPlan: false };

    // user is not eligible for any health plan if not a resident
    if (!hasResidency)
    {
        return eligibility;
    }

    // user is resident, check if at lowest income level 
    if (incomeLevel == 1) {
        if (age < 21) {
            eligibility.massHealth = true;
        }

        if (age < 64) {
            eligibility.massHealthCarePlus = true;

            if (hasQualifyingCondition)
                eligibility.massHealth = true;
            }
        }
	// if user is over 65, they should apply for MediCare?
    }

    // qualifying conditions have already been addressed re: eligibility...now check if they have insurance thru employer
    if (incomeLevel >= 2) {
        // under 19 covered by parents? over 64 covered by MediCare
        if (age < 19 || age > 64) {
            return eligibility;
        }
	// not eligible if employer offers creditable plan
        if (!hasMinCreditableCoverage)
	{
	    switch (incomeLevel) {
		case 2:
		    eligibility.connectorCare = true; 
		    break;
		case 3:
		    eligibilty.qualifiedPlanWithHelp = true; 
		    break;
		case 4:
		    eligibility.qualifiedPlan = true;
		    break;
	    }
        }
    }
    return eligibility;
}





 /**
  * Object representing relevant info for determining Eligibility for MA Health plans
  * getEligibiltyMatrix refactored to be public method of UserProfile object.
  *
  * @typedef UserProfile
  * @property {Number} age
  * @property {Number} annualHouseholdIncomeLevel
  * @property {Number} householdSize
  * @property {Boolean} minCreditableCoverage
  * @property {Number} _incomeLevel
  * @property {CitizenshipInfoBlob} citizenshipInfo
  * @property {QualifyingConditionsBlob} qualifyingConditions
  * @property {EligibilityMatrix} eligibleFor
  *
  * @method getEligibility 
  * @return UserProfile
  */

class UserProfile(householdSize,
    annualHouseholdIncome,
    age,
    minCreditableCoverage = false,
    usCitizen = true,
    usAlien = false,
    massResident = true,
    pregnant = false,
    hiv = false,
    disabled = false,
    breastCancer = false,
    cervicalCancer = false,
    caretaker = false) 
{
    this.age                    = age;
    this.annualHousehouldIncome = annualHouseholdIncome;
    this.householdSize          = householdSize;
    this.minCreditableCoverage  = minCreditableCoverage;
    // create CitizenshipInfoBlob
    this.CitizenshipInfo        = new CitizenshipInfoBlob(usCitizen, usAlien, massResident);
    // create QualifyingConditionsBlob
    this.QualifyingConditions   = new QualifyingConditionsBlob(pregnant, disabled, breastCancer,
							       cervicalCancer, caretaker, HIVpositive);
    // determine income level, store as private variable. We'll use this for creating EligibilityMatrix
    if (this.householdSize > 8) {
        // TODO: There's probably a better way to handle this case...
        throw 'Too many people in that family. How should we handle those?';
    }
    // is const correct? not sure why this is the case
    const thresholds = INCOME_THRESHOLDS[householdSize - 1];

    this._incomeLevel = 1;
    for (let i = thresholds.length - 1; i >= 0; i--) {
        if (this.annualHouseholdIncome >= thresholds[i]) {
            this._incomeLevel = i + 1;
            break;
        }
    }
   

    // create EligibiltyMatrix
    this.eligibleFor = new EligibiltyMatrix(this._incomeLevel, this.QualifyingCondition._hasQualifyingCondition(),
					    this.CitizenshipInfo._hasResidency(), this.age, this.minCreditableCoverage);
    // accesor method for EligiblityMatrix 
    this.getEligibity = function() { return this.eligibleFor; };
    
}

