
var title=document.getElementById('title')
var price =document.getElementById('price');
var taxes =document.getElementById('taxes');
var ads =document.getElementById('ads');
var descount =document.getElementById('descount')
var count=document.getElementById('count')
var total =document.getElementById('total');
var category=document.getElementById('category')
var creat=document.getElementById('creat')
    

var mood ='creat'
var one


//get data
function getData(){
    if(price.value !=''){
        var result=(+price.value + +taxes.value + +ads.value) -(descount.value);

        total.innerHTML =result;
        total.style.backgroundColor="#050"
    }
    else{
        total.innerHTML ='';
        total.style.backgroundColor="red"
    }

}


var dataContainer 

if(localStorage.info !=null){
    dataContainer=JSON.parse(localStorage.info);

}
else{
    var  dataContainer=[]
}

creat.onclick = function (){
    if(price.value ==""||title.value==""){
        alert('please enter your data ')
        return
    
    }
    
    var data={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        descount:descount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    
    }
    if(mood=='creat'|| data.count>0){
        
            dataContainer.unshift(data)
            
    
        
    }else{
        dataContainer[one]=data
        mood='creat'
        creat.innerHTML='creat'
        count.style.display='block'
        
    }
    
  
    localStorage.setItem('info',JSON.stringify(dataContainer));
    displayData();
    clearData();
    getData()
}


function clearData(){

        title.value=""
        price.value=""
        taxes.value=""
        ads.value=""
        descount.value=""
        total.innerHTML=""
        count.value=""
        category.value=""
        
}

function displayData(){

    
    var box =``;
    for(var i=0 ;i<dataContainer.length ;i++){
        box+=`<tr>
        <td>${i+1}</td>
        <td>${dataContainer[i].title}</td>
        <td>${dataContainer[i].price}</td>
        <td>${dataContainer[i].count}</td>
        <td>${dataContainer[i].taxes}</td>
        <td>${dataContainer[i].ads}</td>
        <td>${dataContainer[i].descount}</td>
        <td class="to">${dataContainer[i].total}</td>     
        <td>${dataContainer[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

    </tr>`
    }
    document.getElementById('table-body').innerHTML =box
    var deletAll=document.getElementById('deleteAll');
    if(dataContainer.length>0){
        deletAll.innerHTML=`<button onclick="deleteall()" >delete All       (${dataContainer.length})</button>
        `
    }else{
        deletAll.innerHTML=""
    }
}
displayData()



//delete


function deleteData(i){
    dataContainer.splice(i,1)
    localStorage.info=JSON.stringify(dataContainer)
    displayData()
}


function deleteall(){
    localStorage.clear()
    dataContainer.splice(0)
    displayData()
}


function updateData(i){
    title.value=dataContainer[i].title;
    price.value=dataContainer[i].price;
    taxes.value=dataContainer[i].taxes;
    ads.value=dataContainer[i].ads;
    descount.value=dataContainer[i].descount;
   
    count.style.display ='none'
    category.value =dataContainer[i].category;
    creat.innerHTML='update';
   
    mood = 'update'
    one=i;
    scroll({
            top:0,
            behavior:"smooth"
    })
}

var searchTerm ='title'

function getSearch(id){
    var searchTap =document.getElementById('search')
if(id=='searchtitle'){
 searchTerm ='title'
 searchTap.Placeholder='search by title'

}else{
    searchTerm ='category'

    searchTap.Placeholder='search by category'

}
searchTap.focus()
console.log(searchTerm)
}



function searchData(value){
    var box=``;
    if(searchTerm =='title'){

for( var i=0 ;i<dataContainer.length;i++){
    if(dataContainer[i].title.includes(value.toLowerCase())){
        box+=`<tr>
        <td>${i+1}</td>
        <td>${dataContainer[i].title}</td>
        <td>${dataContainer[i].price}</td>
        <td>${dataContainer[i].taxes}</td>
        <td>${dataContainer[i].ads}</td>
        <td>${dataContainer[i].descount}</td>
        <td class="to">${dataContainer[i].total}</td>     
        <td>${dataContainer[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>

    </tr>`
    }

}





    }else{
        for( var i=0 ;i<dataContainer.length;i++){
            if(dataContainer[i].category.includes(value.toLowerCase())){
                box+=`<tr>
                <td>${i+1}</td>
                <td>${dataContainer[i].title}</td>
                <td>${dataContainer[i].price}</td>
                <td>${dataContainer[i].taxes}</td>
                <td>${dataContainer[i].ads}</td>
                <td>${dataContainer[i].descount}</td>
                <td class="to">${dataContainer[i].total}</td>     
                <td>${dataContainer[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        
            </tr>`
            }
        
        }
    }
    document.getElementById('table-body').innerHTML =box

}