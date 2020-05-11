import React, {
    useEffect,
    useState
} from 'react'
import Rest from '../rest'
import CurrencyInput from 'react-currency-input'
import { firebaseDatabase } from '../utils/FirebaseUtils'

const baseURL = 'https://mymoney-71935.firebaseio.com/'
const { useGet } = Rest(baseURL)

const Home = () => {
    const saldo = useGet('saldo')
    const [showSaldo, setShowSaldo] = useState()
    const [form, setForm] = useState({})
    const today = new Date()

    var formatterReal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    useEffect(() => {
        setShowSaldo(saldo.data)
    }, [saldo])

    const handleChange = field => (event, maskedvalue, floatvalue) => {
        setForm({
            ...form,
            [field]: maskedvalue
        })
    }

    const calculaNewSaldo = () => {
        var newSaldo = form.operation === '+' ? (saldo.data + form.quantity) : (saldo.data - form.quantity)

        if (newSaldo < 0) window.alert("Saldo insuficiente para a quantidade solicitada!")
        else return newSaldo
    }

    function writeUserData() {
        var dateList = form.date.split("-")
        var day = dateList.pop()
        var newSaldo = calculaNewSaldo()

        if (newSaldo) {
            firebaseDatabase.ref().update({
                saldo: newSaldo
            }).then(() => {
                firebaseDatabase.ref('mes/' + dateList.join("-") + "/" + day).push({
                    horario: form.time,
                    operacao: form.operation === '+' ? "+" : "-",
                    quantidade: form.quantity
                }).then(() => {
                    setShowSaldo(newSaldo)
                })
            })
        }

    }

    const dataVerification = async () => {
        if (!form.date || !form.time || !form.operation || !form.quantity || form.operation === "Selecione...") {
            window.alert("Favor, preencha todos os campos!")
        } else {
            writeUserData()
        }
    }

    if (saldo.loading) {
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
                    <h1>Adicionar/Remover dinheiro</h1>
                </div>
            </div>

            <div className="img_background" style={{ width: "100%", height: "100%" }}>
                <div className="resize-calendar" style={{ marginLeft: "5%" }}>
                    <br />
                    <br />
                    <h1 style={{ fontSize: "3em" }}>
                        Saldo atual: <span style={{ fontWeight: "bold" }}>{formatterReal.format(showSaldo)}</span>
                    </h1>

                    <form className="align-labels">
                        <div class="form-row align-items-end">
                            <div class="form-group col-md-3">
                                <label for="inputCity">Date</label>
                                <input
                                    className="form-control"
                                    type="date"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value.toString() })}
                                />
                            </div>
                            <div class="form-group col-md-3">
                                <button type="button" onClick={() => setForm({
                                    ...form,
                                    date: (today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)) +
                                        '-' + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate())).toString()
                                }
                                )}
                                    className="btn btn-primary form-control" >Get Current Date</button>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="inputState">Time</label>
                                <input
                                    className="form-control"
                                    type="time"
                                    value={form.time}
                                    onChange={e => { setForm({ ...form, time: e.target.value }) }}
                                />
                            </div>
                            <div class="form-group col-md-3">
                                <button type="button" onClick={() => {
                                    setForm({
                                        ...form,
                                        time: (today.getHours() < 10 ? '0' + today.getHours() : today.getHours())
                                            + ":" + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())
                                    })
                                }}
                                    className="btn btn-primary form-control" >Get Current Time</button>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-3">
                                <label for="inputEmail4">Operation</label>
                                <select type="select" class="form-control" onChange={e => { setForm({ ...form, operation: e.target.value }) }}>
                                    <option selected>Selecione...</option>
                                    <option key="+" value="+">+</option>
                                    <option key="-" value="-">-</option>
                                </select>
                            </div>
                            <div class="form-group col-md-9">
                                <label for="inputQuantity2">Quantity</label>
                                <CurrencyInput prefix='R$' onChange={handleChange('quantity')} value={form.quantity} className='form-control input-color' id='inputQuantity' />
                            </div>
                        </div>
                    </form>

                    <button style={{ marginTop: "2%", fontSize: "2em", width: "9em", height: "4em" }}
                        type="button" className="btn btn-primary" onClick={dataVerification} >Registrar movimentação</button>
                </div>
            </div>
        </>
    )
}

export default Home