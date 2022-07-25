import React from 'react'
import { FormGroup, Col, Label, Input, Button, Row} from 'reactstrap'

export default function Experience(props) {
    const handleChangeExperience = props.handleChangeExperience    
    return (
        <div>
            {
                props.experience.map((exp,index)=>{
                    return(
                        <>
                        <Row>
                            <Col md={11}>
                                <div className='float-left'>
                                    <Label key={index}><b>Experience - {index+1}</b></Label>
                                </div>
                            </Col>
                            <Col md={1}>
                                <div className='float-right mb-2'>
                                    <Button type="button" className="btn btn-danger" onClick={(e=>props.deleteExperience(exp.id))}>-</Button>
                                </div>
                            </Col>
                        </Row>
                        <FormGroup row>
                            <Label md={2} for="Job">
                                Job Title
                            </Label>
                            <Col md={4}>
                                <Input type="text" name={`Job-${exp.id}`} id='Job' required onChange={e=>handleChangeExperience(e)}/>
                            </Col>
                            <Label md={2} for="details">
                                Job Details
                            </Label>
                            <Col md={4}>
                                <Input type="textarea" name={`details-${exp.id}`} id='details' required onChange={e=>handleChangeExperience(e)}/>
                            </Col>
                        </FormGroup>
                        </>
                    )
                })
            }
        </div>
    )
}
