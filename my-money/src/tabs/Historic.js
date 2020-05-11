import React, {
    useEffect,
    useState,
    useReducer
} from 'react'
import Rest from '../rest'

const baseURL = 'https://mymoney-71935.firebaseio.com/'
const {
    useGet,
} = Rest(baseURL)

const Historic = () => {
    const data = useGet('mes')
    const [currentMonth, setCurrentMonth] = useState()

    var formatterReal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

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

            <div className="img_background" style={{ width: "100%", height: "100%" }}>
                <div className="resize-calendar" style={{ marginLeft: "5%" }}>
                    <form className="align-labels">
                        <div class="form-row justify-content-center">
                            <div class="form-group col-md-3">
                                <label for="inputCity">Select month:</label>
                                <select className='custom-select mr-sm-2 input-color' id='inputMonth' onChange={e => { setCurrentMonth(e.target.value) }}>
                                    <option selected>...</option>
                                    {
                                        Object
                                            .keys(data.data)
                                            .map(mes =>
                                                <option value={mes} key={mes}>
                                                    {mes}
                                                </option>
                                            )
                                    }
                                </select>
                            </div>
                        </div>
                    </form>

                    {currentMonth && currentMonth !== '...' &&
                        <div>
                            <table style={{ table: "fixed" }} className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Operation</th>
                                        <th>Quantity</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object
                                            .keys(data.data[currentMonth])
                                            .map(dia => {
                                                return (
                                                    Object
                                                        .keys(data.data[currentMonth][dia])
                                                        .map(key => {
                                                            return (
                                                                <tr key={dia}>
                                                                    <td>{dia}</td>
                                                                    <td>{data.data[currentMonth][dia][key].operacao}</td>
                                                                    <td>{formatterReal.format(data.data[currentMonth][dia][key].quantidade)}</td>
                                                                    <td>{data.data[currentMonth][dia][key].horario}</td>
                                                                </tr>
                                                            )
                                                        })
                                                )
                                            })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                    <br />
                </div>
            </div>
        </>
    )

}

export default Historic