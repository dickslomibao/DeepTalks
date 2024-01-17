const clientProfile = require('../helper/clientProfile');


const updateClientProfile = async (req, res) => {
    try {
        const client = req.session.user;
        const newProfilePic = '/img/profile/' + req.file.filename;
        const result = await clientProfile.updateClientProfile(client.userId, {
            newProfilePic
        });

        if (result === 'success') {
            req.session.user.profile = newProfilePic;

            const referer = req.headers.referer || '/';
            req.session.user.newProfilePic = newProfilePic;


            res.redirect(referer);
        } else {
            res.status(500).json({ status: 'error', message: 'Error updating profile. Please try again.' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const updateClientInfo = async (req, res) => {
    try {
        const client = req.session.user;
        const newFullName = req.body.newFullName;
        const newUsername = req.body.newUsername;
        const newEmail = req.body.newEmail;
        const result = await clientProfile.updateInfoClient(client.userId, {
            newFullName,
            newUsername,
            newEmail,
        });

        if (result === 'success') {
            const referer = req.headers.referer || '/';
            req.session.user.name = newFullName;
            req.session.user.username = newUsername;
            req.session.user.email = newEmail;
            res.redirect(referer);
        } else {
            res.status(500).json({ status: 'error', message: 'Error updating profile. Please try again.' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
module.exports = {
    updateClientProfile,
    updateClientInfo
};