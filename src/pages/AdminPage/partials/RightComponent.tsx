import { useEffect, useState } from 'react'
import EditableText from '~/components/EditableText'
import { useAppDispatch, useAppSelector } from '~/store'
import { addComponent, updateComponentList, updateCurrentComponent } from '~/store/componentSlice'

export default function RightComponent() {
  const dispatch = useAppDispatch()
  const components = useAppSelector((state) => state.component.componentList)
  const draggedComponent = useAppSelector((state) => state.component.draggedComponent)
  const currentComponent = useAppSelector((state) => state.component.currentComponent)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const x = e.clientX - e.currentTarget.offsetLeft
    const y = e.clientY - e.currentTarget.offsetTop
    setMousePosition({ x, y })
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const newComponent = {
      id: Date.now().toString(),
      type: draggedComponent, // 'button' | 'paragraph'
      componentName: draggedComponent == 'button' ? 'ElementButton' : 'ElementParagraph',
      props: {
        text: draggedComponent == 'button' ? 'Button' : 'Paragraph',
        message: ''
      }
    }
    dispatch(addComponent(newComponent))
  }

  const [mousePosition, setMousePosition] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const handleDivClick = (componentId: string) => {
    const clickedComponent = components.find((component) => component.id == componentId)
    if (clickedComponent) {
      dispatch(updateCurrentComponent(clickedComponent))
    }
  }

  const handleTextChange = (newText: string) => {
    if (currentComponent) {
      const updatedCurrentComponent = { ...currentComponent, props: { ...currentComponent.props, text: newText } }
      dispatch(updateCurrentComponent(updatedCurrentComponent))
      dispatch(updateComponentList(updatedCurrentComponent))
    }
  }

  const handleChangeConfig = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentComponent) {
      const updatedCurrentComponent = JSON.parse(e.target.value)
      dispatch(updateCurrentComponent(updatedCurrentComponent))
      dispatch(updateComponentList(updatedCurrentComponent))
    }
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      className='h-full w-full rounded border border-[#c3cad1] grid grid-cols-5 gap-4 p-4 relative overflow-auto'
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* drop zone */}
      <div className='col-start-1 col-span-3 flex flex-col justify-between h-full '>
        <div className='flex flex-col gap-4 justify-start items-center'>
          {components.map((component) => (
            <div className='cursor-pointer' key={component.id} onClick={() => handleDivClick(component.id)}>
              <EditableText
                key={component.id}
                initialText={component.props?.text ?? ''}
                onTextChange={(newText) => handleTextChange(newText)}
                componentType={component.type}
              />
            </div>
          ))}
        </div>
        <p>*Note: double click on element to edit text</p>
      </div>

      {/* info zone */}
      <div className='col-start-4 col-span-2 h-full bg-[green] rounded bg-[#eaeef9] p-4 flex flex-col gap-4'>
        <div className='flex gap-2'>
          <span>Mouse: </span>
          <span> {`  (${mousePosition.x}, ${mousePosition.y})`}</span>
        </div>

        <div className='flex gap-2'>
          <span>Dragging: </span>
          <span>
            {draggedComponent == 'button'
              ? 'ElementButton'
              : draggedComponent == 'paragraph'
              ? 'ElementParagraph'
              : null}
          </span>
        </div>

        <div className='flex gap-2'>
          <span>Instance: </span>
          <span>{components.length}</span>
        </div>

        <div className='flex gap-2 w-full'>
          <span>Config: </span>
          {currentComponent && (
            <textarea
              value={JSON.stringify(currentComponent)}
              onChange={handleChangeConfig}
              rows={10}
              cols={40}
              className=' focus:outline-none bg-[#eaeef9] w-full h-[300px] overflow-auto'
            />
          )}
        </div>
      </div>
    </div>
  )
}
