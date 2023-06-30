import React, {useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {SortVisualizerLength, StackLoaderTypes} from "../../types";
import {Queue} from "./Queue";
import {arrayToCircleArray} from "../../utils/common";
import {useStore} from "../../hooks/useStore";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";


export const QueuePage: React.FC = () => {
    const [text, setText] = useState('')
    const [loaderType, setLoaderType] = useState<null | StackLoaderTypes>(null)
    const { items, changeArr} =useStore()
    const queue = useMemo(() => {
        return new Queue(6)
    }, [])
    const tail = queue.getTail();


    useEffect(() => {
        changeArr(arrayToCircleArray(queue.toArray()),  {}, 0)
    }, [])

    async function pushItem() {
        setLoaderType(StackLoaderTypes.Push)
        queue.push(text)
        setText('')

        const tail = queue.getTail();
        const head = queue.getHead();
        let visualState = arrayToCircleArray(queue.toArray())
        await changeArr(visualState, {changingIndx: [tail], tail: tail, head: head},SHORT_DELAY_IN_MS)
        changeArr(visualState,  {defaultIndx: [tail]}, 0)
        setLoaderType(null)
    }

    async function clean() {
        setLoaderType(StackLoaderTypes.Clean)
        queue.clean()
        let visualState = arrayToCircleArray(queue.toArray())
        await changeArr(visualState,  {}, SHORT_DELAY_IN_MS)
        setLoaderType(null)
    }

    async function pop() {
        setLoaderType(StackLoaderTypes.Remove)
        queue.pop()

        const tail = queue.getTail();
        const head = queue.getHead();
        let visualState = arrayToCircleArray(queue.toArray())
        await changeArr(visualState,  {head: head, tail: tail}, SHORT_DELAY_IN_MS)
        setLoaderType(null)
    }

    const changeText: React.FormEventHandler<HTMLInputElement> = (e) => {
        setText((e.target as HTMLInputElement).value)
    }

    return (
        <SolutionLayout title="Очередь">
            <div className={styles.container}>
                <Input extraClass={styles.input}
                       maxLength={4}
                       isLimitText={true}
                       onChange={changeText}
                       value={text}></Input>
                <Button text="Добавить"
                        onClick={() => pushItem()}
                        isLoader={loaderType == StackLoaderTypes.Push}
                        disabled={!!loaderType||!text}></Button>
                <Button text="Удалить"
                        onClick={() => pop()}
                        isLoader={loaderType == StackLoaderTypes.Remove}
                        disabled={!!loaderType||tail < 0}></Button>
                <Button extraClass={styles.mediumIndent}
                        text="Очистить"
                        onClick={() => clean()}
                        isLoader={loaderType == StackLoaderTypes.Clean}
                        disabled={!!loaderType|| tail< 0}></Button>
            </div>
             <SortVizualizer items={items} length={SortVisualizerLength.Large}/>

        </SolutionLayout>
    );
};
