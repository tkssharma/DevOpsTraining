

const passport =  require('passport');
const TwitterStrategy =  require('passport-twitter');
const auth = require ( '../../../config/auth');
const Service = require ( '../../../helper/Service');

passport.use(new TwitterStrategy({
        consumerKey: auth.twitter.client_id,
        consumerSecret: auth.twitter.client_secret,
        callbackURL: auth.twitter.callback_url,
        passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {

        let data = profile._json;
        Service.user.registerSocial({
                provider: 'twitter',
                name: data.name,
                email: `${data.screen_name}@twitter.com`,
                profile_picture: data.profile_image_url,
                meta: {
                    provider: 'twitter',
                    id: data.id,
                    token: accessToken,
                    screen_name: data.screen_name,
                }
            },
            done
        );

    }
));

let TwitterRoutes = {

    authenticate: () => {
        return passport.authenticate('twitter');
    },

    callback: () => {
        return passport.authenticate('twitter', {
            failureRedirect: '/auth/failed'
        });
    }

}

module.exports =  TwitterRoutes;
