const transaction = require("./transaction");

test("should return payer, points and timestamp", () => {
  const result = transaction();
  expect(result).toBe(this.payer, this.points, this.timestamp);
  console.log(this.payer, this.points, this.timestamp);
});

test("should return null if transaction is not an array", () => {
  const result = transaction();
});
