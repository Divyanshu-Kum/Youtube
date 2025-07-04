const express = require('express')
const Router = express.Router()
const checkAuth = require('../api/middleware/checkAuth')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2
const video = require('../models/Video')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


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
            thumbnailId:uploadedThumbnail.public_id,
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

//update video details
Router.put('/:videoId',checkAuth,async(req,res) => {
    try
    {
      const verifiedUser = await jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
      const video = await Video.findById(req.params.video)
      console.log(video)

      if(video.user_id == verifiedUser._id)
      {
        //update video detail
        if(req.files)
        {
            //update thumbnail and text data
         await cloudinary.uploader.destroy(video.thumbnailId)
            const updatedThumbnail = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath)
            const updateData = {
                title:req.body.title,
                description:req.body.description,
                category:req.body.category,
                tags:req.body.tags.split(","),
                thumbnailUrl:updatedThumbnail.secure_url,
                thumbnailId:updatedThumbnail.public_id
            }

           const updatedvideoDetail = await video.findByIdAndUpdate(req.params.videoId)
           res.status(200).json({
            updatedVideo:updatedvideoDetail
           })
        }
        else{
            return res.status(500).json({
            error:'you have no permision'
        }
        
      }
      else{
        return res.status(500).json({
            error:'you have no permision'
        })
      }
      
      
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({
            error:err
        });
        
    }
})
       Router.delete('/:videoId',checkAuth,async(req,res) => {

        try{
             const verifiedUser = await jwt.verify(req.headers.authorization.split(" ")[1],'sbs online classes 123')
             console.log(verifiedUser)
                const video = await Video.findById(req.params.videoId)

                if(video.user_id == verifiedUser._id)
                {
                    //detlet video, thumbnail and data from database
                    await cloudinary.uploader.destroy(video.videoId)
                    await cloudinary.uploader.destroy(video.thumbnailId)
                    await deletedResponse = await video.findByIdAndDelete(req.params.videoId)
                    res.status(200).json({
                        deletedResponse:deletedResponse
                    })
                }
                else{
                    return res.status(500).json({
                        error:'you have no permision'
                    })
                }
             
             next()
        }
        catch(err)
        {
            console.log(err);
            res.status(500).json({
                error:err
            });
            
        }
       })

module.exports = Router