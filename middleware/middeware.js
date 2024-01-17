const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/signin');
    }
};
const isClient = (req, res, next) => {
    const { user } = req.session;
    if (user && user.role === 'client') {
        next();
    } else {
        req.flash('error', 'Invalid user role or not logged in.');
        res.redirect('/page-not-found');
    }
};

const isAdmin = (req, res, next) => {
    const { user } = req.session;
    if (user && user.role === 'admin') {
        next();
    } else {
        req.flash('error', 'Invalid user role or not logged in.');
        res.redirect('/page-not-found');
    }
};
const isNotLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        const { role } = req.session.user;

        if (role === 'admin') {
            res.redirect('/admin/users');
        } else if (role === 'client') {
            res.redirect('/client/index');
        } else {
            req.flash('error', 'Invalid user role.');
            res.redirect('/page-not-found');
        }
    }
};

module.exports = {
    isAdmin,
    isClient,
    isLoggedIn,
    isNotLoggedIn
}