import { useState,useEffect,useRef } from "react";
import './HomePage.css';
import axios from "axios";
import TableComponent from "../../component/TableComponent/table.component";
import CustomButton from "../../component/ButtonComponent/ButtonComponent";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography,
        TextField,
        Grid,
        Button } from '@material-ui/core';
import {AddCircleOutlined} from '@material-ui/icons'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    align: 'center',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 18,
    p: 3,
  };

//   const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));




const HomePage = () => {


   //User Data states
    const [data, setData] = useState([]);

    //Modal States and functions
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        console.log("i am opened");
        setOpen(true)};
    const handleClose = () => setOpen(false);

    //Add user functions  and states   
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');


   const submitData = async() => {
       await axios.post("https://jsonplaceholder.typicode.com/users", {
           name: name,
           username: username,
           email: email,
           phone: phone,
           website: website
       })
       .then((res) => {
           console.log(res.data);
           setData([...data, res.data]);
       })
       .catch((err) => {
           console.log(err);
       })
   };

   

    const handleSubmit = async(e) => {
        e.preventDefault();
        await submitData();
        
        setOpen(false);
    };

    //get user Row and delete
    const [selectionModel, setSelectionModel] = useState([]);

    console.log("Accessed User ROw", selectionModel);
    
    const Delete = async() => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${selectionModel[0]}`)
        .then((res) => {
            console.log("Deleted Data", res);
            // selectionModel.map((indice ) => setData(data.filter((item) => (item.id !== indice))));
            setData(data.filter((item) => (item.id !== selectionModel[0])));
            
            // data.filter((item) => (console.log("THi is fjda;flksjadflafldkjs",item.id)));
        })
        .catch((err) => console.log(err));
    }


    //Get Data from JSON PLACEHOLDER API AND SET DATA ON EVERY CHANGE
    useEffect(() => {
        const fetchData = async() =>{
            await axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
              setData(res.data);
              console.log("THis is the result from endpoint ====>>>>",res.data);
              console.log("THis is the data now",data);
            })
            .catch((err) => console.log(err));
        }
      

        fetchData();
        
        
    },[setData]);

    return(
       
        <div className="container-fluid">
            <div className= "row">
                <div className= "col">
                    <TableComponent 
                    data = {data}
                    selectionModel={selectionModel}
                    setSelectionModel={setSelectionModel}
                    />
                </div>
        
            </div>
            <div className="col  edit-modal">
                <CustomButton 
                 handleOpen={handleOpen}
                />
                <Button type='submit' onClick={Delete}>               
                 Delete Selected User
                </Button>
                
                 <Modal
                
                 open={open}
                 onClose={handleClose}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                <Typography className='mb-3' id="modal-modal-title" variant="h6" component="h2">
                    Please Fill In the User Details
                </Typography>

                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item className='mb-3' xs={6}>
                <TextField value = {name} onChange={(e) => setName(e.target.value)} id="name" label="name" variant="outlined" />                
                </Grid>
                <Grid item className='mb-3' xs={6}>
                <TextField  value = {username} onChange={(e) => setUsername(e.target.value)} id="username" label="username" variant="outlined" />
                </Grid>
                <Grid item className='mb-3' xs={6}>
                <TextField  value = {email} onChange={(e) => setEmail(e.target.value)} id="email" label="email" variant="outlined" />                
                </Grid>
                <Grid item xs={6}>
                <TextField  value = {phone} onChange={(e) => setPhone(e.target.value)} id="phone" label="phone" variant="outlined" />                
                </Grid>
                <Grid item xs={6}>
                <TextField value = {website} onChange={(e) => setWebsite(e.target.value)} id="website" label="website" variant="outlined" />                
                </Grid>
                
                
                               
                </Grid>
                <Button type='submit'
                onClick={(e) => handleSubmit(e)}
                style={{marginLeft: '40%', marginTop: "2%"}}>
                <AddCircleOutlined /> Add User
                </Button>

                
               
                </Box>
                    
                </Modal>
            </div>
           
            
        </div>
     
        
        )
};

export default HomePage;