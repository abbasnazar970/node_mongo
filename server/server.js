var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/ToDo");

var Todo = mongoose.model('Todo',{
    text:{
        type:String,
        required : true,
        minlength : 1,
        trim : true
    },
    completed:{
        type: Boolean,
        default : false
    },
    CompletedAt:{
        type : Number,
        default : null

    }

});

var newToDo = new Todo({
    text : '   eat it  ',
    completed : true,
    CompletedAt : 2018
});

newToDo.save().then((doc)=>{
    console.log('Inserted',doc)
},(err)=>{
    console.log("Unable to save",err)
})