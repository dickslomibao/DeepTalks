const thread = require('../helper/thread');
const category = require('../helper/category');
const channel = require('../helper/channels');
const tViews = require('../helper/threadViews');
const usersHelper = require('../helper/users');

const randomString = require("randomstring");

const mainView = async (req, res) => {
    const user = req.session.user;
    const channels = await channel.getUserChannels(user.userId);
    const topContributor = await usersHelper.topContributor();
    res.render('client/index', { user, channels, topContributor });
}
const myThreadsView = async (req, res) => {
    const user = req.session.user;
    const channels = await channel.getUserChannels(user.userId);
    const topContributor = await usersHelper.topContributor();
    res.render('client/mythreads', { user, channels, topContributor });
}


const viewCreate = async (req, res) => {
    console.log(req.session.user);
    category.getAllCategory(
        async (err, result) => {
            if (err) {
                res.send('Error fetching threads:', err);
            } else {
                console.log(result);
                const user = req.session.user;
                const channels = await channel.getUserChannels(user.userId);
                const topContributor = await usersHelper.topContributor();
                res.render('client/create', { user, channels, category: result, topContributor });
            }
        }
    );

};

const viewUpdate = async (req, res) => {
    console.log(req.session.user);

    let c = await category.getAllCategoryPromise();
    const user = req.session.user;
    const id = req.params.id;

    let result = await thread.getSingleThreadPromise(id);
    console.log(result);

    const channels = await channel.getUserChannels(user.userId);
    const c_category = result[0].category == null ? [] : result[0].category.split(', ');
    const topContributor = await usersHelper.topContributor();
    res.render('client/update', { c_category, thread: result[0], user, channels, category: c, topContributor });

};
const update = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    const categories = req.body.category;

    const t_result = await thread.updateChannelThread(
        id,
        title,
        content,
    );
    await category.deleteThreadCategory(id);
    if (t_result == 'success') {
        for (let index = 0; index < categories.length; index++) {
            await category.createThreadCategory(id, categories[index]);
        }
    }
    res.redirect(`/threads/${id}/view`);
}


const create = async (req, res) => {
    const user = req.session.user;
    const title = req.body.title;
    const content = req.body.content;
    const categories = req.body.category;
    const id = `thread-${Date.now()}-${randomString.generate(10)}`;
    const t_result = await thread.create(
        id,
        title,
        content,
        user.userId,
    );
    if (t_result == 'success') {
        for (let index = 0; index < categories.length; index++) {
            await category.createThreadCategory(id, categories[index]);
        }
    }
    res.redirect('/');
}

const getAllThread = async (req, res) => {
    const type = req.body.type;

    console.log(type);
    switch (type) {
        case '0':
            thread.getAllThread(
                (err, result) => {
                    if (err) {
                        res.send('Error fetching threads:', err);
                    } else {
                        res.json(result);
                    }
                }
            );
            break;
        case '1':
            thread.getPopularThread(
                (err, result) => {
                    if (err) {
                        res.send('Error fetching threads:', err);
                    } else {
                        res.json(result);
                    }
                }
            );
            break;
        case '2':
            thread.getMostViewedThread(
                (err, result) => {
                    if (err) {
                        res.send('Error fetching threads:', err);
                    } else {
                        res.json(result);
                    }
                }
            );
            break;
        default:
            [];
            break;
    }


}


const getAllThreadOfSingleUser = async (req, res) => {
    const type = req.body.type;
    const user = req.session.user;
    console.log(type);
    switch (type) {
        case '0':
            console.log(user.userId);
            res.json(await thread.getAllThreadSingleUser(user.userId));
            break;
        case '1':
            res.json(await thread.getPopularThreadSingleUser(user.userId));
            break;
        case '2':
            res.json(await thread.getMostViewedThreadSingleUser(user.userId));
            break;
        default:
            [];
            break;
    }


}
const deleteThread = async (req, res) => {

    try {
        const id = req.params.id;

        await thread.deleteThread(
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
const viewSingleThread = (req, res) => {
    const user = req.session.user;
    const id = req.params.id;

    thread.getSingleThread(id,
        async (err, result) => {
            if (err) {
                res.send('Error fetching threads:', err);
            } else {
                const channels = await channel.getUserChannels(user.userId);
                if (await tViews.noViewYet(user.userId, id) == true) {
                    await tViews.create(user.userId, id);
                }
                const topContributor = await usersHelper.topContributor();
                res.render('client/view', { thread: result[0], user, channels, topContributor });
            }
        }
    );
}

module.exports = {
    mainView,
    viewCreate,
    create,
    getAllThread,
    viewSingleThread,
    viewUpdate,
    update,
    deleteThread,
    myThreadsView,
    getAllThreadOfSingleUser
}