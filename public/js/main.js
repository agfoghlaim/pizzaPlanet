//if there is a cart in local storage that will be cart

var cart =[];
if(localStorage.theCart){
  cart = JSON.parse(localStorage.theCart)
}

updateCartMenu()


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
  //ThePizza is the same structure to pizzas 'ThePizzas' array defined in js/home.js

  //if it's a create your own pizza we want to just add 'ThePizza' to the cart
  //also... 
  //update the cart details on the menu, 
  //update the cart in local storage, 
  //reset 'ThePizza' to base only, 
  //reset the topping input buttons on pizzaMaker.html 
  //and update the summary table in the modal on pizzaMaker.html
  if(e.target.id === 'addToCart'){
    cart = JSON.parse(localStorage.theCart);
    cart.push(ThePizza);
    updateCartMenu();
    updateStorage();
    resetPizza();
    resetToppingInputs();
    updateModalSummaryTable();
    return;
  }

  //if it's any other pizza or deal..
  //add it to cart and
  //update cart details on the menu
  //and update the cart in localStorage
  thePizzas.forEach(p=> {
    if(p.dataName === e.target.dataset.pizza ){
      cart.push(p);
      updateCartMenu()
      updateStorage()
    }
  })

  theDeals.forEach(p=> {
    console.log("here ", p.dataName, e.target.dataset.deal)
    if(p.dataName === e.target.dataset.deal ){
      cart.push(p);
      updateCartMenu()
      updateStorage()
    }
  })
}

//return if cart is empty, then
//find relevent pizza in cart and remove it
//update the cart in the nav bar
function removeFromCart(e){

  if(cart.length === 0 ) return;

    //find them in the cart and remove
    for(var i = 0; i<cart.length;i++) {
          if(cart[i].dataName === e.target.dataset.pizza || cart[i].dataName === e.target.dataset.deal){
          cart.splice(cart.indexOf(cart[i]),1);
          break;
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
if(cyoCartBtn !==null){
  cyoCartBtn.addEventListener('click', addToCart);
}


function toggleToppings(event) {
  //if modal is open, return
  if(document.querySelector('.modal').classList.contains('showModal')) return;
      addToPizza(event);

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
  newTopping.setAttribute('src', `img/pizzaMaker/${this.value}.svg`);
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

const checkBoxes = document.querySelectorAll('input[type=checkbox]');

//listen to checkboxes change, toggle the toppings
checkBoxes.forEach(box => box.addEventListener('change', toggleToppings))

//////
//MODAL
//////

//toggle modal on pizzaMaker.html
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


//update pizza summary
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


//helper function to create table in modal
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


//add a topping and update the summary table in the modal
function addTopping(name, price){
  ThePizza.pizzaName = 'Create your own';
  ThePizza.toppings.push({name:name, price:price})
  ThePizza.price += parseInt(price);
  updateModalSummaryTable();
}

//reset 'ThePizza'
function resetPizza(){
  ThePizza.price = 4;
  ThePizza.toppings = [];
  updatePrice()
}

//remove a topping and update the summary details table
function removeTopping(name, price){
  ThePizza.toppings = ThePizza.toppings.filter(f => f.name !== name )
  ThePizza.price -= parseInt(price);
  updateModalSummaryTable();
}

//add topping to pizza, used in toggleToppings()
function addToPizza(event){
    if(event.target.checked){
        addTopping(event.target.value,event.target.dataset.price)
        updatePrice();
    }else if(!event.target.checked){
        removeTopping(event.target.value, event.target.dataset.price)
        updatePrice();
    }
}
function updatePrice(){
    const pizzaPrice = document.getElementById('pizzaPrice');
    pizzaPrice.textContent = `  €${ThePizza.price}`;
}

//reset topping inputs, called after a cyo pizza has been added to the cart
function resetToppingInputs(){

  //get toppings in dom and remove 'toppingOn' class if it exists
  const toppings = document.querySelectorAll('.toppingOn');
  toppings.forEach(t=> t.classList.remove('toppingOn'));

  //reset the checkbox inputs to checked = false;
  const checkBoxes = document.querySelectorAll("input[type='checkbox']")
  checkBoxes.forEach(box=> box.checked = false)

  //reset pizza html (show base only)
  var images = document.querySelector('#pizzaMakerImgs');
  const base = `<img class="pizza-part" id="base" src="img/pizzaMaker/base.svg" alt="base">`;
  images.innerHTML = base;
}

