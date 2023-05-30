import React, { useEffect, useMemo, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { SortVisualizerLength} from "../../types";
import {Button} from "../ui/button/button";
import {SortVizualizer} from "../sort-visualizer/sort-visualizer";
import {Input} from "../ui/input/input";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Stack} from "./Stack";
import {stopComputationAction} from "../../services/actions/items";
import {changeArr} from "../../utils/algorithms";
import {arrayToCircleArray} from "../../utils/common";


export const StackPage: React.FC = () => {
    const [text, setText] =useState('')
    const  length= useAppSelector((state) => state.items.items.length);
    const dispatch = useAppDispatch();
    const stack= useMemo(()=>{return new Stack()},[])

    useEffect(()=>{
        return ()=>dispatch(stopComputationAction())
    },[])

    function pushItem()
    {
        stack.push(text)
        setText('')
        let visualState=arrayToCircleArray(stack.toArray())
        changeArr(visualState,dispatch,{defaultIndx:[visualState.length-1]},0)
    }

    function clean()
    {
        stack.clean()
        let visualState=arrayToCircleArray(stack.toArray())
        changeArr(visualState,dispatch,{},0)
    }

    function pop()
    {
        stack.pop()
        let visualState=arrayToCircleArray(stack.toArray())
        changeArr(visualState,dispatch,{},0)
    }

    const changeText:React.FormEventHandler<HTMLInputElement>=(e)=>{
        setText((e.target as HTMLInputElement).value)
    }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
          <Input extraClass={styles.input} maxLength={4} isLimitText={true} onChange={changeText} value={text}></Input>
          <Button  text="Добавить"  onClick={()=>pushItem()} disabled={ !text}></Button>
        <Button  text="Удалить"  onClick={()=>pop()} disabled={length<=0}></Button>
        <Button extraClass={styles.mediumIndent} text="Очистить" onClick={()=>clean()} disabled={length<=0}></Button>
      </div>
      <SortVizualizer length={SortVisualizerLength.Large}/>
    </SolutionLayout>
  );
};
