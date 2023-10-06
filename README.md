# Auth Shelf Assignment

Our client, Prime Digital Academy: Room 2, has asked for an app to simulate the behavior of their shelf. That is, a list of items placed on the classroom shelf. More details about each of the features are listed below in the README.md.

## Base Mode

### Display all Items (Read)

The Shelf page (`ShelfPage.js` at `/shelf`) should show all of the items stored in the database in a list or table. **Logged in users should be able to see ALL items on the shelf.**

### Add Items to the Shelf (Create)

The Shelf page (`ShelfPage.js` at `/shelf`) should allow a user to add a new item to the database (which should immediately appear in the list). **Users must be logged in to add an item to the shelf.**

> NOTE: Image url should be a full path to an existing image on the web. You should not attempt to implement image upload for this.

### Delete Items from the Shelf (Delete)

An authenticated user should be able to delete items from the shelf.

## Stretch Goals

- Below each item, display the name of the user who added the item to the shelf. This will require an SQL JOIN in your GET route.
- Only display the delete button if the logged in user was the one who added the item. Protect your server route using `req.user.id` in your delete query to ensure the logged in users can only delete items they added.
- Add a new route to display all items for a specific user called "My Shelf". The client-side url should be `/shelf/2` where `/2` should be the id of the logged in user. Only the items associated with the specific logged in user should be displayed on this new page.

---


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create Database and Table

Create a new database called `auth_shelf` and add the following tables:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "item" (
    "id" SERIAL PRIMARY KEY,
    "description" VARCHAR (80) NOT NULL,
    "image_url" VARCHAR (2083),
    "user_id" INT REFERENCES "user"
);
```

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`
- Register as a new user
- Insert a sample item into the database

```sql
-- Make sure you have a user first. You may need to change the user_id.
INSERT INTO "item" ("description", "image_url", "user_id")
VALUES ('Markers', 'https://images.unsplash.com/photo-1587117266184-2fbb10ccc05e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80', 1), ('Duck', 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80', 1); 
```

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2
