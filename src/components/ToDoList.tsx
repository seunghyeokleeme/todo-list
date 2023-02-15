import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState,
  categoryState,
  toDoSelector,
  toDoState,
} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
  category: string;
}

function ToDoList() {
  const toDosModifer = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, categoriesModifer] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategory(oldCategory => {
      return category;
    });
    categoriesModifer(pre => {
      const newCategories = [...pre, category];
      localStorage.setItem("categories", JSON.stringify(newCategories));
      return newCategories;
    });
    setValue("category", "");
  };
  console.log(category, categories);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  };
  useEffect(() => {
    if (localStorage.getItem("toDos") !== null) {
      const localToDos = JSON.parse(localStorage.getItem("toDos") || "");
      toDosModifer(() => localToDos);
    }
    if (localStorage.getItem("categories") !== null) {
      const localCategories = JSON.parse(
        localStorage.getItem("categories") || ""
      );
      categoriesModifer(() => localCategories);
    }
  }, [toDosModifer, categoriesModifer]);
  return (
    <div>
      <h1>To Dos</h1>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("category", {
            required: "Please wirte a Category",
          })}
          placeholder="Write a Category"
          type="text"
        />
        <button>Add</button>
      </form>
      <hr />
      <select value={category} onInput={onInput}>
        {categories.map((category, idx) => (
          <option key={idx} value={category}>
            {category}
          </option>
        ))}
      </select>
      <CreateToDo />
      {toDos?.map(toDo => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
