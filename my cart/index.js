let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listcard = document.querySelector('.listcard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Iphone 14 plus',
        image: 'appleiphone14plus.jpg',
        price: 120000
    },
    {
        id: 2,
        name: 'Gucci Jacket',
        image: 'gucci.avif',
        price: 22000
    },
    {
        id: 3,
        name: 'Gucci Shirt',
        image: '13834043_17150075_600.webp',
        price: 12000
    },
    {
        id: 4,
        name: 'GG Jacquard Cotton Jacket',
        image: 'gucci balck.webp',
        price: 30000
    },
    {
        id: 5,
        name: 'H&M Trouser',
        image: 'open-uri20221114-22478-1lsg1n4.jpeg',
        price: 3200
    },
    {
        id: 6,
        name: 'Lascoste Touser',
        image: '1058939e-c637-45bf-a271-ab6991868f19.17ace7ec9bf5397f189f91760035c909.webp',
        price: 12000
    }
];
let listcards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addTocard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addTocard(key){
    if(listcards[key] == null){
        // copy product form list to list card
        listcards[key] = JSON.parse(JSON.stringify(products[key]));
        listcards[key].quantity = 1;
    }
    reloadcard();
}
function reloadcard(){
    listcard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listcards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listcard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listcards[key];
    }else{
        listcards[key].quantity = quantity;
        listcards[key].price = quantity * products[key].price;
    }
    reloadcard();
}