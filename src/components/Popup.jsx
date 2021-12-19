import React from 'react';

const Popup = ({ isVisible, handleClose, data, handleChange, handleSumbit, response }) => {
  return (
    <>
      {isVisible ? (
        <div className='popup'>
          <div className='container'>
            <button onClick={handleClose} className='close'>
              x
            </button>
            <form>
              <input
                type='number'
                placeholder='temperature C'
                name='temperatureC'
                defaultValue={data !== null ? data.temperatureC : ''}
                onChange={handleChange}
              />
              <input
                type='number'
                placeholder='temperature F'
                name='temperatureF'
                defaultValue={data !== null ? data.temperatureF : ''}
                onChange={handleChange}
              />
              <input
                type='text'
                placeholder='summary'
                name='summary'
                defaultValue={data !== null ? data.summary : ''}
                onChange={handleChange}
              />
              <button onClick={handleSumbit} className='btn submit'>
                Submit
              </button>
              <div className='response'>
                {response === 'Ok' ? (
                  <p className='ok'>Success!</p>
                ) : response === 'Not ok' ? (
                  <p className='not-ok'>Failed</p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Popup;
