import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Electron from 'src/electron';
import Button from 'components/button';
import Dialog from 'components/dialog';
import Input from 'components/input';
import { copy } from 'common/utils';
import './index.less'
import { getGlobalStore, setGlobalStoreWithPath } from 'store/index';
import { publishNotify } from 'notify/index'

interface NewFrontAppType {
  appName?: string,
  id?: string,
  projectPath?: string,
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
    updateNewFrontApp('id', id)
  }

  const checkAppSetting = () => {
    return newFrontApp.id && newFrontApp.appName && newFrontApp.projectPath
  }

  const onSaveAppSetting = () => {
    if (checkAppSetting()) {
      const id = newFrontApp.id || uuidv4()
      setGlobalStoreWithPath('frontAppMap', {
        [id]: newFrontApp
      }, 'map', true)
      publishNotify('onFrontAppMap', newFrontApp)
    }
    setNewFrontApp({})
  }



  const onInputChange = (name: string, value: string) => {
    updateNewFrontApp(name, value)
  }

  const startLocalServer = () => {
    Electron.startLocalServer(getGlobalStore('frontAppMap'))
  }

  const closeLocalServer = () => {
    Electron.closeLocalServer()
  }

  const restartLocalServer = () => {
    Electron.restartLocalServer()
  }

  const renderDialog = () => {
    return <div className='app_setting_body'>
      <Input maxLength={100} value={newFrontApp.appName || ''} placeholder='请输入应用名...' onChange={(value) => onInputChange('appName', value)} />
      <div className='set_project_path_wrap'>
        {newFrontApp.projectPath && <Input className='project_value_text' disabled value={newFrontApp.projectPath} />}
        <Button text theme='secondary' title='设置路径' onClick={setProjectPath} />
      </div>
    </div>
  }

  return <div className='sider_bar'>
    <Dialog title='新增前端应用' onSave={onSaveAppSetting} renderDialog={renderDialog} className='dialog_form_for_app_setting'>
      <Button title='新增前端应用' onClick={onAddFrontAppClick} />
    </Dialog>
    <Button title='启动本地服务' onClick={startLocalServer} />
    <Button title='关闭本地服务' onClick={closeLocalServer} />
    <Button title='重启本地服务' onClick={restartLocalServer} />
  </div>;
}

export default SiderBar;