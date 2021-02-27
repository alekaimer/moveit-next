import { createContext, ReactNode } from "react"

interface CountdownContextData {

}

interface CountdownProvider {
  children: ReactNode
}

const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({ children }: CountdownProvider) {
  return (
    <CountdownContext.Provider value={{}}>
      { children }
    </CountdownContext.Provider>
  )
}