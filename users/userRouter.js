const express = require('express');
const User = require("../users/userDb");
const Post = require("../posts/postDb");
const logger = require("../server");

const router = express.Router();

// .then(response => {
//   console.log(response);
// })
// .catch(error => {
//   console.log(error);
// })


router.post('/', validateUser, (req, res) => {
  const user = req.body;
  console.log(user);
  
  User.insert(user)
  .then(response => {
    console.log(response);
    res.status(201).json(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Error, nothing found. "});
  })
});

router.post('/:id/posts', validatePost, (req, res) => {
  const user_id = req.params.id;
  const {text} = req.body;

  Post.insert({user_id, text})
  .then(response => {
    console.log(response);
    res.status(201).json(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "ABORT, ABORT, ABORT "});
  })
});

router.get('/', (req, res) => {
  User.get()
  .then(response => {
    console.log(response);
    res.status(200).json(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Error, nothing found. "});
  })
});

router.get('/:id', validateUserId, (req, res) => {
  User.getById(req.user.id)
  .then(response => {
    console.log(response);
    res.status(200).json(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Error, id specified not found. "});
  })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  User.getUserPosts(userId)
  .then(response => {
    console.log(response);
    res.status(200).json(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Fatal error could not be resolved "});
  })
});

router.delete('/:id', validateUserId, (req, res) => {
  const id = req.user.id;
  console.log(id, "THIS IS ID");

  User.remove(id)
  .then(response => {
    res.status(200).json({ message: `Deleted this ID object ${id}`});
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "Ship has big problems."});
  })
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  const user = req.body;
  const id = req.user.id;
  console.log(id);
  console.log(user);

  User.update(id, user)
  .then(response => {
    res.status(200).json({ message: "User updated"});
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ message: "You got domed lil nigga1!"});
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;

  User.getById(id)
  .then(response => {
    if(response) {
      req.user = response;
      next();
    } else {
      res.status(404).json({ message: "invalid user id" });
    }
  })  
}

function validateUser(req, res, next) {
  const user = req.body;
  console.log(user, "THIS IS USER!");

  if(user.name === "") {
    res.status(404).json({ message: "Missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "Missing User Object" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const post = req.body;
  console.log(post, "THIS IS USER!");

  if(post.text === "") {
    res.status(404).json({ message: "Missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "Missing post Object" });
  } else {
    next();
  }
}

module.exports = router;
