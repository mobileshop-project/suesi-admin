import api from "./api";
import React, { Component } from 'react'

class ApprovalService {
    sendApprove(data) {
        var formData = new FormData();
        const ApprovalInfo = JSON.stringify(data);
        formData.append("considerSellerForm", ApprovalInfo)
        return api.post("admin/considerSeller", formData)
    }
}
export default new ApprovalService()