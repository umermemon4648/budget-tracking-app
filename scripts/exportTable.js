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
// console.log(newCol);
let arrayToString = newCol.join('\n');
console.log("arrayToString: ", arrayToString);

const exportBtnAnchorTag = document.querySelector('#export-btn-a-tag');
if (arrayToString.trim().length > 0) {
  let blob = new Blob([arrayToString], { type: 'text/csv' });
  console.log("blob: ", blob);
  let currentDate = new Date().toLocaleDateString('en-US');
  exportBtnAnchorTag.download = `Expenses(${currentDate})`;
  exportBtnAnchorTag.href = URL.createObjectURL(blob);
} else {
  exportBtnAnchorTag.removeAttribute('download');
  exportBtnAnchorTag.removeAttribute('href');
}
