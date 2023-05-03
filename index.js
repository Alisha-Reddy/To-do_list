createHtmlStorage();

function showAddTaskModal() {
  // console.log('Button Clicked')
  $("#addTaskModal").modal("show");
}

function addTask() {
  console.log("Add Task Clicked");
  $("#addTaskModal").modal("hide");
  var dataArr = $("#taskInputForm").serializeArray();
  console.log(dataArr);
  var taskObject = new Object();
  var storageObjectArr = [];
  var storageObject = localStorage.getItem("taskStorage");
  for (var i in dataArr) {
    var name = dataArr[i]["name"];
    var value = dataArr[i]["value"];
    taskObject[name] = value;
  }

  if (
    storageObject != null &&
    storageObject != undefined &&
    storageObject != ""
  ) {
    storageObjectArr = JSON.parse(storageObject);
    storageObjectArr.push(taskObject);
  } else {
    storageObjectArr.push(taskObject);
  }

  // storageObjectArr.push(taskObject);

  localStorage.setItem("taskStorage", JSON.stringify(storageObjectArr));
  // console.log(storageObjectArr);
  createHtmlStorage();
  $("#taskInputForm").trigger('reset');
}

function createHtmlStorage() {
  var storageObjectArr = [];
  var storageObject = localStorage.getItem("taskStorage");
  var storageObjectArr = JSON.parse(storageObject);
  var html = "";
  console.log(storageObjectArr);
  if (
    storageObject != null &&
    storageObject != undefined &&
    storageObject != ""
  ) {
    if (storageObjectArr && storageObjectArr.length > 0) {
      for (let i in storageObjectArr) {
        var date = new Date(storageObjectArr[i]["taskETA"]);
        html =
          html +
          "<tr>" +
          "<td>" +
          (parseInt(i) + 1) +
          "</td>" +
          "<td>" +
          storageObjectArr[i]["taskDescription"] +
          "</td>" +
          "<td>" +
          storageObjectArr[i]["taskResponsiblePerson"] +
          "</td>" +
          "<td>" +
          date.toUTCString() +
          "</td>" +
          "<td>" +
          '<i class="bi bi-check-circle-fill" onclick="markAsDone(' +
          i +
          ')"></i>' +
          '<i class="bi bi-pencil-square" onclick="editTask(' +
          i +
          ')"></i>' +
          "</td>" +
          "</tr>";
      }
    } else {
      html = '<tr><td colspan="5">No Tasks Added Yet</td></tr>';
    }
  }
  $("#taskTableBody").html(html);
}

function markAsDone(index) {
  var storageObjectArr = [];
  var storageObject = localStorage.getItem("taskStorage");
  if (
    storageObject != null &&
    storageObject != undefined &&
    storageObject != ""
  ) {
    storageObjectArr = JSON.parse(storageObject);
    storageObjectArr.pop(index);
  }
  localStorage.setItem("taskStorage", JSON.stringify(storageObjectArr));
  createHtmlStorage();
}

function editTask(index) {
  var storageObjectArr = [];
  var storageObject = localStorage.getItem("taskStorage");
  if (
    storageObject != null &&
    storageObject != undefined &&
    storageObject != ""
  ) {
    storageObjectArr = JSON.parse(storageObject);
    $("#editTaskTextArea").val(storageObjectArr[index]["taskDescription"]);
    $("#editResponsiblePerson").val(
      storageObjectArr[index]["taskResponsiblePerson"]
    );
    $("#editETA").val(storageObjectArr[index]["taskETA"]);
    $("#editIndex").val(index);
    $("#updateTaskModal").modal("show");
  }
}
function updateTask() {
  $("#updateTaskModal").modal("hide");
  var dataArr = $("#taskUpadteForm").serializeArray();
  console.log(dataArr);
  var taskObject = new Object();
  var storageObjectArr = [];
  var storageObject = localStorage.getItem("taskStorage");
  for (var i in dataArr) {
    var name = dataArr[i]["name"];
    var value = dataArr[i]["value"];
    taskObject[name] = value;
  }

  if (
    storageObject != null &&
    storageObject != undefined &&
    storageObject != ""
  ) {
    storageObjectArr = JSON.parse(storageObject);
    storageObjectArr[taskObject["taskIndex"]] = taskObject;
  }
  localStorage.setItem("taskStorage", JSON.stringify(storageObjectArr));
  createHtmlStorage();
}
