
Feature: As a User of Trello, I can create new lists, add cards, change the background and add description to a card

    Background:
        Given I am logged into trello
        And I go to the Cypress Testing board

    Scenario Outline: Add lists to the Cypress Testing board and add a card to each list
        When I create a list called "<listName>"
        Then I should see a list with the name "<listName>" on the board
        When I add a card called "<cardName>" to the list "<listName>"
        Then I should see a card called "<cardName>" in the "<listName>" list
        Examples:
            | listName      | cardName  |
            | Test List 1   | Task A    |
            | Test List 2   | Task B    |
            | Test List 3   | Task C    |
        
    Scenario: Change the board background picture
        When I show the menu
        And I select change background
        And I select photos
        And I search for a photo of cactus
        And I select the first photo
        Then I should see this photo on the board background
      
    Scenario: Open a specific card on the board, add a description and close the card
        Given There is a card called Task B in Test List 2
        When I click on the card
        And Input a description of 'Test Description'
        And Click Save
        Then The description should be saved
        When I close the card
        Then The card should no longer be visible
        And The card should show an icon for having a description