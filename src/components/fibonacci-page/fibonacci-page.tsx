import React, {CompositionEventHandler, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {startFibonacciComputation, stopComputationAction} from "../../services/actions/items";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {SortVisualizerLength} from "../../types";

export const FibonacciPage: React.FC = () => {
    const [text, setText] = useState('')
    const {isComputationRun} = useAppSelector((state) => state.items);
    const dispatch = useAppDispatch();
    const maxValue = 19
    const minValue = 1

    function startCalc() {
        dispatch(startFibonacciComputation(Number(text)))
    }

    const checkValue: CompositionEventHandler<HTMLInputElement> = (e) => {
        const input = e.target as HTMLInputElement
        const currentValue = Number(input.value + e.data)
        if (currentValue <= maxValue && currentValue >= minValue) {
            return
        }
        e.preventDefault();
    }


    const changeText: React.FormEventHandler<HTMLInputElement> = (e) => {
        setText((e.target as HTMLInputElement).value)
    }


    useEffect(() => {
        return () => dispatch(stopComputationAction())
    }, [])


    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={styles.container}>
                <Input extraClass={styles.input}
                       max={19}
                       min={1}
                       isLimitText={true}
                       onChange={changeText}
                       onBeforeInput={checkValue}
                       value={text}
                       type={'number'}></Input>
                <Button extraClass={styles.button}
                        text="Развернуть"
                        onClick={startCalc}
                        isLoader={isComputationRun}></Button>
            </div>
            <SortVizualizer length={SortVisualizerLength.Short}/>
        </SolutionLayout>
    );
};
