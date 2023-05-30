import React from "react";
import { useAppSelector} from "../../hooks/redux";
import styles from "./sort-visualizer.module.css";
import {Circle, CircleProps} from "../ui/circle/circle";
import {SortVisualizerLength} from "../../types";
import {Column, ColumnProps} from "../ui/column/column";
import { v4 } from "uuid";
import {ArrowIcon} from "../ui/icons/arrow-icon";

interface ISortVisualizerProps {
    length?:SortVisualizerLength
    withArrows?:boolean
}

export const SortVizualizer: React.FC<ISortVisualizerProps> = ({ length=SortVisualizerLength.Medium,withArrows=false}) => {

    const  {items}= useAppSelector((state) => state.items);

    const isItemsCircle=items.length>0 ? items[0]&&("letter" in items[0]): false;

    function createItem(item:CircleProps|ColumnProps, key:string, index:number)
    {
        if (isItemsCircle)
        {
            const circle=item as CircleProps
            return(<div className={styles.withArrowContainer} key={key}> <Circle extraClass={styles.itemIndent}  {...circle}/>
                     {withArrows&&index<items.length-1&&  <ArrowIcon />}
               </div>)
        }
        else
        {
            const column=item as ColumnProps
            return <Column extraClass={styles.itemIndent} key={key} {...column}/>
        }
    }


    return (
        <div className={styles.containerTop}>
        <div className={`${styles.container} ${isItemsCircle?styles.circleContainer:styles.columnContainer} ${styles[length]}` }>
            {items.map((i,ind)=>{return createItem(i, v4() ,ind)})}
        </div>
        </div>
    );
};
