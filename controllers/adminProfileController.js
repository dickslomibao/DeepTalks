const adminProfile = require('../helper/adminProfile');

const viewProfile = async (req, res) => {
    try {
        const adminUser = req.session.user;
        console.log(adminUser);
        res.render('admin/profile', { adminUser, });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const updateProfile = async (req, res) => {
    try {

        const adminUser = req.session.user;
        const newProfilePic = '/img/profile/' + req.file.filename;
        req.session.user.profile = newProfilePic;
        req.session.user.newProfilePic = newProfilePic;
        const result = await adminProfile.updateProfile(adminUser.userId, {
            newProfilePic
        });

        if (result === 'success') {
            res.redirect('/admin/profile');
        } else {
            res.status(500).json({ status: 'error', message: 'Error updating profile. Please try again.' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const updateInfo = async (req, res) => {
    try {
        const adminUser = req.session.user;
        const newFullName = req.body.newFullName;


        const result = await adminProfile.updateInfo(adminUser.userId, {
            newFullName,
        });

        req.session.user.name = newFullName;
        if (result === 'success') {
            res.redirect('/admin/profile');
        } else {
            res.status(500).json({ status: 'error', message: 'Error updating profile. Please try again.' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
module.exports = {
    viewProfile,
    updateProfile,
    updateInfo,
};