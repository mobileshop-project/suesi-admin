import React, { Component } from 'react'
import { Link, withRouter, NavLink } from 'react-router-dom';
import styled from 'styled-components'

const Nav = styled.div`
background-color: 'green';
font-weight: 'bold';
`
const activeMenu = {
    color: "white",
    backgroundColor: "DodgerBlue",

};

const activeCreateShopMenu = {
    color: "white",
    backgroundColor: "DodgerBlue",

};

class Menu extends Component {
    renderMenuBar() {
        return <div className="relative  flex justify-center h-12 w-full mt-2 ">
            {/* <div className="h-10 w-10 bg-gray-400 border-r-2 border-yellow-400"></div> */}
            <NavLink activeStyle={activeMenu} to="/approval" className="bg-yellow-200 h-12 px-4 w-auto flex items-center rounded-l-md hover:bg-blue-100 font-PoppinsMedium  "> Approval</NavLink>
            <NavLink activeStyle={activeMenu} to="/shopList" className="bg-yellow-200 h-12 px-4 w-auto flex items-center hover:bg-blue-100 font-PoppinsMedium     "> Shop list</NavLink>
            <NavLink activeStyle={activeMenu} to="/userList" className="bg-yellow-200 h-12 px-4 w-auto flex items-center rounded-r-md hover:bg-blue-100 font-PoppinsMedium  "> User list</NavLink>
            <NavLink activeStyle={activeCreateShopMenu} to="/createOfficialAccount" className="bg-green-400 h-12 px-2 w-auto flex items-center rounded-full hover:bg-yellow-300 font-PoppinsMedium ml-4 ">+ Official shop</NavLink>
        </div >

    }


    render() {
        return (
            <div>
                {this.renderMenuBar()}
            </div>
        )
    }
}

export default withRouter(Menu);