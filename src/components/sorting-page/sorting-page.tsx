/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {RadioInput} from "../ui/radio-input/radio-input";
import {SortAlgorithms, SortVisualizerLength} from "../../types";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {arrayToColummnArray, createRandomArray} from "../../utils/common";
import {ColumnProps} from "../ui/column/column";
import {useStore} from "../../hooks/useStore";
import {selectionSortBase, bubbleSortBase, IBubbleParams} from "./sort";


export const SortingPage: React.FC = () => {
    const {items, changeArr, isComputationRun, startCalculation} = useStore()
    const [sortAlgorithm, setSortAlgorithm] = useState(SortAlgorithms.Bubble)
    const [currentDirection, setCurrentDirection] = useState(Direction.Ascending)


    function setSorting(sorting: SortAlgorithms) {
        setSortAlgorithm(sorting)
    }

    const setNewArray = useCallback(async () => {
        const array = arrayToColummnArray(createRandomArray());
        await changeArr(array, {}, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setNewArray()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    async function selectionSort({arrayNums, direction = Direction.Ascending}: IBubbleParams) {
        await selectionSortBase({arrayNums, direction}, changeArr)
    }

    async function bubbleSort({arrayNums, direction = Direction.Ascending}: IBubbleParams) {
        await bubbleSortBase({arrayNums, direction}, changeArr)
    }

    function startCalc(direction: Direction) {
        setCurrentDirection(direction)
        const arrayNums = items.map((i) => (i as ColumnProps).index)
        changeArr(arrayToColummnArray(arrayNums), {})

        switch (sortAlgorithm) {
            case SortAlgorithms.Bubble:
                startCalculation(bubbleSort, {arrayNums, direction})
                break
            case SortAlgorithms.Selection:
                startCalculation(selectionSort, {arrayNums, direction})
                break
        }
    }

    return (
        <SolutionLayout title="Сортировка массива">
            <div className={styles.container}>
                <RadioInput label={"Выбор"}
                            name={"sortingType"}
                            extraClass={styles.extraSmallIndent}
                            checked={sortAlgorithm === SortAlgorithms.Selection}
                            onChange={() => setSorting(SortAlgorithms.Selection)}></RadioInput>
                <RadioInput label={"Пузырёк"}
                            name={"sortingType"}
                            extraClass={styles.smallIndent}
                            checked={sortAlgorithm === SortAlgorithms.Bubble}
                            onChange={() => setSorting(SortAlgorithms.Bubble)}></RadioInput>
                <Button extraClass={styles.button}
                        text="По возрастанию"
                        sorting={Direction.Ascending}
                        onClick={() => startCalc(Direction.Ascending)}
                        isLoader={isComputationRun && currentDirection === Direction.Ascending}
                        disabled={isComputationRun}></Button>
                <Button extraClass={`${styles.button} ${styles.mediumIndent}`}
                        text="По убыванию"
                        sorting={Direction.Descending}
                        onClick={() => startCalc(Direction.Descending)}
                        isLoader={isComputationRun && currentDirection === Direction.Descending}
                        disabled={isComputationRun}></Button>
                <Button extraClass={styles.button}
                        text="Новый массив"
                        onClick={setNewArray}
                        disabled={isComputationRun}></Button>
            </div>
            <SortVizualizer items={items}
                            length={SortVisualizerLength.Large}/>
        </SolutionLayout>
    );
};
