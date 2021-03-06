import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as uploadActions from '../actions/uploadActions'
import XLSX from 'xlsx'

class UploadPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            CMData: {},
            CUData: {},
            CTData: {}
        }
    }
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
                        this.setState({ CMData: data })
                        break
                    case 'CU':
                        this.setState({ CUData: data })
                        break
                    case "CT":
                        this.setState({ CTData: data })
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
        if(files.length !== 0)
            fileReader.readAsBinaryString(files[0])
        //    console.log("Data before return:", data)
        //    return data;
    }

    onHandleCM = file => {
        this.importExcel(file, "CM")
        console.log("data in onHandleCM", this.state.CMData)
    }

    onHandleCU = file => {
        this.importExcel(file, "CU")
        console.log("data in onHandleCU", this.state.CUData)
    }

    onHandleCT = file => {
        this.importExcel(file, "CT")
        console.log("data in onHandleCT", this.state.CTData)
    }


    render() {
        return (
            <div>
                <h3>移动文件:</h3>
                <input type='file' accept='.xlsx, .xls' onChange={(e) => { this.onHandleCM(e) }} />
                { console.log("CMData:", this.state.CMData)}
                <h3>联通文件:</h3>
                <input type='file' accept='.xlsx, .xls' onChange={(e) => { this.onHandleCU(e) }} />
                { console.log("CUData:", this.state.CUData)}
                <h3>电信文件:</h3>
                <input type='file' accept='.xlsx, .xls' onChange={(e) => { this.onHandleCT(e) }} />
                { console.log("CTData:", this.state.CTData)}
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         CMData: state.CMData,
//         CUData: state.CUData,
//         CTData: state.CTData
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         uploadActions: bindActionCreators(uploadActions, dispatch)
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UploadPage)

export default UploadPage
