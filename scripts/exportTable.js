const exportBtn = document.querySelector('#export-btn');
let tr = document.querySelectorAll('tr');

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

let newCol = tableData.map(col => col.join(','));
let arrayToString = newCol.join('\n');
console.log("tableData: ", tableData);

// if(tableData.length>1){
  const exportBtnAnchorTag = document.querySelector('#export-btn-a-tag');
  if (tableData.length>1) {
    console.log("arrayToString",arrayToString.length);
    let blob = new Blob([arrayToString], { type: 'text/csv' });
    console.log("blob: ", blob);
    let currentDate = new Date().toLocaleDateString('en-US');
    exportBtnAnchorTag.download = `Expenses(${currentDate})`;
    exportBtnAnchorTag.href = URL.createObjectURL(blob);
  } else {
    exportBtnAnchorTag.removeAttribute('download');
    exportBtnAnchorTag.removeAttribute('href');
    toastAlert("Home")
  }
// }

// else{
  // return toastAlert('Please! set your monthly budget');  
// }


