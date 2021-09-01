-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "dateStart" TEXT NOT NULL,
    "dateStartTime" TEXT NOT NULL,
    "dateStartAmPm" TEXT NOT NULL,
    "dateStartUnix" TIMESTAMP(3) NOT NULL,
    "dateFormat" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "postOnDiscord" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "Timezones" (
    "id" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "gmtOffset" TEXT NOT NULL,
    "gmtDiff" TEXT NOT NULL,
    "abbr" TEXT NOT NULL,
    "offset" TEXT NOT NULL,
    "offsetNumber" INTEGER NOT NULL,
    "offsetSymbol" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event.id_unique" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Timezones.id_unique" ON "Timezones"("id");
