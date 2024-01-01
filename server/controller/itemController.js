const Items = require('../model/itemSchema');
const mongoose = require('mongoose');

exports.insertItem = async function(req, res) {
    const item = new Items({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        title: req.body.title,
        description: req.body.description
    });
    await item.save().then(result => {
        res.status(201).json({
            message: 'Item added successfully',
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.getItems = function(req, res) {
    Items.find().then(result => {
        res.status(200).json({
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};
exports.getOneItem = function(req, res) {
    Items.findById(req.params.id).then(result => {
        res.status(200).json({
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};
exports.updateItem = function(req, res) {
    Items.findByIdAndUpdate(req.params.id, req.body).then(result => {
        res.status(200).json({
            message: 'Item updated successfully',
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};
exports.deleteItem = function(req, res) {
    Items.findByIdAndDelete(req.params.id).then(result => {
        res.status(200).json({
            message: 'Item deleted successfully',
            data: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
}