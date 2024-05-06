var pageCounter = 1;
var moduleContainer = document.getElementById('degree-info');
var btn = document.getElementById("viewDegreebtn");

window.addEventListener("DOMContentLoaded", function(){
  var ourRequest = new XMLHttpRequest();
  // ourRequest.open('GET', 'https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/CIS2169-Academic-Management-System/main/module-'+ pageCounter +'.json');
  ourRequest.open('GET', 'http://localhost:3000/degrees/');
  ourRequest.onload = function(){
    //console.log(ourRequest.responseText);
    var ourData = JSON.parse(ourRequest.responseText);
    console.log(ourData[0]);
    //renderHTML(ourData);
    renderDegreeInfo(ourData); 
  };
  ourRequest.send();
pageCounter++;
if (pageCounter > 3){
//btn.classList.add("hide-me");
  btn.disabled = true;
}
});

// Define moduleContainer here
var moduleContainer = document.getElementById('degree-info');

function renderDegreeInfo(data) {
    var htmlString = "";
  
    if (Array.isArray(data.degrees)) {
      data.degrees.forEach(function(degree) {
        htmlString += "<h2>" + degree.name + " (" + degree.year + ")</h2>";
  
        htmlString += "<h3>Exit Awards:</h3>";
        degree.exit_awards.forEach(function(award) {
          htmlString += "<p>" + award.award_name + "</p>";
        });
  
        htmlString += "<h3>Learning Outcomes:</h3>";
        degree.d_learning_outcomes.forEach(function(outcome) {
          htmlString += "<p>- " + outcome.LO + "</p>";
        });
  
        htmlString += "<h3>Modules:</h3>";
        degree.modules.forEach(function(module) {
          htmlString += "<p><strong>" + module.module_code + " - " + module.module_name + "</strong></p>";
          htmlString += "<p>Timeslot: " + module.timeslot + "</p>";
  
          htmlString += "<h4>Module Learning Outcomes:</h4>";
          module.m_learning_outcomes.forEach(function(mOutcome) {
            htmlString += "<p>- " + mOutcome.LO + "</p>";
          });
  
          htmlString += "<h4>Assessments:</h4>";
          module.assessments.forEach(function(assessment) {
            htmlString += "<p><strong>" + assessment.assessment_name + "</strong></p>";
            htmlString += "<p>Date: " + assessment.date + ", Time: " + assessment.time + ", Room: " + assessment.room + "</p>";
  
            htmlString += "<h5>Assessment Learning Outcomes:</h5>";
            assessment.a_learning_outcomes.forEach(function(aOutcome) {
              htmlString += "<p>- " + aOutcome.LO + "</p>";
            });
  
            htmlString += "<hr>";
          });
  
          htmlString += "<hr>";
        });
  
        htmlString += "<hr>";
      });
    } else {
      console.error("Invalid JSON data format. Expected 'degrees' array.");
    }
  
    if (moduleContainer) {
      moduleContainer.innerHTML = htmlString;
    } else {
      console.error("Invalid moduleContainer element.");
    }
  }
  