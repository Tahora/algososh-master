import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {RadioInput} from "../ui/radio-input/radio-input";
import {SortAlgorithms, SortVisualizerLength} from "../../types";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {createRandomArray} from "../../utils/common";
import {ColumnProps} from "../ui/column/column";
import {useStore} from "../../hooks/useStore";
import {ElementStates} from "../../types/element-states";


interface IBubbleParams {
    array: ColumnProps[];
    direction: Direction;
}

export const SortingPage: React.FC = () => {
    const { items, changeArr,isComputationRun ,startCalculation} =useStore()
    const [sortAlgorithm, setSortAlgorithm] = useState(SortAlgorithms.Bubble)
    const [currentDirection, setCurrentDirection] = useState(Direction.Ascending)

    useEffect(() => {
        setNewArray()
    }, [])

    function setSorting(sorting: SortAlgorithms) {
        setSortAlgorithm(sorting)
    }

    const setNewArray = async () => {
        const array = createRandomArray().map((i) => {
            const x: ColumnProps = {index: i};
            return x;
        })
        await changeArr(array,{},0)
    }


    function isSwapDesc(i1: ColumnProps, i2: ColumnProps) {
        return i1.index < i2.index
    }

    function isSwapAsc(i1: ColumnProps, i2: ColumnProps) {
        return i1.index > i2.index
    }

    function getSwapChecker(direction: Direction) {
        switch (direction) {
            case Direction.Ascending:
                return isSwapAsc;
            case Direction.Descending:
                return isSwapDesc
        }
    }

    function swap(array: Array<any>, index1: number, index2: number) {
        const tempItem = array[index1];
        array[index1] = array[index2]
        array[index2] = tempItem
    }

    async function bubbleSort({array, direction = Direction.Ascending} :IBubbleParams) {
        const isSwap = getSwapChecker(direction)

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                if (isSwap(array[j], array[j + 1])) {
                    swap(array, j, j + 1)
                }
                await changeArr(array, {changingIndx: [j, j + 1], defaultIndx: j - 1 >= 0 ? [j - 1] : []})
            }
                await changeArr(array, {
                    modifiedIndx: i == array.length - 2 ? [array.length - i - 1, 0] : [array.length - i - 1],
                    defaultIndx: i < array.length - 2 ? [array.length - i - 2] : []
                })

        }
    }


    async function selectionSort({array, direction = Direction.Ascending} :IBubbleParams) {

        const isSwap = getSwapChecker(direction)

        for (let i = 0; i < array.length - 1; i++) {
            let minIndx = i;
            array[i].state = ElementStates.Changing
            for (let j = i + 1; j < array.length; j++) {
                if (isSwap(array[minIndx], array[j])) {
                    minIndx = j
                }
                await changeArr(array,  {changingIndx: [j]})
                array[j].state = ElementStates.Default
            }
            swap(array, i, minIndx)
            array[i].state = ElementStates.Default
            array[minIndx].state = ElementStates.Default
            await changeArr(array, {
                modifiedIndx: i < array.length - 2 ? [i] : [i, i + 1],
                defaultIndx: i < array.length - 2 ? [array.length - 1] : []
            })
        }
    }

    function startCalc(direction: Direction) {
        setCurrentDirection(direction)
        const array: ColumnProps[] = items.map((i) => i as ColumnProps)
        changeArr(array,  {
            defaultIndx: [...array.map((i, ind) => {
                return ind
            })]
        })

        switch (sortAlgorithm) {
            case SortAlgorithms.Bubble:
                startCalculation(bubbleSort,{array, direction})
                break
            case SortAlgorithms.Selection:
                startCalculation(selectionSort,{array, direction})
                break
        }
    }


    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.container}>
                <RadioInput label={"Выбор"}
                            name={"sortingType"}
                            extraClass={styles.extraSmallIndent}
                            checked={sortAlgorithm == SortAlgorithms.Selection}
                            onChange={() => setSorting(SortAlgorithms.Selection)}></RadioInput>
                <RadioInput label={"Пузырёк"}
                            name={"sortingType"}
                            extraClass={styles.smallIndent}
                            checked={sortAlgorithm == SortAlgorithms.Bubble}
                            onChange={() => setSorting(SortAlgorithms.Bubble)}></RadioInput>
                <Button extraClass={styles.button}
                        text="По возрастанию"
                        sorting={Direction.Ascending}
                        onClick={() => startCalc(Direction.Ascending)}
                        isLoader={isComputationRun && currentDirection == Direction.Ascending}
                        disabled={isComputationRun}></Button>
                <Button extraClass={`${styles.button} ${styles.mediumIndent}`}
                        text="По убыванию"
                        sorting={Direction.Descending}
                        onClick={() => startCalc(Direction.Descending)}
                        isLoader={isComputationRun && currentDirection == Direction.Descending}
                        disabled={isComputationRun}></Button>
                <Button extraClass={styles.button}
                        text="Новый массив"
                        onClick={setNewArray}
                        disabled={isComputationRun}></Button>
            </div>
            <SortVizualizer items={items} length={SortVisualizerLength.Large}/>
        </SolutionLayout>
    );
};
