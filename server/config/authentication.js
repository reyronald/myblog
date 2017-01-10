import passport from 'passport';
import config from './oauth';
import Post from '../api/post/post.model';

const GoogleStrategy = require('passport-google-oauth2').Strategy;

export default function(app) {
    debugger;

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((id, done) => {
    	User.findById(id, (err, user) => {
    		if (err) {
    			done(err, null);
    		} else {
    			done(null, user);
    		}
    	});
    });
    passport.use(new GoogleStrategy({
            clientID: config.google.clientId,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackUrl,
            passReqToCallback: true
        },
        function(request, accessToken, refreshToken, profile, done) {
        	User.findOne({ oauthId: profile.id }, (err, user) => {
        		if (err) {
        			console.log(err);
        		}
        		if (!err && user !== null) {
        			done(null, user);
        		} else {
        			user = new User({
        				oauthId: profile.id,
        				name: profile.displayName
        			});
        			user.save(err => {
        				if (err) {
        					console.log(err);
        				} else {
        					done(null, user);
        				}
        			});
        		}
        	});

            process.nextTick(function() {
                return done(null, profile);
            });
        }
    ));

    app.use(passport.initialize());
    app.use(passport.session());

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
        }),
        function(req, res) {
            res.redirect('/account');
        });
}
