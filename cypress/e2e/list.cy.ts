import {Selectors, checkCircles} from './utils'

describe('list test', function() {
        beforeEach(function () {
            cy.visit('http://localhost:3000/list');
        });

        it(`disable button with empty input`, function () {
            cy.get(Selectors.valueInput).should('have.value', '')
            cy.get(Selectors.indexInput).should('have.value', '')
            cy.contains(`button`, 'Добавить в head').should('be.disabled')
            cy.contains(`button`, 'Добавить в tail').should('be.disabled')
            cy.contains(`button`, 'Добавить по индексу').should('be.disabled')
            cy.contains(`button`, 'Удалить по индексу').should('be.disabled')
        })


        it(`defaul list`, function() {

            //отрисовка дефолтного списка
            checkCircles(["0", "34", "8", "1"], [0, 0, 0, 0], ["head", '', '', ''], ['', '', '', "tail"])
        });

    it(`add to tail`, function() {
        cy.clock();
            cy.get(Selectors.valueInput).type("F")
            cy.contains(`button`, 'Добавить в tail').click()
            cy.tick(500);
            checkCircles(["0","34","8","1"],[0,0,0,0],["head",'','', ''], ['','','',"tail"]);
            cy.tick(500);
            checkCircles(["0","34","8","1","F"],[0,0,0,0,2],["head",'','', '',''], ['','','','',"tail"]);
            cy.tick(1000);
            checkCircles(["0","34","8","1","F"],[0,0,0,0,0],["head",'','', '',''], ['','','','',"tail"]);
        });

    it(`add to head`, function() {
        cy.clock();
        cy.get(Selectors.valueInput).type("F")
        cy.contains(`button`, 'Добавить в head').click()
        cy.tick(500);
        checkCircles(["0","34","8","1"],[0,0,0,0],[null,'','', ''], ['','','',"tail"]);
        cy.tick(500);
        checkCircles(["F","0","34","8","1"],[2,0,0,0,0],["head",'','', '',''], ['','','','',"tail"]);
        cy.tick(1000);
        checkCircles(["F","0","34","8","1"],[0,0,0,0,0],["head",'','', '',''], ['','','','',"tail"]);
    });

    it(`delete from head`, function() {
        cy.clock();
        cy.contains(`button`, 'Удалить из head').click()
        cy.tick(500);
        checkCircles(["","34","8","1"],[0,0,0,0],["head",'','', ''], ['','','',"tail"]);
         cy.tick(1000);
        checkCircles(["34","8","1"],[0,0,0],["head",'','', ], ['','',"tail"]);
    });

    it(`delete from tail`, function() {
        cy.clock();
        cy.contains(`button`, 'Удалить из tail').click()
        cy.tick(500);
        checkCircles(["0","34","8",""],[0,0,0,0],["head",'','', ''], ['','','',null]);
        cy.tick(1000);
        checkCircles(["0","34","8"],[0,0,0],["head",'','', ], ['','',"tail"]);
    });

    it(`add by index`, function() {
        cy.get(Selectors.valueInput).type("F")
        cy.get(Selectors.indexInput).type("2")
        cy.clock();
        cy.contains(`button`, 'Добавить по индексу').click()
        cy.tick(500);
        checkCircles(["0","34","8","1"],[0,0,0,0],[null,'','', ''], ['','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","8","1"],[1,0,0,0],['head',null,'', ''], ['','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","8","1"],[1,1,0,0],['head','',null, ''], ['','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","F","8","1"],[0,0,2,0,0],['head','','', '',''], ['','','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","F","8","1"],[0,0,0,0,0],['head','','', '',''], ['','','','',"tail"]);

    });

    it(`delete by index`, function() {
        cy.get(Selectors.indexInput).type("2")
        cy.clock();
        cy.contains(`button`, 'Удалить по индексу').click()
        cy.tick(500);
        checkCircles(["0","34","8","1"],[0,0,0,0],['head','','', ''], ['','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","8","1"],[1,0,0,0],['head','','', ''], ['','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","8","1"],[1,1,0,0],['head','','', ''], ['','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","","1"],[1,1,0,0],['head','','', ''], ['','','',"tail"]);
        cy.tick(1000);
        checkCircles(["0","34","1"],[0,0,0],['head','','',], ['','',"tail"]);

    });
    }
)
