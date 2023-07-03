import {bubbleSortBase, selectionSortBase} from "./sort";


describe('Bubble sort test', function () {
        it('empty array', async () => {
            const result = await bubbleSortBase({arrayNums: []})
            expect(result).toEqual([]);
        });

        it('1 item array', async () => {
            const result = await bubbleSortBase({arrayNums: [1]})
            expect(result).toEqual([1]);
        });

        it('many item array', async () => {
            const result = await bubbleSortBase({arrayNums: [2, 4, 6, 12, 8, 3]})
            expect(result).toEqual([2, 3, 4, 6, 8, 12]);
        });
    }
)

describe('Selection sort test', function () {
        it('empty array', async () => {
            const result = await selectionSortBase({arrayNums: []})
            expect(result).toEqual([]);
        });

        it('1 item array', async () => {
            const result = await selectionSortBase({arrayNums: [1]})
            expect(result).toEqual([1]);
        });

        it('many item array', async () => {
            const result = await selectionSortBase({arrayNums: [2, 4, 6, 12, 8, 3]})
            expect(result).toEqual([2, 3, 4, 6, 8, 12]);
        });
    }
)
