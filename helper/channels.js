const con = require('../db/db');

const createChannel = (id, name, description, user_id, thumbnail, private, code, auto_accept_post, allow_members_add, auto_accept_added_members) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `channels`(`id`, `name`, `description`, `user_id`,`thumbnail`, `private`,`code`, `auto_accept_post`, `allow_members_add`, `auto_accept_joined_members`) VALUES (?,?,?,?,?,?,?,?,?,?)";
        con.query(sql, [id, name, description, user_id, thumbnail, private, code, auto_accept_post, allow_members_add, auto_accept_added_members], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}
const updateChannel = (id, name, description, private, auto_accept_post, allow_members_add, auto_accept_added_members) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE `channels` SET `name`=?,`description`=?,`private`=?,`auto_accept_post`=?,`allow_members_add`=?,`auto_accept_joined_members`=? WHERE  id = ?";
        con.query(sql, [name, description, private, auto_accept_post, allow_members_add, auto_accept_added_members, id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}
const getUserChannels = (user_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channels.* FROM `channels` INNER JOIN channels_member ON channels.id = channels_member.channel_id WHERE channels_member.user_id = ?;";
        con.query(sql, [user_id], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
const getSingleChannel = (channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT channels.*, (SELECT GROUP_CONCAT(categories.category ORDER BY categories.category ASC SEPARATOR ', ') FROM channels_category INNER JOIN categories ON channels_category.category_id = categories.id WHERE channels_category.channel_id = channels.id ) AS category FROM `channels` INNER JOIN channels_member ON channels.id = channels_member.channel_id WHERE channels.id = ?;";
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

module.exports = {
    createChannel,
    getUserChannels,
    getSingleChannel,
    updateChannel
};