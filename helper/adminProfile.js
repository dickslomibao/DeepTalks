const con = require('../db/db');

const getUserDetails = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT `userID`, `fullName`, `email`, `username`, `role`, `profile_pic` FROM `users` WHERE `userID` = ?';
        con.query(sql, [userId], (err, user) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(user.length > 0 ? user[0] : null);
            }
        });
    });
};

const updateProfile = (userId, { newProfilePic }) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE `users` SET ';
        const params = [];


        if (newProfilePic) {
            sql += '`profile_pic` = ?, ';
            params.push(newProfilePic);
        }

        sql = sql.slice(0, -2) + ' WHERE `userID` = ?';
        params.push(userId);

        con.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};

const updateInfo = (userId, { newFullName, }) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE `users` SET ';
        const params = [];

        if (newFullName) {
            sql += '`fullName` = ?, ';
            params.push(newFullName);
        }



        sql = sql.slice(0, -2) + ' WHERE `userID` = ?';
        params.push(userId);

        con.query(sql, params, (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};

module.exports = {
    getUserDetails,
    updateProfile,
    updateInfo
};
