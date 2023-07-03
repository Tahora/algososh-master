export enum Selectors {
    SortVizualizer='div[data-test-id="sortVizualizer"]',
    Circle=`div[data-test-id="circle"]`,
    Letter=`div[data-test-id="letter"]`,
    Index=`p[data-test-id="index"]`,
    Tail=`div[data-test-id="tail"]`,
    Head=`div[data-test-id="head"]`,
    valueInput=`input[data-test-id="valueInput"]`,
    indexInput=`input[data-test-id="indexInput"]`
}

export enum States{
    "default",
    "changing",
    "modified"
}

export function stateName(number)
{
    return  Object.values(States)[number];
}

export const checkCircles=(testStrings:string[],itemsStyle:States[],itemsHead:String[],itemsTail:String[])=>{
    cy.get(`${Selectors.SortVizualizer}>div>div[data-test-id="circle"]`)
        .each(($ci, ind, $lis) => {
            cy.wrap($ci).find(Selectors.Index).should('contain', ind)
            if( itemsTail[ind]) {
                cy.wrap($ci).find(`>${Selectors.Tail}`).should('contain', itemsTail[ind])
            }
            if(itemsHead[ind]) {
                cy.wrap($ci).find(`>${Selectors.Head}`).should('contain', itemsHead[ind])
            }
            cy.wrap($ci).find(`>${Selectors.Letter}`)
                .then(($let) => {
                    cy.log( $let.attr('class'))
                    expect($let.attr('class')).includes(stateName(itemsStyle[ind]))
                    cy.wrap($let).find(`p`).should('contain', testStrings[ind])
                })
        })
}
