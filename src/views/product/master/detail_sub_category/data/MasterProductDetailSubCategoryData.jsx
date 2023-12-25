import React, { useEffect, useState } from 'react'
import MasterProductDetailSubCategory from '../MasterProductDetailSubCategory'
import { useDispatch } from 'react-redux'
import { getProductSubCategoryDetail } from '../../../../../models/product/product_sub_category_detail_m';
import toast from 'react-hot-toast';

const MasterProductDetailSubCategoryData = () => {
    const dispatch = useDispatch();

    const [subCategoryDetail, setSubCategoryDetail] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getData = async(page) => {
        try {
            const response = await dispatch(getProductSubCategoryDetail(page)).unwrap().catch((err) => {});
            setSubCategoryDetail(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getData(1);
    }, []);

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada dihalaman pertama')
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir')
        } else {
            return getData(page);
        }
    }

    return (
        <MasterProductDetailSubCategory>
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
                                        <th className="table-border-end">
                                            <span className="form-control">Detail Sub Kategori</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        subCategoryDetail.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td>{ data.no }</td>
                                                    <td>{ data.code }</td>
                                                    <td>{ data.category }</td>
                                                    <td>{ data.sub_category }</td>
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
                                <span>Total : { pagination.total } Detail Sub Kategori</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterProductDetailSubCategory>
    )
}

export default MasterProductDetailSubCategoryData
