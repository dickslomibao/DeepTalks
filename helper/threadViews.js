const con = require('../db/db');
const create = (user_id, thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO thread_views(user_id,thread_id) VALUES (?, ?)";
        con.query(sql, [user_id, thread_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

const createChannelThreadViews = (user_id, thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO channel_thread_views(user_id,channel_thread_id) VALUES (?, ?)";
        con.query(sql, [user_id, thread_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}
const noViewYetChannelThread = (user_id, thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM channel_thread_views where user_id = ? and channel_thread_id = ?";
        con.query(sql, [user_id, thread_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res.length == 0 ? true : false);
            }
        });
    });
}
const noViewYet = (user_id, thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM thread_views where user_id = ? and thread_id = ?";
        con.query(sql, [user_id, thread_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res.length == 0 ? true : false);
            }
        });
    });
}

module.exports = {
    create, noViewYet, createChannelThreadViews, noViewYetChannelThread
}