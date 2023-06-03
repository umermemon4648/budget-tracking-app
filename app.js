//  ****** Html tags *****
const setBudget = document.querySelector('#budget-amount')
const setExpense = document.querySelector('#expense-amount')
const setBalance = document.querySelector('#remaining-balance')


//  ****** Input fields *****
const budgetLimit = document.querySelector('#budget-limit')

const currentDate = document.querySelector('#date-field')
const amountField = document.querySelector('#amount-field')
const categoryField = document.querySelector('#category-field')
const descField = document.querySelector('#desc-field')



//  ****** buttons *****
const budgetBtn = document.querySelector('#budget-btn')
const expenseBtn = document.querySelector('#expense-btn') 


//  ****** some Useful variables *****
let expenseList = []
let totalExpense = 0



if (setBudget.innerText === '0.00') {
    budgetBtn.addEventListener('click', () => {
        var value = parseFloat(budgetLimit.value);
        if (isNaN(value) || value < 0) {
            budgetLimit.value = '';
          alert("-ve value is not allowed")
        }

        else {
          setBudget.innerHTML = `${budgetLimit.value}`;
          setBalance.innerHTML = `${budgetLimit.value}`;
          budgetLimit.value = null;
        } 
        
      });
      

  } 
  else if(setBudget.innerText > '0.00'){
    console.log(setBudget.innerHTML)
        budgetBtn.disabled = true;
        budgetBtn.style.cursor = 'not-allowed';
        budgetBtn.style.opacity = 0.2;
        budgetLimit.readOnly = true;
        budgetLimit.style.opacity = 0.2;
        budgetLimit.style.border = 'none';
        }
  

// when expenseByn hit, get all inut values
expenseBtn.addEventListener('click', ()=>{
  let date = currentDate.value
  let amount = Number(amountField.value)
  let category = categoryField.value
  let desc = descField.value
  // creating random id for each item
  let id = Date.now()


  if (date ==='' || category==='' || desc==='' ) {
    alert('Please complete all input fields')
    return
  }
  else if((isNaN(amount) || amount<0)){
    alert('Please complete amount fields')
    return
  }

else{
  expenseList.unshift({id, date, amount, category, desc})
  
  totalExpense += amount
  setExpense.textContent = totalExpense
  console.log(expenseList);
  addingRowsToTable(date, category, desc, amount, id)
}

// clearing all input fields in a form
currentDate.value = ''
amountField.value = ''
categoryField.value = ''
descField.value = ''


})


// **********  Function to insert new rows to the table ***********
function addingRowsToTable(date, category, desc, amount, id){
  let tableBody = document.querySelector('#table-body')
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


// **********  Function to delete a row ***********
const deletingRow = (id) => {
  // Find the row to delete based on the id

  let tableBody = document.querySelector('#table-body');

  // Find all rows within the table body
  let rows = tableBody.querySelectorAll('tr');

  // console.log("rows:", rows)
  let rowsToDelete = Array.from(rows).find((expectedRow)=> expectedRow.getAttribute('data-id')===String(id))

  // Delete the row from the table
  if (rowsToDelete) {
    tableBody.removeChild(rowsToDelete);

    
  // update expenseList array whenever a row is deleted 
  expenseList = expenseList.filter((exp)=> exp.id !== id)
  // console.log("expenseList_after delteing ",expenseList);

  // update Totalexpense section after deleting row
  totalExpense = expenseList.reduce((acc, exp)=> acc+exp.amount, 0)
  setExpense.textContent = totalExpense

  }

}



// **********  Function to delete a row ***********
const editRow = (id) => {
  // Find the row to delete based on the id

  let tableBody = document.querySelector('#table-body');

  // Find all rows within the table body
  let rows = tableBody.querySelectorAll('tr');

  // console.log("rows:", rows)
  let rowsToEdit = Array.from(rows).find((expectedRow)=> expectedRow.getAttribute('data-id')===String(id))

  // getting all td's of a specific row as an array
  console.log("rowsToEdit: ", rowsToEdit);


}

