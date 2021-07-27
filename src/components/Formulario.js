import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import Axios from 'axios';
import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
    //State del listado de cryptos
    const[listaCrypto, guardarCryptomonedas] = useState([])
    const[error, guardarError] = useState(false)
    //arreglo de monedas
    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
    ]
    //Utilizamos el hook useMoneda
    const [moneda, SelectMoneda] =  useMoneda('Elige tu moneda', '', MONEDAS);
    //Utilizar el hook useCryptomoneda
    const [cryptomoneda, SelectCrypto] = useCryptomoneda('Elige tu cryptomoneda', '', listaCrypto)
    //Utilizamos useEffect
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await Axios.get(url);
            guardarCryptomonedas(resultado.data.Data);
        }
        consultarAPI();

    }, [])

    //Cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();
         //validar  si ambos campos estan llenos
         if(moneda ==='' || cryptomoneda===''){
             guardarError(true);
             return;
         }
         //Pasar los datos al componente principal
         guardarError(false);
         guardarMoneda(moneda);
         guardarCriptomoneda(cryptomoneda)
    }

    return (  
        <form 
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="todos los campos son obligatorios"/>:null}
            <SelectMoneda/>
            <SelectCrypto/>
            <Boton
                type="submit"
                value="calcular"
            />
        </form>
    );
}
 
export default Formulario;