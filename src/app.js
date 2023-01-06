import express from "express";

const app = express();
app.use(express.json());

const PORT = 5000;

const usuarios = [];

const tweets = [];

app.post("/sign-up",(req, res) => {
    const novoUsuario = req.body;
    usuarios.push(novoUsuario);
    res.send("OK");
})

app.post("/tweets", (req, res) =>{
    const infoTweet = req.body;
    const findUsername = usuarios.find((usuario) => usuario.username === infoTweet.username);
    if(!findUsername){
        res.send("UNAUTHORIZED");
    }
    tweets.push(infoTweet);
    res.send("OK");
})

app.listen(PORT, () => console.log("O servidor foi iniciado com sucesso."));
