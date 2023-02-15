import { atom, selector } from "recoil";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export type CategoriesList = string;

export interface IToDo {
  text: string;
  id: number;
  category: CategoriesList;
}

export const categoryState = atom<CategoriesList>({
  key: "categroy",
  default: Categories.TO_DO,
});

export const categoriesState = atom<CategoriesList[]>({
  key: "categories",
  default: [...Object.keys(Categories)],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter(toDo => toDo.category === category);
  },
});
