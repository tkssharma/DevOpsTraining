
const mongoose =  require('mongoose');
const bcrypt =  require('bcrypt-nodejs');
const UserHelper  =  require('../../../helper/User');

const UserSchema = mongoose.Schema({
        provider: String,
        name: String,
        email: {
            type: String,
            lowercase: true,
            required: true
        },
        password: String,
        birthday: {
            type: Date
        },
        status: {
            type: Number,
            default: 1
        },
        type: {
            type: Number,
            default: 1
        }, // 1: normal user, 2: trainer
        profile_picture: String,
        phone: String,
        email_verified: Boolean,
        phone_verified: Boolean,
        social: [],
        documents: [mongoose.Schema.Types.Mixed],
        gender: Number, // 1: Male, 2: Female, 3: Unspecified
        address: String,
        geo: mongoose.Schema.Types.Mixed,
        meta: mongoose.Schema.Types.Mixed,
    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

UserSchema.virtual('training', {
    ref: 'Training',
    localField: '_id',
    foreignField: 'user'
});

UserSchema.virtual('course', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'user'
});

UserSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'trainer'
});
// arrow functions doesn't work well with mongoose due to its implementation of methods.
UserSchema.methods.comparePassword = function(password) {
    if (!this.password) {
        return false;
    }
    return bcrypt.compareSync(password, this.password);
};
UserSchema.pre('save', function(next) {
    // check if password is present and is modified.
    if (this.password && this.isModified('password')) {
        this.password = UserHelper.hash_password(this.password);
    }
    // do stuff
    next();

});
module.exports =  mongoose.model('User', UserSchema);
