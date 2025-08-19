// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const router = express.Router();
const morgan = require('morgan'); 
const favicon = require('serve-favicon');


//initiate the testing flag, if there is any command line arguemnt this will enter testing mode
let prod = true;
if (process.argv.length>2){
    prod=false;
}

//router js files
const bingoRouter = require('./routes/bingo/bingoRouter.js');

const app = express();
app.use(morgan('tiny'));//request logger middleware

// Certificate --- inside 'prod gate' - incase there is no cert on the machine
if (prod){
    const privateKey = fs.readFileSync('/etc/letsencrypt/live/zoltanb.duckdns.org/privkey.pem', 'utf8'); //path to the privkey.pem
    const certificate = fs.readFileSync('/etc/letsencrypt/live/zoltanb.duckdns.org/cert.pem', 'utf8'); //path to cert.pem
    const ca = fs.readFileSync('/etc/letsencrypt/live/zoltanb.duckdns.org/chain.pem', 'utf8'); //path to chain.pem /ca means certificate authority
    
    //const credentials=null;
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };

    app.use(requireHTTPS); //guard this middleware in particular because it needs to have https enabled
}

app.use(express.json());

app.use(favicon(__dirname+'/public/favicon.ico'));
app.use(express.static(__dirname+'/public',{dotfiles:'allow'})); //static requests to get easy stuff //allow dot files to serve the ssl challenge



// // ------ routes ------------
app.use('/bingo', bingoRouter);  // Use the /about router
// app.use('/about', aboutRoutes);  // Use the /about router
// app.use('/users', usersRoutes);  // Use the /users router

// ------- get requests -------------------------------

app.get('/',function(req,res){
    res.sendFile(__dirname+'/home.html')
});

app.get('/projects',function(req,res){
    res.sendFile(__dirname+'/projects.html')
});

app.get('/blog',function(req,res){
    res.sendFile(__dirname+'/blog.html')
});

app.get('/tools',function(req,res){
    res.sendFile(__dirname+'/tools.html')
});


// ---- post requests -------------------------------
	// in theory, nothing should be posting to this 

// app.post('/addPrompt', function(req,res){
// 	fs.appendFile('./prompts.txt','\n'+req.body.value, (err)=>{
// 		if (err){
// 			console.log("error append word to file.");
// 		}else{
// 			console.log(req.body.value+" added to file");
// 		}
// 	});
// });


// Starting both http & https servers
// inside prod gate - otherwise start on local host
if(prod){
    const httpServer = http.createServer(app);
    const httpsServer = https.createServer(credentials, app);
    function requireHTTPS(req,res,next){
        if(!req.secure) return res.status(307).redirect('https://'+req.get('host')+req.url);
        next();
    }
    httpServer.listen(8080, () => {
        console.log('HTTP Server running on port 8080');
    });
    httpsServer.listen(8181, () => {
        console.log('HTTPS Server running on port 8181');
    });    
}else{
    app.listen(3000, () => {
    console.log(`Test app listening on port 3000`);
    });
}



