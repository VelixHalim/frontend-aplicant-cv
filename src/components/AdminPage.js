import axios from 'axios'
import React,{useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader, Container, Button } from 'reactstrap'
import DetailsModal from './admincomponents/DetailsModal'
import DeleteModal from './admincomponents/DeleteModal'
import api from './api/api'
import Header from './Header'

const AdminPage=()=> {
  const location=useLocation()
  const navigate=useNavigate()
  //checking role user or admin or no-role
  let role = ""
  if(location.state===null || location.state.length===0){
      alert("Kamu Tidak Punya Hak Akses Halaman Ini")
      navigate("/",{state:{}})
  }else if(location.state.role !=="admin"){
      alert("Kamu Tidak Punya Hak Akses Halaman Ini")
      navigate("/",{state:{}})
  }else{
      role = location.state.role
  }

  const columns=[
    {
        name:"Nama Lengkap",
        selector: row=>row.nama_lengkap,
        sortable:true
    },
    {
      name:"Gender",
      selector: row=>row.gender,
    },
    {
      name:"Email",
      selector: row=>row.email,
      sortable:true
    },
    {
      name:"Link Linkedin",
      selector: row=>row.linkedin,
      sortable:true
    },
    {
      name:"Nomor Telepon",
      selector: row=>row.nomortelepon,
      sortable:true
    },
    {
        name:"Actions",
        cell:row=>(
          <>
            <Button type="button" className='text-white m-1' color='primary' onClick={()=>toggleDet(row)}>Details</Button>
            {/* <Button type="button" className='text-white m-1' color='warning'>Edit</Button> */}
            <Button type="button" className='text-white m-1' color='danger' onClick={()=>toggleDelete(row)}>Delete</Button>   
          </>  
        )
    }
  ]
  // get data
  const [data,setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const getData = ()=>{
    setIsLoading(true)
    axios.get(api+"/getAllDataCV").
    then((result) => {
      const response = result.data.data.errorCode
      if(response !=="0"){
        //gagal
        console.log(result)
        console.log(result.data.data.errorDesc)
      }else{
        //berhasil
        const datas = result.data.data.data
        setData(datas)
      }
      // setData(datas) 
    }).catch((error)=>{
      console.log(error)
    }).finally(()=>{
      setIsLoading(false)
    })
  }
  console.log(data)
  
  //details
  const [detailsToggle,setdetailsToggle] = useState(false)
  const [detailsData,setDetailsData] = useState({})
  const toggleDet = (data)=>{
    setdetailsToggle(!detailsToggle)
    setDetailsData(data)
  }

  //delete
  const [deleteToggle,setDeleteToggle] = useState(false)
  const [deleteData,setDeleteData] = useState({})
  const toggleDelete = (data)=>{
    setDeleteToggle(!deleteToggle)
    setDeleteData(data)
  }

  const closetoggle = ()=>{
    setdetailsToggle(!detailsToggle)
  }

  const closetoggleDel = ()=>{
    setDeleteToggle(!deleteToggle)
  }

  useEffect(()=>{
    getData()
  },[deleteToggle])

  return (
    <div>
      <Header role={role}/>
      <Container>
        <Card>
          <CardHeader>
            Daftar CV 
          </CardHeader>
          <CardBody>
            <DataTable
              columns={columns}
              data={data}
              progressPending={isLoading}
              pagination
            />
          </CardBody>
        </Card>
      </Container>
      <DetailsModal isOpen={detailsToggle} toggleDet={closetoggle} data={detailsData}/>
      <DeleteModal isOpen={deleteToggle} toggleDet={closetoggleDel} data={deleteData}/>
    </div>
  )
}
export default AdminPage