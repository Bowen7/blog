export const code = /* jsx */ `
import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

const createProxy = (target, real) => {
  return new Proxy(target, {
    get(target, prop) {
      const value = prop in target ? target[prop] : real[prop]

      if (typeof value === "function") {
        return prop in target ? value.bind(target) : value.bind(real)
      }
      return value
    }
  })
}

function createFakeDocument(realDocument) {
  return createProxy(
    {
      createElementNS: (ns, type) => {
        const realElement = realDocument.createElementNS(ns, type)
        return createFakeElement(realElement)
      }
    },
    realDocument
  )
}

const fakeDocument = createFakeDocument(document)

function createFakeElement(realElement) {
  return createProxy(
    {
      _element: realElement,
      ownerDocument: fakeDocument,
      setAttribute(name, value) {
        if (name === "fill" && value === "red") {
          realElement.setAttribute(name, "#85A600")
          return
        }
        realElement.setAttribute(name, value)
      },
      appendChild(child) {
        realElement.appendChild(child._element)
      },
      removeChild(child) {
        realElement.removeChild(child._element)
      }
    },
    realElement
  )
}

const RoughSVG = ({ children }) => {
  const ref = useRef()
  const [fakeElement, setFakeElement] = useState(null)
  useEffect(() => {
    setFakeElement(createFakeElement(ref.current))
  }, [])
  return (
    <div ref={ref}>{fakeElement && createPortal(children, fakeElement)}</div>
  )
}

export default function App() {
  return (
    <RoughSVG>
      <svg width="128" height="64" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" fill="red" />
        <circle cx="96" cy="32" r="24" />
      </svg>
    </RoughSVG>
  )
}
`.trim()
