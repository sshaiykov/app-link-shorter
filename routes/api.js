const router = require('express').Router();

// Users DB -> User (model)
// Links DB -> Link (model)
const { createShortLink, redirectToLink, allLinks, DeleteId } = require('../controllers/link');

router.post('/to-short', createShortLink);
router.get('/sl/:shortid', redirectToLink);

router.get("/my-links/:userId", allLinks)
router.post('/DeleteId', DeleteId)

const { registerUser, loginUser } = require('../controllers/user');
router.post('/register', registerUser);
router.post('/login', loginUser);


exports.router = router;
