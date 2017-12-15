
// I know everyone will hate me now. Unless you're
// going to be consistently responsible for this
// testing stuff, and be able to maintain that presence
// through beta testing, please give me some leeway.
const expectedSNAPValues = {
  'with household of __, current earnings of 0, shelter homeless': 192,
  'with household of __, current earnings of 0, shelter homeowner, heating false': 192,
  'with household of __, current earnings of 0, shelter homeowner, heating true': 192,
  'with household of __, current earnings of 100, shelter homeless': 192,
  'with household of __, current earnings of 100, shelter homeowner, heating false': 192,
  'with household of __, current earnings of 100, shelter homeowner, heating true': 192,
  'with household of __, current earnings of 1000, shelter homeless': 42.900000000000006,
  'with household of __, current earnings of 1000, shelter homeowner, heating false': 15,
  'with household of __, current earnings of 1000, shelter homeowner, heating true': 94.8,
  'with household of __, current earnings of 5000, shelter homeless': 0,
  'with household of __, current earnings of 5000, shelter homeowner, heating false': 0,
  'with household of __, current earnings of 5000, shelter homeowner, heating true': 0,
  'with household of __, current earnings of 10000, shelter homeless': 0,
  'with household of __, current earnings of 10000, shelter homeowner, heating false': 0,
  'with household of __, current earnings of 10000, shelter homeowner, heating true': 0,
  'with household of __, current earnings of 30000, shelter homeless': 0,
  'with household of __, current earnings of 30000, shelter homeowner, heating false': 0,
  'with household of __, current earnings of 30000, shelter homeowner, heating true': 0,
};

export default expectedSNAPValues;
