//if there is a cart in local storage that will be cart

var cart =[];
if(localStorage.theCart){
  cart = JSON.parse(localStorage.theCart)
}

updateCartMenu()



//toppings
// const mushrooms = {name: 'mushrooms', price:1, used:false};
// const bacon = {name:'bacon', price:3, used:false};
// const olives = {name: 'olives', price:2, used:false};
// const peperoni = {name: 'peperoni', price:1, used:false};
// const peppers = {name: 'peppers', price:1, used:false};
// const cheese = {name:'cheese', price:2, used:false};
// const sauce = {name:'sauce', price: 0, used:false};
// const onion = {name:'onion', price:1, used:false};
// const pineapple = {name: 'pineapple', price:1, used:false};


// const thePizzas = [
//   {
//     dataName: 'kbm',
//     name:'Kevin Bacon and Mushroom',
//     toppings:[mushrooms, bacon],
//     price: 10
//   },
//   {
//     dataName: 'orion',
//     name:'The Orion Olive',
//     toppings:[olives, bacon],
//     price: 12
//   },
//   {
//     dataName: 'sandra',
//     name:'Sandra Bullock',
//     toppings:[peperoni, peppers, cheese],
//     price: 9
//   },
//   {
//     dataName: 'cmm',
//     name:'Colm Meany Margherita',
//     toppings:[cheese],
//     price: 10.99
//   },
//   {
//     dataName: 'sj',
//     name:'Scarlett Johansson',
//     toppings:[peperoni, cheese],
//     price: 13
//   },
//   // {
//   //   dataName: 'cyo',
//   //   name:'Create your Own',
//   //   toppings:[],
//   //   price: 0
//   // }
// ];
// populatePizzas();
// function populatePizzas(){
//   const mainShopContainer = document.querySelector('.mainShopContainer');
//   if(mainShopContainer === null) return;
//   thePizzas.map((pizza,i) =>{
//     let str = `
//     <div class="pizzaItem pizzaItem${i+1}">
// 					<img src="images/pizzas/${pizza.dataName}.png" alt="">
// 					<h3>${pizza.name}</h3>
//           <h4 class="price">€${pizza.price}</h4>
// 					<p>${pizza.toppings.map(topping=> topping.name)}</p>
// 					<div class="cartArea">
// 						<button class="cartBtn brightGreen-bg cartBtnMinus" data-pizza="${pizza.dataName}">-</button>
// 						<button class="cartBtn brightGreen-bg cartBtnPlus" data-pizza="${pizza.dataName}">+</button>
// 					</div>
// 				</div>
//     `;
//     console.log(mainShopContainer)
//     mainShopContainer.insertAdjacentHTML('beforeend', str);
//   })
// }

//get add and remove buttons
var cartBtnsPlus = document.querySelectorAll('.cartBtnPlus');
var cartBtnsMinus = document.querySelectorAll('.cartBtnMinus');

//add event listeners
cartBtnsPlus.forEach(r => r.addEventListener('click', addToCart))
cartBtnsMinus.forEach(r => r.addEventListener('click', removeFromCart))


//find relevent pizza from thePizzas array
//add it to the cart
//update the cart in the nav bar
function addToCart(e){
  console.log("cart?: ", cart)
  //if it's a cyo pizza we want to just add 'ThePizza'
  if(e.target.id === 'addToCart'){
    console.log("it's cyo, about to add..... ", ThePizza)
    cart = JSON.parse(localStorage.theCart);
    cart.push(ThePizza);
    updateCartMenu()
    updateStorage()
    //also need to reset ThePizza
    resetPizza()
    //and the topping inputs
    resetToppingInputs();
    //and modal table
    updateModalSummaryTable();
    
    return;
  }
  thePizzas.forEach(p=> {
    if(p.dataName === e.target.dataset.pizza ){
      cart.push(p);
      updateCartMenu()
      updateStorage()
    }
  })
}

//return if the cart is empty
//find relevent pizza in cart and remove it
//update the cart in the nav bar
function removeFromCart(e){
  //return if cart is empty
  if(cart.length === 0 ) return;

  //check if it's a cyo (will have been called from cyo page)
  if(e.target.id === 'removeFromCart'){
 
    //not foolproof but for simplicity remove the last cyo entry in the cart
    for(var i = cart.length-1; i > 0; i--){
      if(cart[i].dataName === 'cyo' ){
        cart.splice(cart.indexOf(cart[i]),1);
        break;
      }
    }

  }else{
      //and for non cyo pizzas, find them in the cart and remove
      // cart.forEach(p=> {
      //   if(p.dataName === e.target.dataset.pizza ){
      //     cart.splice(cart.indexOf(p),1);
      //   }
      // })
      for(var i = 0; i<cart.length;i++) {
        if(cart[i].dataName === e.target.dataset.pizza){
          cart.splice(cart.indexOf(cart[i]),1);
          break;
        }
       } 
  }
  updateCartMenu();
  updateStorage();
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

/////////////////////////////////
////////////CREATE YOUR OWN////////////
/////////////////////////////////
const cyoCartBtn = document.querySelector('.addToCartBtn');

// const cyoRemoveCartBtn = document.querySelector('.removeFromCart');
if(cyoCartBtn !==null){
  cyoCartBtn.addEventListener('click', addToCart);
}

// cyoRemoveCartBtn.addEventListener('click', removeFromCart);


////////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//FROM pizzaMaker.js///
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

function toggleToppings(event) {
  //TODO if modal is open, return
  if(document.querySelector('.modal').classList.contains('showModal')) return;
      addToPizza(event)
      //deal with checkboxes , first get .topppings div (parent of clicked checkbox)
      var parent = event.target.parentElement

      // if .toppings div is on(has class 'toppingOn'), true if off
      if(parent.classList.contains('toppingOn')){
          parent.classList.remove('toppingOn')
      }else{
          //else turn .topping div on
          parent.classList.add('toppingOn')
      }
      const pizzaMakerImgs = document.getElementById('pizzaMakerImgs');//img container

   //check if topping is already on, if yes turn off
   toppingToCheck = document.getElementById(this.value);
   if(toppingToCheck){
       pizzaMakerImgs.removeChild(toppingToCheck)
       return;	
   }

//else create an image element
  var newTopping = document.createElement('img');

  //set src,  .svg names correspond to their checkbox values
  newTopping.setAttribute('src', `images/pizzaMaker/${this.value}.svg`);
  newTopping.setAttribute('class', 'pizza-part');
  newTopping.setAttribute('id', this.value)

  //keep sauce at bottom
  if(this.value === 'sauce'){
      const base = document.getElementById('base');
      //sauce always on top of base and under other toppings
      pizzaMakerImgs.insertBefore(newTopping, base.nextSibling);
  }else{
      //for all toppings that are not sauce, append (ie on top)
      pizzaMakerImgs.append(newTopping);	
  }    
}

var checkBoxes = document.querySelectorAll('input[type=checkbox]');
//listen to checkboxes change, toggle the toppings
checkBoxes.forEach(box => box.addEventListener('change', toggleToppings))

/////////////////////////////MODAL
function toggleModal(){

const modal = document.querySelector('.modal');
if(modal.classList.contains('showModal')){
modal.classList.remove('showModal');


updateModalSummaryTable();
}else{
modal.classList.add('showModal');
updateModalSummaryTable();	
}
}

function updateModalSummaryTable(){
const summaryTable = document.getElementById('modalSummaryToppings');
summaryTable.innerHTML = '';
ThePizza.toppings.forEach(top => {
makeStuff('tr', 'modalRow', 'modalSummaryToppings', `
    <td class="modalTopping">${top.name}</td>
    <td class="modalToppingPrice">€${top.price}</td>`);
})
document.getElementById('modalTotalPrice').textContent = `€${ThePizza.price}`;
}

function makeStuff(elName, className, appendTo, content){
const el = document.createElement(elName);
el.setAttribute('class', className);
el.innerHTML = content;
const elem = document.getElementById(appendTo);
elem.append(el);
}

const orderBtn = document.querySelector('.orderNow-btn');
const closeModal = document.querySelector('#closeModal');

if(orderBtn !== null){
  orderBtn.addEventListener('click', toggleModal);
}
if(orderBtn !== null){
  closeModal.addEventListener('click', toggleModal);
}




////////////////Order the Pizza

const ThePizza = {
  dataName: 'cyo',
  name:'Create your Own',
  toppings:[],
  price: 4
};



function addTopping(name, price){

ThePizza.pizzaName = 'Create your own';
ThePizza.toppings.push({name:name, price:price})
console.log("adding ", parseInt(price))
ThePizza.price += parseInt(price);
updateModalSummaryTable();

}

function resetPizza(){
  ThePizza.price = 4;
  ThePizza.toppings = [];
  updatePrice()

}

function removeTopping(name, price){
ThePizza.toppings = ThePizza.toppings.filter(f => f.name !== name )
ThePizza.price -= parseInt(price);
updateModalSummaryTable();
}
// orderBtn.addEventListener('click', addToPizza);
function addToPizza(){
    if(event.target.checked){
        addTopping(event.target.value,event.target.dataset.price)
        updatePrice()
    }else if(!event.target.checked){
        removeTopping(event.target.value, event.target.dataset.price)
        updatePrice()
    }
}
function updatePrice(){
  
    const pizzaPrice = document.getElementById('pizzaPrice');
    pizzaPrice.textContent = `  €${ThePizza.price}`;
}

function resetToppingInputs(){
  //reset topping inputs
  const toppings = document.querySelectorAll('.toppingOn');
  toppings.forEach(t=> t.classList.remove('toppingOn'));

  const checkBoxes = document.querySelectorAll("input[type='checkbox']")
  checkBoxes.forEach(box=> box.checked = false)

  //reset pizza html (show base only)
  var images = document.querySelector('#pizzaMakerImgs');
  const base = `<img class="pizza-part" id="base" src="images/pizzaMaker/base.svg" alt="base">`;
  images.innerHTML = base;
}

