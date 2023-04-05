import { useState } from 'react'
import Button from '../../components/button';

import Electron from '../../electron/index';
import './index.less'
import { getGlobalStore, setGlobalStoreWithPath } from '../../store';
import { v4 as uuidv4 } from 'uuid';
import { publishNotify } from '../../notify';
import Dialog from '../../components/dialog';
import Input from '../../components/input';
import { copy } from '../../common/utils';

interface NewFrontAppType {
  appName: string,
  [key: string]: string
}

const SiderBar = () => {
  const [newFrontApp, setNewFrontApp] = useState({} as NewFrontAppType);

  const updateNewFrontApp = (name: string, value: string) => {
    const tempNewFrontApp = copy(newFrontApp)
    tempNewFrontApp[name] = value
    setNewFrontApp(tempNewFrontApp)
  }
  
  const setProjectPath = async () => {
    const path = await Electron.showOpenDialog()
    updateNewFrontApp('projectPath', path)
  }

  const onAddFrontAppClick = () => {
    const id = uuidv4()
    // setGlobalStoreWithPath('frontAppMap', {
    //   [id]: { id }
    // }, 'map', true)
    // publishNotify('onFrontAppMap', getGlobalStore('frontAppMap'))
  }



  const onInputChange = (name: string, value: string) => {
    updateNewFrontApp(name, value)
  }

  const renderDialog = () => {
    return <div>
      <Input value={newFrontApp.appName} onChange={(value) => onInputChange('appName', value)} />
      <Button title='新增前端应用' onClick={setProjectPath} />
    </div>
  }

  return <div className='sider_bar'>
    <Dialog renderDialog={renderDialog}>
      <Button title='新增前端应用' onClick={onAddFrontAppClick} />
    </Dialog>
  </div>;
}

export default SiderBar;