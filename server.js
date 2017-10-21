import Express from 'express';
import body_parser from 'body-parser';
import path from 'path';
import Cors from 'cors';
import Mongo, {Schema} from 'mongoose';

Mongo.Promise = global.Promise;
Mongo.connect('mongodb://localhost/prueba', {useMongoClient: true});
const db = Mongo.connection;
db.on('error',()=>console.log('Fallo en la conexion a la DB'))
.once('open',()=>console.log('Conexion exitosa'))

const Hits = Mongo.model('Hits', new Schema(), 'hits');

const app = Express();

app.use(Cors());

app.use(Express.static(path.join(__dirname, 'public')))

app.use(body_parser.urlencoded({
  extended: true
}));

app.use(body_parser.json());

app.get("/",(req,res)=>{
    res.json(true);
});

app.get("/hits",async(req,res)=>{

    const _result = await Hits
    .find({})
    .exec((err, data) => data);
    res.json(_result);
});

app.delete("/hits/:id",async(req,res)=>{

    const _result = await Hits
    .remove({objectID:req.params.id})
    .exec((err, data) => data);
    res.json(_result);
});

app.listen(8000,()=>{console.log("Run")})