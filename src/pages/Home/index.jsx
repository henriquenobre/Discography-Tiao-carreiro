
export function Home() {
    return (
        <div>
            <div className="header">
                <img src="" alt="" />
                <h1>Discografia</h1>
            </div>
            <div className="search">
                <strong>Buscar Música ou Album</strong>
                <input type="text" />
                <button>Procurar</button>
            </div>
            <div>
                <h2>Albun Rei do Gado, 1961</h2>
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
                            <td>Rei do Gado</td>
                            <td>3:39</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Coração Sertanejo</td>
                            <td>2:55</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}