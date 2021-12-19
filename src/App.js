import { useState } from 'react';
import axios from 'axios';
import './App.css';
import Table from './components/Table';
import Popup from './components/Popup';
import AddNew from './components/AddNew';
import useFetch from './hooks/useFetch';

function App() {
  const [res, setRes] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [inputData, setInputData] = useState({
    temperatureC: '',
    temperatureF: '',
    summary: '',
  });

  const tableData = useFetch('https://localhost:44331/weatherforecast');

  const handleEdit = (_id) => {
    const { id, temperatureC, temperatureF, summary } = tableData.find((t) => t.id === _id);
    setIsVisible(true);
    setInputData({
      id,
      temperatureC,
      temperatureF,
      summary,
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    setRes({ res: '' });
    setInputData({
      temperatureC: '',
      temperatureF: '',
      summary: '',
    });
  };

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...inputData };
    newData[input.name] = input.name === 'summary' ? input.value : Number.parseInt(input.value);
    setInputData(newData);
  };

  const handleSubmit = async (e) => {
    submit(e, 'put');
  };

  const handleAddNew = () => {
    setIsVisible(true);
  };

  const handleSubmitNew = (e) => {
    submit(e, 'post');
  };

  const submit = async (e, action) => {
    e.preventDefault();
    const date = new Date().toISOString();
    const newData = { ...inputData, date };
    if (newData.temperatureC === '' || newData.temperatureF === '' || newData.summary === '') {
      setRes('Not ok');
      return;
    }

    let response;
    switch (action) {
      case 'put':
        response = await axios.put('https://localhost:44331/weatherforecast/put', newData);
        break;
      case 'post':
        response = await axios.post('https://localhost:44331/weatherforecast/post', newData);
        break;
      default:
        setRes('Not ok');
        break;
    }
    setRes(response.data.res);
    setInputData({
      temperatureC: '',
      temperatureF: '',
      summary: '',
    });
  };

  return (
    <div className='container'>
      <AddNew
        handleClick={handleAddNew}
        isVisible={isVisible}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmitNew}
        response={res}
      />
      <Table tableData={tableData} handleEdit={handleEdit} />
      <Popup
        isVisible={isVisible}
        handleClose={handleClose}
        data={inputData}
        handleChange={handleChange}
        handleSumbit={handleSubmit}
        response={res}
      />
    </div>
  );
}

export default App;
