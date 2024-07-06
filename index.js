const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();

const bodyParser = require('body-parser');

const interaction = require('./interaction')

const PORT = process.env.PORT;

app.use(cors());

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
            'imagecid':
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
        console.log("Changing the profile");
        await interaction.changeProfile(text);

        res.status(204).send();
        
        console.log("Profile changed");
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

        res.json({
            collegeName: `${Education.collegeName}`,
            startingYear: `${Education.startingYear}`,
            endYear: `${Education.endYear}`,
            degree: `${Education.degree}`,
            skillsAcquired: Education.skillsAcquired,
            description: `${Education.description}`
        })
    }
    catch(error) {
        console.log("Error in fetching");

        res.send({status: "Unable to fetch"})
    }
})

app.post('/addproject', async (req, res) => {
    const { title, githubLink, description, skillsAcquired, liveLink, images } = req.body;
    
    try {

        console.log("Started Adding Project")
        await interaction.addProject(title, githubLink, description, skillsAcquired, liveLink, images);

        console.log("Project successfully added");
        res.send({status: "Project Successfully Added"})
    }
    catch(error) {
        console.log("Unable to proceed");

        res.send({status: "Unable to add"});
    }
})


app.patch('/editproject', async (req, res) => {
    const { index, title, githubLink, description, skillsAcquired, liveLink, images } = req.body;
    
    try {

        console.log("Started Editing Project")
        await interaction.editProject(index, title, githubLink, description, skillsAcquired, liveLink, images);

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

        res.json({
            title: `${project.title}`,
            githubLink: `${project.githubLink}`,
            description: `${project.description}`,
            skillsAcquired: `${project.skillsAcquired}`,
            liveLink: `${project.liveLink}`,
            images: `${project.images}`
        })
    }
    catch(error) {
        console.log("Error in fetching");

        res.send({status: "Unable to fetch"})
    }
})

app.post('/addexperience', async (req, res) => {
    const { companyName, position, startingTime, endTime, knowledgeAcquired, description } = req.body;
    
    try {

        console.log("Started Adding Experience")
        await interaction.addExperience(companyName, position, startingTime, endTime, knowledgeAcquired, description);

        console.log("Experience successfully added");
        res.send({status: "Experience Successfully Added"})
    }
    catch(error) {
        console.log("Unable to proceed");

        res.send({status: "Unable to add"});
    }
})


app.patch('/editexperience', async (req, res) => {
    const { index, companyName, position, startingTime, endTime, knowledgeAcquired, description } = req.body;
    
    try {

        console.log("Started Editing Experience")
        await interaction.editExperience(index, companyName, position, startingTime, endTime, knowledgeAcquired, description);

        console.log("Experience successfully edited");
        res.send({status: "Experience Successfully Edited"})
    }
    catch(error) {
        console.log("Unable to proceed");

        res.send({status: "Unable to edit"});
    }
})

app.get('/getexperience/:index', async (req, res) => {
    const index = req.params.index;

    try {
        console.log("fetching the Experience");

        const experience = await interaction.getExperience(index);

        res.json({
            companyName: `${experience.companyName}`,
            position: `${experience.position}`,
            startingTime: `${experience.startingTime}`,
            endTime: `${experience.endTime}`,
            knowledgeAcquired: experience.knowledgeAcquired,
            description: `${experience.description}`
        })
    }
    catch(error) {
        console.log("Error in fetching");

        res.send({status: "Unable to fetch"})
    }
})

app.get('/getallprojects', async (req, res) => {

    try {
        console.log("fetching the Projects");

        const projects = await interaction.getAllProjects();
        
        const projectsData = projects.map(project => {
            return {
                index: project.index.toString(),
                title: project.title,
                githubLink: project.githubLink,
                description: project.description,
                skillsAcquired: project.skillsAcquired,
                liveLink: project.liveLink,
                images: project.images
            };
        });

        res.json({projects: projectsData})
    }
    catch(error) {
        console.log("Error in fetching");

        res.status(500).send({status: error.message})
    }
})

app.get('/getallexperience', async (req, res) => {

    try {
        console.log("fetching the Experience");

        const experiences = await interaction.getAllExperiences();
        
        const experiencesData= experiences.map(experience => {
            return {
                index: experience.index.toString(),
                companyName: experience.companyName,
                position: experience.position,
                startingTime: experience.startingTime,
                endTime: experience.endTime,
                knowledgeAcquired: experience.knowledgeAcquired,
                description: experience.description
            };
        });

        res.json({experience: experiencesData})
    }
    catch(error) {
        console.log("Error in fetching");

        res.status(500).send({status: error.message})
    }
})

app.get('/getalleducation', async (req, res) => {

    try {
        console.log("fetching the Projects");

        const education = await interaction.getAllEducations();
        
        const educationData= education.map(education => {
            return {
                index: education.index.toString(),
                collegeName: education.collegeName,
                startingYear: education.startingYear.toString(),
                endYear: education.endYear.toString(),
                degree: education.degree,
                skillsAcquired: education.skillsAcquired,
                description: education.description
            };
        });

        res.json({education: educationData})
    }
    catch(error) {
        console.log("Error in fetching");

        res.status(500).send({status: error.message})
    }
})



app.listen(PORT, () => console.log(`The app is listening at ${PORT}`))