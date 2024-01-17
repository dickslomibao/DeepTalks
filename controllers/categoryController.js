const category = require('../helper/category');

const getAllCategory = () => {
    category.getAllCategory(
        (err, result) => {
            if (err) {
                res.send('Error fetching threads:', err);
            } else {
                return result;
            }
        }
    );
}

module.exports = {
    getAllCategory,
}