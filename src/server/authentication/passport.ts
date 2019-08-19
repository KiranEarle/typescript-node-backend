import passport from 'passport'
import passportLocal from 'passport-local'
import User from '../modules/Users/model'

const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy(
  async function(username, password, done) {

    console.log('USER details', username, password)

    if (!username) {
      console.warn('username must be provided')
      return
    } else if (!password) {
      console.warn('password must be provided')
      return
    }

    await User.findOne({ username: username }, async function(err, user: any) {
      if (err) { return done(err) }

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }

      const isPasswordValid = await user.validatePassword(password)

      if (!isPasswordValid) {
        return done(null, false, { message: 'Incorrect password.' })
      }

      console.log('user', user)
      return done(null, user)
    })
  }
))

interface userInterface {
  _id: number
}

passport.serializeUser((user: userInterface, done) => {
  done(null, user._id)
})


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
      done(err, user)
  })
})

export default passport