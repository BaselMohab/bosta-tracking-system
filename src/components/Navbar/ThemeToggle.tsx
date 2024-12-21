import { FaRegMoon } from 'react-icons/fa'
import { FiSun } from 'react-icons/fi'
import { useState } from 'react'

export const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false)

    const handleChangeTheme = () => {
        setIsDark(!isDark)
        document.body.classList.toggle('dark')
    }
    
    return (
        <div>
            {isDark ? (
                <FiSun
                    className="text-xl cursor-pointer hover:text-gray-600 transition-colors"
                    onClick={handleChangeTheme}
                />
            ) : (
                <FaRegMoon
                    className="text-xl cursor-pointer hover:text-yellow-500 transition-colors"
                    onClick={handleChangeTheme}
                />
            )}
        </div>
    )
}
