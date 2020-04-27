import React from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

const PaginationBar = props => {


    const handlePageClick = (e, index) => {
        e.preventDefault();
        props.onCurrentPageChange(index)
    };

    const handleFirstClick = (e) => {
        e.preventDefault();
        props.onCurrentPageChange(0)
    };

    const handlePreviousClick = (e) => {
        e.preventDefault();
        props.onCurrentPageChange(props.currentPage - 1)
    };

    const handleNextClick = (e) => {
        e.preventDefault();
        props.onCurrentPageChange(props.currentPage + 1)
    };

    const handleLastClick = (e) => {
        e.preventDefault();
        props.onCurrentPageChange(props.numPages - 1)
    };

    return (
        <div style={{ overflow: "auto" }}>
            <Pagination>
                <PaginationItem>
                    <PaginationLink onClick={e => handleFirstClick(e)} first href="#" />
                </PaginationItem>
                <PaginationItem disabled={props.currentPage <= 0}>
                    <PaginationLink onClick={e => handlePreviousClick(e)} previous href="#" />
                </PaginationItem>
                {
                    [...Array(props.numPages)].map((page, i) => {
                        return (
                            <PaginationItem active={i === props.currentPage} key={i}>
                                <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
                <PaginationItem disabled={props.currentPage >= props.numPages - 1}>
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