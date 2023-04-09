import Electron from 'electron/index';
const { IpcMainEvent } = window.require('electron')
import './index.less'
import { useEffect, useRef, useState } from 'react';
import { copy } from 'common/utils';
import { FrontAppType } from 'common/type';
import { TabView, TabPanel } from 'components/tabView';

interface MessagePoolType extends FrontAppType {
  type: string,
  msg: string,
}

interface MessageInfoType {
  appName: string,
  pool: Array<MessagePoolType>,
  cache: {
    uniqueMsg: string
  }
}

const ShellStdout = () => {
  const [hmrMessagePool, setHmrMessagePool] = useState(new Map() as Map<string, MessageInfoType>);
  const shellStdoutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Electron.receiveHmrMessage((event: typeof IpcMainEvent, type: string, app: string, msg: string) => {
      const tempHmrMessagePool = copy(hmrMessagePool)
      const frontAppJson = JSON.parse(app)
      const newMsgInfo = { type, msg: msg, ...frontAppJson }
      const appName = frontAppJson.appName
      const msgPool = copy(tempHmrMessagePool.get(appName) || { pool: [], cache: {} })
      if (!msgPool.cache[frontAppJson.uniqueMsg]) {
        msgPool.appName = appName
        msgPool.pool.push(newMsgInfo)
        msgPool.cache[frontAppJson.uniqueMsg] = frontAppJson.uniqueMsg
      }
      tempHmrMessagePool.set(appName, msgPool)
      setHmrMessagePool(tempHmrMessagePool)
    })
    shellStdoutRef.current?.scrollTo(0, shellStdoutRef.current.scrollHeight)
  }, [hmrMessagePool]);
  

  const renderHmrMessagePool = () => {
    const resJsx = [] as JSX.Element[]
    hmrMessagePool.forEach((msgInfo: MessageInfoType) => {
      const { appName, pool } = msgInfo
      resJsx.push(<TabPanel key={appName} title={appName}>
        {pool.map((item, index) => {
          return <div key={`msg_pool_li_${item.appName}_${index}`} className={`shell_stdout_level_${item.type}`}>
            <div>{item.msg}</div>
          </div>
        })}
      </TabPanel>)
    })
    return resJsx
  }

  return <div className="shell_stdout" ref={shellStdoutRef}>
    <TabView>
      {renderHmrMessagePool()}
    </TabView>
  </div>
}
export default ShellStdout;