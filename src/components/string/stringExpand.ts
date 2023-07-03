import {CircleProps} from "../ui/circle/circle";

///функция реализующая алгоритм разворота строки
export async function stringExpandBase(text: string, storeCallback?: (array: CircleProps[],
                                                                      changes:
                                                                          {
                                                                              changingIndx?: number[],
                                                                              modifiedIndx?: number[],
                                                                              defaultIndx?: number[],
                                                                              head?: number,
                                                                              tail?: number
                                                                          },
                                                                      pause?: number) => {} | null) {
    const countSteps = text.length / 2;
    const textArray = Array.from(text).map((i) => {
        const x: CircleProps = {letter: `${i}`};
        return x;
    });

    for (let i = 0; i < countSteps; i++) {
        const ind2 = text.length - 1 - i;
        if (storeCallback) {
            await storeCallback(textArray, {changingIndx: [i, ind2]})
        }
        textArray[i].letter = text[ind2];
        textArray[ind2].letter = text[i];
        if (storeCallback) {
            await storeCallback(textArray, {modifiedIndx: [i, ind2]})
        }
    }
    return textArray.map((i) => {
        return i.letter
    }).join("")
}

