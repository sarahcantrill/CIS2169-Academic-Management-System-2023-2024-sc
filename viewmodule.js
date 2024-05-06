var pageCounter = 1;
var moduleContainer = document.getElementById('module-info');
//var btn = document.getElementById("btn");

document.addEventListener("DOMContentLoaded", function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'data.json');
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        console.log(ourData);
        renderHTML(ourData);
    };
    ourRequest.send();
});

function renderHTML(data) {
    var htmlString = "";

    //get every degree
    data.degrees.forEach(function(degree) {
        // Cnames into html
        htmlString += "<h2>" + degree.name + "</h2>";
        htmlString += "<p>Year: " + degree.year + "</p>";

        // Cmodules rendee
        if (degree.modules) {
            htmlString += "<h3>Modules</h3>";
            //get every module
            degree.modules.forEach(function(module) {
                htmlString += "<div class='module'>";
                htmlString += "<h4>" + module.module_name + "</h4>";
                htmlString += "<p>Module Code: " + module.module_code + "</p>";
                htmlString += "<p>Credits: " + module.credits + "</p>";
                htmlString += "<p>Timeslot: " + module.timeslot + "</p>";
                //get room details
                if (module.room && module.room.length > 0) {
                    htmlString += "<p>Room(s): ";
                    module.room.forEach(function(room, index) {
                        if (index > 0) htmlString += ", ";
                        htmlString += room.room_number;
                    });
                    htmlString += "</p>";
                }
                // get mlos
                if (module.m_learning_outcomes) {
                    htmlString += "<h5>Module Learning Outcomes</h5>";
                    module.m_learning_outcomes.forEach(function(outcome) {
                        htmlString += "<p>LO: " + outcome.LO + "</p>";
                    });
                }
                // get assessments
                if (module.assessments) {
                    htmlString += "<h5>Assessments</h5>";
                    module.assessments.forEach(function(assessment) {
                        htmlString += "<p>Assessment: " + assessment.assessment_name + "</p>";
                        htmlString += "<p>Date: " + assessment.date + "</p>";
                        htmlString += "<p>Time: " + assessment.time + "</p>";
                        htmlString += "<p>Room: " + assessment.room + "</p>";
                        
                        // get alos
                        if (assessment.a_learning_outcomes) {
                            htmlString += "<p>Assessment Learning Outcomes:</p>";
                            assessment.a_learning_outcomes.forEach(function(outcome) {
                                htmlString += "<p>LO: " + outcome.LO + "</p>";
                            });
                        }
                    });
                }
                htmlString += "</div>"; 
            });
        }
    });

    //load in html
    var moduleContainer = document.getElementById("module-info");
    if (moduleContainer) {
        moduleContainer.innerHTML = htmlString;
    }
}