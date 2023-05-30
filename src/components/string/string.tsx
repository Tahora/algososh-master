import React, { useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css"
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {useStore} from "../../hooks/useStore";
import {CircleProps} from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
    const [text, setText] = useState('')
    const { items, changeArr,isComputationRun ,startCalculation} =useStore()


    async function stringExpand(text: string) {
        const countSteps = text.length / 2;
        const textArray = Array.from(text).map((i) => {
            const x: CircleProps = {letter: `${i}`};
            return x;
        });

        for (let i = 0; i < countSteps; i++) {
            const ind2 = text.length - 1 - i;
            await changeArr(textArray, {changingIndx: [i, ind2]})
            textArray[i].letter = text[ind2];
            textArray[ind2].letter = text[i];
            await changeArr(textArray,  {modifiedIndx: [i, ind2]})
        }
    }

    function startCalc() {
        startCalculation(stringExpand,text)
    }

    const changeText: React.FormEventHandler<HTMLInputElement> = (e) => {
        setText((e.target as HTMLInputElement).value)
    }



    return (
        <SolutionLayout title="Строка">
            <div className={styles.container}>
                <Input extraClass={styles.input}
                       maxLength={11}
                       isLimitText={true}
                       onChange={changeText}
                       value={text}></Input>
                <Button extraClass={styles.button}
                        text="Развернуть"
                        onClick={startCalc}
                        disabled={!text}
                        isLoader={isComputationRun}></Button>
            </div>
            <SortVizualizer items={items}/>
        </SolutionLayout>
    );
};
