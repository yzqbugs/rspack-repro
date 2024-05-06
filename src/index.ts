import { createElement } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"

console.log('test')
const root=document.createElement('div')

root.id='simpleRoot'

document.body.appendChild(root)

const app=createRoot(root)
app.render(createElement(App))

