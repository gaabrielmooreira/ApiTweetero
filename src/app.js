import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const usuarios = [];

const tweets = [];

app.post("/sign-up",(req, res) => {
    const novoUsuario = req.body;
    if(usuarios.find((u) => u.username === novoUsuario.username)) return;
    usuarios.push(novoUsuario);
    console.log(usuarios);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) =>{
    const infoTweet = req.body;
    const findUsername = usuarios.find((usuario) => usuario.username === infoTweet.username);
    if(!findUsername){
        return res.status(401).send("UNAUTHORIZED");;
    }
    tweets.push(infoTweet);
    res.status(201).send("OK");
})

app.get("/tweets", (req,res) =>{
    const lastTenTweets = [];
    const idxInicio = tweets.length < 10 ? 0:(tweets.length-10);

    for(let i = idxInicio; i < tweets.length; i++){
        const {username, tweet} = tweets[i];
        const avatar = (usuarios.find((usuario) => usuario.username === username)).avatar;
        const infoTweet = {username,avatar,tweet};
        lastTenTweets.push(infoTweet);
    }
    res.send(lastTenTweets);
})

app.listen(PORT, () => console.log("O servidor foi iniciado com sucesso."));
