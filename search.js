const searchField = document.querySelector('#search-field')
// const tableBody = document.querySelector('#table-body')

function searchData(){
    let filter, table, tr, td, i, txtValue
    filter = searchField.value.toLowerCase()
    table = document.querySelector('#table-body')
    tr = table.getElementsByTagName('tr')



    
    for ( i = 0; i < tr.length; i++) {
       td = tr[i].getElementsByTagName('td')[1]
       console.log("td: ", td);
       if (td) {
        txtValue = td.textContent || td.innerText
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = ''
        }
        else{
            tr[i].style.display = 'none'
        }
       }
        
    }

}
searchField.addEventListener('keyup', ()=>{
    searchData()

})