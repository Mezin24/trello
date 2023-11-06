import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';

interface TodoCardProps {
  todo: Todo;
  index: number;
  id: string;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard = ({
  id,
  index,
  todo,
  dragHandleProps,
  draggableProps,
  innerRef,
}: TodoCardProps) => {
  const { $createdAt, status, title, image } = todo;
  return (
    <div
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
      className='bg-white rounded-md space-y-2 drop-shadow-md'
    >
      <div className='flex justify-between items-center p-5'>
        <p>{title}</p>
        <button className='bg-red-500 hover:bg-red-600 h-8 w-8 text-white rounded-full flex items-center justify-center'>
          <XMarkIcon className='w-5 h-5' />
        </button>
      </div>

      {}
    </div>
  );
};

export default TodoCard;
