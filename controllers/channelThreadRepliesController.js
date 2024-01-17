
const channelThreadRepliesHelper = require('../helper/channelThreadReplies');



const create = async (req, res) => {
    const user = req.session.user;
    const content = req.body.content;
    const c_id = req.params.c_id;
    const t_id = req.params.t_id;
    await channelThreadRepliesHelper.create(
        user.userId,
        t_id,
        content,
    );
    res.redirect('back');
}

const getChannelThreadReplies = async (req, res) => {
    const user = req.session.user;
    const c_id = req.params.c_id;
    const t_id = req.params.t_id;
    const type = req.body.type;
    if (type == '1') {
        const result = await channelThreadRepliesHelper.getChannelThreadRepliesPinned(
            t_id,
        );
        res.json(result);
    } else {
        const result = await channelThreadRepliesHelper.getChannelThreadReplies(
            t_id,
        );
        res.json(result);
    }

}

const deleteChannelThreadReply = async (req, res) => {

    try {
        const id = req.params.id;
        await channelThreadRepliesHelper.deleteReply(
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

const pinOrUnpinReply = async (req, res) => {

    try {
        const id = req.params.id;
        let result = await channelThreadRepliesHelper.getChannelThreadSingleReplies(id);
        await channelThreadRepliesHelper.pinOrUnpinReply(
            id,
            result[0].pin == 2 ? 1 : 2,
        );
        res.json({
            'code': 200,
            'message': result[0].pin == 2 ? 'Unpinned Sucessfully' : 'Pinned Sucessfully',
        });
    } catch (error) {
        res.json({
            'code': 505,
            'message': error,
        });
    }


}

module.exports = {

    create, getChannelThreadReplies, deleteChannelThreadReply, pinOrUnpinReply

}