const express = require('express');

const router = express.Router();


router.get('/login', (req, res) => {
    console.log("vafo day")
    res.json('newzzzs');
})

module.exports = router;


