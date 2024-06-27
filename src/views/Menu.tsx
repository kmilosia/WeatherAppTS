import { IoSearch, IoClose } from 'react-icons/io5'
import { LuSettings } from "react-icons/lu";
import { useSearchStore } from '../store/searchStore';
import useLocationStore from '../store/locationStore';
import MenuLocationForecast from '../components/menu/MenuLocationForecast';
import { useSettingsStore } from '../store/settingsStore';
import MenuButton from '../components/menu/MenuButton';

const Menu = () => {
  const setSearchOpen = useSearchStore((state) => state.toggleSearch)
  const { toggleSettings, scrollbarVisibility } = useSettingsStore()
  const { locations, defaultLocation, currentLocation } = useLocationStore()
  const filteredLocations = defaultLocation ? locations.filter((item:any) => item !== defaultLocation) : locations
  
  return (
    <div className={`backdrop-blur-xl bg-black/20 text-gray-100 flex flex-col p-6 lg:p-8 h-full w-full overflow-auto ${scrollbarVisibility ? 'scrollbar-thin scrollbar-thumb-white/25 scrollbar-track-white/50' : 'scrollbar-none'}`}>
      <div className='flex w-full justify-between items-center mb-6'>
        <h1 className='text-2xl lg:text-4xl font-semibold cursor-default'>Manage locations</h1>
        <div className='flex'>
          <MenuButton action={setSearchOpen} icon={IoSearch} testID="search-menu-btn"/>
          <MenuButton action={toggleSettings} icon={LuSettings} testID="settings-menu-btn"/>
          <MenuButton icon={IoClose} closeButton={true} testID="close-menu-btn"/>
        </div>
      </div>
      {currentLocation && 
      <div className='flex flex-col'>
        <h2 className=' text-slate-100 font-extralight text-sm cursor-default'>Current location</h2>
        <MenuLocationForecast item={null} isDefault={false} isCurrent={true}/>
      </div>
      }
      {defaultLocation && 
      <div className='flex flex-col'>
        <h2 className=' text-slate-100 font-extralight text-sm cursor-default mt-4'>Default location</h2>
        <MenuLocationForecast item={defaultLocation} isDefault={true} isCurrent={false}/>
      </div>
      }
      {filteredLocations &&
      <div className='flex flex-col'>
        {(defaultLocation || currentLocation) && <h2 className='mt-4 text-slate-100 font-extralight text-sm cursor-default'>Other locations</h2>}
        <ul>
          {filteredLocations.map((item: any) => {
            return(
              <MenuLocationForecast item={item} key={item} isDefault={false} isCurrent={false}/>
            )
          })}
        </ul>
      </div>
      }
    </div>
  )
}

export default Menu
