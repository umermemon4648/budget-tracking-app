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
let selectedRow = null
let isSetBudget = false






// **********  Function to create a row ***********
const createTableRow = (date, category, desc, amount)=>{
  const row = document.createElement('tr')
  row.innerHTML = `
  <td>${date}</td>
  <td>${category}</td>
  <td>${desc}</td>
  <td>${amount}</td>
  <td>
  <i class="edit icons fa-regular fa-pen-to-square"></i>
  <i class="delete icons fa-solid fa-delete-left"></i>
  </td>
  `
  return row
}


// **********  set budget form ***********
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

  
  
  
// ***** when expenseBtn hit, get all input values ******
budgetDetailForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  let date = currentDate.value
  let amount = amountField.value
  let category = categoryField.value
  let desc = descField.value

// validating all the fields
  if (date ==='' || category==='' || desc==='' ) {
    alert('Please complete all input fields')
    return
  }
  else if((isNaN(amount) || amount<0)){
    alert('Please complete amount fields')
    return
  }

  else if(selectedRow == null){
    const row = createTableRow(date, category, desc, amount)
    tableBody.appendChild(row)
    selectedRow = null
  }

  else{
    selectedRow.children[0].textContent = date
    selectedRow.children[1].textContent = category
    selectedRow.children[2].textContent = desc
    selectedRow.children[3].textContent = amount
    selectedRow = null
  }





// clearing all input fields in a form
budgetDetailForm.reset()


})





// **********  Deleting a row ***********
tableBody.addEventListener('click', (e)=>{
  
  let target = e.target
  if(target.classList.contains('delete')){
    target.parentElement.parentElement.remove()
  }
  
})


// **********  Edit a row ***********
tableBody.addEventListener('click', (e)=>{
  let target = e.target
  if(target.classList.contains('edit')){
    expenseBtn.textContent = "Update Expense"
    selectedRow = target.parentElement.parentElement
    currentDate.value = selectedRow.children[0].textContent
    categoryField.value = selectedRow.children[1].textContent
    descField.value = selectedRow.children[2].textContent
    amountField.value = selectedRow.children[3].textContent

  }
})






