import React, {CompositionEventHandler, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {SortVisualizerLength} from "../../types";
import {CircleProps} from "../ui/circle/circle";
import {useStore} from "../../hooks/useStore";

export const FibonacciPage: React.FC = () => {
    const [text, setText] = useState('')
    const {items, changeArr, isComputationRun, startCalculation} = useStore()
    const maxValue = 19
    const minValue = 1

    async function fibonacci(countSteps: number,) {
        const array: CircleProps[] = [];
        for (let i = 0; i <= countSteps; i++) {
            const prevVal = (array.length <= 0) ? 1 : Number(array[array.length - 1].letter);
            const prevVal2 = (array.length <= 1) ? 0 : Number(array[array.length - 2].letter);
            array.push({letter: `${prevVal + prevVal2}`, index: i})
            await changeArr(array, {})
        }
    }


    function startCalc() {
        startCalculation(fibonacci, Number(text))
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
                        disabled={!text}
                        isLoader={isComputationRun}></Button>
            </div>
            <SortVizualizer items={items}
                            length={SortVisualizerLength.Short}/>
        </SolutionLayout>
    );
};
