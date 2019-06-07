import { Given, Then as And, Then, When } from "cypress-cucumber-preprocessor/steps";


Given(`I am logged into trello`, () => {
    cy.visit('https://trello.com');
    cy.get('.btn').contains('Log In').click();
    cy.get('#user').type('dkcypress');
    cy.get('#password').type('testuseraccount1');
    cy.get('#login').click();
});

And(`I go to the Cypress Testing board`, () => {
    cy.get('.board-tile-details-name').contains('Cypress Testing').click();
});

When(`I create a list called {string}`, (listName: string) => {
    cy.get('.placeholder').click();
    cy.get('.list-name-input').type(listName);
    cy.get('.mod-list-add-button').contains('Add List').click();
});

Then(`I should see a list with the name {string} on the board`, (listName: string) => {
    cy.get('.list-header-name-assist').should('contain', listName); 
});

When(`I add a card called {string} to the list {string}`, (cardName: string, listName: string) => {
    // only look for the add card option within the specific list that we want to add it to
    // otherwise the test will return all the lists
    // First it finds the element that the list title element and the add card element are both inside of
    cy.get('.list-header-name').contains(listName).closest('.list').within(($list) => {
        cy.get('.open-card-composer').click();
    });
    cy.get('.list-card-composer-textarea').type(cardName + '{enter}');
});

Then(`I should see a card called {string} in the {string} list`, (cardName: string, listName: string) => {
    // finds the required list and only looks at the card names within it
    cy.get('.list-header-name').contains(listName).closest('.list').within(($list) => {
        cy.get('.list-card-title').should('contain', cardName);
    });
});

When(`I show the menu`, () => {
    cy.wait(2000);
    cy.get('.board-header').contains('Show Menu').click();
});

And(`I select change background`, () => {
    cy.get('.board-menu-navigation-item-link').contains('Change Background').click();
});

And(`I select photos`, () => {
    cy.get('.title').contains('Photos').click();
});

And(`I search for a photo of cactus`, () => {
    // gets the input within the search photos element so that we can type into it
    cy.get('.search-photos').within(($list) => {
        cy.get('input').type('cactus');
    });
});

And(`I select the first photo`, () => {
    cy.get('.board-background-select').first().click();
});

Then(`I should see this photo on the board background`, () => {
    // check the classic body element has 'style' css for 'background-image' that matches the expected image
    // find a better way of doing this where we compare the image selected  to the background instead
    cy.get('#trello-root').should('have.attr', 'style', 'background-image: url("https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1620/940c4ec6d58cf6c0b3ff17ffe791c2d5/photo-1463936575829-25148e1db1b8");');
    

});

Given(`There is a card called Task B in Test List 2`, () => {
    // finds the required list and only looks at the card names within it
    cy.get('.list-header-name').contains('Test List 2').closest('.list').within(($list) => {
        cy.get('.list-card-title').should('contain', 'Task B');
    });
});

When(`I click on the card`, () => {
    // finds the required list and only looks at the cards within it
    // finds the correct card and clicks it
    cy.get('.list-header-name').contains('Test List 2').closest('.list').within(($list) => {
        cy.get('.list-card-title').contains('Task B').click();
    });
});

And(`Input a description of 'Test Description'`, () => {
    cy.get('.description').click();
    cy.get('.description').type('Test Description');
});

And(`Click Save`, () => {   
    // find the element that the specific save button that we want is in 
    cy.get('.edit-controls').within(($list) => {
        cy.get('.js-save-edit').click();
    });
});

Then(`The description should be saved`, () => {
    cy.get('.current').should('contain', 'Test Description');
});

When(`I close the card`, () => {
    cy.get('.dialog-close-button').click();
});

Then(`The card should no longer be visible`, () => {
    // assert that the element that previously existed no longer does
    cy.get('.card-detail-window').should('not.exist');
});

And(`The card should show an icon for having a description`, () => {
    // finds the required list name and only looks within the closest list (the list it is in)   
    cy.get('.list-header-name').contains('Test List 2').closest('.list').within(($list) => {
        // does the same again to get us inside the correct card in that list
        cy.get('.list-card-title').contains('Task B').closest('.list-card').within(($list) => {
            // finds a span element with the class name we are looking for and assert it exists
            cy.get('span.icon-description').should('exist');
        });
    });
});