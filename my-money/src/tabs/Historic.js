import React, {
    useEffect,
    useState,
    useReducer
} from 'react'
import Rest from '../rest'

const baseURL = 'https://mymoney-71935.firebaseio.com/'
const {
    useGet,
    usePost,
    useDelete
} = Rest(baseURL)

const Historic = () => {
    const [data, setData] = useGet('mes/2020-01')

    if (data.loading) {
        return (
            <div class="d-flex justify-content-center" style={{ height: "100%", backgroundColor: "#5b7ab9" }}>
                <div class="spinner-border text-light" style={{ marginTop: "25%", width: "5em", height: "5em" }} role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="header-tabs">
                <div style={{ color: "white", textAlign: "center" }}>
                    <h1>Historic</h1>
                </div>
            </div>

            <div className="tres" style={{ width: "100%", height: "100%" }}>
                <div className="resize-calendar" style={{ marginLeft: "5%" }}>
                    <br />
                    <div>
                        <table style={{ table: "fixed" }} className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Mês</th>
                                    <th>Valor</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.data &&
                                    Object
                                        .keys(data.data)
                                        .map(mes => {
                                            return (
                                                <tr key={mes}>
                                                    <td>2020-01</td>
                                                    <td>{data.data[mes].dia}</td>
                                                    <td>{data.data[mes].valor}</td>
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                    <br />
                </div>
            </div>
        </>
    )

}

export default Historic