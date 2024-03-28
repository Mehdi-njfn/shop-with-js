let products = [
  {id:1, title:'Album 1',srcImg:'Images/Album 1.png', price:15.80, quantity:0 },
  {id:2, title:'Album 2',srcImg:'Images/Album 2.png', price:17.80, quantity:0 },
  {id:3, title:'Album 3',srcImg:'Images/Album 3.png', price:22.80, quantity:0 },
  {id:4, title:'Album 4',srcImg:'Images/Album 4.png', price:19.80, quantity:0 },
  {id:5, title:'Cofee',srcImg:'Images/Cofee.png', price:5.80, quantity:0 },
  {id:6, title:'shirt',srcImg:'Images/shirt.png', price:12.80, quantity:0 },
]

let shopItems = document.querySelector('.shop-items');
let totalPrice = document.querySelector('.cart-total-price');
let btnPurchase = document.querySelector('.btn-purchase');
let cartItems = document.querySelector('.cart-items');

let cart = [];

function setQuntity(value, id, carts){
  cart = carts.map(row=>{
    if (row.id === id) {
      return {...row, quantity: JSON.parse(value)}
    }else {
      return row;
    }
  })
  totalPriceCart(cart)
}

function showCart(cartf){

  totalPriceCart(cartf);
  cartItems.innerHTML = ''

  cartf.forEach(row=>{
    let div1 = document.createElement('div');
    div1.classList.add('cart-row');

    let div2 = document.createElement('div');
    div2.classList = 'cart-item cart-column';

    let img = document.createElement('img');
    img.classList.add('cart-item-image');
    img.src = row.srcImg;
    
    let span = document.createElement('span');
    span.classList.add('cart-item-title');
    span.innerHTML = row.title;

    div2.append(img, span);

    let span2 = document.createElement('span');
    span2.classList = 'cart-price cart-column';
    span2.innerHTML = `$${row.price}`;

    let div3 = document.createElement('div');
    div3.classList = 'cart-quantity cart-column';

    let input = document.createElement('input');
    input.classList = 'cart-quantity-input'
    input.setAttribute('type', 'number');
    input.value = row.quantity;
    input.addEventListener('change',function(){
      setQuntity(input.value, row.id, cart);
    })

    let removeBtn = document.createElement('button');
    removeBtn.classList = 'btn btn-danger';
    removeBtn.innerHTML = 'REMOVE';
    removeBtn.addEventListener('click',function(){
      cart = cartf.filter(item=>{return item.id !== row.id })
      console.log(cart);
      showCart(cart);
    })

    div3.append(input, removeBtn);

    div1.append(div2, span2, div3)
    cartItems.append(div1);
  })

}

function totalPriceCart(cart){
  let sum = 0;
  cart.forEach(row=>{
    sum += (row.price * row.quantity);
  })
  totalPrice.innerHTML = `$${sum.toFixed(2)}`
}

function addToCart(item){
  let findItem = cart?.find(row=>{
    if (row.id === item.id) {
      return row;
    }  
  })
  if (!findItem) {
    cart.push({...item, quantity: 1});
  }else{
    cart = cart.map(row=>{
      if(item.id === row.id){
        return {...row, quantity: row.quantity+1};
      }else{
        return row;
      }
    })
  }
    showCart(cart);
  }

function createItem(item){
  let div1 = document.createElement('div');
  div1.classList.add('shop-item');
  
  let span1 = document.createElement('span');
  span1.classList.add('shop-item-title');
  span1.innerHTML = item.title;
  
  let img = document.createElement('img');
  img.classList.add('shop-item-image');
  img.src = item.srcImg;
  
  let div2 = document.createElement('div');
  div2.classList.add('shop-item-details');
  
  let span2 = document.createElement('span');
  span2.classList.add('shop-item-price');
  span2.innerHTML = `$${item.price}`;
  
  let addBtn = document.createElement('button');
  addBtn.classList = 'btn btn-primary shop-item-button';
  addBtn.innerHTML = 'ADD TO CART';
  addBtn.addEventListener('click',function(){
    addToCart(item);
  })

  div2.append(span2, addBtn);
  div1.append(span1, img, div2);
  shopItems.append(div1);
}

function addItems (){
  products.forEach(row => {
    createItem(row);
  });
}


addItems();