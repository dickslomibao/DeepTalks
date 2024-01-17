const argon2 = require('argon2');
const conn = require('../db/db');

const getIndex = (req, res) => {
    const data = {
        pageTitle: 'Index Page',
        message: 'Hello, this is the index page!'
    };
    res.render('index', data);
}
const getClientHome = (req, res) => {
    res.render('client/home', { user: req.session.user });
};
const getAdminDashboard = (req, res) => {
    res.render('admin/users', { user: req.session.user });
};
const getPageNotFound = (req, res) => {
    res.status(404).render('error');
};

module.exports = {
    getIndex,
    getClientHome,
    getAdminDashboard,
    getPageNotFound,
};
