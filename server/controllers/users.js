 

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Bucket = mongoose.model('Bucket');


module.exports = {
  // helpers
  // get user by name
 
 

  // methods
 create : (req, res) => {
    console.log("inside UsersController create");
    console.log(req.body);
    var name = req.body.name;
      User.findOne({ name: name })
    .then(function(user){
      if (!user) {
        console.log("!user")
        user = new User({name: name});
        user.save(function(err, result){
          if (err) {
            console.log('Error', err);
            res.json({'error': err});
          } else {
             console.log("!!user")
              req.session.name = user.first_name;
            req.session.user_id = user._id;
            res.json(result);
          }
        }
      );
      }
    else {
                        console.log("login success controller");
                        console.log(user._id);
                        req.session.name = user.name;
                        req.session.user_id = user._id;
                        res.json(true);
                        console.log("session login",req.user_id);
                    }
    })
    .catch(function(error) {
      console.log('error', error);
    });
  },

 index: (req, res) => {
    // get all users
    var users = User.find({}, function(err, users) {
      if (err) {
        console.log('error', err);
      } else {
        res.json(users);
      }

    })
  },

 get : (req, res) => {
    var name = req.params.name;
    console.log('this.get name', name);
    getUserByName(name).then(function(user) {
      console.log('user', user);
      res.json(user);
    });
  },

  getUserById : (req, res) => {
    var id = req.params.id;
    console.log('this.getUserById', id);
    return User.findById(id, function(err, user) {
      if (err) {
          console.log(err);
      }
      res.json(user);
    });
  },

  getAll : (req, res) => {
    console.log("getall")
     User.find({})
        .then(users => res.json(users))
				.catch(err => res.status(500).json(err))
    }
     
  ,

  get_all_users_wo_user : (req, res) => {
    console.log("getall wo user" , req.session.name)
      
     User.find({_id: {$ne:req.session.user_id }})
        .then(users => res.json(users))
				.catch(err => res.status(500).json(err))
    }
     
  ,

 get_logged_in_user : (req, res) => {  
   if(req.session.user_id){
			User.findOne({_id: req.session.user_id})
				.then(user => res.json(user))
				.catch(err => res.status(500).json(err))
		} else {
			res.json(false)
		}
	},
  logout: (req, res) => {
		req.session.destroy()
		res.redirect("/")
	}
}
 