const routes = [
    {url: "/recursion", name: ""},
    {url: "/fibonacci", name: ""},
    {url: "/sorting", name: ""},
    {url: "/stack", name: ""},
    {url: "/queue", name: ""},
    {url: "/list", name: ""},
]


describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    routes.forEach((route) => {
        it(`should open ${route.url} page from main`, function () {
            cy.get(`a[href="${route.url}"]`).click()
            cy.get(`h3`).contains(route.name)
        });
    })

});
