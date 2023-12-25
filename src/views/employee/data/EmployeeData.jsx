import React, { useEffect, useState } from 'react'
import Employee from '../Employee'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { deleteEmployee, getEmployee } from '../../../models/employee/employee_m'
import toast from 'react-hot-toast'
import Loading from '../../loading/Loading'

const EmployeeData = () => {
    const dispacth = useDispatch();

    const [loading, setLoading] = useState(false);

    const [employee, setEmployee] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataEmployee = async(page) => {
        try {
            const response = await dispacth(getEmployee(page)).unwrap().catch((err) => {});
            setEmployee(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataEmployee(1);
    }, []);

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama', { icon: '😬' });
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir', { icon: '😬' })
        } else {
            return getDataEmployee(page);
        }
    }

    const onDetail = (employee_username) => {
        return window.location.href = `data/${employee_username}`
    }

    const onDelete = async(code) => {
        setLoading(true);
        try {
            const response = await dispacth(deleteEmployee(code)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Data berhasil dihapus');
                setTimeout(() => {
                   return window.location.reload(); 
                }, 1000);
            }
        } catch (error) {
            
        }
    }

    return (
        <Employee>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div style={{lineHeight: '60%'}}>
                            <h3>DATA KARYAWAN</h3>
                            <span>List Data Karyawan</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive mb-3">
                            <table className="table table-borderless align-middle">
                                <thead>
                                    <tr>
                                        <th className="text-center table-border-start" style={{width: '5%'}}>
                                            <span className="form-control fw-bold">
                                                No
                                            </span>
                                        </th>
                                        <th style={{width: '40%'}}>
                                            <span className="form-control fw-bold">
                                                Nama Lengkap
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Posisi
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Jabatan
                                            </span>
                                        </th>
                                        <th className="text-center">
                                            <span className="form-control fw-bold">
                                                Status
                                            </span>
                                        </th>
                                        <th style={{width: '15%'}} className="text-center table-border-end">
                                            <span className="form-control fw-bold">
                                                Action
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        employee.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">{ data.no }</td>
                                                    <td>{ data.name }</td>
                                                    <td>{ data.posisi }</td>
                                                    <td>{ data.jabatan }</td>
                                                    <td className="text-center">
                                                        <span className="px-2 py-1 rounded text-white bg-pink">active</span>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Button onClick={() => onDetail(data.username)} size="small" variant="contained" color="success" sx={{mr: 2}}>
                                                                Detail
                                                            </Button>
                                                            <Button onClick={() => onDelete(data.code)} size="small" variant="contained" color="error">
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* pagination */}
                        <div className="d-flex justify-content-between">
                            <div>
                                <span>Halaman : { pagination.current_page }</span>
                            </div>

                            {
                                pagination.pagination ? 
                                <div>
                                    <a style={{cursor: 'pointer'}} onClick={() => handlePagination(pagination.current_page - 1)} className="text-primary me-2">Sebelumnya</a>
                                    <a style={{cursor: 'pointer'}} onClick={() => handlePagination(pagination.current_page + 1)} className="text-primary">Selanjutnya</a>
                                </div> : ''
                            }

                            <div>
                                <span>Total : { pagination.total } Karyawan </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Employee>
    )
}

export default EmployeeData
