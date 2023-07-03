import {Selectors, States, stateName} from './utils'

describe('queue test', function () {
        beforeEach(function () {
            cy.visit('queue');
        });

        it(`disable button with empty input`, function () {
            cy.get(`input`).should('have.value', '')
            cy.contains(`button`, 'Добавить').should('be.disabled')
        })


        it(`animation`, function () {
            let testData = ["2", "3", "5", '', '', '']
            const testDataLetter = [['2', '', '', '', '', ''],
                ['2', '3', '', '', '', ''],
                ['2', '3', '5', '', '', '']]
            const testDataStyle: States[][] = [
                [1, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ]
            const testDataHead: String[] = ["head", '', '', '', '', '']
            const testDataTail: String[][] = [
                ["tail", '', '', '', '', ''],
                ['', "tail", '', '', '', ''],
                ['', '', "tail", '', '', ''],
            ]


            const checkItems = (testStrings: string[]) => {
                for (let i = 0; i < 3; i++) {
                    cy.get(`input`).type(testStrings[i])
                    cy.get(`button`).contains('Добавить').click()
                    checkCircles(testDataLetter[i], testDataStyle[(i + 1) * 2 - 2], testDataHead, testDataTail[i])
                    cy.tick(600);
                    checkCircles(testDataLetter[i], testDataStyle[(i + 1) * 2 - 1], testDataHead, testDataTail[i])
                    cy.tick(600);
                }
            }

            const checkCircles = (testStrings: string[], itemsStyle: States[], itemsHead: String[], itemsTail: String[]) => {
                cy.get(Selectors.SortVizualizer).find(Selectors.Circle)
                    .each(($ci, ind) => {
                        cy.wrap($ci).find(Selectors.Index).should('contain', ind)
                        cy.wrap($ci).find(Selectors.Tail).should('contain', itemsTail[ind])
                        cy.wrap($ci).find(Selectors.Head).should('contain', itemsHead[ind])
                        cy.wrap($ci).find(Selectors.Letter)
                            .then(($let) => {
                                expect($let.attr('class')).includes(stateName(itemsStyle[ind]))
                                cy.wrap($let).find(`p`).should('contain', testStrings[ind])
                            })
                    })
            }


            cy.clock();
            //добавление элемента
            checkItems(testData);

            //удаление элемента
            cy.contains(`button`, 'Удалить').click()
            checkCircles(['', "3", '5', '', '', ''], [0, 0, 0, 0, 0, 0], ['', "head", '', '', '', ''], ['', '', "tail", '', '', ''])
            cy.tick(600);

            //очистка списка
            cy.contains(`button`, 'Очистить').click()
            checkCircles(['', '', '', '', '', ''], [0, 0, 0, 0, 0, 0], ['', '', '', '', '', ''], ['', '', '', '', '', ''])

        });
    }
)
