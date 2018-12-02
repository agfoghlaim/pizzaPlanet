//js for home page only

//Add stars to empty .stars div in main page header main page only
  const stars = document.getElementById('stars'); //empty div
  
  for(let i = 0; i < 100; i++){ //200 stars
    let size = 2;//default star size 2px
    let defaultClass = "star"; //default class .star
    if(i%2===0) size = 3; //make some stars bigger
    if(i%3===0) size = 1; //make some stars smaller

    // set different twinkle classes so twinkle doesn't look like flashing
    // commented out because it's a bit labour intensive
    // if(i%7===0) defaultClass = "twinkle1"; 
    // if(i%9===0) defaultClass = "twinkle2";
    // if(i%11===0) defaultClass = "twinkle3";

    let rand = Math.floor((Math.random() * 1200) + 1); //random no less than approx screen width
    let rand2 = Math.floor((Math.random() * 600) + 1); //random no less than header height
    rand = rand +'px';
    rand2 = rand2 +'px';

    //make stars
    makeStars(rand, rand2, size, defaultClass);
    
  }

 function makeStars (rand, rand2, size, defaultClass) { 
  	const newStar = document.createElement("div");

  	//set style attributes
	newStar.setAttribute(
		"style", 
		`margin-left:${rand};
		margin-top:${rand2}; 
		height:${size}px;
		width:${size}px;
		background:white;
		position:absolute;
		border-radius:50%;`);

	//set classes
  newStar.setAttribute("class", `${defaultClass}`);

  //append to empty .stars div
	stars.append(newStar);
}






//toppings
const mushrooms = {name: 'mushrooms', price:1, used:false};
const bacon = {name:'bacon', price:3, used:false};
const olives = {name: 'olives', price:2, used:false};
const peperoni = {name: 'peperoni', price:1, used:false};
const peppers = {name: 'peppers', price:1, used:false};
const cheese = {name:'cheese', price:2, used:false};
const sauce = {name:'sauce', price: 0, used:false};
const onion = {name:'onion', price:1, used:false};
const pineapple = {name: 'pineapple', price:1, used:false};


//each pizza has... 
//a data-name, used as an id and to display the correct img
//name and price, to display name, price
//toppings array (individual toppings defined above

const thePizzas = [
  {
    dataName: 'kbm',
    name:'Kevin Bacon and Mushroom',
    toppings:[mushrooms, bacon],
    price: 10
  },
  {
    dataName: 'orion',
    name:'The Orion Olive',
    toppings:[olives, bacon],
    price: 12
  },
  {
    dataName: 'sandra',
    name:'Sandra Bullock',
    toppings:[peperoni, peppers, cheese],
    price: 9
  },
  {
    dataName: 'cmm',
    name:'Colm Meany Margherita',
    toppings:[cheese],
    price: 10.99
  },
  {
    dataName: 'sj',
    name:'Scarlett Johansson',
    toppings:[peperoni, cheese],
    price: 13
  }
];

//each deal has... 
//a data-name, used as an id and to display the correct img
//name and price, to display name, price
//toppings array (individual toppings defined above
const theDeals = [
  {
    dataName: 'deal1',
    name:'Pizza and a Drink',
    toppings:[sauce, cheese],
    price: 9.99
  },
  {
    dataName: 'deal2',
    name:'Bacon Pizza and a Drink',
    toppings:[bacon, mushrooms, cheese],
    price: 9.99
  },
  {
    dataName: 'deal3',
    name:'Peperoni Pizza and a Drink',
    toppings:[sauce, cheese],
    price: 9.99
  },
  {
    dataName: 'deal4',
    name:'Mushroom Pizza and a Drink',
    toppings:[mushrooms, olives, cheese],
    price: 9.99
  }
]


function populatePizzas(){
  const mainShopContainer = document.querySelector('.mainShopContainer');
  if(mainShopContainer === null) return;
  thePizzas.map((pizza,i) =>{
    let str = `
    <div class="pizzaItem pizzaItem${i+1}">
					<img src="images/pizzas/${pizza.dataName}.png" alt="">
					<h3>${pizza.name}</h3>
          <h4 class="price">€${pizza.price}</h4>
					<p>${pizza.toppings.map(topping=> topping.name)}</p>
					<div class="cartArea">
						<button class="cartBtn brightGreen-bg cartBtnMinus" data-pizza="${pizza.dataName}">-</button>
						<button class="cartBtn brightGreen-bg cartBtnPlus" data-pizza="${pizza.dataName}">+</button>
					</div>
				</div>
    `;
    console.log(mainShopContainer)
    mainShopContainer.insertAdjacentHTML('beforeend', str);
  })
}


function populateDeals(){
  const dealsContainer = document.querySelector('.dealsContainer');
  if(dealsContainer === null) return;
  theDeals.map((deal,i) =>{
    let str = 
        `<div class="dealItem dealItem${i+1}">
					<img src="images/pizzas/${deal.dataName}.png" alt="">
					<p class="plus">+</p class="plus">
					<img class="dealDrink" src="images/pizzas/water.png" alt="">
					<div class="dealCartArea">
							<h4 class="price">${deal.price}</h4>
							<p>${deal.name}</p>
						<div class="cart-btn-contain">
							<button class="cartBtn brightGreen-bg cartBtnMinus" data-deal="${deal.dataName}">-</button>
							<button class="cartBtn brightGreen-bg cartBtnPlus" data-deal="${deal.dataName}">+</button>
						</div>
					</div>
				</div>`;
    console.log(dealsContainer)
    dealsContainer.insertAdjacentHTML('beforeend', str);
  })
}

//////////////////////////////////////
//Populate pizzas and deals section of homepage
///////////////////////////////////////

populatePizzas();
populateDeals();

