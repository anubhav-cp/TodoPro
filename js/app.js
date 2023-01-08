let list = []
let edit_id = null

function savelist(list){
    let data = JSON.stringify(list)
    console.log(data)
    localStorage.setItem('user', data)

}


function displayitem(){
    let display = ''

  list.forEach((to_do,i) =>{
    display += `<tr>
    <th scope="row">${i+1}</th>
    <td id="item1">${to_do.to_do}</td>
    <td id="done">${to_do.progress}</td>
    <td>
      <button type="submit" class="btn btn-danger" onclick='deleteitem(${i})'>Delete</button>
      <button type="submit" class="btn btn-success ms-1" onclick='edititem(${i})'>Edit</button>
      <button type="submit" class="btn btn-success ms-1" onclick='doneitem(${i})'>Finished</button>
    </td>
  </tr>`
  })
  document.getElementById('display_area').innerHTML = display
}

clearbtn.addEventListener('click', ()=>{
  let perm = confirm('Are you sure you want to clear the To-Do List? ')
  if(perm){
    list = []
    savelist(list)
  }

})


function doneitem(id){
  const progress = 'Finished'
  console.log("This is what i am testing", list[id].progress)
  list[id].progress = progress
  savelist(list)
  console.log("This is what i am testing", list[id].progress)
  document.getElementById('done').innerHTML = list[id].progress
  displayitem()
  
}

function deleteitem(id){
    list.splice(id,1)
    savelist(list)
    displayitem()
}

function edititem(id){
    edit_id = id
    document.getElementById('form1').value = list[id].to_do
    submit_item.innerHTML = 'Save Changes'
    

}


const objstr = localStorage.getItem('user')
if(objstr!=null){
    list = JSON.parse(objstr)
}

displayitem()
submit_item.addEventListener('click', (e)=>{
  e.preventDefault()
  const to_do_item = form1.value
  
  
    if(edit_id!=null){
        list.splice(edit_id, 1, {to_do: to_do_item, progress:'In Progress'})
        submit_item.innerHTML = 'Save'
        
    }
    else{
        list.push({to_do : to_do_item, progress:'In Progress'})
        console.log('list dude list',list)
    }
    
    
    console.log(list)
    savelist(list)
    document.getElementById('form1').value = ''
    displayitem()
    

})
