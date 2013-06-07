// Route Definitions
var passport = require('passport');

//Include Routing Subfiles
var home = require('./routes/home');

/**
 * function restrict(req, res, next) {
 * This function checks to see if the user is logged in, 
 * and can be used in any route that requires auth
 */
function restrict(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

/**
 * function isAdmin(req, res, next)
 * This function checks to see if the user is an admin of the site
 * If not, redirects them away
 * 
 */
function isAdmin(req, res, next) {
  if (req.user.role==='admin') {
    next();
  } else {
    res.redirect('/');
  }
}

module.exports = function(app){
// be sure to put any variable routes after any static routes (same path)
   /**
    * Home Routes - Home page, about, contact, etc
    */
   app.get('/', home.index);
   app.get('/login', home.login);
   // TODO: Figure out how to present failure messages to user
   app.post('/login',
   passport.authenticate('local', {
      failureRedirect: '/login'
   }),
   function (req, res) {
      res.redirect('/');
   });
   app.get('/logout', restrict, home.logout);
   app.get('/about', home.about);
   app.get('/about/tos', home.tos);
   app.get('/register', home.getRegister);
   app.post('/register', home.postRegister);
   app.get('/checkExists', home.checkExists);
   app.get('/profile', restrict, home.profile);

};