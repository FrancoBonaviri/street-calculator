import React, { useState, useCallback } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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


const regex = /[^0-9 -]/g

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
    if( e.keyCode == 34 || e.keyCode == 39 || e.keyCode ==  107 ) {
      nextElementFocus();
    } else if( e.keyCode == 35 ) {
      clear();
    } else if( e.keyCode == 37  ) {
      prevElementFocus();
    } else if ( e.keyCode == 38) {
      upElementFocus();
    }
    else if ( e.keyCode == 40 ) {
      downElementFocus();
    }
  })

  const onChange = ( { target }, i ) => {
    let changedData = {...data[i]};
    let dateTransferObject = [...data]
    changedData = {
      ...changedData,
      [ target.name ]: target.value.replace(regex, '') 
    }

    dateTransferObject[i] = changedData
    setData( dateTransferObject );

  }


  const nextElementFocus = () => {
    if( !selectedElement ){
      let element = document.getElementById('calleA');
      if( !element ) { return; }
      element.focus();
      setSelectedElement('calleA')
    } else if ( selectedElement == 'calleA' ) {
      let element = document.getElementById('calleB');
      if( !element ) { return; }
      element.focus();
      setSelectedElement('calleB')
    } else if( selectedElement == 'calleB') {
      let element = document.getElementById('disco-0');
      if( !element ) { return; }
      element.focus();
      setSelectedElement('disco-0')
    } else if( selectedElement.includes('disco-')) {
      const index = selectedElement.replace('disco-', '');
      let element = document.getElementById(`calle1-${index}`);
      if( !element ) { return; }
      element.focus();
      setSelectedElement(`calle1-${index}`); 
    } else if ( selectedElement.includes('calle1-') ) {
      const index = selectedElement.replace('calle1-', '');
      let element = document.getElementById(`calle2-${index}`);
      if( !element ) { return; }
      element.focus();
      setSelectedElement(`calle2-${index}`); 
    } else if( selectedElement.includes('calle2-') ) {
      let index = selectedElement.replace('calle2-', '');
      index = Number(index);
      index = index + 1;
      if( !!!document.getElementById(`disco-${ index }`) ) {
        return;
      }
      let element = document.getElementById(`disco-${ index }`);
      if( !element ) { return; }
      element.focus();
      setSelectedElement(`disco-${ index }`)
    }
  }

  const prevElementFocus = () =>  {
    if( !selectedElement || selectedElement == 'calleA' ){
      return;
    } else if( selectedElement == 'calleB') {
      let element = document.getElementById('calleA');
      if( ! element ) { return; }
      element.focus();
      setSelectedElement('calleA')
    } else if( selectedElement.includes('disco-')) {
      const index = selectedElement.replace('disco-', '');

      if( index == 0 ) {
        let element = document.getElementById('calleB');
        if( ! element ) { return; }
        element.focus();
        setSelectedElement('calleB')
        return;
      } else {  
        let element =  document.getElementById(`calle2-${Number(index) - 1}`);
        if( ! element ) { return; }
        element.focus();
        setSelectedElement(`calle2-${Number(index) - 1}`); 
      }

    } else if ( selectedElement.includes('calle1-') ) {
      const index = selectedElement.replace('calle1-', '');
      let element = document.getElementById(`disco-${index}`);
      if( ! element ) { return; }
      element.focus();
      setSelectedElement(`disco-${index}`); 
    } else if( selectedElement.includes('calle2-') ) {
      let index = selectedElement.replace('calle2-', '');
      let element = document.getElementById(`calle1-${ index }`);
      if( ! element ) { return; }
      element.focus();
      setSelectedElement(`calle1-${ index }`)
    }
  }
  

  const upElementFocus = () => {
    if( !selectedElement || selectedElement == 'calleA' || selectedElement == 'calleB' || selectedElement == 'disco-0' ) {
      return;
    }
    if( selectedElement.includes('disco-')) {
      const index = selectedElement.replace('disco-', '');
      let element = document.getElementById(`disco-${Number(index) - 1}`);
      if( !element ) { return ;}
      element.focus();
      setSelectedElement(`disco-${Number(index) - 1}`); 
      return;
    }
    if( selectedElement.includes('calle1-')) {
      const index = selectedElement.replace('calle1-', '');

      if( index == 0 ) {
        let element = document.getElementById('calleA');
        if( !element ) { return ;}
        element.focus();
        setSelectedElement('calleA')
        return;
      } 

      let element = document.getElementById(`calle1-${Number(index) - 1}`);
      if( !element ) { return ;}
      element.focus();
      setSelectedElement(`calle1-${Number(index) - 1}`); 
      return;
    }
    if( selectedElement.includes('calle2-')) {
      const index = selectedElement.replace('calle2-', '');

      if( index == 0 ) {
        let element = document.getElementById('calleB');
        if( !element ) { return ;}
        element.focus();
        setSelectedElement('calleB')
        return;
      } 
      
      let element = document.getElementById(`calle2-${Number(index) - 1}`);
      if( !element ) { return ;}
      element.focus();
      setSelectedElement(`calle2-${Number(index) - 1}`); 
      return;
    }
  } 

  const downElementFocus = () => {

    if( !selectedElement ) {
      return;
    }
    let index = selectedElement.split('-')[1];
    if( index == data.length -1 ) {
      return;
    }

    if( selectedElement.includes('disco-')) {
      const index = selectedElement.replace('disco-', '');
      let element = document.getElementById(`disco-${Number(index) + 1}`);
      if( !element) {return;}
      element.focus();
      setSelectedElement(`disco-${Number(index) + 1}`); 
      return;
    }
    if( selectedElement.includes('calle1-')) {
      const index = selectedElement.replace('calle1-', '');
      let element = document.getElementById(`calle1-${Number(index) + 1}`);
      if( !element) {return;}
      element.focus();
      setSelectedElement(`calle1-${Number(index) + 1}`); 
      return;
    }
    if( selectedElement.includes('calle2-')) {
      const index = selectedElement.replace('calle2-', '');
      let element = document.getElementById(`calle2-${Number(index) + 1}`);
      if( !element) {return;}
      element.focus();
      setSelectedElement(`calle2-${Number(index) + 1}`); 
      return;
    }


    if( selectedElement == 'calleA' ) {
      let element = document.getElementById(`calle1-0`);
      if( !element) {return;}
      element.focus();
      setSelectedElement(`calle1-0`); 
      return;
    }

    
    if( selectedElement == 'calleB' ) {
      let element = document.getElementById(`calle2-0`);
      if( !element) {return;}
      element.focus();
      setSelectedElement(`calle2-0`); 
      return;
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

    let completos = transferObject.filter( a => a.distancia !== ''  );
    let  incompletos = transferObject.filter( a => a.distancia === '' );

    
    completos = completos.sort(function(a, b)  {  
      if (a.distancia < b.distancia) {return -1;}
      if (a.distancia > b.distancia) {return 1;}
    })
    
    
    transferObject = [ ...completos, ...incompletos ];
    

    document.getElementById('calleA').focus();
    setSelectedElement('calleA')
    setData( transferObject );
  }
  

  const clear = () => {
    document.getElementById('calleA').focus();
    setSelectedElement('calleA')
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
              <StyledTableCell align="left"> <input autoComplete='off' type="text" onFocus={ () => onFocus('calleA') } id="calleA" value={ calle1Origen } placeHolder="Calle A" onChange={ (e) => setCalle1Origen( e.target.value.replace(regex, '') ) }  /> </StyledTableCell>
              <StyledTableCell align="left"> <input autoComplete='off' type="text" onFocus={ () => onFocus('calleB') } id="calleB" value={ calle2Origen } placeHolder="Calle B" onChange={ (e) => setCalle2Origen( e.target.value.replace(regex, '') ) }  /> </StyledTableCell>
              <StyledTableCell align="left">Distancia</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(( row, i ) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell align="left"><input autoComplete='off' onFocus={() => onFocus( 'disco-' + i.toString()) } placeHolder="Disco" id={ 'disco-' + i.toString() } name='disco' onChange={ (e) => onChange(e, i) } value={ row.disco } /></StyledTableCell>
                <StyledTableCell align="left"><input autoComplete='off' onFocus={() => onFocus( 'calle1-' + i.toString()) }  type="text" id={ 'calle1-' + i.toString() } placeHolder="Calle 1" name='calle1' onChange={ (e) => onChange(e, i) } value={ row.calle1 } /></StyledTableCell>
                <StyledTableCell align="left" ><input autoComplete='off' onFocus={() => onFocus( 'calle2-' + i.toString()) }  type="text" id={ 'calle2-' + i.toString() } placeHolder="Calle 2" name='calle2' onChange={ (e) => onChange(e, i) } value={ row.calle2 } /></StyledTableCell>
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