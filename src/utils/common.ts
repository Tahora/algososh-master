import {CircleProps} from "../components/ui/circle/circle";

export async function setTimeoutAsync(ms: number | undefined) {
    return new Promise<void>(res => setTimeout(res, ms))
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function createRandomArray(minLength: number = 3, maxLength: number = 17) {
    const length = getRandomInt(minLength, maxLength)
    const array = new Array<number>(length)
    for (let i = 0; i < length; i++) {
        array[i] = getRandomInt(0, 100);
    }
    return array;
}

export function arrayToCircleArray<T = string | number | undefined>(array: T[]) {
    const result = new Array<CircleProps>(array.length)
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i] ? {index: i, letter: `${array[i]}`} : {index: i, letter: ``}
    }
    return result
}

