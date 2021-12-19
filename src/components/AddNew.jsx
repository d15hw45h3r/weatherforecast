import React from 'react';
import Popup from './Popup';

const AddNew = ({ handleClick, isVisible, handleChange, handleClose, handleSubmit, response }) => {
  return (
    <div className='add-new'>
      <button onClick={handleClick} className='btn'>
        Add new
      </button>
      <Popup
        isVisible={isVisible}
        data={null}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSumbit={handleSubmit}
        response={response}
      />
    </div>
  );
};

export default AddNew;
