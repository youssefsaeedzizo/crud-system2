var productNameinput = document.getElementById("productName");
var productPriceinput = document.getElementById("productprice")
var productCateinput = document.getElementById("productCategory")
var productdescinput = document.getElementById("ProductInfo")
var searchInput = document.getElementById("productSearch")

var datalist;
if(localStorage.getItem("list") == null){
    datalist = [];
}
else{
    datalist = JSON.parse(localStorage.getItem("list"))
    display()
}

function addProduct(){
    var product= {
        name :productNameinput.value,
        price : productPriceinput.value,
        category:productCateinput.value,
        desc:productdescinput.value,
    }
    
    datalist.push(product)
    localStorage.setItem("list",JSON.stringify(datalist))
    display()
}

function display(){
    var temp = ``;
    for (var i = 0 ; i < datalist.length ; i++){
        temp+=`
        <tr>
            <td>`+i+`</td>
            <td>`+datalist[i].name+`</td>
            <td>`+datalist[i].price+`</td>
            <td>`+datalist[i].category+`</td>
            <td>`+datalist[i].desc+`</td>
            <td><button onclick="updateProduct(`+i+`)"  class="btn btn-info" type="button">Update</button></td>
            <td><button onclick="deleteItem(`+i+`)" class="btn btn-danger" type="button">Delete</button></td>
          </tr>
        `
    }

    document.getElementById("tblbody").innerHTML = temp


}


function deleteItem(i){
    datalist.splice(i,1);
    localStorage.setItem("list",JSON.stringify(datalist))
    display()
}



function search(){
    var searchValue = searchInput.value.toLowerCase();
    var temp = ``;
    for (var i = 0 ; i < datalist.length ; i++){
        if(datalist[i].name.toLowerCase().includes(searchValue)
        ||
        datalist[i].category.toLowerCase().includes(searchValue)
        ){
            temp+=`
        <tr>
            <td>`+i+`</td>
            <td>`+datalist[i].name.toLowerCase().replace(searchValue,"<span class='bg-danger'>"+searchValue+"</span>")+`</td>
            <td>`+datalist[i].price+`</td>
            <td>`+datalist[i].category.toLowerCase().replace(searchValue,"<span class='bg-danger'>"+searchValue+"</span>")+`</td>
            <td>`+datalist[i].desc+`</td>
            <td><button onclick="updateProduct(`+i+`)"  class="btn btn-info" type="button">Update</button></td>
            <td><button onclick="deleteItem(`+i+`)" class="btn btn-danger" type="button">Delete</button></td>
          </tr>
        `
        }
        
    }

    document.getElementById("tblbody").innerHTML = temp

   
}

var addBtnStyle = document.getElementById("addBtn");
var editBtnStyle = document.getElementById("editBtn")


var updateIndex ;

function updateProduct(i){
    addBtnStyle.style.display = "none"
    editBtnStyle.style.display="inline-block"

    productNameinput.value = datalist[i].name;
    productPriceinput.value = datalist[i].price;
    productCateinput.value = datalist[i].category;
    productdescinput.value = datalist[i].desc;

    updateIndex = i;
}

function edit(){
    datalist[updateIndex].name = productNameinput.value;
    datalist[updateIndex].price = productPriceinput.value;
    datalist[updateIndex].category = productCateinput.value;
    datalist[updateIndex].desc = productdescinput.value;
    localStorage.setItem("list",JSON.stringify(datalist))
    display()
}