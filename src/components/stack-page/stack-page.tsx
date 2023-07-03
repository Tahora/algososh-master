import React, { useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import {StackLoaderTypes, SortVisualizerLength} from "../../types";
import {Button} from "../ui/button/button";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {Input} from "../ui/input/input";
import {Stack} from "./Stack";
import {arrayToCircleArray} from "../../utils/common";
import {useStore} from "../../hooks/useStore";




export const StackPage: React.FC = () => {
    const [text, setText] = useState('')
    const [loaderType, setLoaderType] = useState<null | StackLoaderTypes>(null)
    const { items, changeArr} =useStore()
    const stack = useMemo(() => {
        return new Stack()
    }, [])


    async function pushItem() {
        setLoaderType(StackLoaderTypes.Push)
        stack.push(text)
        setText('')
        let visualState = arrayToCircleArray(stack.toArray())
        await changeArr(visualState,  {defaultIndx: [visualState.length - 1]})
        setLoaderType(null)
    }

    async function clean() {
        setLoaderType(StackLoaderTypes.Clean)
        stack.clean()
        let visualState = arrayToCircleArray(stack.toArray())
        await changeArr(visualState,  {})
        setLoaderType(null)
    }

    async function pop() {
        setLoaderType(StackLoaderTypes.Remove)
        stack.pop()
        let visualState = arrayToCircleArray(stack.toArray())
        await changeArr(visualState,  {})
        setLoaderType(null)
    }

    const changeText: React.FormEventHandler<HTMLInputElement> = (e) => {
        setText((e.target as HTMLInputElement).value)
    }

    return (
        <SolutionLayout title="Стек">
            <div className={styles.container}>
                <Input extraClass={styles.input}
                       maxLength={4}
                       isLimitText={true}
                       onChange={changeText}
                       value={text}></Input>
                <Button text="Добавить"
                        onClick={() => pushItem()}
                        isLoader={loaderType == StackLoaderTypes.Push}
                        disabled={!!loaderType|| !text}></Button>
                <Button text="Удалить"
                        onClick={() => pop()}
                        isLoader={loaderType == StackLoaderTypes.Remove}
                        disabled={!!loaderType|| items.length <= 0}></Button>
                <Button extraClass={styles.mediumIndent}
                        text="Очистить"
                        onClick={() => clean()}
                        isLoader={loaderType == StackLoaderTypes.Clean}
                        disabled={!!loaderType|| items.length <= 0}></Button>
            </div>
            <SortVizualizer items={items} length={SortVisualizerLength.Large}/>
        </SolutionLayout>
    );
};
