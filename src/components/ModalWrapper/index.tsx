import * as React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

import './ModalWrapper.scss';

const ModalWrapper: React.FC = (props: any) => {
  return (
    <div>
      {props.show && (
        <Dialog title={'Please confirm'} onClose={props.closeAction}>
          {props.children}
        </Dialog>
      )}
    </div>
  );
};

export default ModalWrapper;
