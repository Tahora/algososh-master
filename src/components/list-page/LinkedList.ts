type Node<T = string | number> = ILinkedItem<T> | undefined

interface ILinkedItem<T = string | number> {
    value: T;
    nextItem: Node<T>
}

function newLinkedItem<T = string | number>(item: T) {
    const node: ILinkedItem<T> = {value: item, nextItem: undefined}
    return node
}

export class LinkedList<T = string | number> {
    private head: Node<T>;
    private size: number;

    constructor() {
        this.head = undefined;
        this.size = 0;
    }

    toArray() {
        const result = new Array<T>()
        let curr = this.head
        while (curr) {
            result.push(curr.value)
            curr = curr.nextItem
        }
        return result
    }

    pushHead(item: T) {
        const node = newLinkedItem<T>(item)
        if (this.head) {
            node.nextItem = this.head
        }
        this.head = node
        this.size++
    }

    pushByIndex(item: T, index: number) {
        if (index < 0 || index > this.size) return
        if (index == 0) {
            this.pushHead(item)
            return;
        }
        let currNode = this.head
        let iterator = 0
        while (currNode?.nextItem && iterator < this.size && iterator < index - 1) {
            currNode = currNode.nextItem
            iterator++
        }
        const node = newLinkedItem<T>(item)
        if (iterator == index - 1 && currNode) {
            node.nextItem = currNode.nextItem
            currNode.nextItem = node
            this.size++
        }
    }

    removeByIndex(index: number) {
        if (index < 0 || index > this.size - 1) return
        if (index == 0) {
            this.removeHead();
            return;
        }
        let currNode = this.head
        let iterator = 0
        while (currNode?.nextItem && iterator < this.size && iterator < index - 1) {
            currNode = currNode.nextItem
            iterator++
        }
        if (iterator == index - 1 && currNode) {
            currNode.nextItem && this.size--
            currNode.nextItem = currNode.nextItem?.nextItem

        }
    }

    pushTail(item: T) {
        const node = newLinkedItem<T>(item)
        let tail = this.head
        while (tail?.nextItem) {
            tail = tail.nextItem
        }
        if (tail) {
            tail.nextItem = node
        } else {
            this.head = node
        }
        this.size++
    }

    removeHead() {
        if (this.head) {
            this.head = this.head.nextItem
            this.size--
        }
    }

    removeTail() {
        let prevTailNode = undefined
        let tail = this.head
        while (tail?.nextItem) {
            prevTailNode = tail
            tail = tail.nextItem
        }
        if (prevTailNode) {
            prevTailNode.nextItem = undefined
            this.size--
        } else {
            this.head && this.size--
            this.head = undefined
        }
    }

}
