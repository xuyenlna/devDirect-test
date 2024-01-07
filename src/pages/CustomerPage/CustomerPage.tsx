import { useAppSelector } from '~/store'

export default function CustomerPage() {
  const components = useAppSelector((state) => state.component.componentList)
  return (
    <div className='col-start-1 col-span-3 flex flex-col gap-4 justify-start items-center p-8'>
      {components.map((component) => (
        <div key={component.id}>
          {component.type == 'button' ? (
            <button
              className='rounded border border-[#8b949b] px-4 py-2 bg-[#eaeef9]'
              onClick={() => component.props?.message && alert(component.props?.message)}
            >
              {component.props?.text}
            </button>
          ) : (
            <div className='rounded border border-[#8b949b] px-8 py-2 '>
              <p> {component.props?.text}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
