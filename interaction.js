const { ethers } = require("ethers");
const { default: Web3 } = require("web3");
require('dotenv').config();


const { abi } = require("./ABI/Portfolio.json");

const { contractAddress, ownerAddress, networkDeployedTo } = require('./ABI/contracts-config.json')

console.log(process.env.ALCHEMY_RPC_MUMBAI);

const web3 = new Web3("http://localhost:8545/");

const portfolio = new web3.eth.Contract(abi, contractAddress);

async function fetchResumeCid() {
    try {
    const resumeCid = await portfolio.methods.resumeLink().call();
    console.log('Result of myFunction:', resumeCid);
    return resumeCid;
    }
    catch(error) {
        console.log(error);
    }
}

async function fetchImageCid() {
    try {
    const imageCid = await portfolio.methods.imageLink().call();
    console.log('Result of myFunction:', imageCid);
    return imageCid;
    }
    catch(error) {
        console.log(error);
    }
}

async function fetchProfile() {
    try {
    const profileCid = await portfolio.methods.profile().call();
    console.log('Result of myFunction:', profileCid);
    return profileCid;
    }
    catch(error) {
        console.log(error);
    }
}

async function changeLink( imageLink ) {
    try {
    await portfolio.methods.changeLink(imageLink).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 });
    fetchImageCid();
    }
    catch(error) {
        console.log(error);
    }
}

async function changeProfile( profileLink ) {
    try {
    await portfolio.methods.changeProfile(profileLink).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 });
    fetchProfile();
    }
    catch(error) {
        console.log(error);
    }
}

async function changeResume( resumeLink ) {
    try {
    await portfolio.methods.changeResume(resumeLink).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 });
    fetchResumeCid();
    }
    catch(error) {
        console.log(error);
    }
}

async function addEducation( resumeLink ) {
    try {
    await portfolio.methods.changeResume(resumeLink).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 });
    fetchResumeCid();
    }
    catch(error) {
        console.log(error);
    }
}

async function addEduction( collegeName, startingYear, endYear, degree, skillsAcquired, description ) {
    try {
        await portfolio.methods.addEduction(collegeName, startingYear, endYear, degree, skillsAcquired, description).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 });
    }
    catch(error) {
        console.log(error);
    }
} 

async function editEducation( index, collegeName, startingYear, endYear, degree, skillsAcquired, description ) {
    try {
        await portfolio.methods.editEducation(index, collegeName, startingYear, endYear, degree, skillsAcquired, description).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 });
    }
    catch(error) {
        console.log(error);
    }
} 

async function getEducation( index ) {
    try {
        const education = await portfolio.methods.getEducation(index).call();
        console.log("Education is", education);
    }
    catch(error) {
        console.log(error);
    }
}

async function addProject(title, githubLink, description, skillsAcquired, images) {
    try {
        await portfolio.methods.addProject(title, githubLink, description, skillsAcquired, images).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 }); 
    }
    catch(error) {
        console.log(error);
    }
}

async function editProject( index, title, githubLink, description, skillsAcquired, images ) {
    try {
        await portfolio.methods.editProject(index, title, githubLink, description, skillsAcquired, images).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', gas: 5000000 });
    }
    catch(error) {
        console.log(error);
    }
}

async function getProject( index ) {
    try {
        const project = await portfolio.methods.getProject(index).call();
        console.log("Project is", project);
    }
    catch(error) {
        console.log(error);
    }
}





