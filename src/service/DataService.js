import api from "./api";
import React, { Component } from 'react'
import axios from "axios";

class DataService {
    fetchShopData() {
        return api.get("shop")
    }

    fetchUserData() {
        return api.get("user")
    }
}
export default new DataService()