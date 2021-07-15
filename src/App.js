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
  const [selectedElement, setSelectedElement] = useState('');
  
  
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

  const onKeyPress = useCallback(document.onkeydown = (e) => {
    if( e.keyCode == 34 ) {
      nextElementFocus();
    } else if( e.keyCode == 35 ) {
      clear();
    }
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


  const nextElementFocus = () => {
    if( !selectedElement ){
      document.getElementById('calleA').focus();
      setSelectedElement('calleA')
    } else if ( selectedElement == 'calleA' ) {
      document.getElementById('calleB').focus();
      setSelectedElement('calleB')
    } else if( selectedElement == 'calleB') {
      document.getElementById('disco-0').focus();
      setSelectedElement('disco-0')
    } else if( selectedElement.includes('disco-')) {
      const index = selectedElement.replace('disco-', '');
      console.log(index);
      document.getElementById(`calle1-${index}`).focus();
      setSelectedElement(`calle1-${index}`); 
    } else if ( selectedElement.includes('calle1-') ) {
      const index = selectedElement.replace('calle1-', '');
      document.getElementById(`calle2-${index}`).focus();
      setSelectedElement(`calle2-${index}`); 
    } else if( selectedElement.includes('calle2-') ) {
      let index = selectedElement.replace('calle2-', '');
      index = Number(index);
      index = index + 1;

      if( !!!document.getElementById(`disco-${ index }`) ) {
        return;
      }
      document.getElementById(`disco-${ index }`).focus();
      setSelectedElement(`disco-${ index }`)
    }
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


  const onFocus = ( id ) => {
    setSelectedElement( id );
  }



  return (
    <>
      <TableContainer component={Paper} onKeyPress={ onPress }>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Disco</StyledTableCell>
              <StyledTableCell align="left"> <input type="number" id="calleA" value={ calle1Origen } placeHolder="Calle A" onChange={ (e) => setCalle1Origen( e.target.value ) }  /> </StyledTableCell>
              <StyledTableCell align="left"> <input type="number" id="calleB" value={ calle2Origen } placeHolder="Calle B" onChange={ (e) => setCalle2Origen( e.target.value ) }  /> </StyledTableCell>
              <StyledTableCell align="left">Distancia</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(( row, i ) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left"><input onFocus={() => onFocus( 'disco-' + i.toString()) } placeHolder="Disco" id={ 'disco-' + i.toString() } name='disco' onChange={ (e) => onChange(e, i) } value={ row.disco } /></StyledTableCell>
                <StyledTableCell align="left"><input onFocus={() => onFocus( 'calle1-' + i.toString()) }  type="number" id={ 'calle1-' + i.toString() } placeHolder="Calle 1" name='calle1' onChange={ (e) => onChange(e, i) } value={ row.calle1 } /></StyledTableCell>
                <StyledTableCell align="left" ><input onFocus={() => onFocus( 'calle2-' + i.toString()) }  type="number" id={ 'calle2-' + i.toString() } placeHolder="Calle 2" name='calle2' onChange={ (e) => onChange(e, i) } value={ row.calle2 } /></StyledTableCell>
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