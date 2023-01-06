import express from "express";

const app = express();
app.use(express.json());

const PORT = 5000;

const usuarios = [];

const tweets = [];

app.post("/sign-up",(req, res) => {
    const novoUsuario = req.body;
    usuarios.push(novoUsuario);
    console.log(usuarios);
    res.send("OK");
})

app.listen(PORT, () => console.log("O servidor foi iniciado com sucesso."));
