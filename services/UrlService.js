const Url = require('../models/Url');

const getUrl = async origUrl  => { return await Url.findOne({origUrl }) }

const getUrlByID = async id  => { return await Url.findById(id) }

const getUrlByShortUrl = async shortUrl  => { return await Url.findOne({urlId:shortUrl}) }


const saveNewUrl = async data => { return await new Url(data).save() } 

const getUserUrls = async createdBy => { 
    return await Url.find({createdBy}).select({
        created_from_ip:0,
        urlId:0
    }) 
}
module.exports = {
    getUrl,
    saveNewUrl,
    getUrlByID,
    getUrlByShortUrl,
    getUserUrls
}