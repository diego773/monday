const transactionController = require("../controllers/transactionController");

// Route POST /api/rewards/addtransactions

describe("Route POST /api/rewards/addtransactions", () => {
  it("should return a status of 200", async () => {
    const res = await request(app).post("/api/rewards/addtransactions").send({
      payer: "DANNON",
      points: 1000,
      timestamps: "2020-11-02T14:00:00Z",
    });

    expect(res.status).toBe(200);
  });
  it("should return a status of 200", async () => {
    const res2 = await request(app).post("/api/rewards/addtransactions").send({
      payer: "UNILEVER",
      points: 200,
      timestamps: "2020-10-31T11:00:00Z",
    });
    expect(res2.status).toBe(200);
  });

  it("should return a status of 422", async () => {
    const res3 = await request(app).post("/api/rewards/addtransactions").send({
      payer: "DANNON",
      points: -200,
      timestamps: "2020-10-31T15:00:00Z",
    });
    expect(res3.status).toBe(422);
  });

  it("should return a status of 200", async () => {
    const res4 = await request(app).post("/api/rewards/addtransactions").send({
      payer: "MILLER COORS",
      points: 10000,
      timestamps: "2020-11-01T14:00:00Z",
    });
    expect(res4.status).toBe(200);
  });

  it("should return a status of 200", async () => {
    const res5 = await request(app).post("/api/rewards/addtransactions").send({
      payer: "DANNON",
      points: 300,
      timestamps: "2020-10-31T10:00:00Z",
    });
    expect(res5.status).toBe(200);
  });
});

// Route POST /api/rewards/spendpoints
describe("Route POST /api/rewards/spendpoints", () => {
  it("should return a status of 200", async () => {
    const res = await request(app).post("/api/rewards/spendpoints").send({
      payer: "DANNON",
      points: -100,
    });
    expect(res.status).toBe(200);
  });

  it("should return a status of 200", async () => {
    const res2 = await request(app).post("/api/rewards/spendpoints").send({
      payer: "UNILEVER",
      points: -200,
    });
    expect(res2.status).toBe(200);
  });

  it("should return a status of 200", async () => {
    const res3 = await request(app).post("/api/rewards/spendpoints").send({
      payer: "MILLER COORS",
      points: -4700,
    });
    expect(res3.status).toBe(200);
  });
});

// Route GET /api/rewards/pointsbalance
describe("Route GET /api/rewards/pointsbalance", () => {
  it("should return a status of 200", async () => {
    const res = await request(app).get("/api/rewards/pointsbalance").send({
      payer: "DANNON",
      points: 1000,
    });
    expect(res.status).toBe(200);
  });

  it("should return a status of 200", async () => {
    const res2 = await request(app).get("/api/rewards/pointsbalance").send({
      payer: "UNILEVER",
      points: 0,
    });
    expect(res2.status).toBe(200);
  });

  it("should return a status of 200", async () => {
    const res3 = await request(app).get("/api/rewards/pointsbalance").send({
      payer: "MILLER COORS",
      points: 5300,
    });
    expect(res3.status).toBe(200);
  });
});
