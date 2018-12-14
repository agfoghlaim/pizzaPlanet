var cart =[];
if(localStorage.theCart){
  cart = JSON.parse(localStorage.theCart)
}
var total = getTotal();

updateCartMenu()

//update cart no. items in the nav menu
function updateCartMenu(){

    const navCart = document.querySelector('.nav-cart-items');
    navCart.textContent = cart.length;
  
    let str = `<ul>`;
    cart.forEach(i => str += `<li>1 X ${i.name}, €${i.price}</li>`)
    str += '</ul>';
   
    const navDets = document.querySelector('.nav-cart-dets')
    navDets.innerHTML = str;
  }

  function sayCartEmpty(){
    const cartList = document.querySelector('.cartList');
    cartList.innerHTML = '<p style="text-align:center;">Cart is empty.</p><p style="text-align:center;"><a class="textBtn brightGreen-bg" href="index.html">Get some Pizzas</p>';
  }

  function hideCheckoutBtn(){
    checkoutLink = document.querySelector('.checkout-link');
    if(checkoutLink !== null){
      checkoutLink.innerHTML = '';
    }
    
  }

  writeCartContents();
  function writeCartContents(){
    //if cart is empty, put message on page and hide the pay now button
    if(cart.length === 0 ){
      sayCartEmpty();
      hideCheckoutBtn();
      return;
    }
    total = getTotal();
   
      var str = `<table id="cart-list">
        <thead>
          <th>Pizza Name</th>
          <th>Price</th>
          <th>Toppings</th>
          <th>Remove</th>
        </thead>
      <tbody>
      `;

      //for each item in the cart, get the toppings name and price
      //create str with cart info
      //add it to the dom
      cart.forEach(i => {
        var toppings ='';
        i.toppings.map(top => toppings += `${top.name} (€${top.price}) `);
        str += `<tr class="cart-list-item" data-name="${i.dataName}"><td>1 X ${i.name}</td> <td>€${i.price}</td><td>${toppings}</td><td><button data-name="${i.dataName}" class="cart-delete">x</button></td></tr>`})
      str += `
      
      </tbody></table>`;
      const cartList = document.querySelector('.cartList');
      cartList.innerHTML = str;
      
      //num items
      const cartItems = document.querySelector('p.cart-items');
      cartItems.textContent = `Items: ${cart.length}`;
      
      //cart total
      const cartTotal = document.querySelector('p.cart-total');
      cartTotal.textContent = `Total: €${total}`;
  }

  function getTotal(){
     
      var total = 0;
      cart.forEach(i=>total+=i.price);
      //return total;

      //also update stripe charge 
      //  const stripeForm = document.querySelector('.stripe-button');
      //  stripeForm.dataset.amount = total.toFixed(2);
      //  stripeForm.addEventListener('click', sendAmount);

      //  console.log("stripe amt ", stripeForm.dataset.amount )
       var hiddenAmount = document.querySelector('#hiddenAmount');
       hiddenAmount.value = total*100;
       return total.toFixed(2);

  }



  var deletebtns = document.querySelectorAll('.cart-delete');
  deletebtns.forEach(b=>b.addEventListener('click', removeFromCart));
 

  function removeFromCart(e){
    //return if cart is empty
 
    if(cart.length === 0 ) return;

  
        //and for non cyo pizzas, find them in the cart and remove
       // cart.forEach(p=> {
         for(var i = 0; i<cart.length;i++) {
          if(cart[i].dataName === e.target.dataset.name){
 
              cart.splice(cart.indexOf(cart[i]),1);
         
            
            break;
          }
         }  
         
        //rewrite the cart html 
        writeCartContents();

    //update the menu
    updateCartMenu();

    //update local storage
    updateStorage();
  deletebtns = document.querySelectorAll('.cart-delete');
  deletebtns.forEach(b=>b.addEventListener('click', removeFromCart));
  
  }

  //update cart no. items in the nav menu
function updateCartMenu(){
    const navCart = document.querySelector('.nav-cart-items');
    navCart.textContent = cart.length;
  
    let str = `<ul>`;
    cart.forEach(i => str += `<li>1 X ${i.name}, €${i.price}</li>`)
    str += '</ul>';
   
    const navDets = document.querySelector('.nav-cart-dets')
    navDets.innerHTML = str;
  }
  
  //update cart in local storage
  function updateStorage(){
    localStorage.setItem('theCart', JSON.stringify(cart));
  
  }