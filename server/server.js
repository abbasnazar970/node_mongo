var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/ToDo");

var Todo = mongoose.model('Todo',{
    text:{
        type:String
    },
    completed:{
        type: Boolean
    },
    CompletedAt:{
        type : Number
    }

});

var newToDo = new Todo({
    text : 'eat',
    completed : false,
    CompletedAt : 2018
});

newToDo.save().then((doc)=>{
    console.log('Inserted',doc)
},(err)=>{
    console.log("Unable to save",err)
})