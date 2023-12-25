import React, { useEffect, useState } from 'react'
import MatserProductCategory from '../MatserProductCategory'
import { useDispatch } from 'react-redux'
import { getProductCategory } from '../../../../../models/product/product_category_m';
import toast from 'react-hot-toast';
import Paginate from '../../../../pagination/Paginate';

const MasterProductCategoryData = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataCategoryProduct = async(page) => {
        try {
            const response = await dispatch(getProductCategory(page)).unwrap().catch((err) => {});
            setCategory(response.data);
            setPagination(response.pagination);
            
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataCategoryProduct(1);
    }, []);

    const handlePagination = (_, page) => {
        return getDataCategoryProduct(page)
    }

    return (
        <MatserProductCategory>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive mb-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width: '5%'}} className="table-border-start">
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode</span>
                                        </th>
                                        <th className="table-border-end">
                                            <span className="form-control">Nama Kategori</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        category.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td>
                                                        { data.no }
                                                    </td>
                                                    <td>
                                                        { data.code }
                                                    </td>
                                                    <td>
                                                        { data.name }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* pagination */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span>Halaman : {pagination.current_page}</span>
                            </div>
                            <div>
                                {
                                    pagination.pagination ? 
                                    <Paginate count={pagination.last_page} page={pagination.current_page} onChange={handlePagination} /> : ''
                                }
                            </div>
                            <div>
                                <span>Total : {pagination.total} Kategori</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MatserProductCategory>
    )
}

export default MasterProductCategoryData
