// MAKE THIS SCRIPT RUN WITHOUT ERRORS MODIFYING ONLY BETWEEN THIS COMMENT TAG: [MODIFICATION ALLOWED]

let stackPointer = 0
const stateStack = []

const renderComponent = (Component) => {
  const result = Component()
  stackPointer += 1
  return result
}

const renderComponents = (...components) => {
  const renderedComponents = components.map(renderComponent)
  stackPointer = 0
  return renderedComponents
}

const useState = (initialState) => {
  // [MODIFICATION ALLOWED]
  stateStack[stackPointer] = stateStack[stackPointer] !== undefined ? stateStack[stackPointer] : initialState
  const setter = (toSetValue) => {
    if (typeof toSetValue === 'function') {
      stateStack[initialState] = toSetValue(stateStack[initialState])
    } else {
      stateStack[initialState] = toSetValue
    }
  }
  return [stateStack[stackPointer], setter]
  // [MODIFICATION ALLOWED]
}

let increment
let decrement

const IncrementCounter = () => {
  const [counter, setCounter] = useState(0)
  
  increment = () => {
    setCounter((prev) => prev + 1)
  }

  return counter
}

const DecrementCounter = () => {
  const [counter, setCounter] = useState(1)
  
  decrement = () => {
    setCounter((prev) => prev - 1)
  }

  return counter
}

const assertArray = (original, asserted) => {
  if (original.length !== asserted.length) {
    throw new Error(`Arrays have different lengths: ${original} : ${asserted}`)
  }
  original.forEach((originalItem, index) => {
    const assertedItem = asserted[index]
    if (originalItem !== assertedItem) {
      throw new Error(`Element at index [${index}] is not equal, expecting: [${originalItem}] found: [${assertedItem}]`)
    }
  })
}

const oneRender = () => renderComponents(
  IncrementCounter,
  DecrementCounter,
)

const render1 = oneRender()

assertArray([0, 1], render1)

increment()
increment()
decrement()

const render2 = oneRender()

assertArray([2, 0], render2)

increment()
decrement()

const render3 = oneRender()

assertArray([3, -1], render3)

increment()
increment()
increment()
decrement()

const render4 = oneRender()

assertArray([6, -2], render4)