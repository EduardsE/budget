# Migration `20201208214059-create-transactions`

This migration has been generated at 12/8/2020, 11:40:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Category" ADD COLUMN "color" text   NOT NULL DEFAULT E'DDD6FE'
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201204194539-create-transactions..20201208214059-create-transactions
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 enum TransactionType {
   INCOME
@@ -28,8 +28,9 @@
 model Category {
   id    String @id @default(uuid())
   title String
+  color String @default("DDD6FE")
   Transaction Transaction[]
   userId String?
```


