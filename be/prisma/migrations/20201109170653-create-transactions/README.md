# Migration `20201109170653-create-transactions`

This migration has been generated by eduards-egle at 11/9/2020, 7:06:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "public"."TransactionType" AS ENUM ('INCOME', 'EXPENSE')

CREATE TABLE "public"."Transaction" (
"id" SERIAL,
"title" text   NOT NULL ,
"date" timestamp(3)   NOT NULL ,
"type" "TransactionType"  NOT NULL ,
"amount" integer   NOT NULL ,
"category" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."User" (
"id" SERIAL,
"username" text   NOT NULL ,
PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20201109170653-create-transactions
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,30 @@
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
+  id       Int             @id @default(autoincrement())
+  title    String
+  date     DateTime
+  type     TransactionType
+  amount   Int
+  category String
+
+  createdAt DateTime  @default(now())
+  updatedAt DateTime?
+}
+
+model User {
+  id       Int    @id @default(autoincrement())
+  username String
+}
```

