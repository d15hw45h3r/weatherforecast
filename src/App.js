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
    setRes('');
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    if (
      inputData.temperatureC === '' ||
      inputData.temperatureF === '' ||
      inputData.summary === ''
    ) {
      setRes('Not ok');
    } else {
      submit('put');
    }
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    if (
      inputData.temperatureC === '' ||
      inputData.temperatureF === '' ||
      inputData.summary === ''
    ) {
      setRes('Not ok');
    } else {
      submit('post');
    }
  };

  const handleAddNew = () => {
    setIsVisible(true);
  };

  const submit = async (action) => {
    const date = new Date().toISOString();
    const newData = { ...inputData, date };
    let response;
    if (action === 'put') {
      response = await axios.put('https://localhost:44331/weatherforecast/put', newData);
    } else if (action === 'post') {
      response = await axios.post('https://localhost:44331/weatherforecast/post', newData);
    }
    setRes(response.data.res);
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
        handleSumbit={handleSubmitEdit}
        response={res}
      />
    </div>
  );
}

export default App;
