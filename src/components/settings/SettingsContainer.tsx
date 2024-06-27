import ToggleSwitch from '../ToggleSwitch'

const SettingContainer: React.FC<{title: string, text: string, action: () => void, isChecked: boolean}> = ({title, text, action, isChecked}) => {
  return (
    <div className='flex justify-between items-center border-b border-slate-800 p-5 lg:p-8'>
        <p className='text-sm lg:text-xl font-light cursor-default'>{title}</p>
        <ToggleSwitch text={text} action={action} isChecked={isChecked}/>
    </div>
  )
}

export default SettingContainer
