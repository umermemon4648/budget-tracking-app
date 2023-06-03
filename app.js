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
  
const expenseList = []
let totalExpense = 0
// when expenseByn hit, get all inut values
expenseBtn.addEventListener('click', ()=>{
  let date = currentDate.value
  let amount = Number(amountField.value)
  let category = categoryField.value
  let desc = descField.value

  if (date ==='' || category==='' || desc==='' ) {
    alert('Please complete all input fields')
    return
  }
  else if((isNaN(amount) || amount<0)){
    alert('Please complete amount fields')
    return
  }

else{

  expenseList.unshift({id: Date.now(), date, amount, category, desc})
  
  totalExpense += amount
  // let expense = parseFloat(setExpense.textContent)
  // console.log("expense: ", expense);
  // console.log("expense type: ", typeof expense);
  // console.log("expense.textContent: ", expense.textContent);

  setExpense.textContent = totalExpense
  console.log(expenseList);

 
  
}
date = null
amount = null
category = null
desc = null
})

function myFunction(){
  let tableBody = document.querySelector('#table-body')
  let row = tableBody.insertRow(0)
  let cell0 = row.insertCell(0)
  let cell1 = row.insertCell(1)
  let cell2 = row.insertCell(2)
  let cell3 = row.insertCell(3)
  let cell4 = row.insertCell(4)

  cell0.innerHTML = '30-5-2023'
  cell1.innerHTML = 'Netflix subscription'
  cell2.innerHTML = 'Monthly subscription'
  cell3.innerHTML = 5000
  cell4.innerHTML = `<i class="icons fa-regular fa-pen-to-square"></i>
  <i class="icons fa-solid fa-delete-left"></i>`
}