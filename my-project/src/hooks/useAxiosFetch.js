import axios from "axios";
import { useEffect, useState } from "react"

const useAxiosFetch = (dataUrl) => {
    const [data,setData]=useState([]);
    const [fetchError,setFetchError]=useState(null);
    const [isLoding,setIsLoding]=useState(false)

    useEffect(()=> {
        let isMounted =true;
        const source = axios.CancelToken.source();

        const fetchData =async (url) => {
            setIsLoding(true);
            try{
                const response = await axios.get(url , {
                    cancelToken : source.token
                });
                if(isMounted){
                    setData(response.data)
                    setFetchError(null)
                }
            }catch(err){
                if (isMounted){
                    setFetchError(err.message)
                    setData([]);
                }
            }finally{
                isMounted && setTimeout(()=> setIsLoding(false), 3000 );
            }
        }

        fetchData(dataUrl)
        const cleanUp =() =>{
            isMounted =false
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);
    return { data, fetchError, isLoding };
}

export default useAxiosFetch;