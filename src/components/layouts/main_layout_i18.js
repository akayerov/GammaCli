import React from 'react';
import { Link } from 'react-router';
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';
// Sample layout 1  Header-Sider
// import MainLay from './main-layout1';
// Sample layout 2
import MainLay from './main-layout2';

// Using "Stateless Functional Components"
export default function (props) {
  return (
    <LocaleProvider locale={ruRU}>
      <div className='app'>
        <MainLay {...props}/>
      </div>
    </LocaleProvider>
  );
}
