import {Selectors, stateName} from './utils'

describe('fibonacci test', function () {
    beforeEach(function () {
        cy.visit('fibonacci');
    });

    it(`disable button with empty input`, function () {
        cy.get(`input`).should('have.value', '')
        cy.contains(`button`, 'Развернуть').should('be.disabled')
    })


    it(`animation`, function () {
        const testString = '4'
        const itemsValue: string[][] = [
            ["1"],
            ["1", "1"],
            ["1", "1", "2"],
            ["1", "1", "2", "3"],
            ["1", "1", "2", "3", "5"]]
        const itemsStyle = 0
        cy.get(`input`).type(testString)
        cy.clock();
        cy.get(`button`).contains('Развернуть').click()

        for (let i = 0; i <= Number(testString); i++) {
            cy.get(Selectors.SortVizualizer).find(Selectors.Circle)
                .each(($ci, ind) => {
                    cy.wrap($ci).find(Selectors.Letter)
                        .then(($let) => {
                            cy.wrap($let).find(`p`).should('contain', itemsValue[i][ind])
                            expect($let.attr('class')).includes(stateName(itemsStyle))
                        })
                    cy.wrap($ci).get(Selectors.Index).should('contain', ind)
                })
            cy.tick(1000);
        }

    });
});
