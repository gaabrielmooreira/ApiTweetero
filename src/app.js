import express from "express";

const app = express();

const PORT = 5000;

const usuario = {
    username: 'bobesponja',
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
}

const tweet = {
    username: "bobesponja",
    tweet: "eu amo o hub"
}

app.get("/sign-up", (req, res) =>{
    
})

app.listen(PORT, () => console.log("O servidor foi iniciado com sucesso."));
