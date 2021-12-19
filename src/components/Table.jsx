import React from 'react';

const Table = ({ tableData, handleEdit }) => {
  const formatDate = (date) => {
    let d = new Date(date),
      month = d.getMonth(),
      day = d.getDate(),
      year = d.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Temperature C</th>
            <th>Temperature F</th>
            <th>Summary</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{formatDate(data.date)}</td>
              <td>{data.temperatureC}</td>
              <td>{data.temperatureF}</td>
              <td>{data.summary}</td>
              <td>
                <button onClick={() => handleEdit(data.id)} className='btn'>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
