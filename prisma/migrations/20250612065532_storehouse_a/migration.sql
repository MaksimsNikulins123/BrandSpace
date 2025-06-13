/*
  Warnings:

  - You are about to drop the `BrandRow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "BrandRow";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StorehouseA" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "uniqKey" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "stuffId" TEXT NOT NULL,
    CONSTRAINT "StorehouseA_stuffId_fkey" FOREIGN KEY ("stuffId") REFERENCES "Stuff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
