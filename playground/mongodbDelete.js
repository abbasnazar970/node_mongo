const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
    if(err){
        return console.log('Uncable to coonect to Db');
    }
    console.log('connected to MongoDb')

    //deleteMany
//     client.db('ToDo').collection('Todos').deleteMany({text:'eat lunch'}).then((result)=>{
//         console.log(result)
// },(err)=>{
//         console.log('Unable to delete '+err)
// });

    //deleteOne
    // client.db('ToDo').collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{
    //     console.log(result)
    // },(err)=>{
    //     console.log('Unable to delete '+err)
    // });

    //deleteAndFindOne
    client.db('ToDo').collection('Todos').findOneAndDelete({text:'eat lunch'}).then((result)=>{
        console.log(result)
    },(err)=>{
        console.log('Unable to delete '+err)
    });

    //client.close()
});