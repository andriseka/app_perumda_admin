import React, { useEffect, useState } from 'react'
import ProductMerk from '../ProductMerk'
import { useDispatch } from 'react-redux'
import { getProductMerk } from '../../../../../models/product/product_merk_m';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';

const ProductMerkData = () => {
    const dispatch = useDispatch();

    const [merk, setMerk] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataMerk = async(page) => {
        try {
            const response = await dispatch(getProductMerk(page)).unwrap().catch((err) => {});
            setMerk(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataMerk(1)
    }, []);

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama')
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir')
        } else {
            return getDataMerk(page);
        }
    }

    return (
        <ProductMerk>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="text-center">
                            <h3>DATA MERK PRODUK <br /> PERUMDA ANEKA USAHA KAB. JEPARA</h3>
                        </div>

                        <div className="table-responsive mb-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="table-border-start text-center" style={{width: '5%'}}>
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Merk</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kategori</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Nama Merk</span>
                                        </th>
                                        <th className="table-border-end text-center" style={{width: '15%'}}>
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        merk.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">
                                                        { data.no }
                                                    </td>
                                                    <td>
                                                        { data.code_child }
                                                    </td>
                                                    <td>
                                                        { data.category }
                                                    </td>
                                                    <td>
                                                        { data.name }
                                                    </td>

                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Button variant="contained" color="success" size="small" sx={{mr: 1}}>
                                                                Detail
                                                            </Button>
                                                            <Button variant="contained" color="error" size="small">
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
                                <span>Halaman : { pagination.current_page ? pagination.current_page : '' }</span>
                            </div>
                            {
                                pagination.pagination ? 
                                <div className="text-primary">
                                    <a className="me-2" onClick={() => handlePagination(pagination.current_page - 1)} style={{cursor: 'pointer'}}>Sebelumnya</a>
                                    <a onClick={() => handlePagination(pagination.current_page + 1)} style={{cursor: 'pointer'}}>Selanjutnya</a>
                                </div> : ''
                            }
                            <div>
                                <span>Total : { pagination.total ? pagination.total : '' } Merk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProductMerk>
    )
}

export default ProductMerkData
