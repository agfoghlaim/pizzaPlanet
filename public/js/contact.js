  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCjrinmvvu1HZ3bn140W1ZRDL4HZwpxL50",
    authDomain: "agfoghlaim-86aa5.firebaseapp.com",
    databaseURL: "https://agfoghlaim-86aa5.firebaseio.com",
    projectId: "agfoghlaim-86aa5",
    storageBucket: "agfoghlaim-86aa5.appspot.com",
    messagingSenderId: "886048617658"
  };
  firebase.initializeApp(config);

  var messagesRef = firebase.database().ref('messages');

  function saveToFb(theData){
    
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      theData:theData
    }).then(
        function(){
            fbSuccess();
    }).catch(
        function(error) {
            fbFail(error);
            console.log(error)
    });
  }

  const sendMessageButton = document.querySelector('#sendMessageButton');
  if(sendMessageButton !== null){
    sendMessageButton.addEventListener('click', handleForm);
  }
  
  

  function handleForm(event){
    
    //prevent form submitting and handle with js instead
    event.preventDefault();

    //clear any previous errors
    clearErrors();

    // get values from FORM
    var name = document.querySelector('#name').value;

    //check name is not blank
    if(isBlank(name)) {document.querySelector('p#name-error').textContent = 'enter name'; return;}
 

    //check email is probably an email
    var email = document.querySelector('input#email').value;
    if(!isProbablyEmail(email)) {
        document.querySelector('p#email-error').textContent = 'Is that really your email?';
        // document.getElementById('email-error').scrollIntoView(); 
        return;}

    //check phone is numeric
    var phone = document.querySelector('input#phone').value;
    if(isNotNumeric(phone)) {document.querySelector('p#phone-error').textContent = 'Is that really your phone no.?'; return;}

    var message = document.querySelector('textarea#message').value;
    
    //check message is not blank
    if(isBlank(message)) {document.querySelector('p#message-error').textContent = 'Enter a message.'; return;}

    var favourite = document.querySelector('select#favourite').value;
    var location = document.querySelector('select#location').value;
    var better = document.querySelector("input[type='radio']:checked").value;
    var redplanet = document.querySelector('select#redplanet').value;
    var theData = {name, location, email, phone, message, favourite, better, redplanet};

    //save to firebase
    saveToFb(theData);

    //reset form
    document.getElementById("contactForm").reset();
}


//successfully submitted
function fbSuccess(){
    document.querySelector('p#form-success').textContent = 'Form submitted successfully';
}

//error submitting
function fbFail(){
    document.querySelector('p#form-fail').textContent = 'Oh no! an error occurred.';
}


//small functions used above
function clearErrors(){
    const errorPs = document.querySelectorAll('p.error-p');
    errorPs.forEach(p => p.textContent = '');
}

//validation functions

//check if field is blank
function isBlank(str){
    if(str ===''){
        return true;
    }
    return false;
}
  
function isProbablyEmail(str){
    var re = /\S+@\S+\.\S+/;
        if(str.length<50){
            return re.test(str);
        }
    return false;    
}

function isNotNumeric(str){
    if(str.length<20){
        var p = /[^0-9+]/g;
        return p.test(str);
    }
    return true;       
}


