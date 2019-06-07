import {
    SelectorMatcherOptions,
    Matcher,
    MatcherOptions as DTLMatcherOptions,
    getByTestId,
} from 'dom-testing-library'
  
declare global {
    namespace Cypress {
        interface Chainable<Subject = any> {
            controlMock(url: string, body?: any, method?: string): void;
        }
    }
}