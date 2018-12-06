var express = require('express');
var app = express();

var fs = require('fs');

var data = fs.readFileSync('exampleData.json');
var words = JSON.parse(data);
console.log(words);

let count = 0;
fs.writeFile('temp.txt', `hello there Person${count++}.\n`, function(err){
    if (err) console.log(err);
    console.log("Successfully Written to File.");
    for(let i = 1;i<10;i++){
        fs.appendFile('temp.txt', `hello there Person${i}.\n`, function(err){
            if (err) console.log(err);
            console.log("Successfully appended to File.");
        });
    }
});