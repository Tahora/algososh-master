import React, {useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {
    setItems,
    startBubbleComputation,
    startSelectionComputation,
    stopComputationAction
} from "../../services/actions/items";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import styles from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {Direction} from "../../types/direction";
import {RadioInput} from "../ui/radio-input/radio-input";
import {SortAlgorithms, SortVisualizerLength} from "../../types";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {createRandomArray} from "../../utils/common";
import {ColumnProps} from "../ui/column/column";
import {changeArr} from "../../utils/algorithms";

export const SortingPage: React.FC = () => {
    const {isComputationRun, items} = useAppSelector((state) => state.items);
    const dispatch = useAppDispatch();
    const [sortAlgorithm, setSortAlgorithm] = useState(SortAlgorithms.Bubble)
    const [currentDirection, setCurrentDirection] = useState(Direction.Ascending)

    function setSorting(sorting: SortAlgorithms) {
        setSortAlgorithm(sorting)
    }

    const setNewArray = () => {
        const array = createRandomArray().map((i) => {
            const x: ColumnProps = {index: i};
            return x;
        })
        dispatch(setItems(array))
    }

    function startCalc(direction: Direction) {
        setCurrentDirection(direction)
        const arr: ColumnProps[] = items.map((i) => i as ColumnProps)
        changeArr(arr, dispatch, {
            defaultIndx: [...arr.map((i, ind) => {
                return ind
            })]
        })
        switch (sortAlgorithm) {
            case SortAlgorithms.Bubble:
                dispatch(startBubbleComputation(arr, direction))
                break
            case SortAlgorithms.Selection:
                dispatch(startSelectionComputation(arr, direction))
                break
        }
    }

    useEffect(() => {
        setNewArray()
        return () => dispatch(stopComputationAction())
    }, [])

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
            <SortVizualizer length={SortVisualizerLength.Large}/>
        </SolutionLayout>
    );
};
