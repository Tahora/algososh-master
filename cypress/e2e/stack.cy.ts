import {Selectors, stateName} from './utils'

describe('stack test', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/stack');
    });

    it(`disable button with empty input`, function() {
        cy.get(`input`).should('have.value', '')
        cy.contains(`button`,'Добавить').should('be.disabled')
    })


    it(`animation`, function() {
        let testData=["2","3","5","0"]
        const itemsStyle=0

        const checkItems=(testStrings:string[])=>{
            for (let i = 0; i < testStrings.length; i++) {
                cy.get(`input`).type(testStrings[i])
                cy.get(`button`).contains('Добавить').click()
                cy.tick(1500);
                checkCircles(testStrings)
            }
        }

        const checkCircles=(testStrings:string[])=>{
            cy.get(Selectors.SortVizualizer).find(Selectors.Circle)
                .each(($ci, ind, $lis) => {
                    cy.wrap($ci).get(Selectors.Index).should('contain', ind)
                    cy.wrap($ci).find(Selectors.Letter)
                        .then(($let) => {
                            expect($let.attr('class')).includes(stateName(itemsStyle))
                            cy.wrap($let).find(`p`).should('contain', testStrings[ind])
                        })
                })
        }

        cy.clock();
        //добавление элемента
        checkItems(testData);

        //удаление элемента
        cy.contains(`button`,'Удалить').click()
        cy.tick(1000);
        testData=["2","3","5"]
        checkCircles(testData)

        //очистка стека
        cy.contains(`button`,'Очистить').click()
        cy.tick(1000);
        cy.get(Selectors.SortVizualizer).filter(Selectors.Circle).should('have.length', 0)

    });
});
