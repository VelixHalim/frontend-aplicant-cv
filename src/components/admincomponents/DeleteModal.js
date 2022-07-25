import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner } from 'reactstrap'
import api from '../api/api'
import axios from "axios"
export default function DeleteModal(props) {
    console.log(props)
    const isOpen = props.isOpen
    const toggle = props.toggleDet
    const data = props.data

    const id = props.data.id
    const deleteCV =(id)=>{
        axios.delete(api+`/deleteDataCV/${id}`).
        then((result)=>{
            console.log(result)
            const response= result.data.data.errorCode
            if(response !=="0"){
                console.log(result.data.data.errorDesc)
            }else{
                alert("berhasil menghapus")
                toggle()
            }
        }).catch((error)=>{
            console.log(error)
        })
    }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Detail Pelamar</ModalHeader>
        <ModalBody>
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
            </Form>
        </ModalBody>
        <ModalFooter>
            <p>Apakah anda yakin menghapus cv ini?</p>
            <Button color='primary' onClick={()=>deleteCV(id)}>Ya</Button>
            <Button color='danger' onClick={()=>toggle()}>Kembali</Button>
        </ModalFooter>
    </Modal>
  )
}
