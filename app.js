//  ****** Html tags *****
const setBudgetAmount = document.querySelector('#budget-amount')


//  ****** Input fields *****
const budgetLimit = document.querySelector('#budget-limit')


//  ****** buttons *****
const budgetBtn = document.querySelector('#budget-btn')




if (setBudgetAmount.innerText === '') {
    budgetBtn.addEventListener('click', () => {
        var value = parseFloat(budgetLimit.value);
        if (isNaN(value) || value < 0) {
            budgetLimit.value = '';
          alert("-ve value is not allowed")
        }

        else {
          setBudgetAmount.innerHTML = `Rs: ${budgetLimit.value}`;
          budgetLimit.value = null;
        } 
        
        alert(setBudgetAmount.innerHTML);
      });
      

  } 

  else{
    console.log(setBudgetAmount.innerHTML)
        budgetBtn.disabled = true;
        budgetBtn.style.cursor = 'not-allowed';
        budgetBtn.style.opacity = 0.2;
        budgetLimit.readOnly = true;
        budgetLimit.style.opacity = 0.2;
        budgetLimit.style.border = 'none';
        }
  
  


