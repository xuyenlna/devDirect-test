import { useEffect, useState } from 'react'

interface EditableTextProps {
  initialText: string
  onTextChange: (newText: string) => void
  componentType: string
}

export default function EditableText({ initialText, onTextChange, componentType }: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(initialText)

  const handleDoubleClick = () => {
    setIsEditing(true)
  }

  const handleBlur = () => {
    setIsEditing(false)
    onTextChange(text)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  useEffect(() => {
    // Update the internal state when the initialText prop changes
    setText(initialText)
  }, [initialText])
  return (
    <div
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      className=' text-center rounded border border-[#8b949b] px-4 py-2 '
      style={{ backgroundColor: componentType == 'button' ? '#eaeef9' : '' }}
    >
      {isEditing ? (
        <input
          type='text'
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          className='focus:outline-none'
          style={{ backgroundColor: componentType == 'button' ? '#eaeef9' : '' }}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  )
}
