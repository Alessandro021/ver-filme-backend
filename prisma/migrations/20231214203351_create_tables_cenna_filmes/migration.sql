-- CreateTable
CREATE TABLE "filme" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "genero" TEXT[],
    "categoria" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "popularidade" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'filme',
    "poster" TEXT NOT NULL,
    "imagem_fundo" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "treiler" TEXT,
    "voto_medio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "duracao" INTEGER NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "eAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "filme_titulo_idx" ON "filme"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "usuario_email_nome_idx" ON "usuario"("email", "nome");
