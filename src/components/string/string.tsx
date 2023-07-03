import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css"
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {useStore} from "../../hooks/useStore";
import {stringExpandBase} from "./stringExpand";

export const StringComponent: React.FC = () => {
    const [text, setText] = useState('')
    const {items, changeArr, isComputationRun, startCalculation} = useStore()

    async function stringExpand(text: string) {
        await stringExpandBase(text, changeArr)
    }

    function startCalc() {
        startCalculation(stringExpand, text)
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
