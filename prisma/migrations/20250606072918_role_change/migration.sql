/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("address", "age", "firstName", "id", "lastName", "userId") SELECT "address", "age", "firstName", "id", "lastName", "userId" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_Stuff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Stuff" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "Stuff";
DROP TABLE "Stuff";
ALTER TABLE "new_Stuff" RENAME TO "Stuff";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
