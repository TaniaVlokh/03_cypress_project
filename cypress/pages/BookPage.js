

class BookPage{
 /*Locators */


 getOneWayButton(){
  return cy.get('.mr-1').eq(0);
 }

 getRoundTripButton(){
  return cy.get('.mr-1').eq(1);
 }

 getLabelCabinClass(){
  return cy.get('.label').eq(1);
 }

 getLabelFrom(){
  return cy.get('.label').eq(2);
 }

 getLabelTo(){
  return cy.get('.label').eq(3);
 }

 getLabelDepart(){
  return cy.get('.label').eq(4);
 }

 getDepartDatePicker(){
  return cy.get('[placeholder="MM/DD/YY"]').eq(1)
 }

 getLabelReturn(){
  return cy.get('.label').eq(5);
 }

 getReturnDatePicker(){
  return cy.get('.react-datepicker-wrapper  input').eq(1)
 }

 getLabelNumberOfPassengers(){
  return cy.get('.label').eq(6);
 }

 getNumberOfPassengersDropown(){
  return cy.get('.select option').eq(108)
 }

 getLabelPassenger1(){
  return cy.get('.label').eq(7);
 }

 getPassenger1Dropdown(){
  return cy.get('.select option').eq(117)
 }
 
 getSubmitButton(){
 return  cy.get('[type="submit"]')
 }
 getOneWayRoundTripRadioButton() {
  return cy.get('.radio')
}

getLables() {
  return cy.get('.label')
}

getRes() {
  return cy.get('.mt-4 > p')
}

getBookingButton() {
  return cy.get('.Button_c_button__TmkRS')
}

getDep() {
  return cy.get('.is-italic')
}

getPassenger(index) {
  return cy.get('.select').eq(3).find('select').select(`${index}`)
}
}


export default BookPage