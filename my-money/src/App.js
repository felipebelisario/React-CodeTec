import React, {
    useEffect,
    useState,
    useReducer
} from 'react'
import Rest from './rest'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const baseURL = 'https://mymoney-71935.firebaseio.com/'
const {
    useGet,
    usePost,
    useDelete
} = Rest(baseURL)

function App() {
    const data = useGet('movimentacoes')
    const [postData, post] = usePost('movimentacoes/2020-04')
    const [deleteData, remove] = useDelete()
    const [btn, setBtn] = useState(false)

    const salvar = () => {
        post({
            valor: 10,
            descricao: 'ola'
        })
    }

    const remover = () => {
        remove('movimentacoes/2020-04/-M6-hV-ETYC0dcs9Hxpa')
    }


    return (
        <div class="wrapper">

            <nav id="sidebar">
                <div id="dismiss">
                    <i class="fas fa-arrow-left"></i>
                </div>

                <div style={{ textAlign: "center" }} class="sidebar-header">
                    <h3>
                        <img style={{ width: 120, height: 100 }} src="https://imagepng.org/wp-content/uploads/2019/05/dinheiro-icone.png" alt="img" /> <br />
                        My Money
                    </h3>
                </div>

                <ul class="list-unstyled components">
                    <p>Bem vindo!</p>
                    <li class="active">
                        <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Home</a>
                    </li>
                    <li>
                        <a href="#">About</a>
                        <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
                    </li>
                    <li>
                        <a href="#">Portfolio</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </nav>


            <div style={{ display: "flex", backgroundColor: "#b0c0e0", flexDirection: "column", maxWidth: "100%" }}>

                <div className="header-tabs">
                    <div style={{ color: "white", textAlign: "center" }}>
                        <h1>Calendar</h1>
                    </div>
                </div>

                <div className="container">
                    <br />
                    <FullCalendar style={{ width: 30 }}
                        defaultView="dayGridMonth"
                        plugins={[dayGridPlugin]}
                        weekends={true}
                        events={[
                            { title: 'event 1', date: '2020-04-30' },
                            { title: '+ R$ 400000,00', date: '2020-04-29' }
                        ]}
                    />

                    <br />
                </div>



            </div>


        </div >
    )
}

export default App