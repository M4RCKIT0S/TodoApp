const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        required: true,
        type: String,
        unique: true,
        validate:[validateUsername, 'Please fill a valid username'],
    },
    name:{
        type: String,
        required: true,
        unique: false,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:[validateEmail, 'Please fill a valid email']
    },
    password:{
        type: String,
        required: true,
        unique: false,
    }
},{
    timestamps: true,
    collation: {
        locale: 'es',
        strength: 2,
    }
});

function validateUsername(username){
    const usernameRegex = new RegExp(/^([A-Za-z0-9]){4,20}$/m);
    return usernameRegex.test(username);
}

function validateEmail(email){
    var emailRegex = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/m;
    return emailRegex.test(email);
};

module.exports = mongoose.model('User', userSchema);