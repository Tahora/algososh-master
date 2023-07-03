const routes = [
    {url: "/recursion", name: "Строка"},
    {url: "/fibonacci", name: "Последовательность Фибоначчи"},
    {url: "/sorting", name: "Сортировка массива"},
    {url: "/stack", name: "Стек"},
    {url: "/queue", name: "Очередь"},
    {url: "/list", name: "Связный список"},
]


describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    routes.forEach((route) => {
        it(`should open ${route.url} page from main`, function () {
            cy.get(`a[href="${route.url}"]`).click()
            cy.contains(route.name)
        });
    })

});
