const category = require('../helper/adminCategory');

const viewCategories = async (req, res) => {
    try {
        const categories = await category.getAllCategories();
        const adminUser = req.session.user;
        res.render('admin/category', { categories, adminUser });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
const addCategory = async (req, res) => {
    try {
        const categoryName = req.body.categoryName;

        if (!categoryName) {
            return res.status(400).json({ status: 'error', message: 'Category name is required' });
        }

        const result = await category.createCategory(categoryName);

        if (result === 'success') {
            res.redirect('/admin/category');
        } else {
            res.status(500).json({ status: 'error', message: 'Failed to add category' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        const result = await category.deleteCategory(categoryId);

        if (result == 'success') {


            res.json({ status: 'success', message: 'Category deleted successfully' });
        } else {
            res.status(500).json({ status: 'error', message: 'Error deleting category. Please try again.' + result + categoryId });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const newCategoryName = req.body.newCategoryName;

        if (!newCategoryName) {
            return res.status(400).json({ status: 'error', message: 'New category name is required' });
        }
        const result = await category.updateCategory(categoryId, newCategoryName);
        if (result === 'success') {
            return res.redirect('/admin/category');
        } else {
            return res.status(500).json({ status: 'error', message: 'Error updating category. Please try again.' });
        }
    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

module.exports = {
    viewCategories,
    deleteCategory,
    addCategory,
    updateCategory
};
