import { ReactNode, useState, useEffect } from 'react'
import { keyType, ObjectType, DataType } from '../../common/type'
import Input from '../../components/input'
import { copy } from '../../common/utils';
import './index.less'
import { getGlobalStore, setGlobalStore } from '../../store';
import { subscribeNotify } from '../../notify';
interface ItemI { [key: string]: string }
interface HashI { [key: string]: { [key: string]: string } }

const FrontApp = ({
}) => {
  const [appMap, setAppMap] = useState(getGlobalStore('frontAppMap') || new Map());

  useEffect(() => {
    subscribeNotify('onFrontAppMap', (newAppMap: any) => {
      setAppMap(newAppMap)
    })
  });

  const onFrontAppClick = () => {
    console.log('appMap', appMap);
  }

  const removeFrontApp = (app: ObjectType) => {
    const tempAppMap = new Map(appMap)
    tempAppMap.delete(app.id)
    setAppMap(tempAppMap)
    setGlobalStore('frontAppMap', tempAppMap, 'map', true)
  }

  const renderList = () => {
    const res: JSX.Element[] = []
    appMap.forEach((item: ObjectType) => {
      res.push(<div key={item.id} onClick={onFrontAppClick}>
        <div>{item.id}</div>
        <div onClick={() => removeFrontApp(item)}>删除</div>
      </div>)
    })
    return res;
  }
  return <div>{renderList()}</div>;
};
export default FrontApp;