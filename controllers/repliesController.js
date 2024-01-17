const replies = require('../helper/replies');


const create = async (req, res) => {
    const thread_id = req.params.id;
    const user = req.session.user;
    const content = req.body.content;
    await replies.create(
        thread_id,
        user.userId,
        content
    );
    res.redirect('back');
}
const getThreadReplies = async (req, res) => {
    const thread_id = req.params.id;
    const type = req.body.type;
    console.log(thread_id);
    if (type == "0") {
        const result = await replies.getThreadReplies(thread_id);

        res.json(result);
    } else {
        const result = await replies.getThreadPinReplies(thread_id);

        res.json(result);
    }
}



const deleteReply = async (req, res) => {

    try {
        const id = req.params.id;
        await replies.deleteReplies(
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

        let result = await replies.getThreadSinglesReplies(id);
        console.log(id);
        await replies.pinOrUnPinReplies(
            result[0].pin == 2 ? 1 : 2,
            id,
        );
        res.json({
            'code': 200,
            'message': result[0].pin == 2 ? "Unpinned Successfully" : 'Pinned succesfully',
        });
    } catch (error) {
        res.json({
            'code': 505,
            'message': error,
        });
    }


}
module.exports = {
    create,
    getThreadReplies,
    deleteReply,
    pinOrUnpinReply,
}