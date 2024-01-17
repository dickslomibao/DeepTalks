const argon2 = require('argon2');
const conn = require('../db/db');
const userHelper = require('../helper/users');

const getSignIn = (req, res) => {
    res.render('signin', { error: req.flash('error') });
};
const postSignIn = (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        req.flash('error', 'Please fill out all the fields.');
        return res.redirect('/signin');
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    conn.query(sql, [username], async (err, results) => {
        if (err) {
            console.error(err);
            req.flash('error', 'Internal Server Error');
            return res.status(500).redirect('/signin');
        }

        if (results.length === 0) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/signin');
        }

        const user = results[0];

        if (user.status === 'banned') {
            req.flash('error', 'Your account has been banned.');
            return res.redirect('/signin');
        }

        const passwordMatch = await argon2.verify(user.password, password);
        if (passwordMatch) {
            req.session.user = {
                name: user.fullName,
                userId: user.userID,
                username: user.username,
                role: user.role,
                email: user.email,
                profile: user.profile_pic,
            };

            if (user.role === 'admin') {
                return res.redirect('/admin/users');
            } else if (user.role === 'client') {
                return res.redirect('/');
            }
        } else {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/signin');
        }
    });
};
const checkExistingAccount = (req, res) => {
    const { username, email } = req.body;

    if (!username && !email) {
        return res.status(400).json({ error: 'Username or email is required' });
    }

    let sql;
    let params;

    if (username) {
        sql = 'SELECT * FROM users WHERE username = ?';
        params = [username];
    } else if (email) {
        sql = 'SELECT * FROM users WHERE email = ?';
        params = [email];
    }

    conn.query(sql, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    });
};
const postSignUp = async (req, res) => {

    const { fullName, email, username, password, confirmPassword } = req.body;

    if (!fullName || !email || !username || !password || !confirmPassword) {
        req.flash('error', 'Please fill out all the fields.');
        return res.redirect('/signup');
    }
    if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match. Please enter matching passwords.');
        return res.redirect('/signup');
    }
    try {
        const hashedPassword = await argon2.hash(password);
        const sql = "INSERT INTO users (fullName, email, username, password, role, profile_pic) VALUES (?, ?, ?, ?, 'client',?)";
        conn.query(sql, [fullName, email, username, hashedPassword, '/img/profile/' + req.file.filename], (err, results) => {
            if (err) {
                console.error(err);
                req.flash('error', 'Registration failed');
                return res.redirect("/signup");
            }
            req.session.user = {
                name: fullName,
                profile: '/img/profile/' + req.file.filename,
                userId: results.insertId,
                username,
                role: 'client',
            };
            req.flash('success', 'Registration successful');
            res.redirect('/');
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Internal Server Error');
        res.status(500).redirect('/signup');
    }
};
const getSignUp = (req, res) => {
    res.render('signup');
};

const signOut = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
};
module.exports = {
    getSignUp,
    postSignUp,
    postSignIn,
    getSignIn,
    signOut,
    checkExistingAccount
};
