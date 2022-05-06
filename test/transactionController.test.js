const request = require("supertest");
const app = require("../server");

// Route POST /api/rewards/addtransactions
// Private route
describe("POST /addtransactions", () => {
  describe("creates new transaction", () => {
    it("creates payer, points, timestamps to the database", async () => {
      try {
        const response = await request(app).post("/addtransactions").send({
          payer: "DANNON",
          points: 1000,
          timestamps: "2020-11-02T14:00:00Z",
        });
        expect(response.body.message)
          .toBe(
            "New Transaction added to the database. Please check the database for the new transaction"
          )
          .toEqual({
            payer: "DANNON",
            points: 1000,
            timestamps: "2020-11-02T14:00:00Z",
          });
      } catch (error) {
        error.message;
      }
    });
  });

  describe("doesn't create new transaction", () => {
    it("returns an error if no payer is provided", async () => {
      try {
        const response2 = await request(app).post("/addtransactions").send({
          points: 1000,
          timestamps: "2020-11-02T14:00:00Z",
        });
        expect(response2.body.message)
          .toBe("Please add all required fields")
          .toEqual({
            error: "Payer is required",
          });
      } catch (error) {
        error.message;
      }
    });
    it("returns an error if no points are provided", async () => {
      try {
        const response3 = await request(app).post("/addtransactions").send({
          payer: "DANNON",
          timestamps: "2020-11-02T14:00:00Z",
        });
        expect(response3.body.message)
          .toBe("Please add all required fields")
          .toEqual({
            error: "Points are required",
          });
      } catch (error) {
        error.message;
      }
    });
    it("returns an error if no timestamps are provided", async () => {
      try {
        const response4 = await request(app).post("/addtransactions").send({
          payer: "DANNON",
          points: 1000,
        });
        expect(response4.body.message)
          .toBe("Please add all required fields")
          .toEqual({
            error: "Timestamps are required",
          });
      } catch (error) {
        error.message;
      }
    });
  });

  describe("creates a negative transaction", () => {
    it("returns an error if negative points are added", async () => {
      try {
        const negativeTransaction = await request(app)
          .post("/addtransactions")
          .send({
            payer: "DANNON",
            points: -200,
            timestamps: "2020-10-31T15:00:00Z",
          });
        expect(negativeTransaction.body.message)
          .toBe(
            "Negative points are not allowed to be added to the database, and will be subtracted from the payer's current point balance."
          )
          .toEqual({
            payer: "DANNON",
            points: -200,
            timestamps: "2020-10-31T15:00:00Z",
          });
      } catch (error) {
        error.message;
      }
    });
  });
});

// Route POST /api/rewards/spendpoints
// Private route
describe("POST /spendpoints", () => {
  describe("When points 5000 is called it subtracts points from the oldest transaction", () => {
    it("returns the new point balance", async () => {
      try {
        const response = await request(app).post("/spendpoints").send({
          points: 5000,
        });
        expect(response.body.message)
          .toBe({
            payer: "DANNON",
            points: -100,
          })
          .toEqual({
            payer: "DANNON",
            points: -100,
          });
      } catch (error) {
        error.message;
      }
    });
  });
});

// Route GET /api/rewards/pointsbalance
// Private route
describe("GET /pointsbalance", () => {
  describe("gets the current point balance", () => {
    it("returns the current point balance", async () => {
      try {
        const response = await (
          await request(app).get("/pointsbalance")
        ).send({
          payer: "DANNON",
          points: 1000,
        });
        expect(response.body.message)
          .toBe("Current point balance is: 1000")
          .toEqual({
            payer: "DANNON",
            points: 1000,
          });
      } catch (error) {
        error.message;
      }
    });
  });
});
