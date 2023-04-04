import { useState } from 'react'
import Button from '../../components/button';
import Electron from '../../electron/index';
import './index.less'
import { getGlobalStore, setGlobalStoreWithPath } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import { publishNotify } from '../../notify';

const SiderBar = () => {

  const addFrontApp = async (id: string, isRoot = false) => {
    // const path = await Electron.showOpenDialog()
    // const temp = copy(appName)
    // temp[id].path = path;
    // temp[id].isRoot = isRoot;
    // setAppName(temp)
  }

  const onAddFrontAppClick = () => {
    const id = uuidv4()
    setGlobalStoreWithPath('frontAppMap', {
      [id]: { id }
    }, 'map', true)
    publishNotify('onFrontAppMap', getGlobalStore('frontAppMap'))
  }

  return <div className='sider_bar'>
    <Button title='新增前端应用' onClick={onAddFrontAppClick} />
  </div>;
}

export default SiderBar;