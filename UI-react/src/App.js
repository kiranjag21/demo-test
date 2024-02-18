import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStr, setSearchStr] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      setIsLoading(false);
      setData(response.data)
    });
  }, [])

  const saveData = () => {
    setIsLoading(true);
    axios.post('http://localhost:3000/user/saveUsers', data).then(response => {
      alert('data saved!')
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
      alert('An error occured, server is not running')
    });
  }

  const getStringSorter = (a, b, key) => {
    const nameA = a[key].toUpperCase(); 
    const nameB = b[key].toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    return 0;
  }
  
  const columns = [
    {
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => getStringSorter(a, b, 'title'),
    },
    {
      title: 'Description',
      dataIndex: 'body',
      key: 'body',
      sorter: (a, b) => getStringSorter(a, b, 'body'),
    },
  ];

  const filteredData = data.filter(d =>  d.title.toLowerCase().includes(searchStr) || d.body.toLowerCase().includes(searchStr))

  return (
    <div className="App" style={{ padding: '30px'}}>
      <h1>Demo application to show user data in table format</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
        <Input  style={{ width: '30%'}} className='border-radius-6' value={searchStr} onChange={e => setSearchStr(e.target.value)} type='text' placeholder='search'/>
        <Button type="primary" onClick={saveData}>Submit data</Button>  
      </div>
      <Table sorting={true} loading={isLoading} columns={columns} dataSource={filteredData} />
    </div>
  );
}

export default App;
