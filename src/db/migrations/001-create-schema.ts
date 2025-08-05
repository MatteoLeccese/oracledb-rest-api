import oracledb from "oracledb";

export async function migrate(connection: oracledb.Connection): Promise<void> {
  console.log("Running migration: create schema and seed data");

  const statements = [
    // Drop WORKERS table
    `BEGIN
       EXECUTE IMMEDIATE 'DROP TABLE WORKERS';
     EXCEPTION
       WHEN OTHERS THEN
         IF SQLCODE != -942 THEN
           RAISE;
         END IF;
     END;`,

    // Drop DEPARTMENTS table
    `BEGIN
       EXECUTE IMMEDIATE 'DROP TABLE DEPARTMENTS';
     EXCEPTION
       WHEN OTHERS THEN
         IF SQLCODE != -942 THEN
           RAISE;
         END IF;
     END;`,

    // Create DEPARTMENTS table
    `CREATE TABLE DEPARTMENTS (
       department_id   NUMBER PRIMARY KEY,
       department_name VARCHAR2(100) NOT NULL
     )`,

    // Create WORKERS table
    `CREATE TABLE WORKERS (
       worker_id   NUMBER PRIMARY KEY,
       first_name    VARCHAR2(50) NOT NULL,
       last_name     VARCHAR2(50) NOT NULL,
       email         VARCHAR2(100) UNIQUE NOT NULL,
       hire_date     DATE NOT NULL,
       salary        NUMBER(8, 2) CHECK (salary > 0),
       department_id NUMBER,
       CONSTRAINT fk_department_worker
         FOREIGN KEY (department_id)
         REFERENCES DEPARTMENTS(department_id)
     )`,

    // Insert DEPARTMENTS
    `INSERT INTO DEPARTMENTS (department_id, department_name) VALUES (1, 'HR')`,
    `INSERT INTO DEPARTMENTS (department_id, department_name) VALUES (2, 'Engineering')`,
    `INSERT INTO DEPARTMENTS (department_id, department_name) VALUES (3, 'Marketing')`,

    // Insert WORKERS
    `INSERT INTO WORKERS (worker_id, first_name, last_name, email, hire_date, salary, department_id)
     VALUES (1, 'John', 'Doe', 'john.doe@example.com', TO_DATE('01-JAN-2020', 'DD-MON-YYYY'), 50000, 1)`,

    `INSERT INTO WORKERS (worker_id, first_name, last_name, email, hire_date, salary, department_id)
     VALUES (2, 'Jane', 'Smith', 'jane.smith@example.com', TO_DATE('15-FEB-2021', 'DD-MON-YYYY'), 60000, 2)`,

    `INSERT INTO WORKERS (worker_id, first_name, last_name, email, hire_date, salary, department_id)
     VALUES (3, 'Michael', 'Brown', 'michael.brown@example.com', TO_DATE('10-MAR-2019', 'DD-MON-YYYY'), 55000, 2)`
  ];

  for (const stmt of statements) {
    await connection.execute(stmt, [], { autoCommit: true });
  }

  console.log("Schema migration completed");
}
