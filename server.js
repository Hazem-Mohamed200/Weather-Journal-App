import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';


let projectData = [];

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('website'));
app.use(bodyParser.urlencoded({extended: false}));


const server = app.listen(port, ()=>{
    console.log('Server is UP');
    console.log(`Running local host on ${port}`);
});

app.get('/getRoute', function(req, res){
    res.send(projectData);
    projectData = [];
});

app.post('/postRoute', function(req, res){

    projectData.push({
            date: req.body.date,
            city: req.body.city,
            temperature: req.body.temperature,
            feeling: req.body.feeling
        });
});
