import React, { useEffect, useState } from 'react'
import MasterProductSubCategory from '../MasterProductSubCategory'
import { useDispatch } from 'react-redux'
import { getProductSubCategory } from '../../../../../models/product/product_sub_category_m';
import toast from 'react-hot-toast';

const MasterProductSubCategoryData = () => {
    const dispacth = useDispatch();

    const [subCategory, setSubCategory] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataSubCategory = async(page) => {
        try {
            const response = await dispacth(getProductSubCategory(page)).unwrap().catch((err) => {});
            setSubCategory(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataSubCategory(1);
    }, []);

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada dihalaman pertama')
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir')
        } else {
            return getDataSubCategory(page);
        }
    }

    return (
        <MasterProductSubCategory>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive mb-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width: '5%'}} className="text-center table-border-start">
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kategori</span>
                                        </th>
                                        <th className="table-border-end">
                                            <span className="form-control">Sub Kategori</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subCategory.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td>{ data.no }</td>
                                                    <td>{ data.code }</td>
                                                    <td>{ data.category }</td>
                                                    <td>{ data.name }</td>
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
                                    <a onClick={() => handlePagination(pagination.current_page - 1)} className="text-primary me-2" style={{cursor: 'pointer'}}>Sebelumnya</a>
                                    <a onClick={() => handlePagination(pagination.current_page + 1)} className="text-primary" style={{cursor: 'pointer'}}>Selanjutnya</a>
                                </div> : ''
                            }
                            <div>
                                <span>Total : { pagination.total } Sub Kategori</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterProductSubCategory>
    )
}

export default MasterProductSubCategoryData
