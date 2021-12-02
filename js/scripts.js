// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.addresses = {};
  this.currentId = -1;  
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.addAddress = function(address){
  address.id = this.assignId();
  this.addresses[address.id] = address;
}

Contact.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

Contact.prototype.findAddress = function(id){
  if (this.addresses[id] != undefined) {
    return this.addresses[id];
  }
  return false;
};
//business logic for Addresses

function Address(type, phoneNumber, email, address1, address2, city, state){
  this.type = type;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address1 = address1;
  this.address2 = address2;
  this.city = city;
  this.state = state;
}

//other business logic
function displayContactDetails(addressBookToDisplay){
  let contactList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key){
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactList.html(htmlForContactInfo); 
}

function findPersonal(address){
  let isPersonal = false;
  Object.values(address).forEach(function(element){
    if(element === "personal")
    isPersonal = true;
  })
  return isPersonal;
}

function showPersonal(address){    
  $(".phone-number").html(address.phoneNumber);
  $(".email").html(address.email);
  $(".address-1").html(address.address1);
  $(".address-2").html(address.address2);
  $(".city").html(address.city);
  $(".state").html(address.state);
}

function showBusiness(address){
  $(".business-phone-number").html(address.phoneNumber);
  $(".business-email").html(address.email);
  $(".business-address-1").html(address.address1);
  $(".business-address-2").html(address.address2);
  $(".business-city").html(address.city);
  $(".business-state").html(address.state);
}
function showContact(contactID){
  const contact = addressBook.findContact(contactID);
  //for loop to check conact.addresses[i].type === personal || business
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  let index = 0;
  while(contact.addresses[index] != null){
    let isPersonal = findPersonal(contact.addresses[index]);
    if(isPersonal){
      showPersonal(contact.addresses[index]);
    } else{
      showBusiness(contact.addresses[index]);
    }
    index++;
  }
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}
function attachContactListeners(){
  $("ul#contacts").on("click", "li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

function emptyForm(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-email").val("");
  $("input#new-address-1").val("");
  $("input#new-address-2").val("");
  $("input#new-city").val("");
  $("select#new-state").val("");
}
//ui logic


let addressBook = new AddressBook();
$(document).ready(function(){

  attachContactListeners();
  let currentContact = new Contact("", "")

  $("form#new-contact").submit(function(event){
    event.preventDefault();
    addressBook.addContact(currentContact);
    displayContactDetails(addressBook);
    emptyForm();
  });

  $("#addAddress").on("click", function(){
    
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const selectedType = $("input[name='address-type']:checked").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();
    const inputtedAddress = $("input#new-address-1").val();
    const inputtedAddress2 = $("input#new-address-2").val();
    const inputtedCity = $("input#new-city").val();
    const selectedState = $("select#new-state").val();
    let newAddress = new Address(selectedType, inputtedPhoneNumber, inputtedEmail, inputtedAddress, inputtedAddress2, inputtedCity, selectedState);
 /*   let addressArray = currentContact.addresses;
    if(addressArray.length > 0){
      addressArray.forEach(function(element){
        if(element.type === selectedType){
          alert("You have already added a" + selectedType + "address");
        } else{
         
        }
      });
    }
  */

    currentContact.firstName = inputtedFirstName;
    currentContact.lastName = inputtedLastName;
    currentContact.addAddress(newAddress);
    emptyForm();
  });
});

//playground

