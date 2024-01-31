import passport from 'passport'

import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config/serverConfig.js'
import { userService } from '../services/users.services.js'

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

const passportInitialize = passport.initialize()
const passportSession = passport.session()

const autenticacion = (req, res, next) => {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}


passport.use('github', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accessToken, refreshToken, profile, done) {

  const usuario = await userService.readOne({ email: profile.username })
  if (usuario) {
    return done(null, {
      ...usuario.infoPublica(),
      rol: 'usuario'
    })
  }

  try {
    const registrado = await userService.create({
      email: profile.username,
      password: '(sin especificar)',
      name: profile.displayName,
      lastname: '(sin especificar)',
    })
    done(null, {
      ...registrado.infoPublica(),
      rol: 'usuario'
    })
  } catch (error) {
    done(error)
  }

}))


export default autenticacion