const express = require('express')
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');

const interaction = require('./interaction')

const PORT = process.env.PORT;

app.get('/resume', async (req, res) => {
    try {
        res.send({'cid' :
            `${await interaction.fetchResumeCid()}`
        })
    }
    catch(error) {
        console.log("Unable to fetch");
        res.send("Unable to fetch");
    }
})

app.get('/imagecid', async (req, res) => {
    try {
        res.send({
            'resumeCid':
            `${await interaction.fetchImageCid()}`
        })
    }
    catch(error) {
        console.log("Unable to fetch");
        res.send("Unable to fetch");
    }
})

app.get('/fetchprofile', async (req, res) => {
    try {
        res.send({
            'profile':
            `${await interaction.fetchProfile()}`
        })
    }
    catch(error) {
        console.log("Unable to fetch");
        res.send("Unable to fetch");
    }
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
        res.send({status: "Request failed"});
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
        res.send({status: "Request failed"});
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
        res.send({status: "Request failed"});
    }
})

app.use(bodyParser.json());

app.post('/addeducation', async (req, res) => {
    const { collegeName, startingYear, endYear, degree, skillsAcquired, description } = req.body;
    
    try {

        console.log("Started Adding Education")
        await interaction.addEduction(collegeName, startingYear, endYear, degree, skillsAcquired, description);

        console.log("Education successfully added");
        res.send({status: "Education Successfully Added"})
    }
    catch(error) {
        console.log("Unable to proceed");

        res.send({status: "Unable to add"});
    }
})


app.patch('/editeducation', async (req, res) => {
    const { index, collegeName, startingYear, endYear, degree, skillsAcquired, description } = req.body;
    
    try {

        console.log("Started Editing Education")
        await interaction.editEducation(index, collegeName, startingYear, endYear, degree, skillsAcquired, description);

        console.log("Education successfully edited");
        res.send({status: "Education Successfully Edited"})
    }
    catch(error) {
        console.log("Unable to proceed");

        res.send({status: "Unable to edit"});
    }
})

app.get('/geteducation/:index', async (req, res) => {
    const index = req.params.index;

    try {
        console.log("fetching the education");

        const Education = await interaction.getEducation(index);

        res.json({collegeName: `${Education.collegeName}`, startingYear: `${Education.startingYear}`, endYear: `${Education.endYear}`, degree: `${Education.degree}`, skillsAcquired: Education.skillsAcquired, description: `${Education.description}`})
    }
    catch(error) {
        console.log("Error in fetching");

        res.send({status: "Unable to fetch"})
    }
})

app.post('/addproject', async (req, res) => {
    const { title, githubLink, description, skillsAcquired, images } = req.body;
    
    try {

        console.log("Started Adding Project")
        await interaction.addProject(title, githubLink, description, skillsAcquired, images);

        console.log("Project successfully added");
        res.send({status: "Project Successfully Added"})
    }
    catch(error) {
        console.log("Unable to proceed");

        res.send({status: "Unable to add"});
    }
})


app.patch('/editproject', async (req, res) => {
    const { index, title, githubLink, description, skillsAcquired, images } = req.body;
    
    try {

        console.log("Started Editing Project")
        await interaction.editProject(index, title, githubLink, description, skillsAcquired, images);

        console.log("Project successfully edited");
        res.send({status: "Project Successfully Edited"})
    }
    catch(error) {
        console.log("Unable to proceed");

        res.send({status: "Unable to edit"});
    }
})

app.get('/getproject/:index', async (req, res) => {
    const index = req.params.index;

    try {
        console.log("fetching the Project");

        const project = await interaction.getProject(index);
        console.log(project);

        res.json({title: `${project.title}`, githubLink: `${project.githubLink}`, description: `${project.description}`, skillsAcquired: `${project.skillsAcquired}`, images: `${project.images}`})
    }
    catch(error) {
        console.log("Error in fetching");

        res.send({status: "Unable to fetch"})
    }
})



app.listen(PORT, () => console.log(`The app is listening at ${PORT}`))