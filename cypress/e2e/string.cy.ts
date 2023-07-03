import {Selectors, States, stateName} from './utils'


describe('string test', function () {
    beforeEach(function () {
        cy.visit('/recursion');
    });

    it(`disable button with empty input`, function () {
        cy.get(`input`).should('have.value', '')
        cy.contains(`button`, 'Развернуть').should('be.disabled')
    })


    it(`animation`, function () {
        const testString = "1234"
        const itemsValue: string[][] = [
            ["1", "2", "3", "4"],
            ["4", "2", "3", "1"],
            ["4", "2", "3", "1"],
            ["4", "3", "2", "1"]]
        const itemsStyle: States[][] = [
            [1, 0, 0, 1],
            [2, 0, 0, 2],
            [2, 1, 1, 2],
            [2, 2, 2, 2]]
        cy.get(`input`).type(testString)
        cy.clock();
        cy.get(`button`).contains('Развернуть').click()

        for (let i = 0; i < testString.length - 1; i++) {
            cy.get(Selectors.SortVizualizer).find(Selectors.Circle)
                .each(($ci, ind) => {
                    cy.wrap($ci).find(Selectors.Letter)
                        .then(($let) => {
                            cy.wrap($let).find(`p`).should('contain', itemsValue[i][ind])
                            expect($let.attr('class')).includes(stateName(itemsStyle[i][ind]))
                        })
                })
            cy.tick(1000);
        }
    });
});
