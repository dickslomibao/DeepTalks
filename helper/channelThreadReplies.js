const con = require('../db/db');

const create = (user_id, channel_thread_id, content) => {
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
const deleteReply = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM `channel_thread_replies` where id = ? ";
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
const pinOrUnpinReply = (id, value) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `channel_thread_replies` set pin = ? where id = ? ";
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
const getChannelThreadReplies = (channel_thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_thread_replies.*, users.fullName, users.username, users.profile_pic FROM channel_thread_replies INNER JOIN users ON channel_thread_replies.user_id = users.userID WHERE channel_thread_replies.channel_thread_id = ? ORDER BY channel_thread_replies.date_created DESC";
        con.query(sql, [channel_thread_id,], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getChannelThreadRepliesPinned = (channel_thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_thread_replies.*, users.fullName, users.username, users.profile_pic FROM channel_thread_replies INNER JOIN users ON channel_thread_replies.user_id = users.userID WHERE channel_thread_replies.channel_thread_id = ? and channel_thread_replies.pin = 2  ORDER BY channel_thread_replies.date_created DESC";
        con.query(sql, [channel_thread_id,], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getChannelThreadSingleReplies = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_thread_replies.*, users.fullName, users.username, users.profile_pic FROM channel_thread_replies INNER JOIN users ON channel_thread_replies.user_id = users.userID WHERE channel_thread_replies.id = ? ORDER BY channel_thread_replies.date_created DESC";
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
    create, getChannelThreadReplies, deleteReply, pinOrUnpinReply, getChannelThreadSingleReplies, getChannelThreadRepliesPinned
}   