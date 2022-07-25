import React, { useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Header from './Header';
import {Container, Row, Col, Form,FormGroup,Label, Input, Button, Card, CardBody, CardHeader} from 'reactstrap'
import Education from './usercomponents/Education';
import Experience from './usercomponents/Experience';
import axios from 'axios'
import api from './api/api';

export default function UserPage() {
    const location = useLocation()
    const navigate=useNavigate()
    let role = ""
    if(location.state===null || location.state.length===0){
        alert("Kamu Tidak Punya Hak Akses Halaman Ini")
        navigate("/",{state:{}})
    }else if(location.state.role !=="user"){
        alert("Kamu Tidak Punya Hak Akses Halaman Ini")
        navigate("/",{state:{}})
    }else{
        role = location.state.role
    }

    const [cv,setCv]=useState({
        namalengkap:"",
        nomortelpon:"",
        email:"",
        linkedin:"",
        gender:"",
        alamat:"",
        summary:"",
    })

    const [education,setEducation] = useState([])
    
    const [experience,setExperience] = useState([])

    const addNewEducation=()=>{
        const rand = 1 + Math.random() * (1000000 - 1);
        setEducation([...education, {id:parseInt(rand), degree:"",GPA:"",institusi:"", major:""}])
    }
    const addNewExperience=()=>{
        const rand = 1 + Math.random() * (1000000 - 1);
        setExperience([...experience, {id:parseInt(rand), Job:"",details:""}])
    }

    const deleteEducation=(record)=>{
        setEducation([...education].filter(r=>r.id!==record))
    }
    const deleteExperience=(record)=>{
        setExperience([...experience].filter(r=>r.id!==record))
    }

    const handleChangeEducation=(e)=>{
        const dataName = e.target.name
        const splitIndex = dataName.split("-")
        const id = parseInt(splitIndex[1])
        
        setEducation([...education].map(data=>{
            if(data.id===id){
                return {
                    ...data,
                    [splitIndex[0]]: e.target.value
                }
            } 
            else return data   
        }))
    }
    const handleChangeExperience=(e)=>{
        const dataName = e.target.name
        const splitIndex = dataName.split("-")
        const id = parseInt(splitIndex[1])
        
        setExperience([...experience].map(data=>{
            if(data.id===id){
                return {
                    ...data,
                    [splitIndex[0]]: e.target.value
                }
            } 
            else return data   
        }))
    }

    const handleChange=(e)=>{
        setCv({...cv,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        // e.preventDefault
        console.log(cv,education, experience)
        axios.post(api+"/postDataCV",{cv,education,experience}).
        then((result)=>{
            console.log(result)
            const response = result.data.data.errorCode 
            if(response==="0"){
                alert("berhasil menginput data")
                alert("terima kasih sudah mendaftar")
                navigate("/",{state:{}})
            }else{
                alert("gagal menginput data")
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

    return (
        <div>
            <Header role={role}/>
            <Container>
                <Row className="Justify-content-md-center">
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                Form Applicant CV
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup row>
                                        <Label md={2} for="namalengkap">
                                            Nama Lengkap
                                        </Label>
                                        <Col md={4}>
                                            <Input type="text" name='namalengkap' id='namalengkap' required onChange={e=>handleChange(e)}/>
                                        </Col>
                                        <Label md={2} for="nomortelpon">
                                            Nomor Telepon
                                        </Label>
                                        <Col md={4}>
                                            <Input type="number" name='nomortelpon' id='nomortelpon' required onChange={e=>handleChange(e)}/>
                                        </Col>
                                    </FormGroup>
                                     
                                    <FormGroup>
                                        <Button style={{width:'120px'}} onClick={() => addNewEducation()} type="button" color="primary">+ Education</Button>
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            education && education.length>0?
                                            <div>
                                                <Education deleteEducation={deleteEducation} education={education} handleChangeEducation={handleChangeEducation}/>
                                            </div>:
                                            null
                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        <Button style={{width:'120px'}} onClick={() => addNewExperience()} type="button" color="primary">+ Experience</Button>
                                        <span className='text-info'> * jika tidak ada pengalaman, Jobs Title isi tidak ada pengalaman dan Detail pekerjaan isi "-"</span>
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            experience && experience.length>0?
                                            <div>
                                                <Experience deleteExperience={deleteExperience} experience={experience} handleChangeExperience={handleChangeExperience}/>
                                            </div>:
                                            null
                                        }
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={3}>
                                            <Button type='button' color='primary' onClick={(e)=>handleSubmit(e)}>Submit</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
