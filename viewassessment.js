var pageCounter = 1;
var moduleContainer = document.getElementById('assessment-info');
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

    // Iterate over each degree in the data.degrees array
    data.degrees.forEach(function(degree) {
        // Construct HTML content based on degree properties
        htmlString += "<h2>" + degree.name + "</h2>";
        htmlString += "<p>Year: " + degree.year + "</p>";

        // Check if modules property exists for the current degree
        if (degree.modules) {
            htmlString += "<h3>Modules</h3>";
            // Iterate over each module in the degree.modules array
            degree.modules.forEach(function(module) {
                htmlString += "<div class='module'>";
                htmlString += "<h4>" + module.module_name + "</h4>";
                htmlString += "<p>Module Code: " + module.module_code + "</p>";
                htmlString += "<p>Credits: " + module.credits + "</p>";
                htmlString += "<p>Timeslot: " + module.timeslot + "</p>";
                
                // Render room details if available
                if (module.room && module.room.length > 0) {
                    htmlString += "<p>Room(s): ";
                    module.room.forEach(function(room, index) {
                        if (index > 0) htmlString += ", ";
                        htmlString += room.room_number;
                    });
                    htmlString += "</p>";
                }
                
                // Render module learning outcomes if available
                if (module.m_learning_outcomes) {
                    htmlString += "<h5>Module Learning Outcomes</h5>";
                    module.m_learning_outcomes.forEach(function(outcome) {
                        htmlString += "<p>LO: " + outcome.LO + "</p>";
                    });
                }
                
                // Render assessments if available
                if (module.assessments) {
                    htmlString += "<h5>Assessments</h5>";
                    module.assessments.forEach(function(assessment) {
                        htmlString += "<div class='assessment'>";
                        htmlString += "<p>Assessment: " + assessment.assessment_name + "</p>";
                        htmlString += "<p>Date: " + assessment.date + "</p>";
                        htmlString += "<p>Time: " + assessment.time + "</p>";
                        htmlString += "<p>Room: " + assessment.room + "</p>";
                        
                        // Render assessment learning outcomes if available
                        if (assessment.a_learning_outcomes) {
                            htmlString += "<h6>Assessment Learning Outcomes</h6>";
                            assessment.a_learning_outcomes.forEach(function(outcome) {
                                htmlString += "<p>LO: " + outcome.LO + "</p>";
                            });
                        }
                        htmlString += "</div>"; // Close assessment div
                    });
                }
                htmlString += "</div>"; // Close module div
            });
        }
    });

    // Set the generated HTML content to the moduleContainer
    var assessmentContainer = document.getElementById("assessment-info");
    if (assessmentContainer) {
        assessmentContainer.innerHTML = htmlString;
    }
}