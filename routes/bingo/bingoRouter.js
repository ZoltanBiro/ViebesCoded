const express = require('express');
const fs = require('fs');
const router = express.Router();

//routes for the Bingo Router

router.get('/', (req, res) => {
  console.log(__dirname+'/bingo.html')

  res.sendFile(__dirname+'/bingo.html')

});

router.post('/addPrompt', function(req,res){
  fs.appendFile('./prompts.txt','\n'+req.body.value, (err)=>{
    if (err){
      console.log("error append word to file.");
    }else{
      console.log(req.body.value+" added to file");
    }
  });
});



module.exports = router;
