const con = require('../db/db');
const { use } = require('../routes/mainRoute');

const create = (id, user_id, channel_id, title, content, status) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `channel_threads`(`id`, `user_id`, `channel_id`, `title`, `content`, `status`) VALUES (?,?,?,?,?,?)";
        con.query(sql, [id, user_id, channel_id, title, content, status], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

const updateChannelThread = (id, title, content) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `channel_threads` SET `title`=?,`content`=? WHERE id = ?";
        con.query(sql, [title, content, id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}
const acceptChannedThread = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `channel_threads` SET `status`= 2  WHERE id = ?";
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
const pinOrUnpinChannelThread = (id, value) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `channel_threads` SET `pin`= ?  WHERE id = ?";
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
const deleteChannelThread = (id, title, content) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM `channel_threads`  WHERE id = ?";
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
const getChannelThread = (channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_threads.*, users.fullName, users.username,(SELECT count(*) from channel_thread_views WHERE channel_thread_views.channel_thread_id = channel_threads.id) as total_views, users.profile_pic,(SELECT count(*) from channel_thread_replies where channel_thread_replies.channel_thread_id = channel_threads.id) as total_replies  FROM `channel_threads` INNER join users on channel_threads.user_id = users.userID WHERE channel_threads.status = 2 and channel_threads.channel_id = ? ORDER BY channel_threads.date_created DESC";
        con.query(sql, [channel_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}


const getChannelPendingThreads = (channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from channel_thread_views WHERE channel_thread_views.channel_thread_id = channel_threads.id) as total_views,(SELECT count(*) from channel_thread_replies where channel_thread_replies.channel_thread_id = channel_threads.id) as total_replies  FROM `channel_threads` INNER join users on channel_threads.user_id = users.userID WHERE channel_threads.status = 1 and channel_threads.channel_id = ? ORDER BY channel_threads.date_created DESC";
        con.query(sql, [channel_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getChannelMemberOnlyPendingThreads = (channel_id, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from channel_thread_views WHERE channel_thread_views.channel_thread_id = channel_threads.id) as total_views,(SELECT count(*) from channel_thread_replies where channel_thread_replies.channel_thread_id = channel_threads.id) as total_replies  FROM `channel_threads` INNER join users on channel_threads.user_id = users.userID WHERE channel_threads.status = 1 and channel_threads.channel_id = ? and channel_threads.user_id = ? ORDER BY channel_threads.date_created DESC";
        con.query(sql, [channel_id, user_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getPopularChannelThread = (channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from channel_thread_views WHERE channel_thread_views.channel_thread_id = channel_threads.id) as total_views,(SELECT count(*) from channel_thread_replies where channel_thread_replies.channel_thread_id = channel_threads.id) as total_replies  FROM `channel_threads` INNER join users on channel_threads.user_id = users.userID WHERE channel_threads.status = 2 and channel_threads.channel_id = ? ORDER BY total_replies DESC";
        con.query(sql, [channel_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getChannelPinnedThread = (channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from channel_thread_views WHERE channel_thread_views.channel_thread_id = channel_threads.id) as total_views,(SELECT count(*) from channel_thread_replies where channel_thread_replies.channel_thread_id = channel_threads.id) as total_replies  FROM `channel_threads` INNER join users on channel_threads.user_id = users.userID WHERE channel_threads.status = 2 and channel_threads.channel_id = ? and pin = 2 ORDER BY channel_threads.date_created DESC";
        con.query(sql, [channel_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getSingleChannelThread = (channel_thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channel_threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from channel_thread_views WHERE channel_thread_views.channel_thread_id = channel_threads.id) as total_views,(SELECT count(*) from channel_thread_replies where channel_thread_replies.channel_thread_id = channel_threads.id) as total_replies FROM `channel_threads` INNER join users on channel_threads.user_id = users.userID WHERE channel_threads.id = ?";
        con.query(sql, [channel_thread_id], (err, res) => {
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
    getChannelThread,
    getSingleChannelThread,
    getPopularChannelThread,
    getChannelPendingThreads,
    updateChannelThread,
    deleteChannelThread,
    getChannelMemberOnlyPendingThreads,
    acceptChannedThread,
    pinOrUnpinChannelThread,
    getChannelPinnedThread
}