const express = require('express');
const mongodb = require('./database/mongodb');
const app = express();
const port = process.env.PORT || 8080;
const auth0config = require('./auth0/config');

const { auth, requiresAuth } = require('express-openid-connect');


app
// auth router attaches /login, /logout, and /callback routes to the baseURL
.use(auth(auth0config))
// req.isAuthenticated is provided from the auth router
.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  })
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})
.use(express.json())
.use(express.urlencoded({ extended: true }))
.use('/', require('./routes/index'));

mongodb.connectDB();

app.listen(port, () =>
console.log(`Running on port ${port}`));

module.exports = requiresAuth;