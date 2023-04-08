import FrontApp from '../FrontApp';
import SiderBar from './siderBar';
import './index.less'
import ShellStdout from 'pages/ShellStdout';

const Home = () => {
  return <div id='home'>
    <SiderBar />
    <div className='content'>
      <main>
        <FrontApp />
        <ShellStdout />
      </main>
    </div>

  </div>;
}

export default Home;