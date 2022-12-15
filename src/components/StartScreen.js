import './StartScreen.css'

const startScreen = ({startGame}) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique no botao para começar a jogar</p>
        <button onClick={startGame}  >Começar o jogo</button>
    </div>
  )
}

export default startScreen