const express = require('express')
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');

const interaction = require('./interaction')

const PORT = process.env.PORT;

app.get('/resume', async (req, res) => {
    res.send({'cid' :
        `${await interaction.fetchResumeCid()}`
    })
})

app.get('/imagecid', async (req, res) => {
    res.send({
        'resumeCid':
        `${await interaction.fetchImageCid()}`
    })
})

app.get('/fetchprofile', async (req, res) => {
    res.send({
        'profile':
        `${await interaction.fetchProfile()}`
    })
})

app.patch('/changeimage/:cid', async (req, res) => {
    const imageCid = req.params.cid;
    console.log(imageCid)

    try {
        console.log("Changing the image");
        await interaction.changeLink(imageCid);

        res.status(204).send();
        
        console.log("Image changed");
    }
    catch(error) {
        console.log("Error in changing the image");

        res.status(401);
        res.send("Request failed");
    }
})

app.patch('/changeprofile/:text', async (req, res) => {
    const text = req.params.text;
    console.log(text)

    try {
        console.log("Changing the image");
        await interaction.changeProfile(text);

        res.status(204).send();
        
        console.log("Image changed");
    }
    catch(error) {
        console.log("Error in changing the image");

        res.status(401);
        res.send("Request failed");
    }
})

app.patch('/changeresume/:cid', async (req, res) => {
    const cid = req.params.cid;
    console.log(cid)

    try {
        console.log("Changing the image");
        await interaction.changeResume(cid);

        res.status(204).send();
        
        console.log("Image changed");
    }
    catch(error) {
        console.log("Error in changing the image");

        res.status(401);
        res.send("Request failed");
    }
})

app.use(bodyParser.json());

app.post('/addeducation', async (req, res) => {
    const { cid } = req.body;
    res.send(cid);
})



app.listen(PORT, () => console.log(`The app is listening at ${PORT}`))