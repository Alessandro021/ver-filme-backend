/*
  Warnings:

  - The `categoria` column on the `filme` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "filme" DROP COLUMN "categoria",
ADD COLUMN     "categoria" TEXT[];
