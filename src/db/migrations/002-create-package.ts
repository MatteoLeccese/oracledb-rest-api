import oracledb from "oracledb";

export async function migrate(connection: oracledb.Connection): Promise<void> {
  console.log("Running migration: create PL/SQL package");

  // Create package specification
  const packageSpec = `
    CREATE OR REPLACE PACKAGE worker_pkg AS
      FUNCTION get_total_salary RETURN NUMBER;
      FUNCTION get_all_workers RETURN SYS_REFCURSOR;
      FUNCTION get_annual_salaries RETURN SYS_REFCURSOR;
    END worker_pkg;
  `;

  // Create package body
  const packageBody = `
    CREATE OR REPLACE PACKAGE BODY worker_pkg AS

      FUNCTION get_total_salary RETURN NUMBER IS
        total NUMBER;
      BEGIN
        SELECT SUM(salary) INTO total FROM WORKERS;
        RETURN total;
      END;

      FUNCTION get_all_workers RETURN SYS_REFCURSOR IS
        result SYS_REFCURSOR;
      BEGIN
        OPEN result FOR
          SELECT w.worker_id, w.first_name, w.last_name, w.email, w.salary, d.department_name
          FROM WORKERS w
          LEFT JOIN DEPARTMENTS d ON w.department_id = d.department_id;
        RETURN result;
      END;

      FUNCTION get_annual_salaries RETURN SYS_REFCURSOR IS
        result SYS_REFCURSOR;
      BEGIN
        OPEN result FOR
          SELECT w.worker_id, w.first_name, w.last_name, w.salary * 12 AS annual_salary, d.department_name
          FROM WORKERS w
          LEFT JOIN DEPARTMENTS d ON w.department_id = d.department_id;
        RETURN result;
      END;

    END worker_pkg;
  `;

  // Execute each part separately
  await connection.execute(packageSpec);
  await connection.execute(packageBody);
  await connection.commit();

  console.log("Package creation completed");
}
