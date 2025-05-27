-- CreateTable
CREATE TABLE "Stuff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BrandRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "uniqKey" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "stuffId" TEXT NOT NULL,
    CONSTRAINT "BrandRow_stuffId_fkey" FOREIGN KEY ("stuffId") REFERENCES "Stuff" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
