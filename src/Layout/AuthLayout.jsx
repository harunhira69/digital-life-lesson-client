import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar/Navbar';
import Footer from '../Component/Footer/Footer';


const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>


        </div>
    );
};

export default AuthLayout;