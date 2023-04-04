import { useState, Dispatch, SetStateAction } from 'react';
import "./index.less";
interface Props {
  switchText: string[],
  switchFlag?: boolean | undefined,
  setSwitchFlag?: Dispatch<SetStateAction<boolean>>
}
const Switch = (props: Props) => {
  const [switchFlagInside, setSwitchFlagInside] = useState(false);
  const { switchText, switchFlag, setSwitchFlag } = props;
  const flag = switchFlag === undefined ? switchFlagInside : switchFlag
  const handleSwitch = () => {
    setSwitchFlag ? setSwitchFlag(!switchFlag) : setSwitchFlagInside(!switchFlagInside)
  }
  return (<div className='com_switch'>
    {switchText.length > 0 ? <div className='switch_text' onClick={handleSwitch}>{switchText[flag ? 1 : 0]}</div> : <></>}
    <div className={`${flag ? 'switch-wrap wrap-active' : 'switch-wrap'}`} onClick={handleSwitch}>
      <div className={`${flag ? 'circle-inner inner-active' : 'circle-inner'}`}></div>
    </div>
  </div>);
};
export default Switch;