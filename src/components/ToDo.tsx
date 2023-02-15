import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categories = useRecoilValue(categoriesState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos(oldToDos => {
      const targertIndex = oldToDos.findIndex(toDo => toDo.id === id);
      const newToDo = { text, id, category: name };
      const newToDos = [
        ...oldToDos.slice(0, targertIndex),
        newToDo,
        ...oldToDos.slice(targertIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {categories
        .filter(item => item !== category)
        .map((v, index) => (
          <button key={index} name={v} onClick={onClick}>
            {v}
          </button>
        ))}
    </li>
  );
}

export default ToDo;
