import React, { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { selectUser,logout } from '../slices/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';

const GetAll = () => {
    const dispatch = useDispatch();
     const user = useSelector(selectUser);

  const Logout = (e) => {
    dispatch(logout());
    window.location.href = "/"
  };


    const [products, setProducts] = useState([]);
    const [search,setSearch] = useState("");
    const [msg,setMsg] = useState("");

    useEffect(() => {
        async function getProducts() {
            await axios.get("http://localhost:3001/api/v1/pets/all", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setMsg("")
                setProducts(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        getProducts();
    }, [])

    async function getProducts2() {
        await axios.get("http://localhost:3001/api/v1/pets/all", {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            setMsg("")
            console.log(response);
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    async function getProductsSearch() {
        const search2 = search;
        if(search2 == ""){
            getProducts2()
            return;
        }
        const url = "http://localhost:3001/api/v1/pets/search/" + search2
        await axios.get(url, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);


            if(response.data.length ==0){
                setMsg("No results")
                setProducts([])
                return;
            }else{
                setMsg("")
                setProducts(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }


   async function requestToAdopt(id) {
        await axios.post("http://localhost:3001/api/v1/adoptions", {
            pet_id: id,
            user_id: user.id,
        }, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            alert("Request to adopt sent successfully");
            // window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
   }

    return (
        <div className='show'>
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <h1 style={{ marginRight: '80px', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#A483D6', color: '#A483D6' }}>find your furMate</h1>
            <TextField
             style={{
                borderRadius: '10px',
                border:'1px solid #ffffff',
                color: '#fff',
                marginLeft: '545px', marginBottom: '20px',
                width:'300', height:'43',
                border: '0.5px solid rgba(255, 255, 255, 0.40)',
                background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #E7EBF0',
                backgroundBlendMode: 'soft-light, normal',
                boxShadow: '1.5px 1.5px 5px 0px #A6ABBD inset, -2.5px -2.5px 5px 0px #FAFBFF inset',
              }}
            label="Type here to search"
            onChange={(e)=>
            {

                setSearch(e.target.value)
            }}
            
            ></TextField>
            <Button 
            style={{
                textTransform: 'capitalize',
                borderRadius: '14px', 
                border: '1px solid #ffffff3e',
                background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
                backgroundBlendMode: 'soft-light, normal', 
                boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                color: '#fff',
                transition: 'background 0.8s',
              }}
            onClick={()=>{
                getProductsSearch()
            }}
            >search</Button>

            
            {msg}

            <Grid container spacing={4}>
                {products.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={"http://localhost:3001" + card.image}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold' , fontSize: '1.2rem'}}>
                                    Name : {card.petname}
                                </Typography>
                                <Typography>
                                    Type : {card.pettype}
                                </Typography>
                                <Typography>
                                    Breed : {card.petbreed}
                                </Typography>
                                <Typography>
                                    Age : {card.petage}
                                </Typography>
                                <Typography>
                                   Description :  {card.description}
                                </Typography>
                                <Typography>
                                    Location : {card.location}
                                </Typography>

                            </CardContent>
                            <CardActions>

                                <Button size="small"
                                style={{
                                    marginTop:"30px",
                    
                                    textTransform: 'capitalize',
                                    borderRadius: '8px', // Corrected the syntax for border-radius
                                    border: '1px solid #ffffff3e',
                                    background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
                                    backgroundBlendMode: 'soft-light, normal', // Corrected the syntax for background-blend-mode
                                    boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                                    color: '#fff',
                                    transition: 'background 0.8s',
                                    
                                  }}


                                onClick={() => requestToAdopt(card._id)}>
                                 Request to Adopt </Button>


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained"  className="logout__button" onClick={(e) => Logout(e)}
            style={{
                marginTop:"30px",

                textTransform: 'capitalize',
                borderRadius: '14px', // Corrected the syntax for border-radius
                border: '1px solid #ffffff3e',
                background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
                backgroundBlendMode: 'soft-light, normal', // Corrected the syntax for background-blend-mode
                boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                color: '#fff',
                transition: 'background 0.8s',
                margin: '0px 0px 0px 760px'
              }}>
        Log out
      </Button>
        </Container>
        </div>
    );
}

export default GetAll;