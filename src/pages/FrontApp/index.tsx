import { useState, useEffect, MouseEvent } from 'react'
import { keyType, ObjectType, DataType } from '../../common/type'
import Input from '../../components/input'
import { copy } from '../../common/utils';
import './index.less'
import { getGlobalStore, setGlobalStore } from '../../store';
import { subscribeNotify } from '../../notify';

const FrontApp = ({
}) => {
  const [appMap, setAppMap] = useState(getGlobalStore('frontAppMap') || new Map());

  useEffect(() => {
    subscribeNotify('onFrontAppMap', (newAppMap: any) => {
      setAppMap(newAppMap)
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
      res.push(<div key={item.id} onClick={(e) => onFrontAppClick(e, item)}>
        <div>{item.id}</div>
        <div onClick={(e) => removeFrontApp(e, item)}>删除</div>
      </div>)
    })
    return res;
  }
  return <div>{renderList()}</div>;
};
export default FrontApp;