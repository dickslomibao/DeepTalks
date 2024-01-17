const express = require('express');
const router = express.Router();
const mainCon = require('../controllers/mainController');
const authController = require('../controllers/authController');
const middlware = require('../middleware/middeware');
const threadController = require('../controllers/threadController');
const repliesController = require('../controllers/repliesController');
const channelController = require('../controllers/channelController');
const channelThreadController = require('../controllers/channelThreadController');
const channelThreadRepliesController = require('../controllers/channelThreadRepliesController');
const userController = require('../controllers/usersController');
const adminCategoryController = require('../controllers/adminCategoriesController');
const adminProfileController = require('../controllers/adminProfileController');
const clientProfileController = require('../controllers/clientProfileController');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: './public/img/profile/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get('/', middlware.isLoggedIn, threadController.mainView);
router.get('/admin/users', middlware.isLoggedIn, userController.viewAdminDashboard);
router.put('/admin/user/ban/:userId', middlware.isLoggedIn, userController.banUser);
router.put('/admin/user/unban/:userId', middlware.isLoggedIn, userController.unbanUser);
router.get('/admin/category', middlware.isLoggedIn, adminCategoryController.viewCategories);
router.post('/admin/category/add', middlware.isLoggedIn, adminCategoryController.addCategory);
router.get('/admin/profile', middlware.isLoggedIn, adminProfileController.viewProfile);
router.post('/admin/profile/updateInfo', middlware.isLoggedIn, adminProfileController.updateInfo);
router.post('/admin/profile/updateProfile', middlware.isLoggedIn, upload.single('newProfilePic'), adminProfileController.updateProfile);

router.post('/admin/category/update/:categoryId', middlware.isLoggedIn, adminCategoryController.updateCategory);
router.delete('/admin/category/delete/:categoryId', middlware.isLoggedIn, adminCategoryController.deleteCategory);
router.delete('/user/:userId/delete', middlware.isLoggedIn, userController.deleteUser);

router.post('/updateClientProfile', middlware.isLoggedIn, upload.single('newProfilePic'), clientProfileController.updateClientProfile);
router.post('/updateClientInfo', middlware.isLoggedIn, clientProfileController.updateClientInfo);

router.get('/threads/create', middlware.isLoggedIn, threadController.viewCreate);

router.get('/threads/:id/view', middlware.isLoggedIn, threadController.viewSingleThread);
router.get('/threads/:id/update', middlware.isLoggedIn, threadController.viewUpdate);
router.post('/threads/:id/update', middlware.isLoggedIn, threadController.update);
router.post('/threads/:id/delete', middlware.isLoggedIn, threadController.deleteThread);


router.post('/threads/create', middlware.isLoggedIn, threadController.create);
router.post('/threads/retreive', middlware.isLoggedIn, threadController.getAllThread);
router.get('/threads/mythreads', middlware.isLoggedIn, threadController.myThreadsView);
router.post('/threads/mythreads', middlware.isLoggedIn, threadController.getAllThreadOfSingleUser);

router.post('/threads/:id/view', middlware.isLoggedIn, repliesController.create);
router.post('/threads/:id/view/comments/retrive', middlware.isLoggedIn, repliesController.getThreadReplies);
router.post('/threads/getsinglethreadreply/:id/delete', middlware.isLoggedIn, repliesController.deleteReply);
router.post('/threads/getsinglethreadreply/:id/pin', middlware.isLoggedIn, repliesController.pinOrUnpinReply);


router.get('/channel/create', middlware.isLoggedIn, channelController.viewCreate);
router.post('/channel/create', middlware.isLoggedIn, upload.single('image'), channelController.create);
router.get('/channel/:id/view', middlware.isLoggedIn, channelController.viewSingleChannel);
router.get('/channel/:id/details', middlware.isLoggedIn, channelController.viewSingleChannelDetails);
router.get('/channel/:id/update', middlware.isLoggedIn, channelController.viewUpdate);
router.post('/channel/:id/update', middlware.isLoggedIn, channelController.updateChannel);

router.get('/channel/create', middlware.isLoggedIn, channelController.viewCreate);
router.post('/channel/:id/searchuser', middlware.isLoggedIn, channelController.searchUser);
router.post('/channel/:id/getmembers', middlware.isLoggedIn, channelController.getMembers);
router.get('/channel/:id/add/:user_id', middlware.isLoggedIn, channelController.addMember);

router.get('/channel/:id/view/create', middlware.isLoggedIn, channelThreadController.viewAddThread);
router.post('/channel/:id/view/create', middlware.isLoggedIn, channelThreadController.addThread);
router.post('/channel/:id/view', middlware.isLoggedIn, channelThreadController.getChannelThread);
router.get('/channel/:c_id/view/thread/:t_id/view', middlware.isLoggedIn, channelThreadController.viewSingleChannelThread);
router.post('/channel/getsinglechannelthread/:id', middlware.isLoggedIn, channelThreadController.getSingleChannelThread);
router.post('/channel/getsinglechannelthread/:id/save', middlware.isLoggedIn, channelThreadController.updateChannelThread);
router.post('/channel/getsinglechannelthread/:id/delete', middlware.isLoggedIn, channelThreadController.deleteChannelThread);
router.post('/channel/getsinglechannelthread/:id/accept', middlware.isLoggedIn, channelThreadController.acceptChannedThread);
router.post('/channel/getsinglechannelthread/:id/pin', middlware.isLoggedIn, channelThreadController.pinOrUnpinChannelThread);


router.post('/channel/:c_id/view/thread/:t_id/view', middlware.isLoggedIn, channelThreadRepliesController.create);
router.post('/channel/:c_id/view/thread/:t_id/view/replies/retrieve', middlware.isLoggedIn, channelThreadRepliesController.getChannelThreadReplies);
router.post('/channel/getsinglechannelthreadreply/:id/delete', middlware.isLoggedIn, channelThreadRepliesController.deleteChannelThreadReply);
router.post('/channel/getsinglechannelthreadreply/:id/pin', middlware.isLoggedIn, channelThreadRepliesController.pinOrUnpinReply);


router.get('/signout', authController.signOut);
router.get('/signin', middlware.isNotLoggedIn, authController.getSignIn);
router.post('/signin', middlware.isNotLoggedIn, authController.postSignIn);
router.get('/signup', middlware.isNotLoggedIn, authController.getSignUp);
router.post('/signup', middlware.isNotLoggedIn, upload.single('image'), authController.postSignUp);
router.post('/check-existing-account', authController.checkExistingAccount);
router.use('/client', middlware.isLoggedIn, middlware.isClient);
router.get('/client/index', mainCon.getClientHome);
router.use('/admin', middlware.isLoggedIn, middlware.isAdmin);
router.get('/admin/users', mainCon.getAdminDashboard);
router.use('*', mainCon.getPageNotFound);
module.exports = router;
