/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true
        },
        name: {
            type: String,
            required: [true, 'Please add a display name']
        },
        image_url: {
            type: String
        },
        password: {
            type: String
        },
        verified_email: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: 'users',
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
});

userSchema.methods.verifyPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
