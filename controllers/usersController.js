const userHelper = require('../helper/users');

const viewAdminDashboard = async (req, res) => {
    try {
        const users = await userHelper.getAllUsers();
        const adminUser = req.session.user;
        res.render('admin/users', { users, adminUser, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await userHelper.deleteUser(userId);

        if (result === 'success') {
            res.json({ status: 'success', message: 'User deleted successfully' });
        } else {
            res.status(500).json({ status: 'error', message: 'Failed to delete user' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const banUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await userHelper.banUser(userId);

        if (result === 'success') {
            res.json({ status: 'success', message: 'User banned successfully' });
        } else {
            res.status(500).json({ status: 'error', message: 'Error banning user. Please try again.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

const unbanUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const result = await userHelper.unbanUser(userId);

        if (result === 'success') {
            res.json({ status: 'success', message: 'User unbanned successfully' });
        } else {
            res.status(500).json({ status: 'error', message: 'Error unbanning user. Please try again.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};


module.exports = {
    viewAdminDashboard,
    deleteUser,
    banUser,
    unbanUser
};
