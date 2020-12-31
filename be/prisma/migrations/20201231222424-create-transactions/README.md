# Migration `20201231222424-create-transactions`

This migration has been generated at 1/1/2021, 12:24:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Transaction" (
"id" text   NOT NULL ,
"title" text   NOT NULL ,
"date" timestamp(3)   NOT NULL ,
"type" "TransactionType"  NOT NULL ,
"amount" integer   NOT NULL ,
"categoryId" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Category" (
"id" text   NOT NULL ,
"title" text   NOT NULL ,
"colorBackground" text   NOT NULL ,
"colorText" text   NOT NULL ,
"userId" text   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" text   NOT NULL ,
"email" text   NOT NULL ,
"name" text   ,
"picture" text   ,
"googleId" text   ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Transaction" ADD FOREIGN KEY("categoryId")REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Category" ADD FOREIGN KEY("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201231222424-create-transactions
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,54 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+enum TransactionType {
+  INCOME
+  EXPENSE
+}
+
+model Transaction {
+  id     String          @id @default(uuid())
+  title  String
+  date   DateTime
+  type   TransactionType
+  amount Int
+
+  categoryId String
+  category   Category @relation(fields: [categoryId], references: [id])
+
+  createdAt DateTime  @default(now())
+  updatedAt DateTime? @updatedAt
+}
+
+model Category {
+  id              String @id @default(uuid())
+  title           String
+  colorBackground String
+  colorText       String
+
+  Transaction Transaction[]
+
+  userId String?
+  user   User?   @relation(fields: [userId], references: [id])
+
+  createdAt DateTime  @default(now())
+  updatedAt DateTime? @updatedAt
+}
+
+model User {
+  id         String     @id @default(uuid())
+  email      String     @unique
+  name       String?
+  picture    String?
+  googleId   String?
+  categories Category[]
+
+  createdAt DateTime  @default(now())
+  updatedAt DateTime? @updatedAt
+}
```


