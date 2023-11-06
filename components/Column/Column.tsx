import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCard from '../TodoCard/TodoCard';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useBoardStore } from '@/store/boardStore';
import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';

interface ColumnPorps {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

const Column = ({ todos, index, id }: ColumnPorps) => {
  const searchString = useBoardStore((state) => state.searchString);

  const searchTodos = useMemo(() => {
    return searchString
      ? todos.filter((todo) => todo.title.match(RegExp(searchString, 'i')))
      : todos;
  }, [searchString, todos]);

  const [debouncedTodos] = useDebounce(searchTodos, 1000);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type='card'>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'
                }`}
              >
                <h2 className='flex justify-between items-center font-bold text-xl p-2'>
                  {idToColumnText[id]}
                  <span className='font-normal text-gray-500 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-sm'>
                    {debouncedTodos.length}
                  </span>
                </h2>

                <div className='space-y-2'>
                  {debouncedTodos.map((todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          id={id}
                          index={index}
                          key={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <div className='flex items-end justify-end p-2'>
                    <button className='text-green-500 hover:text-green-600'>
                      <PlusCircleIcon className='h-10 w-10' />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
export default Column;
