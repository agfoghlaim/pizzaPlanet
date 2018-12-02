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

const detailsBtn = document.querySelector('.details-btn');
const closeModal = document.querySelector('#closeModal');
//console.log("btn "+ orderBtn)
detailsBtn.addEventListener('click', toggleModal);
closeModal.addEventListener('click', toggleModal);


////////////////Order the Pizza
const ThePizza = {
    dataName: 'cyo',
    name:'Create your Own',
    toppings:[],
    price: 0
  };



function addTopping(name, price){
ThePizza.createYourOwn=true;
ThePizza.pizzaName = 'Create your own';
ThePizza.toppings.push({name:name, price:price})
ThePizza.price += parseInt(price);
console.log("adding ", parseInt(price))
updateModalSummaryTable();

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
  }
  else if(!event.target.checked){
  
      removeTopping(event.target.value, event.target.dataset.price)
      updatePrice()
  }

  function updatePrice(price){
      console.log("this is cyo the pizza ", ThePizza)
      const pizzaPrice = document.getElementById('pizzaPrice');
      //ThePizza.price -= parseInt(price);
      pizzaPrice.textContent = `  €${ThePizza.price}`;
      //localStorage.setItem('cart', JSON.stringify(ThePizza));
  }


}
const addToCartBtn = document.querySelector('.addToCartBtn');
addToCartBtn.addEventListener('click', updateStorage);
function updateStorage(){
console.log("updating")
localStorage.setItem('cart', JSON.stringify(ThePizza));
}

const emptyCart = document.querySelector('.emptyCart');
emptyCart.addEventListener('click', clearStorage);
function clearStorage(){
localStorage.clear();
}