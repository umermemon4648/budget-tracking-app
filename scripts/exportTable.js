const exportBtn = document.querySelector('#export-btn');
let tr = document.querySelectorAll('tr');
// console.log(tr);

// let tableData = Array.from(tr).map(row => {
//   let rowData = Array.from(row.children)
//   rowData.pop()
//   return rowData.map(cell => cell.textContent);
// });

//  console.log(tableData);
//  let newCol = tableData.map(col=> col.join(','))
//  let arrayToString = newCol.join('\n')
//  console.log(arrayToString);


let tableData = Array.from(tr).map(row => {
  let rowData = Array.from(row.children);
  rowData.pop();
  return rowData.map(cell => {
    if (cell.textContent.includes(',')) {
      // If the cell contains a comma, wrap it in double quotes
      return `"${cell.textContent}"`;
    }
    return cell.textContent;
  });
});

console.log(tableData);

let newCol = tableData.map(col => col.join(','));
// console.log(newCol);
let arrayToString = newCol.join('\n');
console.log(arrayToString);



 
 const exportBtnAnchorTag = document.querySelector('#export-btn-a-tag');
let blob = new Blob([arrayToString], {type: 'text/csv'})
// console.log(blob);
let currDate = new Date().toLocaleDateString('en-US')
exportBtnAnchorTag.download=`Expenses(${currDate})`
exportBtnAnchorTag.href = URL.createObjectURL(blob)
