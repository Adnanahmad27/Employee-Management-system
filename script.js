const employees = {};

const modalToggleButton = document.getElementById("model-toggle-btn");
const modal = document.getElementById("model");
const closeIcon = document.getElementById("close-icon");
const form = document.getElementById("form");
const tableBody = document.querySelector("#employee-list > tbody");

const editModel = document.getElementById("edit-model");
const closeBtn = document.getElementById("close-btn");
const editForm = document.getElementById("edit-form");

let editEmpId = null;

let inc = 1;
function getNewId(){
    return inc++;
}

function toggleModel(){
    modal.classList.toggle("hide-model");
    modal.classList.toggle("show-model");
}

function toggleEditModel(){
    editModel.classList.toggle("hide-model");
    editModel.classList.toggle("show-model");
} 
function editRecord(e){
//    closeBtn.addEventListener("click" , toggleModel);
    const empId = e.target.parentNode.parentNode.id;
    editEmpId = empId;
    toggleEditModel();
    prefillData(employees[empId]);
    closeBtn.addEventListener("click" , toggleEditModel);
}

function prefillData(employee){
    for(let property in employee){
        editForm[property] && (editForm[property].value = employee[property])
    }
}

function deleteRecord(e){
    e.target.parentNode.parentNode.remove();
}

function createNewEmployeeRecord(id , employee){
    const empNode = document.createElement("tr");
    empNode.id = id;
    let cell = document.createElement("td");
    cell.innerText = id;
    empNode.appendChild(cell);

    for(let i in employee){
        cell = document.createElement("td");
        cell.innerText = employee[i];
        empNode.appendChild(cell);
    }

    const options = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.className = "material-icons";
    editButton.addEventListener("click", editRecord);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.className = "material-icons";
    deleteButton.addEventListener("click", deleteRecord);

    options.append(editButton,deleteButton);
    empNode.appendChild(options);

    tableBody.appendChild(empNode);
}

modalToggleButton.addEventListener("click" , toggleModel);
closeIcon.addEventListener("click" , toggleModel);

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    let id = getNewId();
    const employee = {
        name : form.name.value,
        email : form.email.value,
        role : form.role.value,
        doj : form.doj.value,
        gender:form.gender.value,
    };
    employees[id] = employee;
    createNewEmployeeRecord(id , employee);
    form.reset();
    toggleModel();
});

editForm.addEventListener("submit" , e =>{
    e.preventDefault();
    const editedInfo = {
        name : editForm.name.value,
        email : editForm.email.value,
        role : editForm.role.value,
        doj : editForm.doj.value,
        gender:editForm.gender.value,
    }
    employees[editEmpId] = editedInfo;
    editForm.reset();
    toggleEditModel();

    const currNode = document.getElementById(editEmpId);
    let tdcellInd = 1;
    for(let property in editedInfo){
        currNode.children[tdcellInd++].innerText = editedInfo[property];
    }
});



