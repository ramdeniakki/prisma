# Prisma: Working with SQL and NoSQL Databases (e.g., MongoDB)

Prisma is a next-generation ORM (Object-Relational Mapper) that simplifies working with databases. It is highly versatile, supporting both SQL and NoSQL databases, including MongoDB. Here's an overview and step-by-step guide to using Prisma effectively.
-------
### 1. **Data Model**
Prisma allows you to define your database schema in a single file. This schema outlines:
- What your tables (or collections) look like.
- Fields within each table.
- Relationships between rows or entities.

Example:
```prisma
model User {
  id        Int    @default(autoincrement()) @id
  username  String @unique
  password  String
  age       Int
}
```
**Explanation:**
- `id`: A unique identifier for each user. It is an integer that auto-increments and serves as the primary key.
- `username`: A unique string field to store the user's name.
- `password`: A string field for storing the user's password (use proper hashing for security).
- `age`: An integer field for the user's age.

### 2. **Automated Migrations**
Prisma generates and applies database migrations automatically based on changes to your Prisma Schema.
- Add a new field or table, and Prisma will handle the database updates seamlessly.

Example:
```bash
npx prisma migrate dev
```
**Explanation:** This command:
- Detects changes in the `schema.prisma` file.
- Generates migration files that describe the changes.
- Applies the migrations to the connected database.

### 3. **Type-Safety**
Prisma generates a fully type-safe database client based on your schema. This ensures fewer runtime errors and helps catch bugs during development.

Example:
```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
});
```
**Explanation:** The `findUnique` method returns a user with the specified `id`. If no user is found, it returns `null`. The TypeScript types ensure proper structure for the `user` object.

### 4. **Auto-Completion**
Prisma provides IntelliSense-like auto-completion in your code editor, making it easier to use database queries without memorizing syntax.
- For example, typing `UserDb.f` might suggest options like `findMany`, `findUnique`, `findFirst`, etc.

---

## Installing Prisma in a Fresh Node.js App

### Step 1: Initialize an Empty Node.js Project
Run the following commands to set up your project:
```bash
npm init -y
npm install prisma typescript ts-node @types/node --save-dev
```

### Step 2: Set Up TypeScript
Run:
```bash
npx tsc --init
```
Update `tsconfig.json` with the following settings:
```json
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  }
}
```
**Explanation:**
- `rootDir`: Specifies the source directory for your TypeScript files.
- `outDir`: Specifies the output directory for compiled JavaScript files.

### Step 3: Initialize a Fresh Prisma Project
Run:
```bash
npx prisma init
```
This command creates the following:
- `prisma/schema.prisma`: Defines your data model.
- `.env`: Stores your database connection string.

---

## Creating a User Model (or User Schema)
Update `schema.prisma` to define your User model:
```prisma
model User {
  id        Int    @default(autoincrement()) @id
  username  String @unique
  password  String
  age       Int
}
```
**Explanation:**
- The `@id` directive marks the `id` field as the primary key.
- `@default(autoincrement())` ensures the `id` value increments automatically.
- `@unique` ensures that each `username` is unique across the table.

Run the following to create the database schema:
```bash
npx prisma migrate dev
```

### Adding Fields to the Model
To add a new field (e.g., `city`), update the model:
```prisma
model User {
  id        Int    @default(autoincrement()) @id
  username  String @unique
  password  String
  age       Int
  city      String
}
```
**Explanation:**
- The `city` field is a `String` type. You can make it optional by using `String?`.

Run:
```bash
npx prisma migrate dev
```
This updates the database schema to include the new `city` field.

---

## Using Prisma Client
Prisma Client is used to interact with your database. Below are some common operations:

### 1. **Find Many Users**
```typescript
const users = await prisma.user.findMany();
```
**Explanation:** This fetches all user records from the database.

### 2. **Find First User Matching a Condition**
```typescript
const user = await prisma.user.findFirst({
  where: {
    username: "exampleUser",
  },
});
```
**Explanation:** This fetches the first user that matches the condition (e.g., username equals "exampleUser").

### 3. **Find Unique User by ID**
```typescript
const user = await prisma.user.findUnique({
  where: { id: 1 },
});
```
**Explanation:** This retrieves a single user by their unique `id`. If no user is found, `null` is returned.

### 4. **Create a New User**
```typescript
const newUser = await prisma.user.create({
  data: {
    username: "newUser",
    password: "securePassword",
    age: 25,
    city: "New York",
  },
});
```
**Explanation:**
- `data`: Specifies the values for the new user.
- Passwords should be hashed before saving to ensure security.

### 5. **Update a User**
```typescript
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { age: 26 },
});
```
**Explanation:**
- `where`: Specifies the user to update (by `id` in this case).
- `data`: Specifies the fields to update (e.g., changing `age` to 26).

### 6. **Delete a User**
```typescript
const deletedUser = await prisma.user.delete({
  where: { id: 1 },
});
```
**Explanation:** This removes the user with the specified `id` from the database.

