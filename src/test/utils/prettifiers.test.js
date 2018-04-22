import { toMoneyStr } from "../../utils/prettifiers";

test("toMoneyStr()", () => {
  expect(toMoneyStr(12.001)).toBe("12.00");
  expect(toMoneyStr(12.12)).toBe("12.12");
  expect(toMoneyStr(12)).toBe("12.00");
  expect(toMoneyStr(12.456)).toBe("12.46");
  expect(toMoneyStr(0.4)).toBe("0.40");
  expect(toMoneyStr(0.04)).toBe("0.04");
  expect(toMoneyStr(0.04)).toBe("0.04");
});
