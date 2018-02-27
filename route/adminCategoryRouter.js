var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const AdminCategoryController = require('../controller/adminCategoryController');

// define the home page route
router.get('/',  AdminCategoryController.getAllCategory);
// define the about route
router.get('/new-category',  AdminCategoryController.insertCategoryGet);
router.post('/new-category', [
    check('name').isLength({ min: 1 }).trim().withMessage('Title must have a value.'),

], AdminCategoryController.insertCategoryPost);

router.get('/:slug',  AdminCategoryController.UpdateCategoryGet);

router.post('/update',[
    check('name').isLength({ min: 1 }).trim().withMessage('Title must have a value.'),

],AdminCategoryController.UpdateCategoryPost);

router.delete('/:slug',  AdminCategoryController.DeleteCategory);


module.exports = router;