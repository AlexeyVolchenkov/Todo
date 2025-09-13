import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Todo from "@/pages/Todo";
import About from "@/pages/About";
import Task from "@/pages/Task";

export const ThemeContext= createContext(null)


function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.body.className = `theme-${theme.toLowerCase()}`
  }, [theme]);

  const switchTheme = (event) => {
    const isLight = event.target.textContent.toLowerCase() === 'light'

    setTheme(isLight ? 'Light': 'Dark')
  }

  return (
    <div data-theme={theme.toLowerCase()}>
      <ThemeContext.Provider value={{theme, switchTheme}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todo />} />
            {/*<Route path="/about" element={<About />} />*/}
            <Route path="/todo/:id" element={<Task />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  )
}

export default App
