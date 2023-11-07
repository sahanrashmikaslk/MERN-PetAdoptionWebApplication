/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";

import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
// import { get } from "mongoose";
import { useParams } from "react-router-dom";

const CreateProduct = (props) => {

    const { id } = useParams();

    const user = useSelector(selectUser);
    
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [pettype, setPettype] = useState("");
    const [petbreed, setPetbreed] = useState("");
    const [petage, setPetage] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");



    useEffect(() => {
        async function getCompany(id) {
            await axios.get("http://localhost:3001/api/v1/pets/" + id, {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setName(response.data.petname);
                
                setImage(response.data.image);

                setPettype(response.data.pettype);

                setPetbreed(response.data.petbreed);
                setDescription(response.data.description);

                setLocation(response.data.location);

                setPetage(response.data.petage);


            
            }).catch((error) => {
                console.log(error);
            });
        }
        
        if (id)         {                                    getCompany(id)}

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("petname", name);
        formData.append("image", image);
        formData.append("pettype", pettype);
        formData.append("petbreed", petbreed);
        formData.append("petage", petage);
        formData.append("description", description);
        formData.append("location", location);


       

        if (id) {
            await axios.put("http://localhost:3001/api/v1/pets/" + id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                window.location.href = "/dashboard";
            }).catch((error) => {
                console.log(error);
            });
            return;
        }


        await axios.post("http://localhost:3001/api/v1/pets", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.href = "/dashboard";
        }).catch((error) => {
            console.log(error);
        });


    }



    return (
        
        <Box
        
    
        >
            <form onSubmit={handleSubmit}
               style={{
            paddingTop:100
            
        }}

            >
                <Typography
                variant="h5"
                >
                    Enter Pet Details:
                </Typography>
                <TextField
                sx={{
                    mt:2,
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
               
               />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Type"
                    variant="outlined"
                    value={pettype}
                    onChange={(e) => setPettype(e.target.value)}
                    
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Breed"
                    variant="outlined"
                    value={petbreed}
                    onChange={
                        (e) => setPetbreed(e.target.value)
                    }
                
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Age"
                    variant="outlined"
                    value={petage}
                    onChange={
                        (e) => setPetage(e.target.value)
                    }
                
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={
                        (e) => setDescription(e.target.value)
                    }
                
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                
                />
                <input
                
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="image-upload">
                    <Button variant="outlined" component="span"
                     sx={{
                        mb:2
                    }}
                    >
                        Upload Image
                    </Button>
                </label>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
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
                        
                      }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default CreateProduct;