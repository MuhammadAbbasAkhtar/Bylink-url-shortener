const helper = require('../helpers/common')
const config = require('../config/keys')
const shortid = require('shortid');
const UrlService = require('../services/UrlService');
const geoip = require('geoip-lite');
const shortUrl = async (req, res) => {
    try{
        const { origUrl } = req.body;
        const base = helper.getHostnameFromReferer(req);
        const token = helper.decodeToken(req)
        const urlId = shortid.generate();
        if(helper.validateUrl(origUrl)){
            try{
                let url = await UrlService.getUrl(origUrl)
                if(url) return helper.sendResponseMsg(res, "Url already shortened", false, 200)
                
                const shortUrl = `${base}r/${urlId}`;
                // const shortUrl = `${urlId}`;
                var data = {
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                    created_from_ip:helper.getClientIP(req),
                    clicks_ip:new Array()
                }
                if(token != null){
                    // console.log(`token`, token)
                    
                    Object.assign(data, {createdBy:token.id})
                }

                url = await UrlService.saveNewUrl(data)
                return helper.sendResponse(res, 200, {message:"Url Shortened Successfully", shortcode:urlId, success:true})
            }
            catch(e){
                helper.prettyLog(`catching ${e}`)
                helper.log2File(e.message,'error')
                return helper.sendResponse(res, 500, {message:e.message, success:false})
            }
        }
    }
    catch(e){
        helper.prettyLog(`catching ${e}`)
        helper.log2File(e.message,'error')
        return helper.sendResponse(res, 500, {message:e.message, success:false})
    }
}

const redirectUrl = async (req, res) => {
    try{
        const clientip = req.body.user
        if(!clientip) return helper.sendResponse(res, {success:false, message: "invalid url"})

        const url = await UrlService.getUrlByShortUrl(req.params.urlId)
        if(url){
            var clicksIP = url.clicks_ip;
                // if(clicksIP.some(cip => cip.clientip === clientip)){

                // }else{
                //     var location = geoip.lookup(clientip)
                //     clicksIP.push({clientip,location})
                // }
                var foundIndex = clicksIP.findIndex(x => x.clientip === clientip)
                if(foundIndex !== -1){//update
                    var newObj = clicksIP[foundIndex];
                    newObj.count += 1
                   clicksIP.splice(foundIndex, 1);
                   clicksIP.push(newObj)
                }else{
                    var location = geoip.lookup(clientip)
                    clicksIP.push({clientip,location,count:1})
                }
                // console.log(`clicksIP`, clicksIP)
            url.clicks_ip = clicksIP;
            await url.save();
                
             
            url.ip_last_clicked = clientip
            url.clicks++;
            await url.save();
            var redirectUrl = url.origUrl
            if(!url.origUrl.match(/((https?|ftp|mailto):(\/\/)?)+/g)){
                redirectUrl = "http://"+redirectUrl
            }
            
            return helper.sendResponse(res,{success:true, url: redirectUrl})
        }
        else return helper.sendResponse(res,{success:false})
        
    }
    catch(e){
        helper.prettyLog(`catching ${e}`)
        helper.log2File(e.message,'error')
        return helper.sendResponse(res, 500, {message:e.message, success:false})
    }
}
const redirect2Url = async (req, res) => {
    try{
        const url = await UrlService.getUrlByShortUrl(req.params.urlId)
        const client_ip = helper.getClientIP(req)
        if(url){
            var clicksIP = url.clicks_ip;
            var location = geoip.lookup(req.headers['x-forwarded-for'] || req.socket.remoteAddress)
            clicksIP.push({client_ip,location})
            url.clicks_ip = clicksIP
            
            url.ip_last_clicked = client_ip
            url.clicks++;
            url.save();
            var redirectUrl = url.origUrl
            if(!url.origUrl.match(/((https?|ftp|mailto):(\/\/)?)+/g)){
                redirectUrl = "http://"+redirectUrl
            }
            return res.redirect(redirectUrl)
        }
        else return helper.sendResponseMsg(res, "Not found", false, 404)
        
    }catch(e){
        helper.prettyLog(`catching ${e}`)
        helper.log2File(e.message,'error')
        return helper.sendResponse(res, 500, {message:e.message, success:false})
    }
}


const userBylinks = async (req, res) => {
    try{      

        
        const bylinks = await UrlService.getUserUrls(req.user.id)

        return helper.sendResponse(res, {success:true, bylinks})
    }catch(e){
        helper.prettyLog(`catching ${e}`)
        helper.log2File(e.message,'error')
        return helper.sendResponse(res, 500, {message:e.message, success:false})
    }
}
module.exports = {
    shortUrl,
    redirectUrl,
    redirect2Url,
    userBylinks
}