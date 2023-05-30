import React, {useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "../stack-page/stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {SortVisualizerLength} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Queue} from "./Queue";
import {stopComputationAction} from "../../services/actions/items";
import {arrayToCircleArray} from "../../utils/common";
import {changeArr} from "../../utils/algorithms";


export const QueuePage: React.FC = () => {
    const [text, setText] = useState('')
    const dispatch = useAppDispatch();
    const queue = useMemo(() => {
        return new Queue(6)
    }, [])
    const length = useAppSelector((state) => state.items.items.length);

    useEffect(() => {
        changeArr(arrayToCircleArray(queue.toArray()), dispatch, {}, 0)
        return () => dispatch(stopComputationAction())
    }, [])

    async function pushItem() {
        queue.push(text)
        setText('')

        const tail = queue.getTail();
        const head = queue.getHead();
        let visualState = arrayToCircleArray(queue.toArray())
        await changeArr(visualState, dispatch, {changingIndx: [tail], tail: tail, head: head})
        changeArr(visualState, dispatch, {defaultIndx: [tail]}, 0)
    }

    function clean() {
        queue.clean()
        let visualState = arrayToCircleArray(queue.toArray())
        changeArr(visualState, dispatch, {}, 0)
    }

    function pop() {
        queue.pop()

        const tail = queue.getTail();
        const head = queue.getHead();
        let visualState = arrayToCircleArray(queue.toArray())
        changeArr(visualState, dispatch, {head: head, tail: tail}, 0)
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
                        disabled={!text}></Button>
                <Button text="Удалить"
                        onClick={() => pop()}
                        disabled={length <= 0}></Button>
                <Button extraClass={styles.mediumIndent}
                        text="Очистить"
                        onClick={() => clean()}
                        disabled={length <= 0}></Button>
            </div>
            <SortVizualizer length={SortVisualizerLength.Large}/>

        </SolutionLayout>
    );
};
