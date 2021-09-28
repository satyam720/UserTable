import { useState,useEffect  } from "react";
import TableComponent from "../../component/TableComponent/table.component";
import axios from "axios";



const HomePage = () => {


   
    const [data, setData] = useState([]);

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
            
        </div>)
};

export default HomePage;