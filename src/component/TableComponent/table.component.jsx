import {DataGrid} from '@material-ui/data-grid';
import { Typography } from '@material-ui/core';

const columns = [
    {field: 'id', headerName: 'ID'},
    {field: 'name', headerName: 'Name',width: 200,},
    {field: 'username', headerName: 'UserName',width: 200},
    {field: 'email', headerName: 'Email',width: 200},
    {field: 'phone', headerName: 'Phone',width: 200},
    {field: 'website', headerName: 'Website',width: 200},
]

const TableComponent = ({data}) => {

    


    return(
        <div className="container-fluid" style={{height: 400 , width: "100%"}}>
        
        
        <Typography className='pb-4' variant="h6" id="tableTitle" component="div">
                Users Table
            </Typography>
            <DataGrid 
                rows = {data}
                columns = {columns}
                pageSize={5}
                checkboxSelection
            />      

       </div>
        
        )
};

export default TableComponent;