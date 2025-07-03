const mongoose = require('mongoose')


const videoSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{type:String,required:true},
    description:{type:String,required:true},
    video_id:{type:String,required:true},
    videoUrl:{type:String,required:true},
    videoId:{type:String,required:true},
    thumbnailUrl:{type:String,required:true},
    thumbnailId:{type:String,required:true},
    category:{type:String,required:true},
    tags:{type:String},
    likes:{type:Number,require:true,default:0},
    dislikes:{type:Number,require:true,default:0},
    views:{type:Number,default:0},
    likeBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    dislikeBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    viewBy:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
    
}, { timestamps: true });

module.exports = mongoose.model('video',videoSchema);
