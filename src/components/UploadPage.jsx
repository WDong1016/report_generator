import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as uploadActions from '../actions/uploadActions'
import XLSX from 'xlsx'
import { createLogger } from 'redux-logger';
import ShowTable from './ShowTable'

export class UploadPage extends Component {
    importExcel(file, type) {
        console.log("importing...")
        // 获取上传的文件对象
        const { files } = file.target;
        // 通过FileReader对象读取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, { type: 'binary' });
                let data = []; // 存储获取到的数据
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        break; // 如果只取第一张表，就取消注释这行
                    }
                }
                switch (type) {
                    case 'CM':
                        this.props.onCM(data)
                        break
                    case 'CU':
                        this.props.onCU(data)
                        break
                    case "CT":
                        this.props.onCT(data)
                        break
                    default:
                        break
                }
                //return data;
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                console.log('文件类型不正确');
                return;
            }
        }
        // 以二进制方式打开文件

        console.log(files)
        if (files.length !== 0)
            fileReader.readAsBinaryString(files[0])
        //    console.log("Data before return:", data)
        //    return data;
    }

    onHandleCM = file => {
        this.importExcel(file, "CM")
        // console.log("data in onHandleCM", this.state.CMData)
    }

    onHandleCU = file => {
        this.importExcel(file, "CU")
        // console.log("data in onHandleCU", this.state.CUData)
    }

    onHandleCT = file => {
        this.importExcel(file, "CT")
        // console.log("data in onHandleCT", this.state.CTData)
    }


    render() {
        console.log(this.props.upload)
        const { CMData, CUData, CTData } = this.props.upload;
        console.log(CMData)
        return (
            <div>
                {/* <h4>CM: </h4> 

                 <h4>CU: </h4> 
                 <h4>CT: </h4>  */}
                {/* <h4>CU:{CUData}</h4>
                <h4>CT:{CTData}</h4> */}
                <h3>移动文件:</h3>
                <div class="input-group mb-3">
                    {/* <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div> */}
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile01"
                        accept='.xlsx, .xls' onChange={(e) => { this.onHandleCM(e) }}
                        aria-describedby="inputGroupFileAddon01" />
                        <label class="custom-file-label" for="inputGroupFile01">选择文件</label>
                    </div>
                </div>
                <ShowTable data={CMData} />

                {console.log("CMData:", CMData)}
                <h3>联通文件:</h3>
                <div class="input-group mb-3">
                    {/* <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div> */}
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile02"
                        accept='.xlsx, .xls' onChange={(e) => { this.onHandleCU(e) }}
                        aria-describedby="inputGroupFileAddon02" />
                        <label class="custom-file-label" for="inputGroupFile02">选择文件</label>
                    </div>
                </div>
                <ShowTable data={CUData} />
                {console.log("CUData:", CUData)}
                <h3>电信文件:</h3>
                <div class="input-group mb-3">
                    {/* <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                    </div> */}
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile03"
                        accept='.xlsx, .xls' onChange={(e) => { this.onHandleCT(e) }}
                        aria-describedby="inputGroupFileAddon03" />
                        <label class="custom-file-label" for="inputGroupFile03">选择文件</label>
                    </div>
                </div>
                <ShowTable data={CTData} />
                {console.log("CTData:", CTData)}

                {/* <button type="button" className="btn btn-primary ml-1" onClick={this.onHandleCM}>CM</button>
                <button type="button" className="btn btn-secondary ml-1" onClick={this.onHandleCU}>CU</button>
                <button type="button" className="btn btn-success ml-1" onClick={this.onHandleCT}>CT</button> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        upload: state.upload
    }
}

const mapDispatchToProps = (dispatch) => ({
    // uploadActions: bindActionCreators(uploadActions, dispatch)
    onCM: (data) => dispatch(uploadActions.onCM(data)),
    onCU: (data) => dispatch(uploadActions.onCU(data)),
    onCT: (data) => dispatch(uploadActions.onCT(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadPage)
