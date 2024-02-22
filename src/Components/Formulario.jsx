import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import { useEffect, useState } from 'react'
import Error from './Error'

const InputSubmit = styled.input`
  background-color:#9497FF;
  border: 3px;
  border-color: #9497FF;
  width: 100%;
  padding: 10px;
  margin-top: 30px;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 10px;
  transition: .4s ease;
  &:hover {
    background-color: #DDD;
    border: 3px;
    border-color: #9497FF;
    color: #9497FF;
    cursor: pointer;
  }
`

function Formulario({ setMonedas }) {

  const [ criptos, setCriptos] = useState([])
  const [ error, setError] = useState(false)

  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu Moneda', monedas)
  const [ criptomoneda, SelectCriptomoneda ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

      const response = await fetch(url)
      const result = await response.json()

      const arrayCriptos = result.Data.map( cripto => {
        const objeto = {
          id : cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })
      setCriptos(arrayCriptos)
    }

    consultarAPI();
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if([moneda, criptomoneda].includes('')){
      setError(true)
      return
    }

    setError(false)
    setMonedas({ moneda, criptomoneda })
  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit 
          type='submit' 
          value='Cotizar'
        />
      </form>
    </>
  )
}

export default Formulario
