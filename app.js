//  ****** Html tags *****
const setBudget = document.querySelector('#set-budget')
const setExpense = document.querySelector('#set-expense-amount')
const setBalance = document.querySelector('#remaining-balance')
let tableBody = document.querySelector('#table-body')


//  ****** Input fields *****
const budgetLimit = document.querySelector('#budget-limit')

const currentDate = document.querySelector('#date-field')
const amountField = document.querySelector('#amount-field')
const categoryField = document.querySelector('#category-field')
const descField = document.querySelector('#desc-field')



//  ****** forms *****
const setBudgetForm = document.querySelector('#set-budget-form')
const budgetDetailForm = document.querySelector('#budget-detail-form') 

//  ****** button *****
const setBudgetBtn = document.querySelector('#budget-btn')
let expenseBtn = document.querySelector('#expense-btn')
expenseBtn.textContent = "Add Expense"



//  ****** some Useful variables *****
let expenseList = []
let totalExpense = 0
let isSelectedRow = null
let isSetBudget = false






  
setBudgetForm.addEventListener('submit', (e) => {
  e.preventDefault()
    var value = parseFloat(budgetLimit.value);
    if (isNaN(value) || value < 0) {
        budgetLimit.value = '';
      return alert("-ve value is not allowed")

    }
    else {
      setBudget.innerHTML = budgetLimit.value;
      setBudgetForm.reset()
    } 
    
  });




// when expenseBtn hit, get all input values
budgetDetailForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const formFields = {
     date : currentDate.value,
     amount : Number(amountField.value),
     category : categoryField.value,
     desc : descField.value,
     id : Date.now(),
  }
  // creating random id for each item


  if (formFields.date ==='' || formFields.category==='' || formFields.desc==='' ) {
    alert('Please complete all input fields')
    return
  }
  else if((isNaN(formFields.amount) || formFields.amount<0)){
    alert('Please complete amount fields')
    return
  }
else if(isEdit){
  let updatedFields = {
    u_date:  currentDate.value,
    u_amount:  Number(amountField.value),
    u_category:  categoryField.value,
    u_desc:  descField.value,
    u_id:  Date.now(),

  }

  console.log("updatedFields: ", updatedFields)
  // addingRowsToTable(u_date, u_category, u_desc, u_amount, u_id)
// editRow()
}


else{
  expenseList.unshift(formFields)
  
  totalExpense += formFields.amount
  setExpense.textContent = totalExpense
  console.log(expenseList);
  addingRowsToTable(formFields)
}


// clearing all input fields in a form
budgetDetailForm.reset()
isEdit = false;


})


// **********  Function to insert new rows to the table ***********
function addingRowsToTable(formFields){
  console.log("addingRowsToTable: ", formFields);
  let {date, category, desc, amount, id} = formFields
  let row = tableBody.insertRow(0)
  
  // Add the data-id attribute with the id value
  row.setAttribute('data-id', id); 
  
  let cell0 = row.insertCell(0)
  let cell1 = row.insertCell(1)
  let cell2 = row.insertCell(2)
  let cell3 = row.insertCell(3)
  let cell4 = row.insertCell(4)
  
  cell0.innerHTML = date
  cell1.innerHTML = category
  cell2.innerHTML = desc
  cell3.innerHTML = amount
  cell4.innerHTML = `<i onclick="editRow(${id})" class="icons fa-regular fa-pen-to-square"></i>
  <i onclick="deletingRow(${id})" class="icons fa-solid fa-delete-left"></i>`
  console.log("expenseList after row added:  ",expenseList);
}


// **********  Deleting a row ***********
tableBody.addEventListener('click', (e)=>{

  let target = e.target
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove()
  }
  
})



// **********  Function to create a row ***********

const createTableRow = ()=>{
  const
}


