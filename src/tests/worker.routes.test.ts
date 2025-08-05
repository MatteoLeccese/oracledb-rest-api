import request from "supertest";
import express from "express";
import oracledb from "oracledb";
import workerRoutes from "../routes/worker.routes";
import { getConnection } from "../db/oracle";

// Mock the database connection
jest.mock("../db/oracle", () => ({
  getConnection: jest.fn()
}));

// Create the express app for testing
const app = express();
app.use(express.json());
app.use("/", workerRoutes);

// Test suite for worker routes
describe("Worker Routes", () => {
  // Mock connection object
  let mockConnection: Partial<oracledb.Connection>;

  // Reset mocks before each test
  beforeEach(() => {
    mockConnection = {
      execute: jest.fn(),
      close: jest.fn()
    };
    (getConnection as jest.Mock).mockResolvedValue(mockConnection);
  });

  // Test for /api/workers/total-salary endpoint
  test("GET /total-salary should return total salary", async () => {
    // Mock the database response
    (mockConnection.execute as jest.Mock).mockResolvedValue({
      outBinds: { total: 150000 }
    });

    // Make the "request" to the endpoint
    const response = await request(app).get("/total-salary");
    // Check the response status and body
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ totalWorkersSalary: 150000 });
  });

  // Test for /api/workers endpoint
  test("GET / should return list of workers", async () => {
    // Mock the database response
    const mockCursor = {
      metaData: [
        { name: "WORKER_ID" },
        { name: "FIRST_NAME" },
        { name: "DEPARTMENT_NAME" }
      ],
      getRow: jest
        .fn()
        .mockResolvedValueOnce([1, "John", "HR"])
        .mockResolvedValueOnce([2, "Jane", "Engineering"])
        .mockResolvedValueOnce(undefined),
      close: jest.fn()
    };

    // Mock the execute method to return the cursor
    (mockConnection.execute as jest.Mock).mockResolvedValue({
      outBinds: { cursor: mockCursor }
    });

    // Make the "request" to the endpoint
    const response = await request(app).get("/");
    // Check the response status and body
    expect(response.status).toBe(200);
    expect(response.body.workers).toEqual([
      { worker_id: 1, first_name: "John", department_name: "HR" },
      { worker_id: 2, first_name: "Jane", department_name: "Engineering" }
    ]);
  });

  // Test for /api/workers/annual-salaries endpoint
  test("GET /annual-salaries should return list of workers with annual salaries", async () => {
    // Mock the database response
    const mockCursor = {
      metaData: [
        { name: "WORKER_ID" },
        { name: "FIRST_NAME" },
        { name: "ANNUAL_SALARY" }
      ],
      getRow: jest
        .fn()
        .mockResolvedValueOnce([1, "John", 60000])
        .mockResolvedValueOnce(undefined),
      close: jest.fn()
    };

    // Mock the execute method to return the cursor
    (mockConnection.execute as jest.Mock).mockResolvedValue({
      outBinds: { cursor: mockCursor }
    });

    // Make the "request" to the endpoint
    const response = await request(app).get("/annual-salaries");

    // Check the response status and body
    expect(response.status).toBe(200);
    expect(response.body.workers).toEqual([
      { worker_id: 1, first_name: "John", annual_salary: 60000 }
    ]);
  });
});
