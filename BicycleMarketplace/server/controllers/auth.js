const User = require('mongoose').model('User');

module.exports = {

    block(request, response) {
        User.findOne({ email: request.body.email })
            .then(user => {
                console.log('Found Email Address!')
                if (!user) throw new Error();
                blockUser(request, response, user);
            })
            .catch(error => {
                response.status(401).json('Invalid Credentials!');
            });
    },

    login(request, response) {
        User.findOne({ email: request.body.email })
            .then(user => {
                console.log('Found Email Address!')
                if (!user) throw new Error();
                return User.validatePassword(request.body.password, user.password)
                    .then(() => {
                        console.log('Password Validated');
                        completLogin(request, response, user);
                    })
            })
            .catch(error => {
                response.status(401).json('Invalid Credentials!');
            })
    },

    register(request, response) {
        User.create(request.body)
            .then(user => {
                console.log('Logging In!')
                completLogin(request, response, user);
            })
            .catch(error => {
                response.status(422).json(
                    Object.keys(error.errors).map(key => error.errors[key].message)
                );
            })
    },

    logout(request, response) {
        request.session.destroy();
        response.clearCookie('userId');
        response.clearCookie('expiration');
        response.clearCookie('blocked');
        response.json(true);

    }
};

function completLogin(request, response, user) {
    request.session.user = user.toObject();

    delete request.session.user.password;

    response.cookie('userId', user._id.toString());
    response.cookie('expiration', Date.now() + 86400 * 1000);
    response.cookie('blocked', Date.now() - 86400);
    response.json(user);
};

function blockUser(request, response, user) {
    request.session.user = user.toObject();
    response.cookie('userId', user._id.toString());
    // response.cookie('blocked', Date.now() + 30000); // 5 Min wait for testing
    response.cookie('blocked', Date.now() + 3600000); // 1 Hour wait
    response.json(user);
}