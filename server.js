var express = require('express');
var app = express();
const fs = require('fs').promises;

app.use(express.json())
app.post('/', (req, res) => {
    let category = req.body.category;
    let people = req.body.pnum;
    let time = req.body.time;
    let mylist = [];
    getLocation(res);
    let data = fs.readFile('time.json', 'utf8');
    data.then(() => {
        let contents = JSON.parse(data);
        mylist = find(category, contents);
    })
    .catch(fileError(err, res));
})

function find(from, to){
    let list = [];
    for(let i in from){
        for(let j in to){
            if(from[i] == to[j].type){
                list.append(to[j]);
                break;
            }
        }
    }
    
    return mylist;
}

function getLocation(res) {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("can't get location");
        res.status(404).send("Can't find location");
        res.end();
    }
}

function fileError(err, res){
    console.log("can't read file");
    res.sendStatus(404);
    res.end();
}