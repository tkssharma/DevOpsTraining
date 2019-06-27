

const validator =  require('validator');
const UserTransformer =  require('../transformer/UserTransformer');
const Email = require('../../../helper/Email');
const User = require('../model/user');

let UserController = function() {
    function registerDefault(user, callback) {
        if (! user.username || ! user.email || ! user.password || ! user.repeatPassword) {
            callback('invalid data provided');
            return;
        } else {
            User.find({ 'email': user.email }, (error, existingUser) => {
                if (existingUser.length != 0) {
                    callback('User with this email address already exists.');
                } else {
                    let newUser = new User({
                        provider: 'default',
                        name: user.username,
                        email: user.email,
                        password: user.password,
                        phone: user.phone,
                        status: 1,
                    });
                    newUser.save((error, new_user) => {
                        if (error) {
                            callback(error);
                        }
                        callback(null, UserTransformer.transform(new_user));
                        Email.welcome(new_user);// send welcome email to user
                        return UserTransformer.transform(new_user);
                    });
                }
            });
        }
    }
    function registerSocial(user, callback) {

        User.findOne({ 'email': user.email }, (error, existing_user) => {
            if (existing_user) {
                callback(null, UserTransformer.transform(existing_user));
            } else {
                let newUser = new User({
                    provider: user.provider,
                    name: user.name,
                    email: user.email,
                    profile_picture: user.profile_picture,
                    email_verified: true,
                    status: 1,
                    social: user.meta,
                });
                newUser.save((error, new_user) => {
                    // if (error) {}
                    callback(null, UserTransformer.transform(new_user));
                    Email.welcome(new_user);
                    return UserTransformer.transform(new_user);
                });
            }
        });
    }
    function resetPassword(email, callback) {

        User.findOne({ 'email': email }, (error, found_user) => {
            if (found_user) {

                let password = Math.random().toString(36).slice(2);
                found_user.password = password;

                found_user.save(function(err) {
                    if (err) {
                        callback('error occoured while updating record');
                    } else {
                        callback(null, 'done');
                        Email.password_reset(found_user, password);
                    }
                });
                // callback( null, 'done' );
            } else {
                callback('invalid email provided');
            }
        });
    }
    function update(id, data, callback) {
        User.findById(id, (error, user) => {
            if (user) {
                if (data.name) { user.name = data.name; }
                // if ( data.email ) { user.email = data.email; }
                if (data.gender) { user.gender = data.gender; }
                if (data.birthday) { user.birthday = data.birthday; }
                if (data.phone) { user.phone = data.phone; }
                if (data.type && data.type < 3) { user.type = data.type; }
                if (data.profile_picture) { user.profile_picture = data.profile_picture; }
                if (data.password && data.password === data.confirm_password) {
                    user.password = data.password;
                }
                if (data.address) { user.address = data.address; }
                if (data.geo) {
                    user.geo = {
                        lat: data.geo.lat || '',
                        lng: data.geo.lng || '',
                    }
                }
                if (data.phone_verified) {
                    user.phone_verified = true;
                }
                if (data.document) {
                    user.documents.push(data.document);
                }
                if (data.meta) {
                    user.meta = {
                        about: data.meta.about || '',
                        fun_fact: data.meta.fun_fact || '',
                        payment: data.meta.payment || '',
                    }
                }
                if (data.verification_code) {
                    user.meta = {verification_code: data.verification_code }
                }
                user.save(function(err, updated_user) {
                    if (err) {
                        callback('error occoured while updating record');
                    } else {
                        callback(null, updated_user);
                    }
                });
            } else {
                callback('user not found');
            }
        });
    }
    return {
        registerDefault: registerDefault,
        registerSocial: registerSocial,
        resetPassword: resetPassword,
        update: update
    }
}
module.exports = new UserController();
