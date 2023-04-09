import { useState } from "react";

type ThemeToClassType = 'dark' | 'light' | void

interface TabViewI {
  id?: string,
  type?: string,
  className?: string,
  theme?: ThemeToClassType,
  callback?: (activeIndex: number) => void,
  children: JSX.Element | JSX.Element[]
}

const TabView = (props: TabViewI) => {
  const { children, callback } = props;
 
  const [activeIndex, setActiveIndex] = useState(0);

  const themeToClass = {
    dark: 'com_tab_view_dark',
    light: 'com_tab_view_light'
  }

  const getTabViewName = () => {
    let name = 'com_tab_view'
    return name
  }

  const getTabPanelName = (index: number) => {
    let name = 'com_tab_panel'
    if (index === activeIndex) {
      name += ' com_tab_panel_active'
    }
    return name
  }
  
  const onTabPanelCLick = (index: number) => {
    setActiveIndex(index)
    callback && callback(index)
  }

  const renderChildren = () => {
    if (Array.isArray(children)) {
      return children.map((value, index) => {
        return <div className={getTabPanelName(index)} onClick={() => onTabPanelCLick(index)}>{value}</div>
      })
    } else {
      return children
    }
  }

  return <div className={getTabViewName()}>
    {renderChildren()}
  </div>
}

export default TabView