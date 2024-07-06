// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Portfolio {
    
    struct Education {
        uint index;
        string collegeName;
        string startingYear;
        string endYear;
        string degree;
        string[] skillsAcquired;
        string description;
    }

    struct Experience {
        uint index;
        string companyName;
        string position;
        string startingTime;
        string endTime;
        string[] knowledgeAcquired;
        string description;
    }

    struct Project {
        uint index;
        string title;
        string githubLink;
        string description;
        string skillsAcquired;
        string liveLink;
        string[] images;
    }

    uint public noOfEducation;
    uint public noOfProjects;
    uint public noOfExperience;

    Experience[] public experiences;
    Project[] public projects;
    Education[] public educations;

    string public imageLink="Qmf5BoMEhp6WYeUHD1LqMtE59GXy8tE2eb4NbQN3b5fX9J";
    string public profile="over 6 months of practical experience with a good knowledge in blockchain development.i help web3 community by contributing in the web3 space.";
    string public resumeLink="QmP3fX1H8XSV7xnUuXmwAaLaizpbw8NR7uJ1bHva1uZnBh";

    function changeLink(string memory _cid) _onlyManager external {
        imageLink = _cid;
    }

    function changeProfile(string memory _newProfile) _onlyManager external {
        profile = _newProfile;
    }

    function changeResume(string memory _cid) _onlyManager external {
        resumeLink = _cid;
    }

    address public manager;

    constructor() {
        manager = msg.sender;
    }

    modifier _onlyManager() {
        require(msg.sender == manager, "Only manager can call this function");
        _;
    }

    function addEduction(
        string memory collegeName,
        string memory startingYear,
        string memory endYear,
        string memory degree,
        string[] memory skillsAcquired,
        string memory description
        ) _onlyManager external {
        educations.push(Education(noOfEducation,collegeName,startingYear,endYear,degree, skillsAcquired, description));
        noOfEducation++;
    }

    function getEducation(uint _i) public view returns(Education memory) {
        return educations[_i];
    }

    function editEducation(
        uint _i,
        string memory collegeName,
        string memory startingYear,
        string memory endYear,
        string memory degree,
        string[] memory skillsAcquired,
        string memory description
        ) _onlyManager external {
        Education memory education = Education(_i, collegeName,startingYear,endYear,degree, skillsAcquired, description);
        educations[_i] = education;
    }

    function addProject(
        string memory title,
        string memory githubLink,
        string memory description,
        string memory skillsAcquired,
        string memory linkLink,
        string[] memory images
    ) _onlyManager external {
        projects.push(Project(noOfProjects,title,githubLink,description,skillsAcquired, linkLink, images));
        noOfProjects++;
    }

    function getProject(uint _i) public view returns(Project memory) {
        return projects[_i];
    }

    function editProject(
        uint _i,
        string memory title,
        string memory githubLink,
        string memory description,
        string memory skillsAcquired,
        string memory liveLink,
        string[] memory images
    ) _onlyManager external {
        Project memory project = Project(_i, title, githubLink, description, skillsAcquired, liveLink, images);
        projects[_i] = project;
    }

    function addExperience(
        string memory companyName,
        string memory position,
        string memory startingTime,
        string memory endTime,
        string[] memory knowledgeAcquired,
        string memory description
    ) _onlyManager external {
        experiences.push(Experience(noOfExperience, companyName, position, startingTime, endTime, knowledgeAcquired, description));
        noOfExperience++;
    }

    function getExperience(uint _i) public view returns(Experience memory) {
        return experiences[_i];
    }

    function editExperience(
        uint _i,
        string memory companyName,
        string memory position,
        string memory startingTime,
        string memory endTime,
        string[] memory knowledgeAcquired,
        string memory description
    ) _onlyManager external {
        Experience memory experience = Experience(_i, companyName, position, startingTime, endTime, knowledgeAcquired, description);
        experiences[_i] = experience;
    }

    function allProjects() external view returns(Project[] memory){
        return projects;
    }
    function allEductationDetails() external view returns(Education[] memory){
        return educations;
    }
    function allExperienceDetails() external view returns(Experience[] memory){
      return experiences;
    }

    function donate() public payable {
        payable(address(this)).transfer(msg.value);
    }

    function collectFunds(uint amount) external _onlyManager {
        require(address(this).balance >= amount, "Not enough balance in the contract");
        payable(manager).transfer(amount);
    }
}