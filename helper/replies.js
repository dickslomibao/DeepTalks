const con = require('../db/db');

const create = (thread_id, user_id, content) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO replies(thread_id,user_id,content) VALUES (?, ?,?)";
        con.query(sql, [thread_id, user_id, content], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

const deleteReplies = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM replies where id = ?";
        con.query(sql, [id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}


const pinOrUnPinReplies = (value, id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE replies set pin = ? where id = ?";
        con.query(sql, [value, id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}
const createChannelThreadReply = (user_id, channel_thread_id, content) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `channel_thread_replies`(`user_id`, `channel_thread_id`, `content`) VALUES (?,?,?)";
        con.query(sql, [user_id, channel_thread_id, content], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

const getThreadReplies = (thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT replies.*, users.fullName, users.username, users.profile_pic FROM replies INNER JOIN users ON replies.user_id = users.userID where replies.thread_id = ? ORDER BY replies.date_created DESC";
        con.query(sql, [thread_id,], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getThreadPinReplies = (thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT replies.*, users.fullName, users.username, users.profile_pic FROM replies INNER JOIN users ON replies.user_id = users.userID where replies.thread_id = ? and replies.pin = 2 ORDER BY replies.date_created DESC";
        con.query(sql, [thread_id,], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getThreadSinglesReplies = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT replies.*, users.fullName, users.username, users.profile_pic FROM replies INNER JOIN users ON replies.user_id = users.userID where replies.id = ? ORDER BY replies.date_created DESC";
        con.query(sql, [id,], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
module.exports = {
    create,
    getThreadReplies,
    createChannelThreadReply,
    deleteReplies,
    getThreadSinglesReplies,
    pinOrUnPinReplies,
    getThreadPinReplies
};