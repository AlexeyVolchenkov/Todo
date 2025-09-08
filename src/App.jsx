import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Todo from "@/pages/Todo";
import About from "@/pages/About";
import Task from "@/pages/Task";


function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme]);

  return (
    <div className="theme" data-theme={theme.toLowerCase()}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/todo"
            element={
              <Todo
                theme={theme}
                setTheme={setTheme}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About />
            }
          />
          <Route
            path="/todo/:id"
            element={
              <Task />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
