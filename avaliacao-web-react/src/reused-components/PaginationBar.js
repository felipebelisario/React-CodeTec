import React, { useState } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

const PaginationBar = props => {

    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
        props.onCurrentPageChange(index)
    };

    const handleFirstClick = (e) => {
        e.preventDefault();
        setCurrentPage(0);
        props.onCurrentPageChange(0)
    };

    const handlePreviousClick = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage - 1);
        props.onCurrentPageChange(currentPage - 1)
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage + 1);
        props.onCurrentPageChange(currentPage + 1)
    };

    const handleLastClick = (e) => {
        e.preventDefault();
        setCurrentPage(props.numPages - 1);
        props.onCurrentPageChange(props.numPages - 1)
    };

    return (
        <div style={{ overflow: "auto" }}>
            <Pagination>
                <PaginationItem>
                    <PaginationLink onClick={e => handleFirstClick(e)} first href="#" />
                </PaginationItem>
                <PaginationItem disabled={currentPage <= 0}>
                    <PaginationLink onClick={e => handlePreviousClick(e)} previous href="#" />
                </PaginationItem>
                {
                    [...Array(props.numPages)].map((page, i) => {
                        return (
                            <PaginationItem active={i === currentPage} key={i}>
                                <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
                <PaginationItem disabled={currentPage >= props.numPages - 1}>
                    <PaginationLink onClick={e => handleNextClick(e)} next href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink onClick={e => handleLastClick(e)} last href="#" />
                </PaginationItem>
            </Pagination>
        </div>
    )
}

export default PaginationBar