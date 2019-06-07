import { Given, Then as And, Then, When } from "cypress-cucumber-preprocessor/steps";

Given(`I go to w3schools`, () => {
    cy.visit('https://www.w3schools.com');    
});

When(`I click on Learn Javascript in the menu`, () => {
    cy.get('.w3-button').contains('Learn JavaScript').click();  
});

And(`I click next`, () => {
    cy.get('.w3-btn').contains('Next').click();    
});

And(`I turn on the light`, () => {
    cy.get('.w3-example').contains('The Light Buld');
    cy.get('w3-padding-16').contains('Turn on the light').click; 
});
