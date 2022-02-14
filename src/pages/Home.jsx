import logoImg from '../assets/images/logoTiao.png'

import '../styles/home.css'

export function Home() {
    return (
        <div className='containerHome'>
            <div className="backgroundTransparent">
                <div className="header">
                    <img src={logoImg} alt="" />
                    <h1>Discografia</h1>
                </div>
                <div className="search">
                    <strong>Buscar Música ou Album</strong>
                    <div className="searchFlex">
                        <input type="text" />
                        <button>Procurar</button>
                    </div>
                </div>
                <div>
                    <h2>Album Rei do Gado, 1961</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Faixa</th>
                                <th>Duração</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Alma de boêmio</td>
                                <td>3:15</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Borboleta do asfalto</td>
                                <td>2:59</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Punhal da falsidade</td>
                                <td>3:08</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}