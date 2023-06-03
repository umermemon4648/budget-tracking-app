//  ****** Html tags *****
const setBudget = document.querySelector('#set-budget')
const setExpense = document.querySelector('#set-expense-amount')
const setBalance = document.querySelector('#remaining-balance')
let tableBody = document.querySelector('#table-body')
let colorDivs = document.querySelector('.amount');


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


function formatNumberWithCommas(num) {
  // Check if the input is a string, and convert it to a number if necessary
  const value = typeof num === 'string' ? parseFloat(num) : num;

  // Return the formatted number as a string with commas
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



//  ****** validating budget limit field to accept only +ve numbers *****
budgetLimit.addEventListener('keydown', (e) => {
  const key = e.key;
  if (budgetLimit.value.length >= 8 && key !== 'Backspace' && key !== 'Delete') {
    e.preventDefault();
  }

  if (key === '-' || key === 'e' ) {
    e.preventDefault();
  }
});


//  ****** validating amount field to accept only +ve numbers *****
amountField.addEventListener('keydown', (e) => {
  const key = e.key;
  if (key === '-' || key === 'e') {
    e.preventDefault();
  }
});






// **********  set budget form ***********
setBudgetForm.addEventListener('submit', (e) => {
  e.preventDefault()

  setBudget.innerHTML = parseFloat(budgetLimit.value).toFixed(2);
      // setBudget.innerHTML =  (budgetLimit.value);
      // let bifyrest=budgetLimit.value
      // alert(typeof bifyrest)
      colorDivs.style.color = 'green';
      setBudgetForm.reset()
    
  });

  

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
    expenseBtn.textContent = "Add Expense"
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
    amountField.focus()
    selectedRow = target.parentElement.parentElement
    currentDate.value = selectedRow.children[0].textContent
    categoryField.value = selectedRow.children[1].textContent
    descField.value = selectedRow.children[2].textContent
    amountField.value = selectedRow.children[3].textContent

  }
})






