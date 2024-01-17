const con = require('../db/db');


const updateClientProfile = (userId, { newProfilePic }) => {
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
const updateInfoClient = (userId, { newFullName, newUsername, newEmail }) => {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE `users` SET ';
        const params = [];

        if (newFullName) {
            sql += '`fullName` = ?, ';
            params.push(newFullName);
        }

        if (newUsername) {
            sql += '`username` = ?, ';
            params.push(newUsername);
        }

        if (newEmail) {
            sql += '`email` = ?, ';
            params.push(newEmail);
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
    updateClientProfile,
    updateInfoClient
};
