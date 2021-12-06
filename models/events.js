const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    category: {type: String,required: [true, 'category is required']},
    name: {type: String,required: [true, 'name is required']},
    head: {type: String,required: [true, 'head is required']},
    dean: {type: String,required: [true, 'dean is required']},
    start_time: {type: String,required: [true, 'Start_time is required']},
    end_time: {type: String,required: [true, 'end_time is required']},
    location: {type: String,required: [true, 'location is required']},
    image:{type: String,required: [true, 'Image URL is required']},
    host: {type: Schema.Types.ObjectId, ref:"User"}, // Mongoose knows that it should locate ObjectId in User collection 
    Description: {type: String,required: [true, 'Event Description is required'],
          minLength: [10,'the content should have atleast 10 characters']}
},
);

// collection name is events in the database
module.exports = mongoose.model('balu', eventSchema);













