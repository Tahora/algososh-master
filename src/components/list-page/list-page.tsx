import React, {CompositionEventHandler, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {LoaderTypes, SortVisualizerLength} from "../../types";
import {LinkedList} from "./LinkedList";
import {arrayToCircleArray} from "../../utils/common";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {useStore} from "../../hooks/useStore";

export const ListPage: React.FC = () => {
    const [text, setText] = useState('')
    const [index, setIndex] = useState('')
    const [loaderType, setLoaderType] = useState<null | LoaderTypes>(null)
    const {items, changeArr} = useStore()
    const length = items.length;
    const list = useMemo(() => {
        const l = new LinkedList<string>()
        l.pushHead('0')
        l.pushTail('34')
        l.pushTail('8')
        l.pushTail('1')
        return l
    }, [])


    useEffect(() => {
        const visualState = arrayToCircleArray(list.toArray())

        changeArr(visualState, {head: 0, tail: visualState.length - 1}, 0)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeText: React.FormEventHandler<HTMLInputElement> = (e) => {
        setText((e.target as HTMLInputElement).value)
    }

    const changeIndex: React.FormEventHandler<HTMLInputElement> = (e) => {
        setIndex((e.target as HTMLInputElement).value)
    }

    const checkValue: CompositionEventHandler<HTMLInputElement> = (e) => {
        const input = e.target as HTMLInputElement
        const currentValue = Number(input.value + e.data)
        if (currentValue >= 0 && currentValue <= 12) {
            return
        }
        e.preventDefault();
    }

    async function pushHead() {
        setLoaderType(LoaderTypes.PushHead)
        await pushTailOrHead(true)
        setLoaderType(null)
    }

    async function pushTail() {
        setLoaderType(LoaderTypes.PushTail)
        await pushTailOrHead(false)
        setLoaderType(null)
    }

    async function removeHead() {
        setLoaderType(LoaderTypes.RemoveHead)
        await removeTailOrHead(true)
        setLoaderType(null)
    }

    async function removeTail() {
        setLoaderType(LoaderTypes.RemoveTail)
        await removeTailOrHead(false)
        setLoaderType(null)
    }

    async function insertByIndex() {
        setLoaderType(LoaderTypes.InsertByIndex)
        const ind = Number(index)
        let visualState = arrayToCircleArray(list.toArray())
        if (visualState.length === 0) {
            visualState.push({letter: ''})
        }
        const newItem = Circle({letter: `${text}`, isSmall: true, state: ElementStates.Changing})
        if (!(ind >= 0 && ind < visualState.length)) {
            setLoaderType(null)
            return
        }
        let prevNodes: number[] = []
        for (let i = 0; i <= ind; i++) {
            visualState[0].head = 'head'
            visualState[i].head = newItem
            await changeArr(visualState, {changingIndx: prevNodes, tail: visualState.length - 1})
            prevNodes.push(i)
            visualState[i].head = ''
        }

        list.pushByIndex(text, ind)
        setIndex('')
        setText('')
        visualState = arrayToCircleArray(list.toArray())
        await changeArr(visualState, {head: 0, tail: visualState.length - 1, modifiedIndx: [ind]})
        await changeArr(visualState, {head: 0, tail: visualState.length - 1, defaultIndx: [ind]})
        setLoaderType(null)
    }

    async function removeByIndex() {
        setLoaderType(LoaderTypes.RemoveByIndex)
        const ind = Number(index)
        let visualState = arrayToCircleArray(list.toArray())
        if (!(ind >= 0 && ind < visualState.length)) {
            setLoaderType(null)
            return
        }

        let prevNodes: number[] = []
        for (let i = 0; i <= ind; i++) {
            await changeArr(visualState, {head: 0, changingIndx: prevNodes, tail: visualState.length - 1})
            prevNodes.push(i)
        }
        const newItem = Circle({letter: visualState[ind].letter, isSmall: true, state: ElementStates.Changing})
        visualState[ind].letter = ''
        visualState[ind].tail = newItem
        await changeArr(visualState, {head: 0})

        list.removeByIndex(ind)
        setIndex('')
        setText('')
        visualState = arrayToCircleArray(list.toArray())
        visualState[0].head = 'head'
        visualState[visualState.length - 1].tail = 'tail'
        await changeArr(visualState, {})
        setLoaderType(null)
    }

    async function pushTailOrHead(headFlag: boolean) {
        // region отображение состояния списка до добавления элемента
        const newItem = Circle({letter: `${text}`, isSmall: true, state: ElementStates.Changing})
        let visualState = arrayToCircleArray(list.toArray())
        if (visualState.length === 0) {
            visualState.push({letter: ''})
        } else {
            visualState[visualState.length - 1].tail = "tail"
        }
        let ind = headFlag ? 0 : visualState.length - 1
        visualState[0].head = "head"
        visualState[ind].head = newItem
        await changeArr(visualState, {})
        // endregion отображение состояния списка до добавления элемента

        headFlag ? list.pushHead(text) : list.pushTail(text)
        setIndex('')
        setText('')

        // region отображение состояния списка после добавления элемента
        visualState = arrayToCircleArray(list.toArray())
        ind = headFlag ? 0 : visualState.length - 1
        await changeArr(visualState, {head: 0, modifiedIndx: [ind], tail: visualState.length - 1})
        await changeArr(visualState, {defaultIndx: [ind]})
        // endregion отображение состояния списка после добавления элемента
        setLoaderType(null)
    }

    async function removeTailOrHead(headFlag: boolean) {
        // region отображение состояния списка до удаления элемента
        let visualState = arrayToCircleArray(list.toArray())
        const ind = headFlag ? 0 : visualState.length - 1;
        if (visualState.length <= 0) return
        const newItem = Circle({letter: `${visualState[ind].letter}`, isSmall: true, state: ElementStates.Changing})
        visualState[visualState.length - 1].tail = "tail"
        visualState[ind].tail = newItem
        visualState[ind].letter = ''
        await changeArr(visualState, {head: 0})
        // endregion отображение состояния списка до удаления элемента

        headFlag ? list.removeHead() : list.removeTail()

        // region отображение состояния списка после удаления элемента
        visualState = arrayToCircleArray(list.toArray())
        await changeArr(visualState, {head: 0, tail: visualState.length - 1})
        // endregion отображение состояния списка после удаления элемента
    }

    return (
        <SolutionLayout title="Связный список">
            <div className={`${styles.container} ${styles.textContainer}`}>
                <Input data-test-id="valueInput"
                       extraClass={`${styles.input}`}
                       maxLength={4}
                       isLimitText={true}
                       onChange={changeText}
                       value={text}></Input>
                <Button extraClass={styles.button}
                        text="Добавить в head"
                        onClick={() => pushHead()}
                        disabled={(!!loaderType) || !text}
                        isLoader={loaderType === LoaderTypes.PushHead}></Button>
                <Button extraClass={styles.button}
                        text="Добавить в tail"
                        onClick={() => pushTail()}
                        disabled={(!!loaderType) || !text}
                        isLoader={loaderType === LoaderTypes.PushTail}></Button>
                <Button extraClass={styles.button}
                        text="Удалить из head"
                        onClick={() => removeHead()}
                        disabled={(!!loaderType) || length <= 0}
                        isLoader={loaderType === LoaderTypes.RemoveHead}></Button>
                <Button extraClass={styles.button}
                        text="Удалить из tail"
                        onClick={() => removeTail()}
                        disabled={(!!loaderType) || length <= 0}
                        isLoader={loaderType === LoaderTypes.RemoveTail}></Button>
            </div>
            <div className={`${styles.container} ${styles.indexContainer}`}>
                <Input extraClass={styles.input}
                       data-test-id="indexInput"
                       maxLength={2}
                       onChange={changeIndex}
                       value={index}
                       type="number"
                       onBeforeInput={checkValue}></Input>
                <Button extraClass={styles.largebutton}
                        text="Добавить по индексу"
                        onClick={() => {
                            insertByIndex()
                        }}
                        disabled={(!!loaderType) || !index || !text}
                        isLoader={loaderType === LoaderTypes.InsertByIndex}></Button>
                <Button extraClass={styles.largebutton}
                        text="Удалить по индексу"
                        onClick={() => {
                            removeByIndex()
                        }}
                        disabled={(!!loaderType) || length <= 0 || !index}
                        isLoader={loaderType === LoaderTypes.RemoveByIndex}></Button>
            </div>
            <SortVizualizer length={SortVisualizerLength.Large}
                            items={items}
                            withArrows={true}/>
        </SolutionLayout>
    );
};
