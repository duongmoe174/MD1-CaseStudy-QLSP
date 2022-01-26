class Product {
    constructor(id, name, category, supplier, number, numIP, numOP, price, status, image) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.supplier = supplier;
        this.number = number;
        this.numIP = numIP;
        this.numOP = numOP;
        this.price = price;
        this.status = status;
        this.image = image;
        if (this.number <= 0) {
            this.status = "<button disabled class='labelDanger'>Sold out</button>";
        }
        if (this.number > 0 && this.number < 5) {
            this.status = "<button disabled class='labelWarning'>Out soon</button>";
        }
        if (this.number > 5) {
            this.status = "<button disabled class='labelSuccess'>Stocking</button>";
        }
    }
}

let products = [
    new Product("1", "Whey Gold", "Whey Protein", "Optimum", 200, 0, 0, 20000, "", "http://bizweb.dktcdn.net/thumb/grande/100/011/344/products/on-whey-gold-standard-whey-protein-5lbs-double-rich-chocolate-gymstore.jpg?v=1640748044987"),
    new Product("2", "Mass Gainer", "Mass", "Labrada", 4, 0, 0, 20000, "", "https://wheyshop.vn/wp-content/uploads/2016/12/Platinum-Hydro-Whey-On-35lbs-1.jpg"),
    new Product("3", "Whey Blend", "Whey Protein", "Optimum", 0, 0, 0, 20000, "", "https://cdn.muscleandstrength.com/store/media/catalog/product/cache/all/image/700x700/602f0fa2c1f0d1ba5e241f914e856ff9/r/1/r1_wheyblend_68_chocolate_1.jpg"),
];

function showAllProduct() {
    let content = "<table>\n" +
        "            <tr>\n" +
        "                <th>ID</th>\n" +
        "                <th>Name</th>\n" +
        "                <th>Category</th>\n" +
        "                <th>Supplier</th>\n" +
        "                <th>Number</th>\n" +
        "                <th>Price</th>\n" +
        "                <th>Status</th>\n" +
        "                <th>Image</th>\n" +
        "                <th colspan='2'>Action</th>\n" +
        "            </tr>";
    for (let i = 0; i < products.length; i++) {
        let temp = " <tr>\n" +
            "            <td>" + products[i].id + "</td>\n" +
            "            <td>" + products[i].name + "</td>\n" +
            "            <td>" + products[i].category + "</td>\n" +
            "            <td>" + products[i].supplier + "</td>\n" +
            "            <td>" + products[i].number + "</td>\n" +
            "            <td>" + products[i].price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }) + "</td>\n" +
            "            <td>" + products[i].status + "</td>\n" +
            "            <td><img width='80px' height='80px' src='" + products[i].image + "'></td>\n" +
            "            <td><button class='btn btn-info' onclick='editProduct(" + i + ")'>Edit</button></td>\n" +
            "            <td><button class='btn btn-danger' onclick='deleteProduct(" + i + ")'>Delete</button></td>\n" +
            "        </tr>";
        content += temp;
    }
    content += "</table>";
    document.getElementById("content").innerHTML = content;
}

showAllProduct();

function checkExist(value) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == value) {
            return true
        }
        if (products[i].name == value) {
            return true
        }
    }
    return false;
}

function createNewProduct() {
    let id = document.getElementById("productId").value;
    let category = document.getElementById("category").value;
    let supplier = document.getElementById("supplier").value;
    let name = document.getElementById("productName").value;
    let number = document.getElementById("number").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let newP = new Product(id, name, category, supplier, number, '', '', '', price, image);
    if (!checkExist(id) || !checkExist(name)) {
        products.push(newP);
    } else {
        alert("Products already exist!")
    }
    showAllProduct();
    document.getElementById("productId").value = "";
    document.getElementById("category").value = "";
    document.getElementById("supplier").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("number").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
    showStockList();
}

function deleteProduct(index) {
    products.splice(index, 1);
    alert("Delete success!");
    showAllProduct();
    showStockList();
}

function editProduct(index) {
    let newId = prompt("Enter the new Id", products[index].id);
    let newName = prompt("Enter the new Name", products[index].name);
    let newCategory = prompt("Enter the new Category", products[index].category);
    let newSupplier = prompt("Enter the new Supplier", products[index].supplier);
    let newNumber = prompt("Enter the new Number of Product", products[index].number);
    let newPrice = prompt("Enter the new Price", products[index].price);
    products[index].id = newId;
    products[index].name = newName;
    products[index].category = newCategory;
    products[index].supplier = newSupplier;
    products[index].number = newNumber;
    products[index].price = newPrice;
    showAllProduct();
}

showStockList();

function findByName() {
    let newProducts = [];
    let findName = document.getElementById("findName").value;
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.includes(findName))
            newProducts.push(products[i]);
    }
    let content = "<table>\n" +
        "            <tr>\n" +
        "                <th>ID</th>\n" +
        "                <th>Name</th>\n" +
        "                <th>Category</th>\n" +
        "                <th>Supplier</th>\n" +
        "                <th>Number</th>\n" +
        "                <th>Price</th>\n" +
        "                <th>Status</th>\n" +
        "                <th>Image</th>\n" +
        "                <th colspan='2'>Action</th>\n" +
        "            </tr>";
    for (let i = 0; i < newProducts.length; i++) {
        let temp = " <tr>\n" +
            "            <td>" + newProducts[i].id + "</td>\n" +
            "            <td>" + newProducts[i].name + "</td>\n" +
            "            <td>" + newProducts[i].category + "</td>\n" +
            "            <td>" + newProducts[i].supplier + "</td>\n" +
            "            <td>" + newProducts[i].number + "</td>\n" +
            "            <td>" + newProducts[i].price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }) + "</td>\n" +
            "            <td>" + newProducts[i].status + "</td>\n" +
            "            <td><img width='80px' height='80px' src='" + newProducts[i].image + "'></td>\n" +
            "            <td><button class='btn btn-info' onclick='editProduct(" + i + ")'>Edit</button></td>\n" +
            "            <td><button class='btn btn-danger' onclick='deleteProduct(" + i + ")'>Delete</button></td>\n" +
            "        </tr>";
        content += temp;
    }
    content += "</table>";
    document.getElementById("content").innerHTML = content;
}

function check() {
    let data = [];
    data[0] = document.getElementById("productId").value;
    data[1] = document.getElementById("category").value;
    data[2] = document.getElementById("supplier").value;
    data[3] = document.getElementById("productName").value;
    data[4] = document.getElementById("number").value;
    data[5] = document.getElementById("price").value;
    data[6] = document.getElementById("image").value;
    let errorData = [];
    errorData[0] = "You have not entered the ID!!";
    errorData[1] = "You have not entered the Category!!";
    errorData[2] = "You have not entered the Supplier!!";
    errorData[3] = "You have not entered the Name!!";
    errorData[4] = "You have not entered the Number!!";
    errorData[5] = "You have not entered the Price!!";
    errorData[6] = "You have not entered the Image!!";
    let nearby = ["errorId", "errorCategory", "errorSupplier", "errorProductName", "errorNumber", "errorPrice", "errorImage"];
    for (let i in data) {
        let error = errorData[i];
        let span = nearby[i];
        if (data[i] == '') {
            document.getElementById(span).innerHTML = error;
        } else {
            document.getElementById(span).innerHTML = " <strong style='color: green;'> Success!</strong>";
        }
    }
}

function showStockList() {
    let content = "  <table>\n" +
        "                <tr>\n" +
        "                    <th rowspan=\"2\">ID</th>\n" +
        "                    <th rowspan=\"2\">Name</th>\n" +
        "                    <th rowspan=\"2\">Price</th>\n" +
        "                    <th colspan=\"2\">First period</th>\n" +
        "                    <th colspan=\"2\">In Period</th>\n" +
        "                    <th colspan=\"2\">Out Period</th>\n" +
        "                    <th colspan=\"2\">Last Period</th>\n" +

        "                </tr>\n" +
        "                <tr>\n" +
        "                    <td>Number</td>\n" +
        "                    <td>Total</td>\n" +
        "                    <td>Number</td>\n" +
        "                    <td>Total</td>\n" +
        "                    <td>Number</td>\n" +
        "                    <td>Total</td>\n" +
        "                    <td>Number</td>\n" +
        "                    <td>Total</td>\n" +

        "                </tr>";
    for (let i = 0; i < products.length; i++) {
        let total = products[i].number * products[i].price;
        let totalIP = products[i].numIP * products[i].price;
        let totalOP = products[i].numOP * products[i].price;
        let numLP = products[i].number + products[i].numIP - products[i].numOP;
        let totalLP = numLP * products[i].price;
        let temp = "             <tr>\n" +
            "                    <td>" + products[i].id + "</td>\n" +
            "                    <td>" + products[i].name + "</td>\n" +
            "                    <td>" + products[i].price + "</td>\n" +
            "                    <td>" + products[i].number + "</td>\n" +
            "                    <td>" + total.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }) + "</td>\n" +
            "                    <td>" + products[i].numIP + "</td>\n" +
            "                    <td>" + totalIP.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }) + "</td>\n" +
            "                    <td>" + products[i].numOP + "</td>\n" +
            "                    <td>" + totalOP.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }) + "</td>\n" +
            "                    <td>" + numLP + "</td>\n" +
            "                    <td>" + totalLP.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }) + "</td>\n" +
            "                </tr>";
        content += temp;
    }
    content += "</tabale>";
    document.getElementById("contentStock").innerHTML = content;
}

showStockList();
//INPUT OUTPUT STOCK
let productTag = document.getElementById("productSelect")
let productTagInput = document.getElementById("productSelectInput")

function loadStock() {
    for (let i = 0; i < products.length; i++) {
        productTag.innerHTML += `<option value="${products[i].name}">${products[i].name}</option>`;
    }
    for (let i = 0; i < products.length; i++) {
        productTagInput.innerHTML += `<option value="${products[i].name}">${products[i].name}</option>`;
    }
}

loadStock();

function changeProducts() {
    let productSelected = document.getElementById("productSelect").value;
    let categorySelected = document.getElementById("categorySelect")
    let idSelected = document.getElementById("idSelect")
    let supplierSelected = document.getElementById("supplierSelect")
    for (let i = 0; i < products.length; i++) {
        if (productSelected == products[i].name) {
            categorySelected.innerHTML = `<option value="${products[i].category}">${products[i].category}</option>`;
            supplierSelected.innerHTML = `<option value="${products[i].supplier}">${products[i].supplier}</option>`;
            idSelected.innerHTML = `<option value="${products[i].id}">${products[i].id}</option>`
        }
    }
}

changeProducts();

function changeProductsInput() {
    let productSelectedInput = document.getElementById("productSelectInput").value;
    let categorySelectedInput = document.getElementById("categorySelectInput")
    let idSelectedInput = document.getElementById("idSelectInput")
    let supplierSelectedInput = document.getElementById("supplierSelectInput")
    for (let i = 0; i < products.length; i++) {
        if (productSelectedInput == products[i].name) {
            categorySelectedInput.innerHTML = `<option value="${products[i].category}">${products[i].category}</option>`;
            supplierSelectedInput.innerHTML = `<option value="${products[i].supplier}">${products[i].supplier}</option>`;
            idSelectedInput.innerHTML = `<option value="${products[i].id}">${products[i].id}</option>`
        }
    }
}

changeProductsInput();

function updateOutput() {
    let productSelected = document.getElementById("productSelect").value;
    let newNumOutput = Number(document.getElementById("numberOutput").value);
    for (let i = 0; i < products.length; i++) {
        if (productSelected == products[i].name) {
            products[i].numOP = newNumOutput;
        }
    }
    showStockList();
}

function updateInput() {
    let productSelectedInput = document.getElementById("productSelectInput").value;
    let newNumInput = Number(document.getElementById("numberInput").value);
    for (let i = 0; i < products.length; i++) {
        if (productSelectedInput == products[i].name) {
            products[i].numIP = newNumInput;
        }
    }
    showStockList();
}

