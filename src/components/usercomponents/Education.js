import React from 'react'
import { FormGroup, Label, Col, Input, Button, Row} from 'reactstrap'

export default function Education(props) {
    const handleChangeEducation = props.handleChangeEducation
    return (
        <div>
        {
            props.education.map((edu,index)=>{
                return(
                    <>
                    <Row>
                        <Col md={11}>
                            <div className='float-left'>
                                <Label key={index}><b>Education - {index+1}</b></Label>
                            </div>
                        </Col>
                        <Col md={1}>
                            <div className='float-right mb-2'>
                                <Button type="button" className="btn btn-danger" onClick={(e=>props.deleteEducation(edu.id))}>-</Button>
                            </div>
                        </Col>
                    </Row>
                    
                    <FormGroup row>
                        <Label md={2} for="degree">
                            Degree
                        </Label>
                        <Col md={4}>
                            <Input type="text" name={`degree-${edu.id}`} id='degree' required onChange={e=>handleChangeEducation(e)}/>
                        </Col>
                        <Label md={2} for="GPA">
                            GPA
                        </Label>
                        <Col md={4}>
                            <Input type="text" name={`GPA-${edu.id}`} id='GPA' required onChange={e=>handleChangeEducation(e)}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label md={2} for="major">
                            Jurusan
                        </Label>
                        <Col md={4}>
                            <Input type="text" name={`major-${edu.id}`} id='major' required onChange={e=>handleChangeEducation(e)}/>
                        </Col>
                        <Label md={2} for="institusi">
                            Tempat Pendidikan
                        </Label>
                        <Col md={4}>
                            <Input type="text" name={`institusi-${edu.id}`} id='institusi' required onChange={e=>handleChangeEducation(e)}/>
                        </Col>
                    </FormGroup>
                    </>
                )
            })    
        }
        </div>
    )
}
