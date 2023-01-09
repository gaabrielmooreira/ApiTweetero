import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const users = [];

const tweets = [];

app.post("/sign-up", (req, res) => {
    const newUser = req.body;
    const validUser = (newUser.username && newUser.username.length > 0 && typeof (newUser.username) === "string");
    const validAvatar = (newUser.avatar && newUser.avatar.length > 0 && typeof (newUser.avatar) === "string");
    if (!validUser || !validAvatar) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }
    if (users.find((user) => user.username === newUser.username)) return res.status(400).send("Nome de usuario já existente.");
    users.push(newUser);
    console.log(users);
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {
    const infoTweet = req.body;
    const validTweet = (infoTweet.tweet && infoTweet.tweet.length > 0 && typeof (infoTweet.tweet) === "string");
    const validUser = (infoTweet.username && infoTweet.username.length > 0 && typeof (infoTweet.username) === "string");
    if (!validTweet || !validUser) return res.status(400).send("Todos os campos são obrigatórios!");
    const findUsername = users.find((user) => user.username === infoTweet.username);
    if (!findUsername) {
        return res.status(401).send("UNAUTHORIZED");;
    }
    tweets.push(infoTweet);
    res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {
    const lastTenTweets = [];
    const startIndex = tweets.length < 10 ? 0 : (tweets.length - 10);

    for (let i = startIndex; i < tweets.length; i++) {
        const { username, tweet } = tweets[i];
        const avatar = (users.find((user) => user.username === username)).avatar;
        const allInfoTweet = { username, avatar, tweet };
        lastTenTweets.push(allInfoTweet);
    }
    res.send(lastTenTweets);
})

app.get("/tweets/:USERNAME", (req, res) => {
    const USERNAME = req.params.USERNAME;
    const tweetsUser = tweets.filter((t) => t.username === USERNAME );
    if (!tweetsUser) return res.send([]);
    const avatar = (users.find((user) => user.username === USERNAME)).avatar;
    const allInfoTweetsUser = tweetsUser.map((t) => (
        {
            username: t.username, 
            avatar, 
            tweet: t.tweet
        })
    )
    res.send(allInfoTweetsUser);
})

app.listen(PORT, () => console.log("O servidor foi iniciado com sucesso."));
