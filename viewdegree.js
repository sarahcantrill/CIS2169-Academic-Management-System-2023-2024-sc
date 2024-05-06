var pageCounter = 1;
var moduleContainer = document.getElementById('degree-info');
///var btn = document.getElementById("btn");

document.addEventListener("DOMContentLoaded", function() {
    var ourRequest = new XMLHttpRequest();
    // ourRequest.open('GET', 'https://raw.githubusercontent.com/Edge-Hill-Univeristy-Web/CIS2169-Academic-Management-System/main/module-'+ pageCounter +'.json');
    //ourRequest.open('GET', 'http://localhost:3000/degrees/');
    ourRequest.open('GET', 'data.json');
    ourRequest.onload = function(){
      //console.log(ourRequest.responseText);
      var ourData = JSON.parse(ourRequest.responseText);
      console.log(ourData[0]);
      renderHTML(ourData);
      pageCounter++;
      
    };
    ourRequest.send();
    pageCounter++;
    if (pageCounter > 3){
    //btn.classList.add("hide-me");
        btn.disabled = true;
    }
    });

  function renderHTML(data) {

    var htmlString = "";

    // getting the degrees
    data.degrees.forEach(function(degree) {
        // json into html
        htmlString += "<h2>" + degree.name + "</h2>";
        htmlString += "<p>Year: " + degree.year + "</p>";
        // exit awards render
        if (degree.exit_awards) {
            htmlString += "<h3>Exit Awards</h3>";
            degree.exit_awards.forEach(function(award) {
                htmlString += "<p>" + award.award_name + "</p>";
            });
        }
        // d los render
        if (degree.d_learning_outcomes) {
            htmlString += "<h3>Degree Learning Outcomes</h3>";
            degree.d_learning_outcomes.forEach(function(outcome) {
                htmlString += "<p>LO: " + outcome.LO + "</p>";
            });
        }
        // modules render
        if (degree.modules) {
            htmlString += "<h3>Modules</h3>";
            degree.modules.forEach(function(module) {
                htmlString += "<h4>" + module.module_name + "</h4>";
                htmlString += "<p>Module Code: " + module.module_code + "</p>";
                htmlString += "<p>Credits: " + module.credits + "</p>";
            });
        }
    });
    // show degree info
    var degreeContainer = document.getElementById("degree-info");
    if (degreeContainer) {
        degreeContainer.innerHTML = htmlString;
    }
}