export class Queue<T = string | number> {
    private array: Array<T | undefined>;
    private tail: number;
    private head: number;
    private readonly maxLength: number

    constructor(maxLength: number = 6) {
        this.tail = -1
        this.head = -1
        this.maxLength = maxLength;
        this.array = new Array<T>(maxLength)
    }

    getTail() {
        return this.tail;
    }

    getHead() {
        return this.head;
    }

    push(item: T) {
        if (this.tail + 1 < this.array.length && this.head < this.maxLength - 1) {
            this.tail = this.tail >= this.head ? this.tail + 1 : this.head
            this.array[this.tail] = item
            if (this.head < 0) {
                this.head = 0
            }
        }

    }

    pop() {
        if (this.head + 1 <= this.array.length) {
            this.array[this.head] = undefined
            if (this.head + 1 <= this.tail)
                this.head++
            else if (this.head == this.tail)
                this.tail = -1
        }
    }

    clean() {
        this.tail = -1
        this.head = -1
        this.array = new Array<T>(this.maxLength)
    }

    toArray() {
        const result = this.array.map((i) => {
            return i
        })
        return result;
    }
}
