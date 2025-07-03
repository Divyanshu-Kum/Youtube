const express = require('express')
const Router = express.Router()
const checkAuth = require('../api/middleware/checkAuth')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const video = require('../models/Video')

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

Router.post('/upload',checkAuth,async(req,res) => {
    try{
        const token = req.headers.authorization.split(" ")[1]
           const user = await jwt.verify(token, 'sbs online classes 123')
    //        console.log(user)
    //        console.log(request.files.video)
    //        console.log(request.files.thumbnail)
    const uploadedVideo = await cloudinary.v2.uploader.upload(req.files.video.tempFilePath,{
        resource_type:'video'
    })
       const uploadedThumbnail = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath)
       
       const newvideo = new video({
        _id: mongoose.Schema.Types.ObjectId,
            title:req.body.title,
            description:body.description,
            user_id:user_id,
            video_id:uploadedVideo.secure_url,
            videoUrl:uploadedThumbnail.secure_url,
            videoId:uploadedVideo.public_url,
            thumbnailUrl:uploadedThumbnail.secure_url,
            thumbnailId:uploadedThumbnail.secure_url,
            category:req.body.category,
            tags:req.body.tags.split(",")
           
       })
const newUploadedVideo = await newvideo.save()
       res.status(200).json({
        newvideo:newUploadedVideoDate
       })

    }
    catch(err)
    {
        console.log(err)
        resizeBy.status(500).json({
            error:err
        })
    }
})

module.exports = Router