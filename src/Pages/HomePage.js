import { useState,useEffect  } from "react";
import TableComponent from "../component/TableComponent/table.component";
import axios from "axios";



const HomePage = () => {


    // const initialState = {
    // name: "", 
    // username: "",
    // email: "",
    // phone: "",
    // website: "",
    // }
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
        <div>
            <TableComponent 
                data = {data}
            />
        </div>)
};

export default HomePage;