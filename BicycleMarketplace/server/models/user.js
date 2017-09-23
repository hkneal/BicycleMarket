const mongoose = require('mongoose');
const bcrypt = require('bcrypt-as-promised');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, maxlength: 200 },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator(value) {
                return validator.isEmail(value);
            }
        }
    },
    password: { type: String, required: true, trim: true },
    bikes: [{ type: Schema.Types.ObjectId, ref: 'Bike' }] //one to many []
}, {
    timestamps: true
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique!' });

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) { return next(); }

    bcrypt.hash(this.password, 10)
        .then((hashed) => {
            this.password = hashed;
            next();
        })
        .catch(next);
});

userSchema.statics.validatePassword = function(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
};

const User = mongoose.model('User', userSchema);