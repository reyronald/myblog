import passport from 'passport';
import config from '../config/oauth';
import User from '../api/user/user.model';
import {
  Strategy as GoogleStrategy
} from 'passport-google-oauth2';
import { setTokenCookie } from './auth.service';

export default function(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).exec()
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackUrl,
    passReqToCallback: true
  },
    function(request, accessToken, refreshToken, profile, done) {
      User.findOne({ oauthId: profile.id }).exec()
        .then(user => {
          if (user) {
            return done(null, user);
          }

          user = new User({
            oauthId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.emails[0].value.split('@')[0],
            provider: 'google',
            google: profile._json
          });

          user.save()
            .then(savedUser => done(null, savedUser))
            .catch(err => done(err));
        })
        .catch(err => done(err));
    }
  ));

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'
      ]
    }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/'
    }), setTokenCookie);

  app.get('/logout', (req, res) => {
    res.cookie('token', '');
    req.logout();
    res.redirect('/');
  });
}
