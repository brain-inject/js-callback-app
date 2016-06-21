function changeEmployee(employee){
  if (employee.style.color === "lightgrey"){
    employee.style.color = '';
  } else {
    employee.style.color = "lightgrey";
  }
}

function showAll(){
  var employees = document.querySelectorAll('.employee');

  for (var i = 0; i < employees.length; i++){
    var employee = employees[i];

    employee.style.display = '';
  }
}

function showPolice(){
  var employees = document.querySelectorAll('.employee');

  for (var i = 0; i < employees.length; i++){
    var employee = employees[i];

    if (employee.innerHTML.indexOf('POLICE') === -1){
      employee.style.display = 'none';
    } else {
      employee.style.display = '';
    }
  }
}

function getData(){
  var employeesDiv = document.getElementById('employees');

  var messages = ["Loading.","Loading..","Loading..."]
  var messageIndex = 0;

  var waitingMessage = setInterval(function(){
    employeesDiv.innerHTML = messages[messageIndex];
    if (messageIndex === 2){
      messageIndex = 0;
    } else {
      messageIndex++;
    }
  },800);

  setTimeout(function(){
    clearInterval(waitingMessage);
    fetch('https://data.cityofchicago.org/resource/xzkq-xp2w.json')
    .then(function(response){
      return response.json();
    })
    .then(function(body){
      var htmlString = "";

      for (var i = 1; i < body.length; i++){
        var employee = body[i];
        htmlString += '<div class="employee" onmousedown="changeEmployee(this)">'
        htmlString += '<h2>' + employee.name + '</h2>';
        htmlString += '<p>Title: ' + employee.job_titles + '</p>';
        htmlString += '<p>Department: ' + employee.department + '</p>';
        htmlString += '<p>Salary: ' + employee.employee_annual_salary + '</p>';
        htmlString += '</div>'
      }

      employeesDiv.innerHTML = htmlString;
    });
  },5000);
}



