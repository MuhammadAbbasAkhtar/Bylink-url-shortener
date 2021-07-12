const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true,
    },
    origUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: String,
        default: Date.now,
    },
    created_from_ip:{
        type: String,
        required:true
    },
    ip_last_clicked:{
        type: String,
        required: false,
    },
    clicks_ip:{
        type: [Object],
        required:false,
        default:[]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }, 
});
module.exports = mongoose.model('Url', UrlSchema);