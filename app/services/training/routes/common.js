

const express = require ( 'express');
const User = require ( '../model/user');
const UserTransformer = require ( '../transformer/UserTransformer');
const ResponseTemplate = require ( '../../../global/templates/response');
const UserController = require ( '../controller/UserController');
const Helper = require ( '../../../helper');
const multer = require ( 'multer');
const path = require ( 'path');
const fs = require ( 'fs');
const config_server = require ( '../../../config/server');
// let upload = multer({ dest: path.join( config_server.UPLOAD_DIR, config_server.PROFILE_PICTURE_DIR ) });
// twillo API for messaging
const Twilio = require ( '../../../helper/Twilio');

// helper for doc upload
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(config_server.UPLOAD_DIR, config_server.PROFILE_PICTURE_DIR));
    },
    filename: function(req, file, cb) {
        let extension = Helper.getFileExtension(file.originalname);
        // cb( null, `${file.fieldname}-${req.user.id}.${extension}` );
        cb(null, `${req.user.id}-${ Helper.randomString() }.${extension}`);
    }
})
let upload = multer({ storage: storage });

let documents_storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(config_server.UPLOAD_DIR, config_server.DOCUMENT_UPLOAD_DIR));
    },
    filename: function(req, file, cb) {
        let extension = Helper.getFileExtension(file.originalname);
        cb(null, `${req.user.id}-${ Helper.randomString() }.${extension}`);
    }
})
let uploadDocuments = multer({ storage: documents_storage });

let router = express.Router();

/**
 * @api {get} /users Request User information
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiSuccess {String} code HTTP status code = require ( API.
 * @apiSuccess {String} message Message = require ( API.
 */
router.get('/', (req, res) => {
    User.find({}, (error, users) => {
        if (error) {
            res.send(error);
        }
        users = UserTransformer.transform(users);
        res.json({
            code: 200,
            message: 'success',
            users: users
        });

    });

});

/**
 * @api {POST} /users/verify-phone make user Trainer
 * @apiName verify-phone
 * @apiGroup User
 *
 *
 * @apiSuccess {String} code HTTP status code = require ( API.
 * @apiSuccess {String} message Message = require ( API.
 */

router.post('/verify-phone', (req, res) => {

    let v_code = req.user.meta.verification_code || '';

    if (req.body.code != v_code) {
        res.json({
            code: 210,
            message: 'error',
            description: 'invalid code',
        });
    } else {

        UserController.update(req.user._id, { phone_verified: true }, (error, user) => {
            if (error) {
                res.json(ResponseTemplate.updateErrorOccoured(error));
            } else {
                user = UserTransformer.transform(user);
                res.json({
                    code: 200,
                    message: 'success',
                    user: user,
                });
            }
        });

    }
});
/**
 * @api {GET} /users/verify-phone Varify User Phone
 * @apiName verify-phone
 * @apiGroup User
 * @apiSuccess {String} code HTTP status code = require ( API.
 * @apiSuccess {String} message Message = require ( API.
 */
router.get('/verify-phone', (req, res) => {
    let verification_code = Helper.verificationCode();
    Twilio.phone_verification(req.user.phone, verification_code, (data) => {
        if (!data) {
            res.json({
                code: 210,
                message: 'error',
                description: 'invalid phone number provided',
            });
        } else {
            UserController.update(req.user._id, { verification_code: verification_code }, (error, user) => {
                if (error) {
                    res.json(ResponseTemplate.updateErrorOccoured(error));
                } else {
                    res.json({
                        code: 200,
                        message: 'success',
                    });

                }
            });
        }

    });

});
/**
 * @api {GET} /users/:id find User By ID
 * @apiName findById
 * @apiGroup User
 * @apiSuccess {String} code HTTP status code = require ( API.
 * @apiSuccess {String} message Message = require ( API.
 */

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (error, user) => {
        if (error) {
            res.json(ResponseTemplate.userNotFound());
            // res.send(error);
        } else {
            user = UserTransformer.transform(user);
            res.json({
                code: 200,
                message: 'success',
                user: user
            });
        }
    });
});
/**
 * @api {POST} /users/:id update user
 * @apiName findById
 * @apiGroup User
 * @apiSuccess {String} code HTTP status code = require ( API.
 * @apiSuccess {String} message Message = require ( API.
 */
router.post('/update', (req, res) => {
    UserController.update(req.user._id, req.body, (error, user) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success('your data has been successfully updated'));
        }
    });
});
// upload users profile picture.
router.post('/upload-profile-picture', upload.single('avatar'), (req, res) => {
    UserController.update(req.user._id, { profile_picture: req.file.filename }, (error, user) => {
        if (error) {
            res.json(ResponseTemplate.updateErrorOccoured(error));
        } else {
            res.json(ResponseTemplate.success(
                'your profile picture has been successfully uploaded', { profile_picture: Helper.avatarURL(user.profile_picture) }));
            Helper.deleteFile('profile', req.user.profile_picture);
        }
    });
});

module.exports = router
