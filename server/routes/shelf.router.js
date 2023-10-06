const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get("/", (req, res) => {
  console.log("/pet GET route");
  console.log("is authenticated?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    let queryText = `SELECT item.*, "user".username
    FROM "item"
    JOIN "user" ON "user".id = item.user_id;`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post("/", (req, res) => {
  console.log("/pet POST route");
  console.log(req.body);

  // req.isAuthenticated() is a function provided by passport. it returns either true or false
  console.log("is authenticated?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log("user", req.user);
    // add the pet to our database
    let queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                    VALUES ($1, $2, $3);`;

    // ! req.user.id is the currently logged in user id
    // always use req.user.id for current user
    pool
      .query(queryText, [req.body.name, req.body.image_url, req.user.id])
      .then((results) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

/**
 * Delete an item
 */
router.delete("/:itemId", (req, res) => {
  const itemId = req.params.itemId;

  if (req.isAuthenticated()) {
    const userId = req.user.id;

    let deleteQuery = `DELETE FROM "item" WHERE "id" = $1 AND "user_id" = $2;`;
    pool
      .query(deleteQuery, [itemId, userId])
      .then((results) => {
        res.sendStatus(204); // No content (successful deletion)
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500); // internal server errr
      });
  } else {
    res.sendStatus(401); // unautherized?
  }
});

module.exports = router;
