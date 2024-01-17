const con = require('../db/db');

const create = (id, title, content, user_id) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO threads(id, title, content, user_id) VALUES (?, ?, ?, ?)";
        con.query(sql, [id, title, content, user_id], (err, res) => {
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
        const sql = "UPDATE `threads` SET `title`=?,`content`=? WHERE id = ?";
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
const deleteThread = (id,) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM `threads` WHERE id = ?";
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

const getAllThread = (callback) => {
    const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 ORDER BY threads.date_created DESC;";

    con.query(sql, (err, result) => {
        if (err) {

            console.error('Error executing query:', err);
            callback(err, null);
        } else {

            callback(null, result);
        }
    });

}

const getMostViewedThread = (callback) => {
    const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 ORDER BY  total_views DESC";

    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {

            callback(null, result);
        }
    });

}
const getPopularThread = (callback) => {
    const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 ORDER BY total_replies DESC;";
    con.query(sql, (err, result) => {
        if (err) {

            console.error('Error executing query:', err);
            callback(err, null);
        } else {

            callback(null, result);
        }
    });

}
const getSingleThread = (id, callback) => {
    const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 and threads.id = ? ORDER BY threads.date_created DESC;";

    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            callback(err, null);
        } else {

            callback(null, result);
        }
    });

}
const getSingleThreadPromise = (id) => {

    return new Promise((resolve, reject) => {
        const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 and threads.id = ? ORDER BY threads.date_created DESC;";
        con.query(sql, [id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });


}


const getAllThreadSingleUser = (id) => {

    return new Promise((resolve, reject) => {
        const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 and threads.user_id = ? ORDER BY threads.date_created DESC;";
        con.query(sql, [id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });

}
const getPopularThreadSingleUser = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 and threads.user_id = ?  ORDER BY total_replies DESC;";
        con.query(sql, [id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });

}
const getMostViewedThreadSingleUser = (id) => {

    return new Promise((resolve, reject) => {
        const sql = "SELECT threads.*, users.fullName, users.username, users.profile_pic,(SELECT count(*) from thread_views WHERE thread_views.thread_id = threads.id) as total_views, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM threads_category INNER JOIN categories ON threads_category.category_id = categories.id WHERE threads_category.threads_id = threads.id ) AS category, (SELECT count(*) from replies where replies.thread_id = threads.id) as total_replies FROM threads INNER JOIN users ON threads.user_id = users.userID WHERE threads.status = 2 and threads.user_id = ? ORDER BY  total_views DESC";
        con.query(sql, [id], (err, res) => {
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
    getAllThread,
    getSingleThread,
    getPopularThread,
    updateChannelThread,
    getSingleThreadPromise,
    getMostViewedThread,
    deleteThread, getAllThreadSingleUser,
    getPopularThreadSingleUser, getMostViewedThreadSingleUser
}