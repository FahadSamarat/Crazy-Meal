
// test

function Order(img, name, price) {
  this.img = img;
  this.name = name;
  this.price = price;
}

const form = document.getElementById("OrderForm");
const orderList = document.getElementById("orderlist");
const rmorall = document.getElementById("rmorall");

const ordersArr = [];

const savedOrders = localStorage.getItem("orders");
if (savedOrders) {
  const parsed = JSON.parse(savedOrders);
  parsed.forEach(order => {
    ordersArr.push(new Order(order.img, order.name, order.price));
  });
  renderData();
}

form.addEventListener(
  "submit",

  function (event) {
    event.preventDefault();

    const img = document.getElementById("mealImageUrl").value;
    const name = document.getElementById("mealName").value;
    const price = document.getElementById("mealPrice").value;

    const newOrder = new Order(img, name, price);

    ordersArr.push(newOrder);
    renderData();
  }
);

orderList.addEventListener("click", function (event) {
  if (event.target.classList.contains("rmbtn")) {
    const index = parseInt(event.target.getAttribute("inlist"), 10);
    if (!isNaN(index)) {
      ordersArr.splice(index, 1); // Remove one item at the specified index
      renderData();
    }
  }
});

rmorall.addEventListener("click", function (event) {
  event.preventDefault();
  ordersArr.length = 0;  
  renderData();          
});

function renderData() {
  orderList.innerHTML="";
  ordersArr.forEach((orders, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `

                    <img src="${orders.img}">
                    <div>
                    <p>${orders.name}</p>
                    <p>${orders.price}$</p>
                    </div>
                    <button id="rmor" inlist="${index}" class="rmbtn">Remove Order</button>
    `;
    orderList.appendChild(listItem);
    
  });

localStorage.setItem("orders", JSON.stringify(ordersArr));

const orinv = document.getElementById("orinv");
orinv.textContent = "Total order(s):"+ordersArr.length;
}