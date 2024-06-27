import React from 'react'
import  useMenuStore  from '../../store/menuStore';

interface MenuButtonProps {
    icon: React.ComponentType<{ className?: string }>;
    action?: () => void;
    closeButton?: boolean;
    testID?: string;
  }
  const MenuButton: React.FC<MenuButtonProps> = ({ icon: Icon, action, closeButton, testID }) => {
    const {toggleMenu} = useMenuStore()
    const handleButton = () => {
        toggleMenu()
        if(!closeButton && action){
          action()
        }
    }
  return (
    <button data-testid={testID} onClick={handleButton} className={`mx-[2px] lg:mx-1 rounded-full p-1 hover:bg-blue-900 ${closeButton && 'block lg:hidden'}`}>
        <Icon className='text-2xl lg:text-3xl'/>
    </button>
  )
}

export default MenuButton
