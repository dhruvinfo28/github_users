import React, { useState,useEffect } from 'react'
import './user.css'

const User = () =>{
    const [users,setUsers] = useState([]);
    const [index,setIndex] = useState(0);
    const [isError,setIsError] = useState(false);

    const url = `https://api.github.com/users`;
    
    const nextIndex = ()=>{
        if(index>=users.length-1){
            setIndex(0);
        }else{
            setIndex((prevState)=>{
                return prevState+1;
            })
        }
    }

    const prevIndex = ()=>{
        if(index<=0){
            setIndex(users.length-1);
        }
        else{
            setIndex(index-1);
        }
    }

    useEffect(()=>{
        fetch(url)
            .then(resp=>{
                if(resp.status>=200 && resp.status<=299){
                    return resp.json();
                }
                else{
                    throw new Error('Not found')
                }
            })
            .then(user=>{
                setUsers(user);
            })
            .catch(err=>{
                setIsError(true);
            })
    },[])

    if(users.length==0 && !isError){
        return <div className="container">
        <h3>
            Loading ...
            </h3>
        </div>;
    }
    else if(!isError){
        return <div className="container">
            <img src={users[index].avatar_url} className="children" alt="" />
            <h3 className="children">{users[index].login}</h3>
            <p className="children"><a href={users[index].html_url}>{users[index].html_url}</a> </p>
            <div className="buttons">
            <button onClick={prevIndex} className="children">&lt;</button>
            <button onClick={nextIndex} className="children">&gt;</button>
            </div>
        </div>;
    }
    else{
        return <>
            <div className="container">
               <h3>
                    Sorry, try again! Problem in data fetching
                   </h3>
            </div>
        </>;

    }
}

export default User;