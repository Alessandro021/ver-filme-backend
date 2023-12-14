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
    "trailer" TEXT,
    "voto_medio" DOUBLE PRECISION,
    "duracao" INTEGER,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "serie" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "popularidade" INTEGER NOT NULL DEFAULT 0,
    "type" TEXT NOT NULL DEFAULT 'serie',
    "poster" TEXT NOT NULL,
    "imagem_fundo" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "trailer" TEXT,
    "voto_medio" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temporada" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "num_episodios" INTEGER NOT NULL,
    "serieId" TEXT NOT NULL,

    CONSTRAINT "temporada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "episodio" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT,
    "data" TEXT NOT NULL,
    "poster" TEXT,
    "voto_medio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "file" TEXT NOT NULL,
    "duracao" INTEGER,
    "temporadaId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "episodio_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "serie_titulo_idx" ON "serie"("titulo");

-- CreateIndex
CREATE INDEX "temporada_titulo_idx" ON "temporada"("titulo");

-- CreateIndex
CREATE INDEX "episodio_titulo_idx" ON "episodio"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "usuario_email_nome_idx" ON "usuario"("email", "nome");

-- AddForeignKey
ALTER TABLE "temporada" ADD CONSTRAINT "temporada_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "episodio" ADD CONSTRAINT "episodio_temporadaId_fkey" FOREIGN KEY ("temporadaId") REFERENCES "temporada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
