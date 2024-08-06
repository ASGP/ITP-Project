import React from 'react';
import "../CouponManagement/side.css";

function Sidebar(){
    return(
        <div>
            <section id="sidebar">
                    <br/><img className='brandLogo' src={require('./img/cpetcoLogo.png')} alt='logo'/><br/><br/>
                    <span className="brand">Artifacts</span>
                    <ul className="side-menu top">
                        <li>
                            <a href={"/Dashboard"} menu-item='menu-item'>
                                <i className='bx bxs-dashboard' ></i>
                                <span className="text">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <a href="/EmployeeList" menu-item='menu-item'>
                                <i className='bx bx-user'></i>
                                <span className="text">Coupon Management</span>
                            </a>
                        </li>
                        <li>
                            <a href="/add" menu-item='menu-item'>
                                <i className='bx bxs-analyse'></i>
                                <span className="text">Add Coupon</span>
                            </a>
                        </li>
                        <li>
                            <a href="/get" menu-item='menu-item'>
                            <i className='bx bx-user' ></i>
                                <span className="text">Orders</span>
                            </a>
                        </li>
                        <li>
                            <a href="/Backup" className='menu-item'>
                            <i className='bx bx-cloud bx-flip-horizontal' ></i>
                                <span className="text">Products</span>
                            </a>
                        </li>
                        <li>
                            <a href="/transaction" className='menu-item'>
                            <i className='bx bx-cloud bx-flip-horizontal' ></i>
                                <span className="text">Transactions</span>
                            </a>
                        </li>

                        <li>
                            <a href="/Dashboard" menu-item='menu-item'>
                                <i className='bx bx-exit'></i>
                                <span className="text">Logout</span>
                            </a>
                        </li>
                    </ul>
            </section>
        </div>
    )
}
export default Sidebar