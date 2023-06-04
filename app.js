// ****** HTML tags *****
const setBudget = document.querySelector('#set-budget');
const setExpense = document.querySelector('#set-expense-amount');
const setBalance = document.querySelector('#remaining-balance');
let tableBody = document.querySelector('#table-body');
let colorDivs = document.querySelector('.amount');

// ****** Input fields *****
const budgetLimit = document.querySelector('#budget-limit');
const currentDate = document.querySelector('#date-field');
const amountField = document.querySelector('#amount-field');
const categoryField = document.querySelector('#category-field');
const descField = document.querySelector('#desc-field');

// ****** Forms *****
const setBudgetForm = document.querySelector('#set-budget-form');
const budgetDetailForm = document.querySelector('#budget-detail-form');

// ****** Buttons *****
const setBudgetBtn = document.querySelector('#budget-btn');
let expenseBtn = document.querySelector('#expense-btn');
expenseBtn.textContent = "Add Expense";

// ****** Some useful variables *****
let expenseList = [];
let selectedRow = null;
let isSetBudget = false;
let previousExpenseAmount = 0

// /creating an obj
let obj = {
  totalExpense: 0,
  totalBudget: 0,
  balanceLeft: 0
}



// ****** Validating budget limit field to accept only positive numbers *****
budgetLimit.addEventListener('keydown', (e) => {
  const key = e.key;
  if (budgetLimit.value.length >= 8 && key !== 'Backspace' && key !== 'Delete') {
    e.preventDefault();
  }

  if (key === '-' || key === 'e') {
    e.preventDefault();
  }
});

// ****** Validating amount field to accept only positive numbers *****
amountField.addEventListener('keydown', (e) => {
  const key = e.key;
  if (amountField.value.length >= 6 && key !== 'Backspace' && key !== 'Delete') {
    e.preventDefault();
  }

  if (key === '-' || key === 'e') {
    e.preventDefault();
  }
});

// ********** Set budget form ***********
setBudgetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (budgetLimit.value === '') {
    return alert('Please set your budget limit');
  }
  obj.totalBudget = parseFloat(budgetLimit.value)
  calculateBalance(obj.totalBudget, obj.totalExpense)
  setBudget.innerHTML = obj.totalBudget.toFixed(2);
  colorDivs.style.color = 'green';
  setBudgetForm.reset();
});

// ********** Function to create a table row ***********
const createTableRow = (id, date, category, desc, amount) => {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${date}</td>
    <td>${category}</td>
    <td>${desc}</td>
    <td>${amount}</td>
    <td>
      <i class="edit icons fa-regular fa-pen-to-square"></i>
      <i class="delete icons fa-solid fa-delete-left"></i>
    </td>
  `;
  row.dataset.id = id; 
  return row;
};

// ****** Fetch expenseList from localStorage *****
const fetchExpenseList = () => {
  const getExpenses = localStorage.getItem('expenseList');
  if (getExpenses) {
    expenseList = JSON.parse(getExpenses);
  } else {
    expenseList = []; // Initialize expenseList as an empty array if it doesn't exist in localStorage
  }
};


// ****** Populate table *****
const populateTable = () => {
  tableBody.innerHTML = ''; 
  expenseList.forEach((exp, index) => {
    const row = createTableRow(index, exp.date, exp.category, exp.desc, exp.amount);
    tableBody.appendChild(row);
  });
};


// ****** Store expenseList to localStorage *****
const storeExpenseList = () => {
  localStorage.setItem('expenseList', JSON.stringify(expenseList));
};

// ****** Add expense to expenseList *****
const addExpense = (date, category, desc, amount) => {
  expenseList.push({ date, category, desc, amount });
  storeExpenseList();
  populateTable();
  calculateExpenses()
  calculateBalance(obj.totalBudget, obj.totalExpense)
  
};

// ****** Update expense in expenseList *****
const updateExpense = (index, date, category, desc, amount) => {
  expenseList[index] = { date, category, desc, amount };
  storeExpenseList();
  populateTable();
  calculateExpenses()
  calculateBalance(obj.totalBudget, obj.totalExpense)
};

// ****** Delete expense from expenseList *****
const deleteExpense = (index) => {
  expenseList.splice(index, 1);
  storeExpenseList();
  populateTable();
  calculateExpenses()
  calculateBalance(obj.totalBudget, obj.totalExpense)
};


// ****** Submitting budget detail form *****
budgetDetailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let date = currentDate.value;
  let amount = amountField.value;
  let category = categoryField.value;
  let desc = descField.value;
  
  // Validating all the fields
  if (date === '') {
    return alert('Please enter the date');
  }
  
  else if (amount === '') {
    return alert('Please enter the amount');
  }
  
  else if (category === '') {
    return alert('Please enter the category');
  }
  
  else if (desc === '') {
    return alert('Please enter the description');
  }

  else if(obj.totalBudget<=0){
    return alert('Please! set your monthly budget');    
  }
  
  else if(amount > obj.balanceLeft && previousExpenseAmount==0){
    return alert('The amount you entered is greater than remaining balance you have!');    
  }


  
  else if (selectedRow == null) {
    addExpense(date, category, desc, amount);
    selectedRow = null;
  }
   
  else {
    if (amount-previousExpenseAmount > obj.balanceLeft) {
      return alert('The amount you entered is greater than remaining balance you have!');    
    }
    const rowIndex = parseInt(selectedRow.dataset.id);
    updateExpense(rowIndex, date, category, desc, amount);
    selectedRow = null;
    expenseBtn.textContent = "Add Expense";
  }

  budgetDetailForm.reset();
});


// ****** Deleting a row *****
tableBody.addEventListener('click', (e) => {
  let target = e.target;
  if (target.classList.contains('delete')) {
    const rowIndex = parseInt(target.parentElement.parentElement.dataset.id);
    deleteExpense(rowIndex);
  }
});


// ****** Editing a row *****
tableBody.addEventListener('click', (e) => {
  let target = e.target;
  if (target.classList.contains('edit')) {
    expenseBtn.textContent = "Update Expense";
    amountField.focus();
    selectedRow = target.parentElement.parentElement;
    currentDate.value = selectedRow.children[0].textContent;
    categoryField.value = selectedRow.children[1].textContent;
    descField.value = selectedRow.children[2].textContent;
    previousExpenseAmount =  amountField.value = selectedRow.children[3].textContent;
  }
});

// Call fetchExpenseList to get expenseList from localStorage
fetchExpenseList();

// Call populateTable to initially render the table
populateTable();

// ****** Editing a row *****
function calculateBalance(totalBudget, totalExpense){
  obj.balanceLeft = totalBudget-totalExpense 
  setBalance.textContent = (obj.balanceLeft).toFixed(2)
}

// ****** Function to calculate epenses enter *****
function calculateExpenses(){
  let tableBody = document.querySelector('#table-body');

  // Find all rows within the table body
  let rows = tableBody.querySelectorAll('tr');

  // getting fourth child <td> elements for each row as an array
let fourthChildTds = Array.from(rows, row => row.querySelector('td:nth-child(4)'));

let sum = fourthChildTds.reduce((acc, cur) => acc + parseInt(cur.textContent), 0);
console.log("sum:", sum);
obj.totalExpense = parseInt(sum)

setExpense.textContent = (obj.totalExpense).toFixed(2)
}


