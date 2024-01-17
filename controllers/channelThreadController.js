const channelThreadsHelper = require('../helper/channelThread');
const threadViews = require('../helper/threadViews');

const channelHelper = require('../helper/channels');
const randomString = require("randomstring");

const viewAddThread = async (req, res) => {
    const user = req.session.user;
    const id = req.params.id;
    const channels = await channelHelper.getUserChannels(user.userId);
    const c = await channelHelper.getSingleChannel(id);
    console.log(c);
    res.render('client/channel/addThread', { c: c[0], user, channels, side: true });
}

const addThread = async (req, res) => {
    const id = `c-thread-${Date.now()}-${randomString.generate(10)}`;
    const user = req.session.user;
    const c_id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const channel = await channelHelper.getSingleChannel(c_id);

    await channelThreadsHelper.create(
        id,
        user.userId,
        c_id,
        title,
        content,
        channel[0].user_id == user.userId ? 2 : channel[0].auto_accept_post,
    );
    res.redirect('/channel/' + c_id + '/view');
}


const getChannelThread = async (req, res) => {
    const c_id = req.params.id;
    const type = req.body.type;
    const user = req.session.user;
    switch (type) {
        case '0':
            const all = await channelThreadsHelper.getChannelThread(c_id);
            res.json(all);
            break;
        case '1':
            const popular = await channelThreadsHelper.getPopularChannelThread(c_id);
            res.json(popular);
            break;
        case '2':
            const pin = await channelThreadsHelper.getChannelPinnedThread(c_id);
            res.json(pin);
            break;
        case '3':
            const channePendingThreads = await channelThreadsHelper.getChannelPendingThreads(c_id);
            res.json(channePendingThreads);
            break;
        case '4':
            const myPendingThreads = await channelThreadsHelper.getChannelMemberOnlyPendingThreads(c_id, user.userId);
            res.json(myPendingThreads);
            break;
        default:
            []
            break;
    }

}
const updateChannelThread = async (req, res) => {

    try {
        const id = req.params.id;
        const title = req.body.title;
        const content = req.body.content;
        await channelThreadsHelper.updateChannelThread(
            id,
            title,
            content,
        );
        res.json({
            'code': 200,
        });
    } catch (error) {
        res.json({
            'code': 505,
            'message': error,
        });
    }


}
const deleteChannelThread = async (req, res) => {

    try {
        const id = req.params.id;

        await channelThreadsHelper.deleteChannelThread(
            id,
        );
        res.json({
            'code': 200,
        });
    } catch (error) {
        res.json({
            'code': 505,
            'message': error,
        });
    }


}
const acceptChannedThread = async (req, res) => {


    try {
        const id = req.params.id;
        await channelThreadsHelper.acceptChannedThread(
            id,
        );
        res.json({
            'code': 200,
        });
    } catch (error) {
        res.json({
            'code': 505,
            'message': error,
        });
    }
}
const pinOrUnpinChannelThread = async (req, res) => {
    try {
        const id = req.params.id;

        const t = await channelThreadsHelper.getSingleChannelThread(id);

        await channelThreadsHelper.pinOrUnpinChannelThread(
            id,
            t[0].pin == 2 ? 1 : 2
        );
        res.json({
            'code': 200,
        });
    } catch (error) {
        res.json({
            'code': 505,
            'message': error,
        });
    }
}
const viewSingleChannelThread = async (req, res) => {
    const user = req.session.user;
    const c_id = req.params.c_id;
    const t_id = req.params.t_id;
    const channel = await channelHelper.getSingleChannel(c_id);

    const channels = await channelHelper.getUserChannels(user.userId);
    const t = await channelThreadsHelper.getSingleChannelThread(t_id);
    if (await threadViews.noViewYetChannelThread(user.userId, t_id)) {
        await threadViews.createChannelThreadViews(user.userId, t_id);
    }
    res.render('client/channel/viewThread', { c: channel[0], t: t[0], user, channels, side: true });
}
const getSingleChannelThread = async (req, res) => {
    const t_id = req.params.id;
    const t = await channelThreadsHelper.getSingleChannelThread(t_id);
    res.json(t[0]);
}

module.exports = {
    addThread,
    viewAddThread,
    getChannelThread,
    viewSingleChannelThread,
    getSingleChannelThread,
    updateChannelThread,
    deleteChannelThread,
    acceptChannedThread,
    pinOrUnpinChannelThread
}