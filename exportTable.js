const exportBtn = document.querySelector('#export-btn');
let tr = document.querySelectorAll('tr');
// console.log(tr);

let tableData = Array.from(tr).map(row => {
  let rowData = Array.from(row.children)
  rowData.pop()
  return rowData.map(cell => cell.textContent);
});

 console.log(tableData);
 let newCol = tableData.map(col=> col.join(','))
 let arrayToString = newCol.join('\n')
 console.log(arrayToString);
 const exportBtnAnchorTag = document.querySelector('#export-btn-a-tag');
let blob = new Blob([], {type: 'text/csv'})
console.log(blob);
exportBtnAnchorTag.download='Download'
exportBtnAnchorTag.href = URL.createObjectURL(blob)


 // let trAsArray = Array.from(tr)
// for (let i = 0; i < trAsArray.length; i++) {
//     const element = trAsArray[i];
//     console.log(element);
    
// }