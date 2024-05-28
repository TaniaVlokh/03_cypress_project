/// <reference types="cypress" />

import BookPage from "../../pages/BookPage"

 const bookPage = new BookPage();

 function addDaysToDate(daysToAdd) {
  let currentDate = new Date()
  let newDate = new Date(currentDate)
  newDate.setDate(newDate.getDate() + daysToAdd)
  return newDate;
}

describe('Book Trip', {tags: '@smoke'}, () => {
  beforeEach(() => {
    cy.visit('https://techglobal-training.com/frontend/project-3')

    cy.fixture('bookingFunction').then(function (data) {
      this.DefaultData = data.DefaultData 
      this.NumberOfPassengersDefault = data.NumberOfPassengersDefault 
      this.Passenger1Default = data.Passenger1Default
  
    })
    cy.fixture('bookingFunction').as('ticketData')
  })


  it('Test Case 01 - Validate the default Book your trip form', () => {
    bookPage.getOneWayButton().should('be.visible')
    .and('be.enabled')
    .and('have.attr', 'checked');

    bookPage.getRoundTripButton().should('be.visible')
    .and('be.enabled')
    .and('not.have.attr', 'checked')
  
    bookPage.getLabelCabinClass().should('be.visible')
    bookPage.getLabelCabinClass().next().should('be.visible')

    bookPage.getLabelFrom().should('be.visible')
    bookPage.getLabelFrom().next().should('be.visible')

    bookPage.getLabelTo().should('be.visible')
    bookPage.getLabelTo().next().should('be.visible')

    bookPage.getLabelDepart().should('be.visible')
    bookPage.getDepartDatePicker().should('be.visible')

    bookPage.getLabelReturn().should('be.visible')
    bookPage.getReturnDatePicker().should('be.visible').
    and('have.attr', 'disabled')

    bookPage.getLabelNumberOfPassengers().should('be.visible')
    bookPage.getNumberOfPassengersDropown().should('be.visible')
    .and('have.value', "1")


    bookPage.getLabelPassenger1().should('be.visible')
    bookPage.getPassenger1Dropdown().should('be.visible').
    and('have.value', 'Adult (16-64)')

    bookPage.getSubmitButton().should('be.visible').
    and('be.enabled')

  })

  it('Test Case 02 - Validate the Book your trip form when Round trip is selected', () => {
    bookPage.getRoundTripButton().check().should('be.checked')
    bookPage.getOneWayButton().should('not.be.checked')

    bookPage.getLabelCabinClass().should('be.visible')
    bookPage.getLabelCabinClass().next().should('be.visible')

    bookPage.getLabelFrom().should('be.visible')
    bookPage.getLabelFrom().next().should('be.visible')

    bookPage.getLabelTo().should('be.visible')
    bookPage.getLabelTo().next().should('be.visible')

    bookPage.getLabelDepart().should('be.visible')
    bookPage.getDepartDatePicker().should('be.visible')

    bookPage.getLabelReturn().should('be.visible')
    bookPage.getReturnDatePicker().should('be.visible')

    bookPage.getLabelNumberOfPassengers().should('be.visible')
    bookPage.getNumberOfPassengersDropown().should('be.visible')
    .and('have.value', "1")

    bookPage.getLabelPassenger1().should('be.visible')
    bookPage.getPassenger1Dropdown().should('be.visible').
    and('have.value', 'Adult (16-64)')

    bookPage.getSubmitButton().should('be.visible').
    and('be.enabled')

  })

  const testC = ['Test Case 03 - Validate the booking for 1 passenger and one way', 
  'Test Case 04 - Validate the booking for 1 passenger and round trip', 
  'Test Case 05 - Validate the booking for 2 passengers and one way']

  for (let i = 0; i < testC.length; i++) {
    it(`${testC[i]}`, function () {
      cy.get('@ticketData').then((tData) => {
        const ticket = tData.Ticket
        bookPage.getPassenger(Number(ticket[i][6]))
        bookPage.getLables().each(function ($el, index) {
          cy.wrap($el)
          if ($el.text().includes('Trip type') && ticket[i][index] === 'One way')
            bookPage.getOneWayRoundTripRadioButton()
              .first()
              .click()
          else if ($el.text().includes('Trip type') && ticket[i][index] === 'Round trip')
            bookPage.getOneWayRoundTripRadioButton()
              .last()
              .click()

          if (!($el.text().includes('Trip type') || $el.text().includes('Depart') || $el.text().includes('Return'))) {
            cy.wrap($el)
              .next()
              .click()
              .find('select')
              .select(`${ticket[i][index]}`)
          }
          if ($el.text().includes('Depart')) {

            cy.wrap($el)
              .next()
              .clear()
              .type(`${addDaysToDate(Number(ticket[i][index]))}{Enter}`)
          }
          if ($el.text().includes('Return') && ticket[i][index] !== '') {

            cy.wrap($el)
              .next()
              .find('input')
              .clear()
              .type(`${addDaysToDate(Number(ticket[i][index]))}{Enter}`)
          }
        })

        bookPage.getBookingButton().click()
        bookPage.getDep().should('be.visible')
        bookPage.getDep().next().should('be.visible')
        bookPage.getRes().each(function ($el, index) {
          if ($el.text().includes('Number of Passengers')) cy.wrap($el).should('include.text', `${ticket[i][6]}`)
          if ($el.text().includes('Passenger ')) cy.wrap($el).should('include.text', `${ticket[i][6 + index]}`)
          if ($el.text().includes('Cabin class: ')) cy.wrap($el).should('include.text', `${ticket[i][1]}`)

        })

      })

    })
  }})
