async function getData() {
    let data = await fetch("https://product-management-1-9n1q.onrender.com");
    let result = await data.json();
    console.log(result);
    let container1 = document.createElement("div")
    container1.classList.add("container1")
    result.forEach((val)=>{
        let parent = document.createElement("div");
        let child1 = document.createElement("h4");
        let child2 = document.createElement("h4");
        let child3 = document.createElement("h4");
        let child4 = document.createElement("h4");
        parent.classList.add("cards")
        child1.innerText = val.id
        child2.innerText = val.name
        child3.innerText = val.price
        child4.innerText = val.stock
        parent.append(child1, child2, child3, child4);
        container1.append(parent);
    })
    document.body.append(container1);
    console.log(container1)
}

getData(); // Fetch data initially

async function postData(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let addId = document.getElementById("add-id").value;
    let addName = document.getElementById("add-name").value;
    let addPrice = document.getElementById("add-price").value;
    let addStock = document.getElementById("add-stock").value;

    let products = {
        id: addId,
        name: addName,
        price: addPrice,
        stock: addStock
    };

    let data = await fetch("https://product-management-1-9n1q.onrender.com", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(products)
    });

    let result = await data.json();
    // console.log(result);

    // Fetch updated data
    // getData();
}


// Attach the function to the form submission event
document.getElementById("addForm").addEventListener("submit", postData);


async function updateData(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let updateId = document.getElementById("update-id").value;
    let updateName = document.getElementById("update-name").value;
    let updatePrice = document.getElementById("update-price").value;
    let updateStock = document.getElementById("update-stock").value;

    let products = {
        id: updateId,
        name: updateName,
        price: updatePrice,
        stock: updateStock
    };

    let data = await fetch(`https://product-management-1-9n1q.onrender.com${updateId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(products)
    });

    let result = await data.json();
    // console.log(result);

    // Fetch updated data
    // getData();
}

// Attach the function to the form submission event
document.getElementById("updateForm").addEventListener("submit", updateData);

document.getElementById("updateForm").reset();

async function delData(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    let deleteId = document.getElementById("delete-id").value;

    let products = {
        id: deleteId
    };

    let data = await fetch(`https://product-management-1-9n1q.onrender.com${deleteId}`, {
        method: "DELETE"
    });

    let result = await data.json();
    // console.log(result);

    // Fetch updated data
    // getData();
    
}
document.getElementById("deleteForm").addEventListener("submit", delData);
document.getElementById("deleteForm").reset()
