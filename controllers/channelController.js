const thread = require('../helper/thread');
const category = require('../helper/category');
const channel = require('../helper/channels');
const channelMember = require('../helper/channelMember');
const users = require('../helper/users');
const randomString = require("randomstring");


const viewCreate = (req, res) => {
    console.log(req.session.user);
    category.getAllCategory(
        async (err, result) => {
            if (err) {
                res.send('Error fetching threads:', err);
            } else {
                const user = req.session.user;
                const channels = await channel.getUserChannels(user.userId);
                const topContributor = await users.topContributor();
                res.render('client/channel/create', { channels, user: req.session.user, category: result, topContributor });
            }
        }
    );
};

const searchUser = async (req, res) => {
    const name = req.body.name;
    const channelId = req.params.id;
    let result = await users.searchUsers(
        name,
        channelId,
    );
    res.json(result);
};
const getMembers = async (req, res) => {

    const channelId = req.params.id;
    let result = await channelMember.channelMembers(
        channelId,
    );
    res.json(result);
};
const create = async (req, res) => {

    const id = `channel-${Date.now()}-${randomString.generate(10)}`;
    const user_id = req.session.user.userId;
    const name = req.body.name;
    const description = req.body.description;

    const thumbnail = '/img/profile/' + req.file.filename;
    const categories = req.body.category;
    const private = req.body.private === '2' ? 2 : 1;
    const auto_accept_post = req.body.auto_accept_post === '2' ? 2 : 1;
    const allow_members_add = req.body.allow_members_add === '2' ? 2 : 1;
    const auto_accept_joined_members = req.body.auto_accept_joined === '2' ? 2 : 1;
    const result = await channel.createChannel(
        id,
        name,
        description,
        user_id,
        thumbnail,
        private,
        randomString.generate(6),
        auto_accept_post,
        allow_members_add,
        auto_accept_joined_members
    );
    if (result == 'success') {
        for (let index = 0; index < categories.length; index++) {
            await category.createChannelCategory(id, categories[index]);
        }
        await channelMember.create(
            user_id,
            id,
            2,
            2,
        );
        res.redirect('/channel/' + id + '/view');
    }
}


const updateChannel = async (req, res) => {
    const c_id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const categories = req.body.category;
    const private = req.body.private === '2' ? 2 : 1;
    const auto_accept_post = req.body.auto_accept_post === '2' ? 2 : 1;
    const allow_members_add = req.body.allow_members_add === '2' ? 2 : 1;
    const auto_accept_joined_members = req.body.auto_accept_joined === '2' ? 2 : 1;
    const result = await channel.updateChannel(
        c_id,
        name,
        description,
        private,
        auto_accept_post,
        allow_members_add,
        auto_accept_joined_members,
    );
    if (result == 'success') {
        await category.deleteAllChannelCategory(c_id);
        for (let index = 0; index < categories.length; index++) {
            await category.createChannelCategory(c_id, categories[index]);
        }
        res.redirect('/channel/' + c_id + '/details');
    }
}


const addMember = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const user_id = req.params.user_id;
    const c = await channel.getSingleChannel(id);
    await channelMember.create(
        user_id,
        id,
        2,
        2,
    );
    res.redirect('back');
}

const viewSingleChannel = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const channels = await channel.getUserChannels(user.userId);
    const c = await channel.getSingleChannel(id);
    console.log(user);
    res.render('client/channel/view', { c: c[0], user, channels, side: true });
}
const viewSingleChannelDetails = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const channels = await channel.getUserChannels(user.userId);
    const c = await channel.getSingleChannel(id);
    console.log(user);
    res.render('client/channel/details', { c: c[0], user, channels, side: true });
}

const viewUpdate = (req, res) => {
    console.log(req.session.user);
    category.getAllCategory(
        async (err, result) => {
            if (err) {
                res.send('Error fetching threads:', err);
            } else {
                const id = req.params.id;
                const user = req.session.user;
                const c = await channel.getSingleChannel(id);
                const channels = await channel.getUserChannels(user.userId);
                const c_category = c[0].category == null ? [] : c[0].category.split(', ');
                res.render('client/channel/updateChannel', { c_category, c: c[0], channels, user: req.session.user, category: result, side: true });
            }
        }
    );
};

module.exports = {
    viewCreate,
    create,
    viewSingleChannel,
    viewCreate,
    create,
    viewSingleChannel,
    searchUser,
    getMembers,
    addMember,
    viewSingleChannelDetails,
    viewUpdate,
    updateChannel
}