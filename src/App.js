import React, {useState} from 'react';
import homeIcon from './assets/home-fill.svg';
import gridIcon from './assets/grid-fill.svg';
import settingsIcon from './assets/settings-2-fill.svg';
import {Box, Button, Grid, Paper, styled, Typography} from '@mui/material';
import './App.css';

export default function App() {
  const [foods, setfoods] = useState ([ 
    {id:1, name:'Cookie',price:50, quantity:15}, 
    {id:2, name:'Pecan Pie', price:1299, quantity:8}, 
    {id:3, name:'Fruit Lollipop', price:9, quantity:30}, 
    {id:4, name:'Cupcake', price:60, quantity:20},
    {id:5, name:'Pecan Pie', price:1299, quantity:15},
    {id:6, name:'Fruit Lollipop', price:9, quantity:20}
  ])
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredData = foods.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  const [cart, setcart] = useState([]);

  const handleDelete = (itemsToDelete) => {
    const updatedItems = cart.filter(items => items.id  !== itemsToDelete);
    setcart(updatedItems);
  };
  const add = (itemToincrement) =>{
    const updatedadd = cart.map((items)=>items.id === itemToincrement
    ?{...items, quantity: items.quantity + 1,}:items
    );
    const updatedfoods = foods.map((item)=>item.id === itemToincrement
    ?{...item, quantity: item.quantity -1}:item
    )
    setcart(updatedadd);
    setfoods(updatedfoods);
  }
  const minus = (itemTodecrement) =>{
    const existedItems = cart.find((items)=> items.id === itemTodecrement);
    if(existedItems.quantity === 1){
      const updatedminus = cart.filter((items)=> items.id !== itemTodecrement);
      setcart(updatedminus);
    } else{
      const updatedminus = cart.map((items)=>
      items.id === items.id
      ?{...items, quantity:items.quantity-1}:items
      );
      const updatedfoods = foods.map((item)=>item.id === itemTodecrement
    ?{...item, quantity: item.quantity+1}: item
    );
    setcart(updatedminus);
    setfoods(updatedfoods);
    }
 
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="App">
      <Box 
        sx={{
          backgroundColor: '#fff',
          width:"84px",
          boxShadow: "6px 6px 5px -12px rgba(0,0,0,0.75)",
          borderRadius:"0px 75px 75px 0px",
          justifyContent:'center',
          alignItems:'center',
          display:"flex",
          overflow:'auto',
          flexDirection:"column",
          gap:'40px',
        }}
      >
        <Box className='home-icon'>
          <img src={homeIcon}/>
        </Box>
        <Box className='grid-icon'>
          <img src={gridIcon}/>
        </Box>
        <Box className='settings-icon'>
        <img src={settingsIcon}/>
        </Box>        
      </Box>
      <Box className="product-content">
        <h1>Products</h1>
        <Box sx={{
          justifyContent:'center',
          display:'flex',
        }}>
          <input className='search-bar' type={'text'} placeholder='Search' onChange={handleSearch}/>
        </Box>
        <Grid sx={{p:'20px'}} container spacing={2} columns={{ xs: 4, sm: 8, md: 12}}>
        {filteredData.map((item)=>{
            return(
                  <Grid item key ={item.id}xs={2} sm={4} md={4} sx={{display:"flex", textAlign:"center", justifyContent:"center"}}>
                    <Item sx={{width:"400px", display:"flex", flexDirection:"column", textAlign:"center", justifyContent:"center", alignItems:'center'}}>
                      <Box sx={{height:"200px", width:"200px", border:"1px solid black", display:"flex", borderRadius:'100px'}}></Box>
                      <Typography sx={{fontWeight:'bold', color:'black', fontSize:'20px'}}>{item.name}</Typography><br/>
                      <Typography sx={{color:'#DD2ADF', fontWeight:'bold',fontSize:'15px'}}>{item.price}</Typography><br/>
                      <Typography sx={{color:'#DD2ADF', fontWeight:'bold',fontSize:'10px'}}>{item.quantity}</Typography>
                      <Button variant='outlined'
                      sx={{
                        borderRadius:'28px',
                        borderColor:'#72DDF7',
                        '&:hover':{borderColor:'#72DDF7'},
                        color:'#72DDF7',
                        fontWeight:'bold',
                      }}
                      onClick={()=>{
                        setcart((cart)=>[
                          ...cart,
                          {
                            id:item.id,
                            name:item.name,
                            price:item.price,
                            quantity:item.quantity
                          }
                        ])
                        const existingItem = cart.find((items)=>items.id === item.id);
                        if(existingItem){
                          const updatedCart = cart.map((items)=>items.id === item.id
                          ?{...items, quantity:items.quantity+ 1}:items);
                          setcart(updatedCart);
                          const updatedfoods = foods.map((item)=>item.id === item.id
                          ?{...item, quantity: item.quantity -1}: item
                          );
                          setfoods(updatedfoods);
                        } else{
                          setcart([...cart, { ...item, quantity:0, }]);
                        }
                      }}>Add To Cart</Button>
                    </Item>
                  </Grid>    
            )
          })}
        </Grid>
      </Box>
      <Box sx={{
        backgroundColor:'#fff',
        width:"400px",
        py:0, px:"30px  ",
        borderRadius:"75px 0px 0px 75px",
        boxShadow: "-6px 6px 5px -12px rgba(0,0,0,0.75)",
        alignItems:'flex-end',
        overflow:'auto'
      }}>
        <Box width={"100%"}>
        <h1>Cart</h1>
        <hr color='#F3F3F3'/>
        </Box>
        <Box className="cart-content" sx={{overflow:'auto'}}>
          <Grid container spacing={2} sx={{p:'25px'}}>
          {cart.map((items)=>(
            <Grid item xs={12} key={items.id}>
              <Item>
                {items.name}<br/>
                {items.price}<br/>
                <Button onClick={()=>minus(items.id)}>-</Button>
                {items.quantity}
                <Button onClick={()=>add(items.id)}>+</Button><br/>
                <Button variant='contained' onClick={()=>handleDelete(items.id)}>Remove</Button>
              </Item>
           </Grid>
          ))}
          </Grid>
        </Box>
        <Box width={"100%"}>
        <hr color='#F3F3F3'/>
        <Box sx={{
          alignItems:'flex-end',
        }}>
        <p className='total-sum'>Total:</p>
        <Button variant='contained' fullWidth sx={{
          borderRadius:'28px', 
          fontWeight:'bold', 
          '&:hover':{backgroundColor:'#72DDF7'},
          backgroundColor:'#72DDF7'
          }}>CheckOut</Button>
        </Box>
        </Box>
      </Box>
    </div>
  );
}

