import { TabModel } from "./tab.model";

export interface FolderModel {
    title: string; 
    iconSrc: string;
    tabs: TabModel[];
}