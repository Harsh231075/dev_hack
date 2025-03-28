/*
  Warnings:

  - You are about to drop the column `userName` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `name` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "userName",
ADD COLUMN     "name" TEXT NOT NULL;
