import { useState } from 'react'
import Switch from '../../components/switch'
import Input from '../../components/input'
import Electron from '../../electron/index';
import { copy } from '../../common/utils';
import './index.less'

interface ItemI { [key: string]: string }
interface HashI { [key: string]: { [key: string]: string } }

const FrontApp = ({
}) => {
  const [list, setList] = useState([] as Array<string>);
  const [switchFlag, setSwitchFlag] = useState(false);
  const [appName, setAppName] = useState({} as HashI);

  const addFrontApp = async (id: string, isRoot = false) => {
    const path = await Electron.showOpenDialog()
    const temp = copy(appName)
    temp[id].path = path;
    temp[id].isRoot = isRoot;
    setAppName(temp)
  }
  const addAppItem = () => {
    const listTemp = copy(list);
    const temp = copy(appName)
    const id = `${Date.now()}`; listTemp.push(id)
    setList(listTemp)
    temp[id] = { value: '', path: '', isRoot: false }
    setAppName(temp)
  }
  const getApp = (id: string) => {
    if (switchFlag) {
      return <Input
        key={id}
        type='root'
        value={appName[id] ? appName[id].vaule : ''}
        buttonText='设置根目录路径'
        path={appName[id] ? appName[id].path : ''}
        callback={() => addFrontApp(id, true)}
        onChange={(value) => {
          const temp = copy(appName)
          temp[id].value = value
          setAppName(temp)
        }}
      />
    }
    return <Input
      key={id}
      value={appName[id] ? appName[id].vaule : ''}
      type='app'
      buttonText='设置应用路径'
      path={appName[id] ? appName[id].path : ''}
      callback={() => addFrontApp(id, false)}
      onChange={(value) => {
        const temp = copy(appName)
        temp[id].value = value
        setAppName(temp)
      }}
    />
  }
  return <div>
    <Switch
      switchFlag={switchFlag}
      setSwitchFlag={setSwitchFlag}
      switchText={['前端应用', '前端根目录']}
    />
    <div className='button' onClick={addAppItem}>新增应用</div>
    {list.map(id => {
      return getApp(id);
    })
    }
  </div>;
};
export default FrontApp;