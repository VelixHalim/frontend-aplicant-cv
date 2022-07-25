import React, { useState} from 'react'
import { Card, CardBody,CardHeader, Label, Input, Form, FormGroup, Button} from 'reactstrap';
import '../App.css'
import {useNavigate} from 'react-router-dom'

const AdminUsername = "admin"
const AdminPassword = "admin"
const Username = "user"
const UserPassword = "user123"

const HomePage=() =>{
    
    const [username, setUsername]=useState("")
    const [password, setPassword]=useState("")
    const [wrong, setWrong]=useState("")
    const navigate = useNavigate()
    console.log(username,password)
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(username!=="" && password!==""){
            if(username===Username && password===UserPassword){
                //user
                console.log('user')
                navigate("/User",{state:{role:"user"}})
            }else if(username ===AdminUsername && password===AdminPassword){
                //admin
                console.log("admin")
                navigate("/Admin",{state:{role:"admin"}})
            }else{
                setWrong("username / password salah")
            }
        }else{
            alert("isi username dan password")
        }
    }
    return (
        <div className='App'>
            <header className='App-header'>
                <Card className='card'>
                    <CardHeader>
                    Welcome to Applicant CV Apps. JOIN US !
                    <h6>
                        please login user or admin
                    </h6>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup>
                            <Label>
                                username:
                            </Label>
                            <Input type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                password:
                            </Label>
                            <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </FormGroup>
                        <FormGroup>
                            {
                                wrong!==""?
                                <span className='text-danger'>{wrong}</span>:
                                null
                            }                            
                        </FormGroup>
                        <FormGroup>
                            <Button onClick={(e)=>handleSubmit(e)}>Submit</Button>
                        </FormGroup>
                    </Form>
                    </CardBody>
                </Card>
            </header>
        </div>
    )
}

export default HomePage
