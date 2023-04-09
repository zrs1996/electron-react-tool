type ThemeToClassType = 'dark' | 'light' | void
interface TabPanelType {
  id?: string,
  title: string,
  type?: string,
  className?: string,
  theme?: ThemeToClassType,
  callback?: (activeIndex: number) => void,
  children: JSX.Element | JSX.Element[]
}

const TabPanel = (props: TabPanelType) => {
  const { children, title } = props;

  const getTabPanelClass = () => {
    let name = 'com_tab_panel_li'
    return name
  }
  
  return <div className={getTabPanelClass()}>
    <div className="com_tab_panel_li_title">{title}</div>
    <div className="com_tab_panel_li_body">{children}</div>
  </div>
}
export default TabPanel