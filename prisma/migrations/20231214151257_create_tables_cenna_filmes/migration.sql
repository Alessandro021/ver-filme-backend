/*
  Warnings:

  - You are about to drop the column `trailer` on the `filme` table. All the data in the column will be lost.
  - You are about to drop the column `trailer` on the `serie` table. All the data in the column will be lost.
  - Made the column `voto_medio` on table `filme` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duracao` on table `filme` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "filme" DROP COLUMN "trailer",
ADD COLUMN     "treiler" TEXT,
ALTER COLUMN "voto_medio" SET NOT NULL,
ALTER COLUMN "voto_medio" SET DEFAULT 0,
ALTER COLUMN "duracao" SET NOT NULL,
ALTER COLUMN "duracao" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "serie" DROP COLUMN "trailer",
ADD COLUMN     "treiler" TEXT;
