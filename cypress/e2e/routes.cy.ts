const routes=[
    "/recursion",
    "/fibonacci",
    "/sorting",
    "/stack",
    "/queue",
    "/list"
]


describe('app works correctly with routes', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    routes.forEach((route)=>{
        it(`should open ${route} page from main`, function() {
            cy.get(`a[href="${route}"]`).click()
            cy.get(`div[class*="contentCard"]`)
        });
    })

});
