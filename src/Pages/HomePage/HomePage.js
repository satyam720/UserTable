import { useState,useEffect,useRef  } from "react";
import './HomePage.css';
import axios from "axios";
import TableComponent from "../../component/TableComponent/table.component";
import CustomButton from "../../component/ButtonComponent/ButtonComponent";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography,
        TextField,
        Grid,
        styled,
        Paper,
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

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));




const HomePage = () => {


   //User Data states
    const [data, setData] = useState([]);

    //Modal States and functions
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        console.log("i am opened");
        setOpen(true)};
    const handleClose = () => setOpen(false);

    //Add user functions
    const valueRef = useRef('');

    
    const sendValue = () => {
        return console.log(valueRef.current.value) //on clicking button accesing current value of TextField and outputing it to console 
    }

    const initialState = {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
    }
    const [addData, setAddData] = useState(initialState);

    const handleChange = (event) => {
        // event.persist();
        // setAddData(addData => ({...addData, addData.name : event.target.value}));
        console.log('check', event.nativeEvent.data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setOpen(false);
    };


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
                    />
                </div>
        
            </div>
            <div className="col  edit-modal">
                <CustomButton 
                 handleOpen={handleOpen}
                />
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
                <TextField inputRef={valueRef} id="name" label="name" variant="outlined" />                
                </Grid>
                <Grid item className='mb-3' xs={6}>
                <TextField  id="username" label="username" variant="outlined" />
                </Grid>
                <Grid item className='mb-3' xs={6}>
                <TextField  id="email" label="email" variant="outlined" />                
                </Grid>
                <Grid item xs={6}>
                <TextField  id="phone" label="phone" variant="outlined" />                
                </Grid>
                <Grid item xs={6}>
                <TextField  id="website" label="website" variant="outlined" />                
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