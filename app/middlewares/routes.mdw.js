module.exports = function (app) {
    app.use('/dashboard', require('../routes/board.route'));
    app.use('/user', require('../routes/user.route'));
};