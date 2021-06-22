-- CreateTable
CREATE TABLE "Favorite" (
    "gistId" TEXT NOT NULL,
    "favorited" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("gistId")
);
