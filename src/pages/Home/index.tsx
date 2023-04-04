import FrontApp from '../FrontApp';
import SiderBar from './siderBar';
import './index.less'

const Home = () => {
  return <div id='home'>
    <SiderBar />
    <div className='content'>
      <main>
        <FrontApp />
      </main>
    </div>

  </div>;
}

export default Home;