import React, { useState } from 'react';
import 'primeicons/primeicons.css';
import './index.less'
import Button from '../button';
interface DialogProps {
  renderDialog(): React.ReactNode;
  children: React.ReactNode,
  header?: string | void,
  onSave?: () => void
}
const Dialog = (props: DialogProps) => {
  const { renderDialog, children, header, onSave } = props;
  const [showDialogFlag, setShowDialogFlag] = useState(false);

  const renderDialogContent = () => {
    if (showDialogFlag && renderDialog) {
      return <div className='mask com_dialog_mask'>
        <div className='com_dialog_content'>
          <div className='com_dialog_header'>
            <div className='com_dialog_header_title'>{header || 'Header'}</div>
            <div className='com_dialog_header_icon' onClick={(e) => closeDialog(e)}><i className="pi pi-times"></i></div>
          </div>
          <div className='com_dialog_body'>{renderDialog()}</div>
          <div className='com_dialog_footer'>
            <Button title='close' theme='secondary' text onClick={closeDialog} />
            <Button title='apply' theme='submit' onClick={() => onSave && onSave()} />
          </div>
        </div>
      </div>
    }
  }

  const closeDialog = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | void) => {
    e && e.stopPropagation();
    setShowDialogFlag(!showDialogFlag);
  }

  return <div className='com_dialog'>
    <div onClick={(e) => closeDialog(e)}>{children}</div>
    {renderDialogContent()}
  </div>
}

export default Dialog