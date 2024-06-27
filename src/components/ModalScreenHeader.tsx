import { IoClose } from 'react-icons/io5'
import ViewButton from './ViewButton'
interface ModalScreenHeaderProps{
    title: string
    action: () => void
    testID: string
}
const ModalScreenHeader: React.FC<ModalScreenHeaderProps> = ({title, action, testID}) => {
  return (
    <div className='flex justify-between items-start mb-6 lg:mb-8'>
        <h1 className='text-2xl lg:text-4xl font-semibold'>{title}</h1>
        <ViewButton testID={testID} icon={IoClose} action={action} />
    </div>
  )
}

export default ModalScreenHeader
