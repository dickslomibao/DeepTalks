const con = require('../db/db');



const create = (user_id, channel_id, type, status) => {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO `channels_member`(`user_id`, `channel_id`, `type`, `status`) VALUES (?,?,?,?)";
        con.query(sql, [user_id, channel_id, type, status], (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
}

const channelMembers = (channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT  users.* FROM `channels_member` INNER JOIN users on channels_member.user_id = users.userID WHERE channels_member.status = 2 and channels_member.channel_id = ?";
        con.query(sql, [channel_id], (err, users) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(users);
            }
        });
    });
};

module.exports = {
    create,
    channelMembers
}