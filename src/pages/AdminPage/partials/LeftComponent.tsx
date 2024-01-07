import { useAppDispatch } from '~/store'
import { updateDraggedComponent } from '~/store/componentSlice'

export default function LeftComponent() {
  const dispatch = useAppDispatch()

  const handleDragStart = (componentType: string) => {
    dispatch(updateDraggedComponent(componentType))
  }
  const handleDragEnd = () => dispatch(updateDraggedComponent(null))
  return (
    <div className='h-full w-[250px] rounded border border-[#c3cad1] p-4 flex flex-col justify-start gap-4'>
      <div
        id='boxA'
        className='h-[50px] w-full rounded border border-[#8b949b] flex justify-center items-center cursor-pointer'
        draggable
        onDragStart={() => handleDragStart && handleDragStart('paragraph')}
        onDragEnd={handleDragEnd}
      >
        Paragraph
      </div>
      <div
        id='boxA'
        className='h-[50px] w-full rounded border border-[#8b949b] flex justify-center items-center cursor-pointer'
        draggable
        onDragStart={() => handleDragStart && handleDragStart('button')}
      >
        Button
      </div>
    </div>
  )
}
