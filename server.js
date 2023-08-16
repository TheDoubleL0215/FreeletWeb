const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const sha256 = require('js-sha256')
const mongoose = require('mongoose')
const User = require("./dbSchema")
const PORT = 3000;

const app = express();

let intialPath = path.join(__dirname, "public");


//Initialize Apps
app.use(bodyParser.json());
app.use(express.static(intialPath));
app.use(express.json());

async function mongodbConnect(){
    await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
    })
    console.log('Sikeres adatbázis csatlakozás \n mongodb://127.0.0.1:27017/mydatabase')

}

mongodbConnect()


//Directions
app.get('/', (req, res) => {
    res.sendFile(path.join(intialPath, "about.html"));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(intialPath, "register.html"));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(intialPath, "login.html"));
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(intialPath, "home.html")) 
})

app.get('/createDeck', (req, res) => {
    res.sendFile(path.join(intialPath, "createDeck.html"))
})

app.post('/checkIfUserExist', (req, res) => {
    const loginUsername = req.body.username
    console.log("Ez az username: " + loginUsername)
    async function dbUserExistLookup(){
        try{
            const userExist = await User.exists({username: loginUsername})
            if(userExist){
                res.json({exist: true})
            }else{
                res.json({exist: false})
            }
        }
        catch(e){
            console.log(`Hiba checkForUserExist API-nál ${e}`)
        }
    }
    dbUserExistLookup()
})

app.post('/userCreateApi', (req, res) =>{
    
    req.body.password = sha256(req.body.password)
    req.body.FreeletID = crypto.randomUUID()
    console.log(req.body)
    async function userAdd(){
        const user = await User.create({FreeletID: req.body.FreeletID, username: req.body.username, password: req.body.password})
    }
    userAdd()
})

app.post('/loginUser', (req, res)=> {
    req.body.password = sha256(req.body.password)
    const loginPassword = req.body.password
    const loginUsername = req.body.username
    async function userValidation(){
        try{
            const userExist = await User.exists({username: loginUsername})
            //console.log(userExist)
            if (userExist){
                const existedUserInfos = await User.findOne({username: loginUsername})
                const existedUserInfosPassword = existedUserInfos.password
                if(existedUserInfosPassword  == loginPassword){
                    const existedUserInfosFreeletId = existedUserInfos.FreeletID
                    res.json({status: 'user_valid', freeletId: existedUserInfosFreeletId})
                }else{
                    res.json({status: 'user_not_valid', passwordLogin: loginPassword, passwordDb: existedUserInfosPassword})
                }
            }else{
                res.json({status: 'user_not_exist'})
            }
        }catch(e){
            console.log(e.message)
        }
    }
    userValidation()


})

app.post('/getFreeletId', (req, res) => {

})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Az adatbázis kapcsolat lezárult a SIGINT esemény miatt.');
      process.exit(0);
    });
  });

app.listen(PORT, () =>{
    console.log(`A szerver fur a http://localhost:${PORT}`);
})

