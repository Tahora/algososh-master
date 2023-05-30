import React, {useEffect, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css"
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {startStringComputation, stopComputationAction} from "../../services/actions/items";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";

export const StringComponent: React.FC = () => {
    const [text, setText] =useState('')
    const  {isComputationRun}= useAppSelector((state) => state.items);
    const dispatch = useAppDispatch();

    function startCalc() {
        dispatch(startStringComputation(text))
    }

    const changeText:React.FormEventHandler<HTMLInputElement>=(e)=>{
        setText((e.target as HTMLInputElement).value)
    }



    useEffect(()=>{
        return ()=>dispatch(stopComputationAction())
    },[])


  return (
    <SolutionLayout title="Строка">
     <div className={styles.container}>
         <Input extraClass={styles.input} maxLength={11} isLimitText={true} onChange={changeText} value={text}></Input>
         <Button extraClass={styles.button} text="Развернуть" onClick={startCalc} isLoader={ isComputationRun}></Button>
     </div>
        <SortVizualizer/>
    </SolutionLayout>
  );
};
