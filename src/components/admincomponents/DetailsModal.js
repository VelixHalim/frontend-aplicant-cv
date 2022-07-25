import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import api from '../api/api'
import axios from "axios"
export default function DetailsModal(props) {
    console.log(props)
    const isOpen = props.isOpen
    const toggle = props.toggleDet
    const data = props.data

    const id = props.data.id
    //get data education and get data experience
    const [experience, setExperience] = useState([])
    const [education,setEducation]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const getDataExpEdu = (id)=>{
        setIsLoading(true)
        axios.get(api+`/getDetailDataCV/${id}`).
        then((result)=>{
            const response =result.data.data.errorCode
            if(response !=="0"){
                //gagal
                console.log(result.data.data.errorDesc)
            }else{
                console.log(result)
                const edu =result.data.data.data.education
                setEducation(edu)
                const exp =result.data.data.data.experience
                setExperience(exp)
            }
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        }).finally(()=>{
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        getDataExpEdu(id)
    },[isOpen])

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Detail Pelamar</ModalHeader>
        <ModalBody>
            {
                isLoading?
                (
                    <div className='d-flex justify-content-center'>
                        <Spinner style={{ width: '2rem', height: '2rem' }} children={false} />
                    </div>
                ):
                (
                    <Form>
                        <FormGroup row>
                            <Label md={2} for="namalengkap">
                                Nama Lengkap
                            </Label>
                            <Col md={4}>
                                <Input type="text" name='namalengkap' id='namalengkap' defaultValue={data.nama_lengkap} />
                            </Col>
                            <Label md={2} for="nomortelpon">
                                Nomor Telepon
                            </Label>
                            <Col md={4}>
                                <Input type="text" name='nomortelpon' id='nomortelpon'  defaultValue={data.nomortelepon}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label md={2} for="email">
                                Email
                            </Label>
                            <Col md={4}>
                                <Input type="email" name='email' id='email'  defaultValue={data.email}/>
                            </Col>
                            <Label md={2} for="linkedin">
                                Link Linkedin
                            </Label>
                            <Col md={4}>
                                <Input type="url" name='linkedin' id='linkedin'  defaultValue={data.linkedin}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label md={2} for="gender">
                                Gender
                            </Label>
                            <Col md={4}>
                                <Input type="text" name='gender' id='gender'  defaultValue={data.gender}/>
                            </Col>
                            <Label md={2} for="alamat">
                                Alamat
                            </Label>
                            <Col md={4}>
                                <Input type="textarea" name='alamat' id='alamat'  defaultValue={data.alamat}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label md={2} for="summary">
                                Summary
                            </Label>
                            <Col md={10}>
                                <Input type="textarea" name='summary' id='summary'  defaultValue={data.summary}/>
                            </Col>
                        </FormGroup>
                        {/* education read */}
                        {
                            education.map((edu,index)=>{
                                return(
                                    <>
                                    <Row>
                                        <Col md={11}>
                                            <div className='float-left'>
                                                <Label key={index}><b>Education - {index+1}</b></Label>
                                            </div>
                                        </Col>
                                    </Row>
                                    
                                    <FormGroup row>
                                        <Label md={2} for="degree">
                                            Degree
                                        </Label>
                                        <Col md={4}>
                                            <Input type="text" name={`degree-${edu.id}`} id='degree' defaultValue={edu.degree}/>
                                        </Col>
                                        <Label md={2} for="GPA">
                                            GPA
                                        </Label>
                                        <Col md={4}>
                                            <Input type="text" name={`GPA-${edu.id}`} id='GPA' defaultValue={edu.gpa}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label md={2} for="major">
                                            Jurusan
                                        </Label>
                                        <Col md={4}>
                                            <Input type="text" name={`major-${edu.id}`} id='major' defaultValue={edu.jurusan}/>
                                        </Col>
                                        <Label md={2} for="institusi">
                                            Tempat Pendidikan
                                        </Label>
                                        <Col md={4}>
                                            <Input type="text" name={`institusi-${edu.id}`} id='institusi' defaultValue={edu.tempat_pendidikan}/>
                                        </Col>
                                    </FormGroup>
                                    </>
                                )
                            })
                        }
                        {/* experience read */}
                        {
                            experience.map((exp,index)=>{
                                return(
                                    <>
                                    <Row>
                                        <Col md={11}>
                                            <div className='float-left'>
                                                <Label key={index}><b>Experience - {index+1}</b></Label>
                                            </div>
                                        </Col>
                                    </Row>
                                    <FormGroup row>
                                        <Label md={2} for="Job">
                                            Job Title
                                        </Label>
                                        <Col md={4}>
                                            <Input type="text" name={`Job-${exp.id}`} id='Job' defaultValue={exp.job}/>
                                        </Col>
                                        <Label md={2} for="details">
                                            Job Details
                                        </Label>
                                        <Col md={4}>
                                            <Input type="textarea" name={`details-${exp.id}`} id='details' defaultValue={exp.detail}/>
                                        </Col>
                                    </FormGroup>
                                    </>
                                )
                            })
                        }
                    </Form>        
                )
            }
            
        </ModalBody>
        <ModalFooter>
            <Button color='danger' onClick={()=>toggle()}>Kembali</Button>
        </ModalFooter>
    </Modal>
  )
}
