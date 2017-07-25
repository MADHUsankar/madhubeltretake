
var path = require('path');
var buckets = require('./../controllers/buckets.js');
var users = require('./../controllers/users.js');

module.exports = function(app) {
  app.post('/login', users.create);
  app.post('/newBucket', buckets.newBucket);

   
  app.get('/get_all_users', users.getAll);
   app.get('/get_all_users_wo_user', users.get_all_users_wo_user);
  app.get('/users/:name', users.get);
  app.get('/get_logged_in_user', users.get_logged_in_user);
  app.get("/logout", users.logout)

  app.get('/user/:id', users.getUserById);

 
  app.get('/buckets/:id', buckets.toggle);
  app.get('/buckets', buckets.get);

    app.get('*', (req,res) => {
        res.sendFile(path.resolve("./client/dist/index.html"))
})
}
 
