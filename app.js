const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')()
const session = require('cookie-session')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const checkAuthorization = require('./middleware/checkauth')
const models = require('./models')



const userRoutes = require('./routes/users')
const indexRoutes = require('./routes/index')

const PORT = process.env.PORT || 8080
const CONNECTION_STRING = "postgres://localhost:5432/scrumapp"

const VIEWS_PATH = path.join(__dirname,'/views')

// configuring your view engine
app.engine('mustache',mustacheExpress(VIEWS_PATH + '/partials','.mustache'))
app.set('views',VIEWS_PATH)
app.set('view engine','mustache')

app.use('/css',express.static('css')) // localhost:3000/css/site.css

app.use(session({
  secret: 'lhadhlsdalh',
  resave: false,
  saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: false}))

app.use((req,res,next) => {
  res.locals.authenticated = req.session.user == null ? false : true
  next() 
})

db = pgp(CONNECTION_STRING)

// setup routes
app.use('/',indexRoutes)
app.use('/users',checkAuthorization,userRoutes)


app.listen(PORT,() => {
  console.log(`Server has started on ${PORT}`)
})