const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        return console.log('Uncable to coonect to Db');
    }
    console.log('connected to MongoDb')

    //findOneAndUpdate
    client.db('ToDo').collection('Todos').findOneAndUpdate(
        {text:'Some Text'},
        {$set:{completed:true}},
        {returnOriginal:false}
    ).then((result)=>{
        console.log(result)
    },(err)=>{
        console.log('Unable to delete '+err)
    });

    //client.close()
});