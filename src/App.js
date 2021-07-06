import React, { useState, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TableFooter } from '@material-ui/core';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
});

export default function App() {
  const classes = useStyles();

  const [data, setData] = useState(initialStateData);
  const [calle1Origen, setCalle1Origen] = useState('')
  const [calle2Origen, setCalle2Origen] = useState('')
  
  
  const onPress = useCallback(document.onkeypress = (e) => {
    if( e.key == 'Enter' ) { 
      sort();
      return;
    }

    for ( let item of data ) {
      if( !(item.disco && item.disco.trim()) ){
        return;
      }
    }
    const dateTransferObject = [ ...data, { 
      disco: '',
      calle1: '',
      calle2: '',
      distancia: ''
    }];

    setData( dateTransferObject );
  })

  const onChange = ( { target }, i ) => {
    let changedData = {...data[i]};
    let dateTransferObject = [...data]
    changedData = {
      ...changedData,
      [ target.name ]: target.value 
    }

    dateTransferObject[i] = changedData
    console.log(changedData);

    setData( dateTransferObject );

  }
  


  const sort = () => {
    let transferObject = [ ...data ];

    for( let item of transferObject ) {
      let distanciaEjeX = ( Number(item.calle1) > Number(calle1Origen)  ) 
        ? Number(item.calle1) - Number(calle1Origen) 
        : Number(calle1Origen) - Number(item.calle1)
      ;
      
      let distanciaEjeY = ( Number(item.calle2) > Number(calle2Origen)  ) 
        ? Number(item.calle2) - Number(calle2Origen) 
        : Number(calle2Origen) - Number(item.calle2)
      ;
      

      if( item.calle1 && item.calle2 ){
        item.distancia = distanciaEjeX + distanciaEjeY;
      }
    }

    transferObject = transferObject.sort(function(a, b)  {
      if (a.distancia < b.distancia) {return -1;}
      if (a.distancia > b.distancia) {return 1;}
    })

    const completos = transferObject.filter( a => a.distancia );
    const incompletos = transferObject.filter( a => !a.distancia );
    
    transferObject = [ ...completos, ...incompletos ];


    setData( transferObject );
  }
  

  const clear = () => {
    setData( initialStateData );
    setCalle1Origen('');
    setCalle2Origen('');
  }

  return (
    <>
      <TableContainer component={Paper} onKeyPress={ onPress }>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Disco</StyledTableCell>
              <StyledTableCell align="left"> <input type="number" autofocus value={ calle1Origen } placeHolder="Calle A" onChange={ (e) => setCalle1Origen( e.target.value ) }  /> </StyledTableCell>
              <StyledTableCell align="left"> <input type="number" value={ calle2Origen } placeHolder="Calle B" onChange={ (e) => setCalle2Origen( e.target.value ) }  /> </StyledTableCell>
              <StyledTableCell align="left">Distancia</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(( row, i ) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left"><input placeHolder="Disco" name='disco' onChange={ (e) => onChange(e, i) } value={ row.disco } /></StyledTableCell>
                <StyledTableCell align="left"><input type="number" placeHolder="Calle 1" name='calle1' onChange={ (e) => onChange(e, i) } value={ row.calle1 } /></StyledTableCell>
                <StyledTableCell align="left" ><input type="number" placeHolder="Calle 2" name='calle2' onChange={ (e) => onChange(e, i) } value={ row.calle2 } /></StyledTableCell>
                <StyledTableCell align="left" style={{ color: 'red', fontSize: '2rem'}}> { row.distancia }</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button className='btn btn-primary m-3' variant="contained" color="primary" disableElevation onClick={ sort }>
        Ordenar
      </button>
      <button className='btn btn-primary m-3 ' variant="contained" color="primary" disableElevation onClick={ clear }>
        Limpiar
      </button>
    </>
  );
}



const initialStateData = [
  {
    disco: '',
    calle1: '',
    calle2: '',
    distancia: ''
  },
  {
    disco: '',
    calle1: '',
    calle2: '',
    distancia: ''
  },
  {
    disco: '',
    calle1: '',
    calle2: '',
    distancia: ''
  },
  {
    disco: '',
    calle1: '',
    calle2: '',
    distancia: ''
  },
  {
    disco: '',
    calle1: '',
    calle2: '',
    distancia: ''
  },
  {
    disco: '',
    calle1: '',
    calle2: '',
    distancia: ''
  },


]