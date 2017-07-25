const express = require("express")
const path = require("path")
var bcrypt = require('bcrypt');  

const app = express()


var bodyParser = require('body-parser');
const session = require("express-session")
const PORT = 8000
// use it!
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./client/dist")))

app.use(session({
  secret:"secret key",
  resave : false,
  saveUninitialized : true

}))

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
