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
}

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

function showPersonal(contactID){
  const contact = addressBook.findContact(contactID);
  const addressArray = contact.addresses;
  

      $(".phone-number").html(addressArray[0].phoneNumber);
      $(".email").html(addressArray[0].email);
      $(".address-1").html(addressArray[0].address1);
      $(".address-2").html(addressArray[0].address2);
      $(".city").html(addressArray[0].city);
      $(".state").html(addressArray[0].state);
    
}

function showBusiness(contactID){
  const contact = addressBook.findContact(contactID);
  const addressArray = contact.addresses;

      $(".business-phone-number").html(addressArray[1].phoneNumber);
      $(".business-email").html(addressArray[1].email);
      $(".business-address-1").html(addressArray[1].address1);
      $(".business-address-2").html(addressArray[1].address2);
      $(".business-city").html(addressArray[1].city);
      $(".business-state").html(addressArray[1].state);
    
}
function showContact(contactID){
  const contact = addressBook.findContact(contactID);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  showPersonal(contactID);
  showBusiness(contactID);

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
    //let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress, inputtedAddress2, inputtedCity, selectedState);
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

  
    
    /*
      for each address in current contact, if address.type = selectedType return an alert stating already contains that type
      else do the thing
    */

    currentContact.firstName = inputtedFirstName;
    currentContact.lastName = inputtedLastName;
    
    emptyForm();
  });
});

//playground

