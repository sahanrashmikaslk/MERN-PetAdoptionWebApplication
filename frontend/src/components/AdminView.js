import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid,  Typography } from '@mui/material';
import axios from 'axios';
import { selectUser,logout } from '../slices/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const AdminView = () => {
    const dispatch = useDispatch();
    // const user = useSelector(selectUser);
// 
 const Logout = (e) => {
   dispatch(logout());
   window.location.reload()
 };
    const user = useSelector(selectUser);

    const [products, setProducts] = useState([]);
    const [adoptions,setAdoptions] = useState([]);
    useEffect(() => {
        async function getProducts() {
            await axios.get("http://localhost:3001/api/v1/pets/all", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setProducts(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        async function getAdoptions(){
            await axios.get("http://localhost:3001/api/v1/adoptions/", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setAdoptions(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        getAdoptions();
        getProducts();
    }, [])

    async function deleteProduct(id) {

        //confirm before deleting
        if (!window.confirm("Are you sure you want to delete this pet?")) {
            return;
        }

        await axios.delete("http://localhost:3001/api/v1/pets/" + id, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <h1 style={{ marginRight: '80px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#A483D6' }}>find your furMate</h1>
            <Button 
            sx={{
                mb: 4,
                // ml: 4,
            }}
            variant="contained" color="primary" href="/addpet"
            style={{

                textTransform: 'capitalize',
                borderRadius: '12px', 
                border: '1px solid #ffffff3e',
                background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), #A483D6',
                backgroundBlendMode: 'soft-light, normal', // Corrected the syntax for background-blend-mode
                boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                color: '#fff',
                transition: 'background 0.8s',
                margin: '0px 0px 50px 720px'
              }}> 
                Add New Pet
            </Button>
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
                                <Typography gutterBottom variant="h5" component="h2">
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

                                {user.userType === "b2 uyer" ? <Button size="small">Order</Button> :
                                    <>
                                        <Button size="small"  variant="outlined"
                                            onClick={() => { window.location.href = "/addpet/" + card._id }}
                                        >Edit</Button>
                                        <Button color="error"  variant="outlined"  size="small"
                                            onClick={() => { deleteProduct(card._id) }}
                                        >Delete</Button>
                                    </>}


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
<br></br>
<Typography
sx={{
    mb:2,
    fontWeight: 'bold',
    
}}>
    Pet Adoption Requests -------------------------------------------------------------------------------------------------------------------------
</Typography>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  style={{ fontWeight: 'bold' }}>Requested Date</TableCell>
            <TableCell align="right"  style={{ fontWeight: 'bold' }}>Requested User</TableCell>
            <TableCell align="right"  style={{ fontWeight: 'bold' }}>Requestd Pet</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {adoptions.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {new Date(row.date).toUTCString()}
              </TableCell>
              <TableCell align="right">{row.user_name}</TableCell>
              <TableCell align="right">{row.pet_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            
<br></br>

            <Button variant="contained"  className="logout__button" onClick={(e) => 
            Logout(e)}
            style={{

                textTransform: 'capitalize',
                borderRadius: '12px',
                width:'60', height:'40',
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
    );
}

export default AdminView;