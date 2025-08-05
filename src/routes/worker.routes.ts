import oracledb from 'oracledb';
import express, { Request, Response } from 'express';
import { getConnection } from '../db/oracle';

const router = express.Router();

// Interfaces for expected data structures
interface Worker {
  [key: string]: unknown;
}

// Get total salary from the package
router.get('/total-salary', async (_req: Request, res: Response) => {
  // Initialize the connection to the database
  let conn: oracledb.Connection | undefined;

  try {
    // Trying to get the database connection
    conn = await getConnection();

    // If the connection does not exist we return an error
    if (!conn) {
      throw new Error("There was a problem while connecting to the database");
    }

    // Executing the get_total_salary function in the database
    const result = await conn.execute(
      `BEGIN :total := worker_pkg.get_total_salary(); END;`,
      {
        total: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    // Getting the data from the result
    const outBinds = result.outBinds as { total: number } | undefined;

    // If the outBinds does not exist or the total is not what we expect return an error 
    if (!outBinds || typeof outBinds.total !== 'number') {
      throw new Error('Invalid output from PL/SQL procedure');
    }

    // Return the response
    res.status(200).json({
      totalWorkersSalary: outBinds.total
    });
  } catch (err) {
    // Return an error
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  } finally {
    // If the connections is still open we close it
    if (conn) await conn.close();
  }
});

// Get all workers with their department names
router.get('/', async (_req: Request, res: Response) => {
  // Initialize the connection to the database
  let conn: oracledb.Connection | undefined;

  try {
    // Trying to get the database connection
    conn = await getConnection();

    // If the connection does not exist we return an error
    if (!conn) {
      throw new Error("There was a problem while connecting to the database");
    }
  
    // Executing the get_all_workers function in the database
    const result = await conn.execute(
      `BEGIN :cursor := worker_pkg.get_all_workers(); END;`,
      {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );

    // Extracting cursor and meta to create the json response of the workers
    const outBinds = result.outBinds as { cursor: oracledb.ResultSet<unknown[]> };
    const cursor = outBinds.cursor;
    const meta = cursor.metaData;

    // Array of all the workers
    const workersArray: Worker[] = [];

    // Defining the row
    let row: unknown[] | undefined;
    while ((row = await cursor.getRow())) {
      // Variable to map the column (key) to the value (column value) as an object
      const mapped: Record<string, unknown> = {};

      // Looping through each column
      row.forEach((value: unknown, index: number) => {
        const columnName = meta[index].name.toLowerCase();
        mapped[columnName] = value;
      });

      // Pushing the worker to the array
      workersArray.push(mapped);
    }

    // Closing the cursor
    await cursor.close();

    // Return the response
    res.status(200).json({
      workers: workersArray
    });
  } catch (err) {
    // Return an error
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  } finally {
    // If the connections is still open we close it
    if (conn) await conn.close();
  }
});

// Get annual salaries for all workers
router.get('/annual-salaries', async (_req: Request, res: Response) => {
  // Initialize the connection to the database
  let conn: oracledb.Connection | undefined;

  try {
    // Trying to get the database connection
    conn = await getConnection();

    // If the connection does not exist we return an error
    if (!conn) {
      throw new Error("There was a problem while connecting to the database");
    }

    // Executing the get_annual_salaries function in the database
    const result = await conn.execute(
      `BEGIN :cursor := worker_pkg.get_annual_salaries(); END;`,
      {
        cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );

    // Extracting cursor and meta to create the json response of the workers
    const outBinds = result.outBinds as { cursor: oracledb.ResultSet<unknown[]> };
    const cursor = outBinds.cursor;
    const meta = cursor.metaData;
  
    // Workers array with annual salary
    const workersArray: Worker[] = [];

    // Defining the row
    let row: unknown[] | undefined;
    while ((row = await cursor.getRow())) {
      // Variable to map the column (key) to the value (column value) as an object
      const mapped: Record<string, unknown> = {};

      // Looping through each column
      row.forEach((value: unknown, index: number) => {
        const columnName = meta[index].name.toLowerCase();
        mapped[columnName] = value;
      });

      // Pushing the worker to the array
      workersArray.push(mapped);
    }

    // Closing the cursor
    await cursor.close();

    // Return the response
    res.status(200).json({
      workers: workersArray,
    });
  } catch (err) {
    // Return an error
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  } finally {
    // If the connections is still open we close it
    if (conn) await conn.close();
  }
});

export default router;
