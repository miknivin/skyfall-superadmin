import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';


const AcceptRequestDialog = ({
  open,
  handler,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    handler(); // Close dialog after confirming
  };

  return (
    <Dialog open={open} handler={handler}>
      <DialogHeader>Confirm Request Acceptance</DialogHeader>
      <DialogBody>Are you sure you want to accept this request?</DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handler} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleConfirm}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AcceptRequestDialog;