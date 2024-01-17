const con = require('../db/db');

const getAllCategories = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT `id`, `category`, `created_at`, `updated_at` FROM `categories`";
        con.query(sql, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

const createCategory = (categoryName) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO `categories` (`category`) VALUES (?)';
        con.query(sql, [categoryName], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};
const deleteCategory = (categoryId) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM `categories` WHERE `id` = ?';
        con.query(sql, [categoryId], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};
const updateCategory = (categoryId, newCategoryName) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE `categories` SET `category` = ? WHERE `id` = ?';
        con.query(sql, [newCategoryName, categoryId], (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve('success');
            }
        });
    });
};
module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
    updateCategory
};
