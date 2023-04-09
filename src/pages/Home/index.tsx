import { useEffect } from 'react';
import FrontApp from '../FrontApp';
import SiderBar from './siderBar';
import './index.less'
import ShellStdout from 'pages/ShellStdout';
import Electron from 'electron/index';
import { getGlobalStore } from 'store/index';


const Home = () => {
  useEffect(() => {
    Electron.initFrontAppMap(getGlobalStore('frontAppMap') || new Map())
  }, []);
  return <div id='home'>
    <SiderBar />
    <div className='content'>
      <main id='home_main'>
        <FrontApp />
        <ShellStdout />
      </main>
    </div>
  </div>;
}

export default Home;