import {FC, PropsWithChildren} from "react";

export type FCC<P = {}> = FC<PropsWithChildren<P>>;

export enum SortVisualizerLength {
    Short = "shortLength",
    Medium = "mediumLength",
    Large = "largeLength",
}

export enum SortAlgorithms {
    Bubble = "bubble",
    Selection = "selection",
}

export enum LoaderTypes {
    PushHead = "pushHead",
    PushTail = "pushTail",
    RemoveHead = "removeHead",
    RemoveTail = "removeTail",
    InsertByIndex = "insertByIndex",
    RemoveByIndex = "RemoveByIndex"
}

export enum StackLoaderTypes {
    Push = "push",
    Remove = "remove",
    Clean = "clean",
}


