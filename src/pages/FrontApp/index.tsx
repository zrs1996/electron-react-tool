import { useState, useEffect, MouseEvent } from 'react'
import { ObjectType } from '../../common/type'
import './index.less'
import { getGlobalStore, setGlobalStore } from '../../store';
import { subscribeNotify } from '../../notify';
import Button from 'components/button'

const FrontApp = ({
}) => {
  const [appMap, setAppMap] = useState(getGlobalStore('frontAppMap') || new Map());

  useEffect(() => {
    subscribeNotify('onFrontAppMap', (newAppMap: any) => {
      const tempAppMap = new Map(appMap)
      tempAppMap.set(newAppMap.id, newAppMap)
      setAppMap(tempAppMap)
    })
  });

  const onFrontAppClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, item: ObjectType) => {
    e.stopPropagation();
    console.log('item', item);
  }

  const removeFrontApp = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, app: ObjectType) => {
    e.stopPropagation();
    const tempAppMap = new Map(appMap)
    tempAppMap.delete(app.id)
    setAppMap(tempAppMap)
    setGlobalStore('frontAppMap', tempAppMap, 'map', true)
  }

  const renderList = () => {
    const res: JSX.Element[] = []
    appMap.forEach((item: ObjectType) => {
      res.push(<div className='front_app_li' key={item.id} onClick={(e) => onFrontAppClick(e, item)}>
        <div>{item.appName}</div>
        <Button title='删除' onClick={(e) => removeFrontApp(e as MouseEvent<HTMLDivElement, globalThis.MouseEvent>, item)} />
      </div>)
    })
    return res;
  }
  return <div className='front_app_list'>{renderList()}</div>;
};
export default FrontApp;