const con = require('../db/db');


const getAllCategory = (callback) => {
    const sql = "SELECT * FROM `categories` order by category ";

    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {

            callback(null, result);
        }
    });

}
const getAllCategoryPromise = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM `categories` order by category ";
        con.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const createThreadCategory = (thread_id, category_id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO threads_category(threads_id,category_id) VALUES (?, ?)";
        con.query(sql, [thread_id, category_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}
const deleteThreadCategory = (thread_id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE from threads_category where threads_id = ? ";
        con.query(sql, [thread_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}
const createChannelCategory = (channel_id, category_id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO channels_category(channel_id,category_id) VALUES (?, ?)";
        con.query(sql, [channel_id, category_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

const deleteAllChannelCategory = (channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE from channels_category where channel_id = ? ";
        con.query(sql, [channel_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}


module.exports = {
    getAllCategory,
    createThreadCategory,
    createChannelCategory,
    deleteAllChannelCategory,
    getAllCategoryPromise,
    deleteThreadCategory,
}