
export class Stack<T=string|number>{
    private  array: T[];
    constructor()
    {
        this.array =new Array<T>(0)
        console.log("stack")
    }

    async push(item:T) {
        this.array.push(item)
    }

    pop() {
        this.array.pop()
    }

    clean()
    {
        this.array =new Array<T>(0)
    }

    toArray()
    {
        const result=this.array.map((i)=>{return i})
        return result;
    }

}
