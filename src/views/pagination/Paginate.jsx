import { Pagination, PaginationItem } from '@mui/material'
import React from 'react'

const Paginate = (props) => {
    return (
        <Pagination 
            count={props.count}
            renderItem={(items) => (
                <PaginationItem 
                    {...items}
                    disabled={items.page === props.page || items.page === 0 || items.page === props.count + 1 ? true : false}
                />
            )}
            onChange={props.onChange}
            
        />
    )
}

export default Paginate
