import React, { useState} from "react";




function App() {

//ESTILOS
const tabu={
  display:'flex',
  flexDirection:'column',
}

const tabuLinha={
  display:'flex',
  flexDirection:'row',
}

const casa={
  width: 100,
  height:100,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row',
  cursor:'pointer',
  fontSize:60,
  border: '1px solid #000'
}

const jogarNovamente={
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  marginTop:'50px',
  padding:'5px',
  backgroundColor:'green',
}

const jogoInicial=[['','',''],['','',''],['','','']]
const [jogo, setJogo]=useState([['','',''],['','',''],['','','']])
const [simboloAtual, setSimboloAtual]=useState('x')
const [jogando, setJogando]=useState(true) 

const tabuleiro=(j)=>{
  return(
    <div style={tabu}>
      <div style={tabuLinha}>
      <div style={casa} data-pos='00' onClick={(e)=>jogar(e)}>{j[0][0]}</div>
      <div style={casa} data-pos='01' onClick={(e)=>jogar(e)}>{j[0][1]}</div>
      <div style={casa} data-pos='02' onClick={(e)=>jogar(e)}>{j[0][2]}</div>
      </div>
      <div style={tabuLinha}>
      <div style={casa} data-pos='10' onClick={(e)=>jogar(e)}>{j[1][0]}</div>
      <div style={casa} data-pos='11' onClick={(e)=>jogar(e)}>{j[1][1]}</div>
      <div style={casa} data-pos='12' onClick={(e)=>jogar(e)}>{j[1][2]}</div>
      </div>
      <div style={tabuLinha}>
      <div style={casa} data-pos='20' onClick={(e)=>jogar(e)}>{j[2][0]}</div>
      <div style={casa} data-pos='21' onClick={(e)=>jogar(e)}>{j[2][1]}</div>
      <div style={casa} data-pos='22' onClick={(e)=>jogar(e)}>{j[2][2]}</div>
      </div>
    </div>
  )
}

const BtnJogarNovamente=()=>{
  if(!jogando){
    return <button style={jogarNovamente} onClick={()=>reiniciar()}>Jogar novamente</button>
  }
}

const verificarVitoria=()=>{
  // LINHAS
  let pontos = 0
  let vitoria = false
  
  for(let l=0;l<3;l++){
    pontos=0
    for(let c=0;c<3; c++){
      if(jogo[l][c]==simboloAtual){
        pontos++
      }
    }
    if(pontos >=3){
      vitoria=true
      break
    }
  }

  // COLUNAS
  for(let c=0; c<3; c++){
    pontos=0
    for(let l=0; l<3; l++){
      if (jogo[l][c]==simboloAtual){
        pontos++
      }
    }
    if(pontos >=3){
      vitoria=true
      break
    }
  }

  //DIAGONAIS
  pontos= 0
  for(let d=0; d<3; d++){
    if(jogo[d][d] == simboloAtual){
        pontos++
    }
  }
  if(pontos >=3){
    vitoria=true
  }
  pontos=0
  let l=0
  for(let c=2; c>=0; c--){
    if(jogo[l][c]==simboloAtual){
      pontos++
    }
    l++
  }
  if(pontos >=3){
    vitoria=true
  }
  return vitoria


}  


const trocarJogador=()=>{
  simboloAtual=="x" ? setSimboloAtual('o') : setSimboloAtual('x')
}

const retPos=(e)=>{
  const p = e.target.getAttribute('data-pos')
  const pos= [parseInt(p.substring(0,1)), parseInt(p.substring(1,2))] 
  return pos
}

const verificaEspacoVazio=(e)=>{
  if(jogo[retPos(e)[0]] [retPos(e)[1]] == ''){
    return true
  }else{
    return false
  }
}

let verificaVelha=(j)=>{
  let contador = 0
  let velha = false
  j[0].forEach((e)=>{
    if(e != ''){
      contador++
    }
  })
  j[1].forEach((e)=>{
    if(e != ''){
      contador++
    }
  })
  j[2].forEach((e)=>{
    if(e != ''){
      contador++
    }
  })
  if (contador>=9) {
    velha = true
  }
  return velha
}


const jogar=(e)=>{
  if(jogando){
    if(verificaEspacoVazio(e)){
      jogo[retPos(e)[0]] [retPos(e)[1]] = simboloAtual
      trocarJogador()
      if(verificarVitoria()){
        trocarJogador()
        setJogando(false)
        setTimeout(() => {alert('Parabéns, o jogador ' + simboloAtual.toUpperCase() + ' venceu!')
        }, 200);
      }else
        if(verificaVelha(jogo)){
          setTimeout(() => { alert('O jogo deu velha!')
        }, 200);
         
          setJogando(false)

        }
      }else{
        alert('espaço inválido')
      }
  }
}

const reiniciar=()=>{
  setJogando(true)
  setJogo(jogoInicial)
  setSimboloAtual('x')
}




return (
  <>
  <div>Quem joga: {simboloAtual.toUpperCase()}</div><br></br>
  <div>{tabuleiro(jogo)}</div>
  <div>{BtnJogarNovamente()}</div>
    
  </>
)
    
}

export default App;
