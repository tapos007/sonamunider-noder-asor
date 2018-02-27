const Category = require('../model/category');
require('express-async-errors');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const uniqid = require('uniqid');
module.exports = {
    getAllCategory : async (req,res)=>{
        try{
            let categories = await Category.find({});
            res.render("admin/category/index",{categories});
        }catch(err){
            console.log(err);
        }
    },

    insertCategoryGet : async (req,res)=>{
        res.render("admin/category/add-category");
    },
    insertCategoryPost :  async (req,res)=>{
        let name = req.body.name;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.render("admin/category/add-category",{name:name, errors: errors.array() });
        }else{

            try{
                let slug = name.replace(/\s+/g, '-').toLowerCase()+uniqid();
                var cateogy = new Category({ name,slug });
                await cateogy.save();
                res.flash('danger', 'Category Added');
                res.redirect('/admin/category');
            }catch(err){
                console.log(err);
            }
        }
    },

    UpdateCategoryGet : async (req,res)=>{
        try{
            let nowSlug = req.params.slug;
            let category = await Category.findOne({slug:nowSlug});
            let {name,slug} = category;
            res.render("admin/category/edit-category",{name,slug});
        }catch (err){
            console.log(err);
        }

    },

    UpdateCategoryPost : async (req,res)=>{
        let {name,slug} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.render("admin/category/edit-category",{name,slug, errors: errors.array() });
        }else{

            try{

                await Category.updateOne({slug},{name});
                res.flash('success', 'Category updated');
                res.redirect('/admin/category');
            }catch(err){
                console.log(err);
            }
        }

    },

    DeleteCategory : async (req,res)=>{
        var nowSlug = req.params.slug;
        try{
            await  Category.remove({slug:nowSlug});
            res.json({success:true,message:"date remove successfully"});
        }catch (err){
            res.json({success:false,message:err.message});
        }

    }
};