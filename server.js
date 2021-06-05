var express = require('express');
var app = express();
const fs = require('fs');

app.use(express.json())
app.get('/', (req, res) => {
    /*let category = req.body.category;
    let people = req.body.pnum;
    let time = req.body.time;
    let mylist = [];
    let prefer = req.body.prefer;
    let hate = req.body.hate;
    let X = req.body.x;
    let Y = req.body.y*/
    let mylist;
    let category = ["양식", "중식", "일식", "PC방", "볼링장", "노래방", "코인 노래방", "공원", "당구장", "방탈출", "박물관", "보드 게임 카페", "카페", "주점", "미술관", "연극극장", "백화점", "마사지", "아쿠아리움", "사진관", "만화카페"];
    console.log(category);
    let hate = ["양식", "중식", "일식"];
    //getLocation(res);
    try{
        fs.readFile('time.json', 'utf8', function(err, data){
            if(err){
                console.log(err);
                res.status(404).send(err);
            }
            console.log(data);
            let contents = JSON.parse(data);
            console.log(contents);
            mylist = findFromContents(category, contents);
            console.log(mylist);
            mylist = findHate(mylist, hate);
            console.log(mylist);
        });
    }
    catch(err){
        console.log(err);
        res.status(404).send(err);
        res.end();
    }
    
    console.log(mylist);
    res.write(mylist);
    res.json();
})

function findHate(from, condition){
    let newlist = [];
    for(let i in from){
        let donothate = true;
        for(let j in condition){
            if(from[i].type == condition[j]){
                donothate = false;
                break;
            }
        }
        if(donothate){
            newlist.push(from[i]);
        }
    }
    return newlist;
}

function findPref(from, condition){
    let newlist = [];
    for(let i in from){
        for(let j in condition){
            if(from[i].type == condition[j]){
                list.push(from[i]);
                break;
            }
        }
    }
    return newlist;
}

function findFromContents(from, content){
    let newlist = [];
    for(let i in from){
        for(let j in content){
            if(from[i] == content[j].type){
                newlist.push(content[j]);
                break;
            }
        }
    }
    
    return newlist;
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

function getXY(){

}

app.listen(3000, function(){
    console.log("server on");
})