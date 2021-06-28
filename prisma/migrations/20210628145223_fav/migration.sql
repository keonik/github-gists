/*
  Warnings:

  - A unique constraint covering the columns `[gistId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite.gistId_unique" ON "Favorite"("gistId");
