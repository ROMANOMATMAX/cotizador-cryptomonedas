import React, {Fragment, useState} from 'react';
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`
const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

//Creamos una funcion con el nombre de nuestro hook
const useMoneda = (label, stateInicial, opciones) => {
    //Lo que este aqui es el state
    const [state, actualizarState] = useState(stateInicial)
    const Seleccionar = () => ( //Lo que estaq aqui dentro es lo que se mostrara en pantalla 
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">--Seleccione--</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    )
    //Retornar state | interfaz | funcion que modifica state como arreglo
    return [state, Seleccionar, actualizarState]
}

export default useMoneda;