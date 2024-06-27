import { useEffect, useState } from 'react'
import { useSettingsStore } from '../../store/settingsStore'
import SettingsContainer from './SettingsContainer'

const ScrollbarSettings = () => {
    const { scrollbarVisibility,toggleScrollbar} = useSettingsStore()
    const [isChecked, setIsChecked] = useState(scrollbarVisibility)
    const [text, setText] = useState(scrollbarVisibility ? 'Visible' : 'Hidden');
    const toggleScrollbarVisibility = () => {
        toggleScrollbar(!scrollbarVisibility)
        setIsChecked(!isChecked)
    }
    useEffect(() => {
        setText(isChecked ? 'Visible' : 'Hidden')
      }, [isChecked])
  return (
    <SettingsContainer text={text} action={toggleScrollbarVisibility} isChecked={isChecked} title="Change scrollbar visibility" />
  )
}

export default ScrollbarSettings
