interface ViewButtonProps{
    action: () => void;
    icon: React.ComponentType<{ className?: string }>;
    testID?: string;
}
const ViewButton: React.FC<ViewButtonProps> = ({action, icon: Icon, testID}) => {
  return (
    <button 
        data-testid={testID}
        onClick={() => action()} 
        className='text-white w-max'>
        <Icon className='icon-size' />
    </button>
  )
}

export default ViewButton
