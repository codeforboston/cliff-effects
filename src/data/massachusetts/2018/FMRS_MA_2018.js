// Apparently React (?) doesn't even let you test whether a variable
// is defined or not. If it's not defined, then you can't even write
// it in the script...
// UMD pattern - this object is now available whether you're using amd,
// commonjs-like/node, or just referencing this js file in an html file
// (function (root, fmrsFactory) {  // root is usually `window`

//     if (typeof define === 'function' && define.amd) {
//     	// AMD. Register as an anonymous module.
//         define( [], fmrsFactory );
//     } else if (typeof module === 'object' && module.exports) {
// 	    // Node. Does not work with strict CommonJS, but only CommonJS-like
// 	    // environments that support module.exports, like Node.
//         module.exports = fmrsFactory();
//     } else {
//     	// Browser global
//     	root.FMRS_MA_2018 = fmrsFactory();
//     }
// // An self-invoking function that is immediately invoked when loaded
// }(this, function () {

var expirationDate = new Date(2018, 10, 1);

const noCalcs = function(data, numAdditional) {
  throw "Fair Market Rents for an apartment with more than 5 bedrooms have not been found.";
};

/**
 * Object: MA fair market rents by county and then by number of rooms in the
 * housing unit effective October 2, 2017 for the year of 2018. Presumably
 * expires Oct. 1, 2018
 *
 * @since 09/2017
 * @constant
 * @global
 * @readonly
 *
 * @exports {Object} FMRS_MA_2018
 * @property {Array<number>} FMRS_MA_2018.countyName - By county name, an array of
 * monetary rent amounts. Index 0 indicates a studio apartment, 1 = a 1-bedroom house,
 * and so on up to 4 bedrooms.
 *
 * @see https://docs.google.com/spreadsheets/d/14FFcrEwZVTJDc00X7V4XkicE3NYVVF0lijV1jMLe--Y/edit#gid=426025906
 * @see US-wide excel sheet downloaded from https://www.huduser.gov/portal/datasets/fmr.html#2018_data
 * @todo If this data is required outside of MA, not only do we need the full US
 * data from that spreadsheet, we also need the Small Area FMR data.
 */
var FMRS_MA_2018 = {
  "Barnstable Town city": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Bourne town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Brewster town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Chatham town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Dennis town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Eastham town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Falmouth town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Harwich town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Mashpee town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Orleans town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Provincetown town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Sandwich town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Truro town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Wellfleet town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Yarmouth town": {
    0: 0,
    1: 956,
    2: 1083,
    3: 1441,
    4: 1817,
    5: 1984,
    eachAdditional: noCalcs
  },
  "Adams town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Alford town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Becket town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Cheshire town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Clarksburg town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Dalton town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Egremont town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Florida town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Great Barrington town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Hancock town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Hinsdale town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Lanesborough town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Lee town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Lenox town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Monterey town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Mount Washington town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "New Ashford town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "New Marlborough town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "North Adams city": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Otis town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Peru town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Pittsfield city": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Richmond town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Sandisfield town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Savoy town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Sheffield town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Stockbridge town": {
    0: 0,
    1: 685,
    2: 817,
    3: 1000,
    4: 1254,
    5: 1409,
    eachAdditional: noCalcs
  },
  "Tyringham town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Washington town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "West Stockbridge town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Williamstown town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Windsor town": {
    0: 0,
    1: 864,
    2: 877,
    3: 1021,
    4: 1280,
    5: 1489,
    eachAdditional: noCalcs
  },
  "Acushnet town": {
    0: 0,
    1: 723,
    2: 761,
    3: 906,
    4: 1136,
    5: 1234,
    eachAdditional: noCalcs
  },
  "Attleboro city": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Berkley town": {
    0: 0,
    1: 827,
    2: 928,
    3: 1187,
    4: 1489,
    5: 1683,
    eachAdditional: noCalcs
  },
  "Dartmouth town": {
    0: 0,
    1: 723,
    2: 761,
    3: 906,
    4: 1136,
    5: 1234,
    eachAdditional: noCalcs
  },
  "Dighton town": {
    0: 0,
    1: 827,
    2: 928,
    3: 1187,
    4: 1489,
    5: 1683,
    eachAdditional: noCalcs
  },
  "Easton town": {
    0: 0,
    1: 1044,
    2: 1071,
    3: 1425,
    4: 2073,
    5: 2135,
    eachAdditional: noCalcs
  },
  "Fairhaven town": {
    0: 0,
    1: 723,
    2: 761,
    3: 906,
    4: 1136,
    5: 1234,
    eachAdditional: noCalcs
  },
  "Fall River city": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Freetown town": {
    0: 0,
    1: 723,
    2: 761,
    3: 906,
    4: 1136,
    5: 1234,
    eachAdditional: noCalcs
  },
  "Mansfield town": {
    0: 0,
    1: 827,
    2: 928,
    3: 1187,
    4: 1489,
    5: 1683,
    eachAdditional: noCalcs
  },
  "New Bedford city": {
    0: 0,
    1: 723,
    2: 761,
    3: 906,
    4: 1136,
    5: 1234,
    eachAdditional: noCalcs
  },
  "North Attleborough town": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Norton town": {
    0: 0,
    1: 827,
    2: 928,
    3: 1187,
    4: 1489,
    5: 1683,
    eachAdditional: noCalcs
  },
  "Raynham town": {
    0: 0,
    1: 1044,
    2: 1071,
    3: 1425,
    4: 2073,
    5: 2135,
    eachAdditional: noCalcs
  },
  "Rehoboth town": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Seekonk town": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Somerset town": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Swansea town": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Taunton city": {
    0: 0,
    1: 827,
    2: 928,
    3: 1187,
    4: 1489,
    5: 1683,
    eachAdditional: noCalcs
  },
  "Westport town": {
    0: 0,
    1: 748,
    2: 849,
    3: 1014,
    4: 1271,
    5: 1508,
    eachAdditional: noCalcs
  },
  "Aquinnah town": {
    0: 0,
    1: 1091,
    2: 1281,
    3: 1531,
    4: 2078,
    5: 2085,
    eachAdditional: noCalcs
  },
  "Chilmark town": {
    0: 0,
    1: 1091,
    2: 1281,
    3: 1531,
    4: 2078,
    5: 2085,
    eachAdditional: noCalcs
  },
  "Edgartown town": {
    0: 0,
    1: 1091,
    2: 1281,
    3: 1531,
    4: 2078,
    5: 2085,
    eachAdditional: noCalcs
  },
  "Gosnold town": {
    0: 0,
    1: 1091,
    2: 1281,
    3: 1531,
    4: 2078,
    5: 2085,
    eachAdditional: noCalcs
  },
  "Oak Bluffs town": {
    0: 0,
    1: 1091,
    2: 1281,
    3: 1531,
    4: 2078,
    5: 2085,
    eachAdditional: noCalcs
  },
  "Tisbury town": {
    0: 0,
    1: 1091,
    2: 1281,
    3: 1531,
    4: 2078,
    5: 2085,
    eachAdditional: noCalcs
  },
  "West Tisbury town": {
    0: 0,
    1: 1091,
    2: 1281,
    3: 1531,
    4: 2078,
    5: 2085,
    eachAdditional: noCalcs
  },
  "Amesbury Town city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Andover town": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Beverly city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Boxford town": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Danvers town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Essex town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Georgetown town": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Gloucester city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Groveland town": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Hamilton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Haverhill city": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Ipswich town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Lawrence city": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Lynn city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Lynnfield town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Manchester-by-the-Sea town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Marblehead town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Merrimac town": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Methuen city": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Middleton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Nahant town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Newbury town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Newburyport city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "North Andover town": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Peabody city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Rockport town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Rowley town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Salem city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Salisbury town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Saugus town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Swampscott town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Topsfield town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Wenham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "West Newbury town": {
    0: 0,
    1: 815,
    2: 929,
    3: 1187,
    4: 1488,
    5: 1619,
    eachAdditional: noCalcs
  },
  "Ashfield town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Bernardston town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Buckland town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Charlemont town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Colrain town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Conway town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Deerfield town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Erving town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Gill town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Greenfield Town city": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Hawley town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Heath town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Leverett town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Leyden town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Monroe town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Montague town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "New Salem town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Northfield town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Orange town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Rowe town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Shelburne town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Shutesbury town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Sunderland town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Warwick town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Wendell town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Whately town": {
    0: 0,
    1: 859,
    2: 864,
    3: 1084,
    4: 1359,
    5: 1535,
    eachAdditional: noCalcs
  },
  "Agawam Town city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Blandford town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Brimfield town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Chester town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Chicopee city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "East Longmeadow town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Granville town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Hampden town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Holland town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Holyoke city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Longmeadow town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Ludlow town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Monson town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Montgomery town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Palmer Town city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Russell town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Southwick town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Springfield city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Tolland town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Wales town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Westfield city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "West Springfield Town city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Wilbraham town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Amherst town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Belchertown town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Chesterfield town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Cummington town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Easthampton Town city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Goshen town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Granby town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Hadley town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Hatfield town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Huntington town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Middlefield town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Northampton city": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Pelham town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Plainfield town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Southampton town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "South Hadley town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Ware town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Westhampton town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Williamsburg town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Worthington town": {
    0: 0,
    1: 739,
    2: 884,
    3: 1117,
    4: 1400,
    5: 1627,
    eachAdditional: noCalcs
  },
  "Acton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Arlington town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Ashby town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Ashland town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Ayer town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Bedford town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Belmont town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Billerica town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Boxborough town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Burlington town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Cambridge city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Carlisle town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Chelmsford town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Concord town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Dracut town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Dunstable town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Everett city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Framingham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Groton town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Holliston town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Hopkinton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Hudson town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Lexington town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Lincoln town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Littleton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Lowell city": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Malden city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Marlborough city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Maynard town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Medford city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Melrose city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Natick town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Newton city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "North Reading town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Pepperell town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Reading town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Sherborn town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Shirley town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Somerville city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Stoneham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Stow town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Sudbury town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Tewksbury town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Townsend town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Tyngsborough town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Wakefield town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Waltham city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Watertown city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Wayland town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Westford town": {
    0: 0,
    1: 955,
    2: 1098,
    3: 1392,
    4: 1745,
    5: 1896,
    eachAdditional: noCalcs
  },
  "Weston town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Wilmington town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Winchester town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Woburn city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Nantucket town": {
    0: 0,
    1: 1229,
    2: 1369,
    3: 1572,
    4: 2133,
    5: 2141,
    eachAdditional: noCalcs
  },
  "Avon town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Bellingham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Braintree Town city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Brookline town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Canton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Cohasset town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Dedham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Dover town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Foxborough town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Franklin Town city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Holbrook town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Medfield town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Medway town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Millis town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Milton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Needham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Norfolk town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Norwood town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Plainville town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Quincy city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Randolph town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Sharon town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Stoughton town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Walpole town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Wellesley town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Westwood town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Weymouth Town city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Wrentham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Abington town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Bridgewater town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Brockton city": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Carver town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Duxbury town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "East Bridgewater town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Halifax town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Hanover town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Hanson town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Hingham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Hull town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Kingston town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Lakeville town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Marion town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Marshfield town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Mattapoisett town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Middleborough town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Norwell town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Pembroke town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Plymouth town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Plympton town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Rochester town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Rockland town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Scituate town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Wareham town": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "West Bridgewater town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Whitman town": {
    0: 0,
    1: 980,
    2: 1064,
    3: 1365,
    4: 1726,
    5: 1947,
    eachAdditional: noCalcs
  },
  "Boston city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Chelsea city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Revere city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Winthrop Town city": {
    0: 0,
    1: 1253,
    2: 1421,
    3: 1740,
    4: 2182,
    5: 2370,
    eachAdditional: noCalcs
  },
  "Ashburnham town": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Athol town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Auburn town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Barre town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Berlin town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Blackstone town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Bolton town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Boylston town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Brookfield town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Charlton town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Clinton town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Douglas town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Dudley town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "East Brookfield town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Fitchburg city": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Gardner city": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Grafton town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Hardwick town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Harvard town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Holden town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Hopedale town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Hubbardston town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Lancaster town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Leicester town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Leominster city": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Lunenburg town": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Mendon town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Milford town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Millbury town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Millville town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "New Braintree town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Northborough town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Northbridge town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "North Brookfield town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Oakham town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Oxford town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Paxton town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Petersham town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Phillipston town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Princeton town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Royalston town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Rutland town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Shrewsbury town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Southborough town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Southbridge Town city": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Spencer town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Sterling town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Sturbridge town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Sutton town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Templeton town": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Upton town": {
    0: 0,
    1: 927,
    2: 959,
    3: 1276,
    4: 1657,
    5: 2057,
    eachAdditional: noCalcs
  },
  "Uxbridge town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Warren town": {
    0: 0,
    1: 670,
    2: 730,
    3: 922,
    4: 1315,
    5: 1437,
    eachAdditional: noCalcs
  },
  "Webster town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Westborough town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "West Boylston town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "West Brookfield town": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  },
  "Westminster town": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Winchendon town": {
    0: 0,
    1: 783,
    2: 822,
    3: 1085,
    4: 1360,
    5: 1478,
    eachAdditional: noCalcs
  },
  "Worcester city": {
    0: 0,
    1: 850,
    2: 942,
    3: 1192,
    4: 1494,
    5: 1654,
    eachAdditional: noCalcs
  }
};

export { FMRS_MA_2018, expirationDate };

// 	// Now available externally
//     return FMRS_MA_2018;
// }));  // End UMD pattern
