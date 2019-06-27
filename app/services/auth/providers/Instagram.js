

const passport = require('passport');
const InstagramStrategy =  require('passport-instagram');
const auth = require ( '../../../config/auth');
const Service = require ( '../../../helper/Service');


passport.use(new InstagramStrategy({
        clientID: auth.instagram.client_id,
        clientSecret: auth.instagram.client_secret,
        callbackURL: auth.instagram.callback_url,
        passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {

        let data = profile._json;
        Service.user.registerSocial({
                provider: 'instagram',
                name: profile.displayName,
                email: `${data.data.username}@instagram.com`,
                profile_picture: data.data.profile_picture,
                meta: {
                    provider: 'instagram',
                    id: profile.id,
                    token: accessToken,
                    username: data.data.username,
                }
            },
            done
        );

    }
));


let InstagramRoutes = {

    authenticate: () => {
        return passport.authenticate('instagram');
    },

    callback: () => {
        return passport.authenticate('instagram', {
            failureRedirect: '/auth/failed'
        });
    }
}

module.exports =  InstagramRoutes;
