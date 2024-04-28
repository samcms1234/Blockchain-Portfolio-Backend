// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Portfolio {
    
    struct Education {
        uint index;
        string collegeName;
        uint startingYear;
        uint endYear;
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
        string[] images;
    }

    uint public noOfEducation;
    uint public noOfProjects;
    uint public noOfExperience;

    Experience[] public experiences;
    Project[] public projects;
    Education[] public educations;

    string public imageLink="QmbeVr2qD9AJbDSRc9DbXidVYLUo5wyvMnfSnN7mWAQ5df";
    string public profile="over 6 months of practical experience with a good knowledge in blockchain development.i help web3 community by contributing in the web3 space.";
    string public resumeLink="QmP3fX1H8XSV7xnUuXmwAaLaizpbw8NR7uJ1bHva1uZnBh";

    function changeLink(string memory _newLink) _onlyManager external {
        imageLink = _newLink;
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
        uint startingYear,
        uint endYear,
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
        uint startingYear,
        uint endYear,
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
        string[] memory images
    ) _onlyManager external {
        projects.push(Project(noOfProjects,title,githubLink,description,skillsAcquired, images));
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
        string[] memory images
    ) _onlyManager external {
        Project memory project = Project(_i, title, githubLink, description, skillsAcquired, images);
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