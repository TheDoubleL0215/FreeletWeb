const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto')
const sha256 = require('js-sha256')
const mongoose = require('mongoose')
const userSchema = require("./userSchema")
const cardSchema = require("./cardSchema");
const { error } = require('console');
const PORT = 3000;

const app = express();

let intialPath = path.join(__dirname, "public");


//Initialize Apps
app.use(bodyParser.json());
app.use(express.static(intialPath));
app.use(express.json());


const userDBConn = mongoose.createConnection('mongodb://127.0.0.1:27017/mydatabase', {
})
console.log('Sikeres adatbázis csatlakozás \n mongodb://127.0.0.1:27017/mydatabase')
const User = userDBConn.model('User', userSchema)


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

app.get('/learn', (req, res) => {
    res.sendFile(path.join(intialPath, "learnOverv.html"))
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
            const userExist = await User.findOne({username: loginUsername})
            console.log(userExist)
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

app.post('/listDecks', async (req, res) => {
    console.log('Hello from /listDeck')
    //const conict = await mongoose.connect('mongodb://127.0.0.1:27017/')
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/');
        console.log('Ready state before listing: ', mongoose.connection.readyState);
        const result = await mongoose.connection.db.admin().listDatabases();
        const databaseNames = result.databases.map(db => db.name);
        console.log('Meglévő adatbázisok:', databaseNames);
        res.json({ databaseNames });
        mongoose.connection.close();
    } catch (error) {
        console.error('Hiba történt: /listDecks catch', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/getCurrentUser', async (req, res) => {
    const connDbs = await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase')
    try {
        console.log('Ready state at /getCurrentUser: ', mongoose.connection.readyState);
        console.log('Bodi?: ', req.body.freeletid)
        //const connDb = await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase');
        const freeletidLookUp = await User.findOne({ FreeletID: req.body.freeletid });
        console.log('freeletidLookUp:', freeletidLookUp);
        if (freeletidLookUp) {
            console.log('Ennek kéne lennie: ', freeletidLookUp.username);
            res.json({ userName: freeletidLookUp.username });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (e) {
        console.log('Hiba a /getCurrentUser: ', e.message);
        res.status(500).json({ error: 'Internal server error' });
    }finally{
        mongoose.connection.close()
    }
});

app.post('/createNewDeck', async (req, res) => {
    const termsListBackEnd = req.body.terms
    const definitionsListBackEnd = req.body.definitions
    const deckNameBackEnd = req.body.deckname
    const createdUserFreeletId = req.body.sessionID
    let userUsername;
    console.log("MEgölöm magam", createdUserFreeletId)
    try{
        const userForLookUp = await User.findOne({FreeletID: createdUserFreeletId})
        userUsername = userForLookUp.username
    }catch(error){
        console.log('Itt van egy kis gebasz: ', error)
    }//finally{
        //mongoose.connection.close()
    //}
     
    const cardDatabase = await mongoose.createConnection(`mongodb://127.0.0.1:27017/${userUsername}_${deckNameBackEnd}`, {
    })
    const Card = cardDatabase.model('Card', cardSchema)
   
    for(let i = 0; i < termsListBackEnd.length; i++){
        const cardToDb = Card.create({term: termsListBackEnd[i], definition: definitionsListBackEnd[i]})
    }
})

process.on('SIGINT', async () => {
    try {
      await mongoose.disconnect();
      console.log('Mongoose connection closed.');
      process.exit(0);
    } catch (error) {
      console.error('Error closing mongoose connection:', error);
      process.exit(1);
    }
  });

app.listen(PORT, () =>{
    console.log(`A szerver fur a http://localhost:${PORT}`);
})

