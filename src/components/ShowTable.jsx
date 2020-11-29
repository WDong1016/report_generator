import React, { Component } from 'react'

export default class ShowTable extends Component {

    render() {
        let data = this.props.data;
        // console.log(data[0])

        const showTitle = () => {
            if (data[0]) {
                let title = [], idx = 0
                Object.keys(data[0]).forEach(key => {
                    console.log(key)
                    title[idx] = (<th scope="col">{key}</th>)
                    idx++
                })
                return title
            }
        }

        const showBody = () => {
            if (data[0]) {
                let body = [], idx = 0
                for (let rows in data) {
                    console.log(data[rows])
                    let tmp = [], cidx = 0
                    for (let cols in data[rows]) {
                        console.log(data[rows][cols])
                        tmp[cidx] = (<td>{data[rows][cols]}</td>)
                        cidx++
                    }
                    console.log(tmp)
                    body[idx] = (<tr>{tmp}</tr>)
                    idx++
                }
                console.log(body)
                return body
            }
        }


        // console.log(showTitle)
        return (
            <div>
                {/* Title
                {this.props.data[0].map((val) =>{
                    return (
                        <td>{val}</td>
                    )
                }
                )} */}
                <table className="table table-striped table-bordered table-hover table-sm">
                    <thead className="thead-light">
                        <tr>
                            {showTitle()}
                        </tr>
                    </thead>
                    <tbody>
                        {showBody()}
                    </tbody>
                </table>

                {/* {data?data:""} */}
            </div>
        )
    }
}
