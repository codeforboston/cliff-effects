/**
 * MA median and low income limits by county valid through Sept. 30 2017 (I believe)
 *
 * @since 08/2017
 * @constant
 * @global
 * @readonly
 * 
 * @exports {Object} AREA_MEDIAN_INCOME_LIMITS_MA_2017
 * @property {Object} countyName - MA county names ("free market rent" areas of residence) as keys
 * @property {number} countyName.median - 100% of the median income for a 4-family household
 * @property {Object} countyName.L50 - Very Low Income Limits (below 50% of the median income limit plus complex adjustments) for 1 to 8-member househo, eachAdditional: eachAdditionallds
 * @property {Object} countyName.ELI - Extremely Low Income Limits (below 30% of the median income limit plus complex adjustments) for 1 to 8-member househ, eachAdditional: noCalcsold
 * @property {Object} countyName.L80 -Low Income Limits (below 80% of the median income limit plus complex adjustments) for 1 to 8-member househo, eachAdditional: eachAdditionalld
 * 
 * @see https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=426025906
 * @see US-wide excel sheet downloaded from https://www.huduser.gov/portal/datasets/il.html#2017_data
 *
 */


const eachAdditional = function ( data, numAdditional ) {
  /**
  * https://www.huduser.gov/portal/datasets/il//il17/IncomeLimitsBriefingMaterial-FY17.pdf
  * 'For each person in excess of eight, the four-person income limit should be
  * multiplied by an additional 8 percent. (For example, the nine-person limit
  * equals 140 percent [132 + 8] of the relevant four-person income limit'
  */ 

  var fourPersonLimit  = data[ '4' ];
  // We could include these hard-coded numbers as data somewhere.
  // We need to know when their expiration dates are.
  var percent = (numAdditional * 8)/100,
      amount  = fourPersonLimit * percent;

  return amount
};  // End eachAdditional()

const noCalcs = function ( data, numAdditional ) {
  /**
  * @todo Instead of throwing an error, send a message to the user.
  * 
  * https://www.huduser.gov/portal/datasets/il//il17/IncomeLimitsBriefingMaterial-FY17.pdf
  * '...these family size adjustments are no longer sufficient to determine the level
  * of extremely low-income limits... For families with more than 8 persons, HUD has
  * developed a tool that should be used to calculate the extremely low-income
  * limit for that area at http://www.huduser.gov/portal/datasets/il/il17/index.html'
  * (page does not exist)
  */ 
  throw 'Area Median Income Limits for more than 8 household members cannot be'
        + ' calculated here. See https://www.huduser.gov/portal/datasets/il//il17/IncomeLimitsBriefingMaterial-FY17.pdf';
};


const AREA_MEDIAN_INCOME_LIMITS_MA_2017 = {
  "Barnstable Town city": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Bourne town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Brewster town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Chatham town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Dennis town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Eastham town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Falmouth town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Harwich town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Mashpee town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Orleans town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Provincetown town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Sandwich town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Truro town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Wellfleet town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Yarmouth town": { 
    median: 90200,
    L50: { 0: 0, 1: 31600, 2: 36100, 3: 40600, 4: 45100, 5: 48750, 6: 52350, 7: 55950, 8: 59550, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18950, 2: 21650, 3: 24350, 4: 27050, 5: 29250, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Adams town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Alford town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Becket town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Cheshire town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Clarksburg town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Dalton town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Egremont town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Florida town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Great Barrington town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Hancock town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Hinsdale town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Lanesborough town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Lee town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Lenox town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Monterey town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Mount Washington town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "New Ashford town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "New Marlborough town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "North Adams city": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Otis town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Peru town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Pittsfield city": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Richmond town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Sandisfield town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Savoy town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Sheffield town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Stockbridge town": { 
    median: 67200,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Tyringham town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Washington town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "West Stockbridge town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Williamstown town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Windsor town": { 
    median: 72900,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Acushnet town": { 
    median: 62200,
    L50: { 0: 0, 1: 22050, 2: 25200, 3: 28350, 4: 31500, 5: 34050, 6: 36550, 7: 39100, 8: 41600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 13250, 2: 16240, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 35250, 2: 40300, 3: 45350, 4: 50350, 5: 54400, 6: 58450, 7: 62450, 8: 66500, eachAdditional: eachAdditional }
  },
  "Attleboro city": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Berkley town": { 
    median: 94400,
    L50: { 0: 0, 1: 31500, 2: 36000, 3: 40500, 4: 45000, 5: 48600, 6: 52200, 7: 55800, 8: 59400, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18900, 2: 21600, 3: 24300, 4: 27000, 5: 29200, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Dartmouth town": { 
    median: 62200,
    L50: { 0: 0, 1: 22050, 2: 25200, 3: 28350, 4: 31500, 5: 34050, 6: 36550, 7: 39100, 8: 41600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 13250, 2: 16240, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 35250, 2: 40300, 3: 45350, 4: 50350, 5: 54400, 6: 58450, 7: 62450, 8: 66500, eachAdditional: eachAdditional }
  },
  "Dighton town": { 
    median: 94400,
    L50: { 0: 0, 1: 31500, 2: 36000, 3: 40500, 4: 45000, 5: 48600, 6: 52200, 7: 55800, 8: 59400, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18900, 2: 21600, 3: 24300, 4: 27000, 5: 29200, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Easton town": { 
    median: 113200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Fairhaven town": { 
    median: 62200,
    L50: { 0: 0, 1: 22050, 2: 25200, 3: 28350, 4: 31500, 5: 34050, 6: 36550, 7: 39100, 8: 41600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 13250, 2: 16240, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 35250, 2: 40300, 3: 45350, 4: 50350, 5: 54400, 6: 58450, 7: 62450, 8: 66500, eachAdditional: eachAdditional }
  },
  "Fall River city": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Freetown town": { 
    median: 62200,
    L50: { 0: 0, 1: 22050, 2: 25200, 3: 28350, 4: 31500, 5: 34050, 6: 36550, 7: 39100, 8: 41600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 13250, 2: 16240, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 35250, 2: 40300, 3: 45350, 4: 50350, 5: 54400, 6: 58450, 7: 62450, 8: 66500, eachAdditional: eachAdditional }
  },
  "Mansfield town": { 
    median: 94400,
    L50: { 0: 0, 1: 31500, 2: 36000, 3: 40500, 4: 45000, 5: 48600, 6: 52200, 7: 55800, 8: 59400, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18900, 2: 21600, 3: 24300, 4: 27000, 5: 29200, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "New Bedford city": { 
    median: 62200,
    L50: { 0: 0, 1: 22050, 2: 25200, 3: 28350, 4: 31500, 5: 34050, 6: 36550, 7: 39100, 8: 41600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 13250, 2: 16240, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 35250, 2: 40300, 3: 45350, 4: 50350, 5: 54400, 6: 58450, 7: 62450, 8: 66500, eachAdditional: eachAdditional }
  },
  "North Attleborough town": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Norton town": { 
    median: 94400,
    L50: { 0: 0, 1: 31500, 2: 36000, 3: 40500, 4: 45000, 5: 48600, 6: 52200, 7: 55800, 8: 59400, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18900, 2: 21600, 3: 24300, 4: 27000, 5: 29200, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Raynham town": { 
    median: 113200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Rehoboth town": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Seekonk town": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Somerset town": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Swansea town": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Taunton city": { 
    median: 94400,
    L50: { 0: 0, 1: 31500, 2: 36000, 3: 40500, 4: 45000, 5: 48600, 6: 52200, 7: 55800, 8: 59400, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18900, 2: 21600, 3: 24300, 4: 27000, 5: 29200, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Westport town": { 
    median: 72100,
    L50: { 0: 0, 1: 25250, 2: 28850, 3: 32450, 4: 36050, 5: 38950, 6: 41850, 7: 44750, 8: 47600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 15200, 2: 17350, 3: 20420, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 40400, 2: 46200, 3: 51950, 4: 57700, 5: 62350, 6: 66950, 7: 71550, 8: 76200, eachAdditional: eachAdditional }
  },
  "Aquinnah town": { 
    median: 87000,
    L50: { 0: 0, 1: 30450, 2: 34800, 3: 39150, 4: 43500, 5: 47000, 6: 50500, 7: 53950, 8: 57450, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18300, 2: 20900, 3: 23500, 4: 26100, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Chilmark town": { 
    median: 87000,
    L50: { 0: 0, 1: 30450, 2: 34800, 3: 39150, 4: 43500, 5: 47000, 6: 50500, 7: 53950, 8: 57450, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18300, 2: 20900, 3: 23500, 4: 26100, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Edgartown town": { 
    median: 87000,
    L50: { 0: 0, 1: 30450, 2: 34800, 3: 39150, 4: 43500, 5: 47000, 6: 50500, 7: 53950, 8: 57450, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18300, 2: 20900, 3: 23500, 4: 26100, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Gosnold town": { 
    median: 87000,
    L50: { 0: 0, 1: 30450, 2: 34800, 3: 39150, 4: 43500, 5: 47000, 6: 50500, 7: 53950, 8: 57450, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18300, 2: 20900, 3: 23500, 4: 26100, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Oak Bluffs town": { 
    median: 87000,
    L50: { 0: 0, 1: 30450, 2: 34800, 3: 39150, 4: 43500, 5: 47000, 6: 50500, 7: 53950, 8: 57450, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18300, 2: 20900, 3: 23500, 4: 26100, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Tisbury town": { 
    median: 87000,
    L50: { 0: 0, 1: 30450, 2: 34800, 3: 39150, 4: 43500, 5: 47000, 6: 50500, 7: 53950, 8: 57450, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18300, 2: 20900, 3: 23500, 4: 26100, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "West Tisbury town": { 
    median: 87000,
    L50: { 0: 0, 1: 30450, 2: 34800, 3: 39150, 4: 43500, 5: 47000, 6: 50500, 7: 53950, 8: 57450, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18300, 2: 20900, 3: 23500, 4: 26100, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Amesbury Town city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Andover town": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Beverly city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Boxford town": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Danvers town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Essex town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Georgetown town": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Gloucester city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Groveland town": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Hamilton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Haverhill city": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Ipswich town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Lawrence city": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Lynn city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Lynnfield town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Manchester-by-the-Sea town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Marblehead town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Merrimac town": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Methuen city": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Middleton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Nahant town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Newbury town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Newburyport city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "North Andover town": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Peabody city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Rockport town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Rowley town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Salem city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Salisbury town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Saugus town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Swampscott town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Topsfield town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Wenham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "West Newbury town": { 
    median: 87600,
    L50: { 0: 0, 1: 30700, 2: 35050, 3: 39450, 4: 43800, 5: 47350, 6: 50850, 7: 54350, 8: 57850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18450, 2: 21050, 3: 23700, 4: 26300, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Ashfield town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Bernardston town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Buckland town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Charlemont town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Colrain town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Conway town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Deerfield town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Erving town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Gill town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Greenfield Town city": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Hawley town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Heath town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Leverett town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Leyden town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Monroe town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Montague town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "New Salem town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Northfield town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Orange town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Rowe town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Shelburne town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Shutesbury town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Sunderland town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Warwick town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Wendell town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Whately town": { 
    median: 76500,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Agawam Town city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Blandford town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Brimfield town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Chester town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Chicopee city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "East Longmeadow town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Granville town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Hampden town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Holland town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Holyoke city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Longmeadow town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Ludlow town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Monson town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Montgomery town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Palmer Town city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Russell town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Southwick town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Springfield city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Tolland town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Wales town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Westfield city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "West Springfield Town city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Wilbraham town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Amherst town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Belchertown town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Chesterfield town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Cummington town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Easthampton Town city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Goshen town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Granby town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Hadley town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Hatfield town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Huntington town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Middlefield town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Northampton city": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Pelham town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Plainfield town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Southampton town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "South Hadley town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Ware town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Westhampton town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Williamsburg town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Worthington town": { 
    median: 66600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Acton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Arlington town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Ashby town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Ashland town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Ayer town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Bedford town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Belmont town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Billerica town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Boxborough town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Burlington town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Cambridge city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Carlisle town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Chelmsford town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Concord town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Dracut town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Dunstable town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Everett city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Framingham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Groton town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Holliston town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Hopkinton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Hudson town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Lexington town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Lincoln town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Littleton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Lowell city": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Malden city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Marlborough city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Maynard town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Medford city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Melrose city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Natick town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Newton city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "North Reading town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Pepperell town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Reading town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Sherborn town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Shirley town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Somerville city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Stoneham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Stow town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Sudbury town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Tewksbury town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Townsend town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Tyngsborough town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Wakefield town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Waltham city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Watertown city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Wayland town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Westford town": { 
    median: 96300,
    L50: { 0: 0, 1: 33750, 2: 38550, 3: 43350, 4: 48150, 5: 52050, 6: 55900, 7: 59750, 8: 63600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20250, 2: 23150, 3: 26050, 4: 28900, 5: 31250, 6: 33550, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Weston town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Wilmington town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Winchester town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Woburn city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Nantucket town": { 
    median: 99500,
    L50: { 0: 0, 1: 34850, 2: 39800, 3: 44800, 4: 49750, 5: 53750, 6: 57750, 7: 61700, 8: 65700, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 20900, 2: 23900, 3: 26900, 4: 29850, 5: 32250, 6: 34650, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 50450, 2: 57650, 3: 64850, 4: 72050, 5: 77850, 6: 83600, 7: 89350, 8: 95150, eachAdditional: eachAdditional }
  },
  "Avon town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Bellingham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Braintree Town city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Brookline town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Canton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Cohasset town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Dedham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Dover town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Foxborough town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Franklin Town city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Holbrook town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Medfield town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Medway town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Millis town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Milton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Needham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Norfolk town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Norwood town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Plainville town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Quincy city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Randolph town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Sharon town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Stoughton town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Walpole town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Wellesley town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Westwood town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Weymouth Town city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Wrentham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Abington town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Bridgewater town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Brockton city": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Carver town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Duxbury town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "East Bridgewater town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Halifax town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Hanover town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Hanson town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Hingham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Hull town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Kingston town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Lakeville town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Marion town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Marshfield town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Mattapoisett town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Middleborough town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Norwell town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Pembroke town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Plymouth town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Plympton town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Rochester town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Rockland town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Scituate town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Wareham town": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "West Bridgewater town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Whitman town": { 
    median: 81000,
    L50: { 0: 0, 1: 29000, 2: 33150, 3: 37300, 4: 41400, 5: 44750, 6: 48050, 7: 51350, 8: 54650, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 17400, 2: 19900, 3: 22400, 4: 24850, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 46400, 2: 53000, 3: 59650, 4: 66250, 5: 71550, 6: 76850, 7: 82150, 8: 87450, eachAdditional: eachAdditional }
  },
  "Boston city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Chelsea city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Revere city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Winthrop Town city": { 
    median: 103400,
    L50: { 0: 0, 1: 36200, 2: 41400, 3: 46550, 4: 51700, 5: 55850, 6: 60000, 7: 64150, 8: 68250, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 21700, 2: 24800, 3: 27900, 4: 31000, 5: 33500, 6: 36000, 7: 38450, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 54750, 2: 62550, 3: 70350, 4: 78150, 5: 84450, 6: 90700, 7: 96950, 8: 103200, eachAdditional: eachAdditional }
  },
  "Ashburnham town": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Athol town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Auburn town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Barre town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Berlin town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Blackstone town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Bolton town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Boylston town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Brookfield town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Charlton town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Clinton town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Douglas town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Dudley town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "East Brookfield town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Fitchburg city": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Gardner city": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Grafton town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Hardwick town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Harvard town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Holden town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Hopedale town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Hubbardston town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Lancaster town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Leicester town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Leominster city": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Lunenburg town": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Mendon town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Milford town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Millbury town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Millville town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "New Braintree town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Northborough town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Northbridge town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "North Brookfield town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Oakham town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Oxford town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Paxton town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Petersham town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Phillipston town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Princeton town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Royalston town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Rutland town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Shrewsbury town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Southborough town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Southbridge Town city": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Spencer town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Sterling town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Sturbridge town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Sutton town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Templeton town": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Upton town": { 
    median: 120200,
    L50: { 0: 0, 1: 38100, 2: 43550, 3: 49000, 4: 54400, 5: 58800, 6: 63150, 7: 67500, 8: 71850, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 22900, 2: 26150, 3: 29400, 4: 32650, 5: 35300, 6: 37900, 7: 40500, 8: 43100, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Uxbridge town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Warren town": { 
    median: 75600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Webster town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Westborough town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "West Boylston town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "West Brookfield town": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  },
  "Westminster town": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Winchendon town": { 
    median: 68600,
    L50: { 0: 0, 1: 28000, 2: 32000, 3: 36000, 4: 40000, 5: 43200, 6: 46400, 7: 49600, 8: 52800, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 16800, 2: 19200, 3: 21600, 4: 24600, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 44800, 2: 51200, 3: 57600, 4: 64000, 5: 69150, 6: 74250, 7: 79400, 8: 84500, eachAdditional: eachAdditional }
  },
  "Worcester city": { 
    median: 85700,
    L50: { 0: 0, 1: 30000, 2: 34300, 3: 38600, 4: 42850, 5: 46300, 6: 49750, 7: 53150, 8: 56600, eachAdditional: eachAdditional },
    ELI: { 0: 0, 1: 18000, 2: 20600, 3: 23150, 4: 25700, 5: 28780, 6: 32960, 7: 37140, 8: 41320, eachAdditional: noCalcs },
    L80: { 0: 0, 1: 47600, 2: 54400, 3: 61200, 4: 68000, 5: 73450, 6: 78900, 7: 84350, 8: 89800, eachAdditional: eachAdditional }
  }
};


export {
  AREA_MEDIAN_INCOME_LIMITS_MA_2017
};
