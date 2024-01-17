const con = require('../db/db');

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT `userID`, `fullName`, `email`, `username`, `password`, `role`, `profile_pic`, `created_at`, `updated_at`, `status` FROM `users` WHERE `role` != "admin"';
        con.query(sql, (err, users) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(users);
            }
        });
    });
};
const topContributor = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT users.*, (SELECT count(*) from threads where threads.user_id = users.userID) as total_threads FROM `users` HAVING total_threads > 0 order by total_threads DESC limit 10";
        con.query(sql, (err, users) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(users);
            }
        });
    });
};
const searchUsers = (search, channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT `userID`, `fullName`, `email`, `username`, `password`, `role`, `profile_pic`, `created_at`, `updated_at`, `status` FROM `users` WHERE `role` != 'admin' and (username like ? or fullName LIKE ?) and users.userID NOT in (SELECT channels_member.user_id from channels_member where channels_member.channel_id = ?)";
        con.query(sql, [`%${search}%`, `%${search}%`, channel_id], (err, users) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(users);
            }
        });
    });
};
const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE userID = ?';
        con.query(sql, [userId], (err, result) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};
const banUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE `users` SET `status` = "banned" WHERE `userID` = ?';
        con.query(sql, [userId], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};

const unbanUser = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE `users` SET `status` = "active" WHERE `userID` = ?';
        con.query(sql, [userId], (err, res) => {
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
    getAllUsers,
    deleteUser,
    banUser,
    unbanUser,
    searchUsers,
    topContributor
};