const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const favSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
    },
    publishedAt: {
        type: String,
    }, 
    url: {
        type: String,
        required: true
    },
    image:{
        type: String
    },
    summary: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    }
},{timestamps : true});

const Fav = mongoose.model('favourite', favSchema);

module.exports = Fav;