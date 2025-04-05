// Fetch and display data
async function getData() {
    try {
        const response = await fetch("https://product-management-hm2t.onrender.com/data");
        const result = await response.json();

        const existingContainer = document.querySelector(".container1");
        if (existingContainer) existingContainer.remove(); // Remove old data before appending new

        const container1 = document.createElement("div");
        container1.classList.add("container1");

        result.forEach((val) => {
            const parent = document.createElement("div");
            parent.classList.add("cards");

            const child1 = document.createElement("h4");
            const child2 = document.createElement("h4");
            const child3 = document.createElement("h4");
            const child4 = document.createElement("h4");

            child1.innerText = `ID: ${val.id}`;
            child2.innerText = `Name: ${val.name}`;
            child3.innerText = `Price: ₹${val.price}`;
            child4.innerText = `Stock: ${val.stock}`;

            parent.append(child1, child2, child3, child4);
            container1.append(parent);
        });

        document.body.append(container1);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// POST: Add product
async function postData(event) {
    event.preventDefault();

    const addId = document.getElementById("add-id").value;
    const addName = document.getElementById("add-name").value;
    const addPrice = document.getElementById("add-price").value;
    const addStock = document.getElementById("add-stock").value;

    const product = {
        id: addId,
        name: addName,
        price: addPrice,
        stock: addStock
    };
    console.log(product);
   
    

    try {
        let response = await fetch("https://product-management-hm2t.onrender.com/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        const result = await response.json();
        console.log("Added:", result);

        getData(); // Refresh data
        document.getElementById("addForm").reset();
    } catch (error) {
        console.error("Error adding product:", error);
    }
}

// PATCH: Update product
async function updateData(event) {
    event.preventDefault();

    const updateId = document.getElementById("update-id").value;
    const updateName = document.getElementById("update-name").value;
    const updatePrice = document.getElementById("update-price").value;
    const updateStock = document.getElementById("update-stock").value;

    const product = {
        id: updateId,
        name: updateName,
        price: updatePrice,
        stock: updateStock
    };

    try {
        const response = await fetch(`https://product-management-hm2t.onrender.com/data/${updateId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        const result = await response.json();
        console.log("Updated:", result);

        getData(); // Refresh data
        document.getElementById("updateForm").reset();
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

// DELETE: Remove product
async function delData(event) {
    event.preventDefault();

    const deleteId = document.getElementById("delete-id").value;

    try {
        const response = await fetch(`https://product-management-hm2t.onrender.com/data/${deleteId}`, {
            method: "DELETE"
        });

        const result = await response.json();
        console.log("Deleted:", result);

        getData(); // Refresh data
        document.getElementById("deleteForm").reset();
    } catch (error) {
        console.error("Error deleting product:", error);
    }
}

// Event Listeners
document.getElementById("addForm").addEventListener("submit", postData);
document.getElementById("updateForm").addEventListener("submit", updateData);
document.getElementById("deleteForm").addEventListener("submit", delData);

// Initial fetch
getData();
