const mongoose = require("mongoose")
 const User = mongoose.model('User');
 var Bucket = mongoose.model('Bucket');
 
module.exports = {
 
 
  //     index: (req, res, next) => {
  //   Bucket.find({}, false, true).populate('answers').exec(function(err, buckets){
  //     console.log(buckets);
  //     res.json(buckets);
  //   })
  // },

  newBucket : (req, res, next) => {

    console.log("fordata" ,  req.body)
       let b = new Bucket(req.body);
         console.log('create a bucket', b);
        b.name=req.session  .name
        b.save()
        .then(() => { res.json(true); })
        .catch((err) => { res.status(501).json(err); });
      
    

  },

  toggle :(req, res, next) => {
    console.log('toggle bucket', req.body, req.query, req.params);
    var id = req.params.id;
    console.log('id', id);
    Bucket.findById(id, function(err, existBucket) {
      console.log('existBucket', existBucket);
      if (err) {
          console.log(err);
      }
      existBucket.state = !existBucket.state;
      existBucket.save(function(saveErr, result) {
        if (saveErr) {
          console.log(saveErr);
        }
        res.json(result);
      })
    });
  },

  get : (req, res, next) => {
 
    Bucket.find({}).populate(
      'taggee tagger'
    ).exec(function(err, result) {
      if (err) {
        console.log('Error', err);
      }
      if (result) {
        console.log('result', result);
        res.json(result);
      } else {
        console.log('no result', result);
      }
    })
  }

 
}