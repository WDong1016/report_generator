import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import * as uploadActions from '../actions/uploadActions'
import XLSX from 'xlsx'

async function importExcel(file) {
    console.log("importing...")
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    var data = []; // 存储获取到的数据
    fileReader.onload = event => {
        try {
            const { result } = event.target;
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(result, { type: 'binary' });
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break; // 如果只取第一张表，就取消注释这行
                }
            }
            console.log("FileRead", data);
            //return data;
        } catch (e) {
            // 这里可以抛出文件类型错误不正确的相关提示
            console.log('文件类型不正确');
            return;
        }
    }
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0])
    console.log("Data before return:", data)
    //    return data;
}

async function onHandleCM(file) {

    await importExcel(file)
    console.log("data in onHandleCM", this.props.CMData)
}




class UploadPage extends Component {
    // constructor(props) {
    //     super(props)
    
    //     this.state = {
    //          CMData:{},
    //          CUData:{},
    //          CTData:{}
    //     }
    // }
    

    render() {
        return (
            <div>
                <h3>移动文件:</h3>
                <input type='file' accept='.xlsx, .xls' onChange={(e) => { onHandleCM(e) }} />
                <h3>联通文件:</h3>
                <input type='file' accept='.xlsx, .xls' onChange={(e) => { importExcel(e) }} />
                <h3>电信文件:</h3>
                <input type='file' accept='.xlsx, .xls' onChange={(e) => { importExcel(e) }} />
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        CMData: state.CMData,
        CUData: state.CUData,
        CTData: state.CTData
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        uploadActions: bindActionCreators(uploadActions, dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UploadPage)
