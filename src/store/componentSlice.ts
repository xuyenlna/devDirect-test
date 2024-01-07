import { createSlice } from '@reduxjs/toolkit'

export interface Component {
  id: string
  type: string // 'button' | 'paragraph'
  componentName: string // ElementButton | ElementParagraph
  props?: {
    text: string
    message: string
  }
}

interface InitialStateProps {
  currentComponent: Component | null
  draggedComponent: string | null
  componentList: Component[]
}

export const componentSlice = createSlice({
  name: 'component',
  initialState: {
    currentComponent: null,
    draggedComponent: null,
    componentList: []
  } as InitialStateProps,
  reducers: {
    updateCurrentComponent: (state, action) => {
      state.currentComponent = action.payload
    },
    updateDraggedComponent: (state, action) => {
      state.draggedComponent = action.payload
    },
    addComponent: (state, action) => {
      state.componentList = [...state.componentList, action.payload]
    },
    updateComponentList: (state, action) => {
      const updatedComponent = action.payload
      const findId = state.componentList.findIndex((item) => item.id == updatedComponent.id)
      if (findId != -1) {
        state.componentList.splice(findId, 1, updatedComponent)
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateCurrentComponent, updateDraggedComponent, addComponent, updateComponentList } =
  componentSlice.actions

export default componentSlice.reducer
