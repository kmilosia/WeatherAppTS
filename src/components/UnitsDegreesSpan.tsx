import { useSettingsStore } from '../store/settingsStore'

const UnitsDegreesSpan = () => {
    const {units} = useSettingsStore()
  return (
    <span data-testid='units-span' className='ml-1'>{units === 'Metric' ? ' °C' : '°F' }</span>
  )
}

export default UnitsDegreesSpan
