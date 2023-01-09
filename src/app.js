import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const users = [];

const tweets = [];

app.post("/sign-up",(req, res) => {
    const newUser = req.body;
    if((!newUser.username && typeof newUser.username !== "string") || (!newUser.avatar && typeof newUser.avatar !== "string")){
        return res.status(400).send("Todos os campos são obrigatórios!");
    } 
    if(users.find((user) => user.username === newUser.username)) return res.status(400).send("Nome de usuario já existente.");
    users.push(newUser);
    console.log(users);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) =>{
    const infoTweet = req.body;
    if(!infoTweet.tweet && typeof infoTweet.tweet !== "string" || !infoTweet.username && typeof infoTweet.username !== "string") return res.status(400).send("Todos os campos são obrigatórios!"); 
    const findUsername = users.find((user) => user.username === infoTweet.username);
    if(!findUsername){
        return res.status(401).send("UNAUTHORIZED");;
    }
    tweets.push(infoTweet);
    res.status(201).send("OK");
})

app.get("/tweets", (req,res) =>{
    const lastTenTweets = [];
    const startIndex = tweets.length < 10 ? 0:(tweets.length-10);

    for(let i = startIndex; i < tweets.length; i++){
        const {username, tweet} = tweets[i];
        const avatar = (users.find((user) => user.username === username)).avatar;
        const infoTweet = {username,avatar,tweet};
        lastTenTweets.push(infoTweet);
    }
    res.send(lastTenTweets);
})

app.listen(PORT, () => console.log("O servidor foi iniciado com sucesso."));
