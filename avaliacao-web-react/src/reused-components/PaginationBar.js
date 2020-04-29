<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React from 'react'
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

const PaginationBar = props => {

<<<<<<< HEAD
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (e, index) => {
        e.preventDefault();
        setCurrentPage(index);
=======

    const handlePageClick = (e, index) => {
        e.preventDefault();
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
        props.onCurrentPageChange(index)
    };

    const handleFirstClick = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        setCurrentPage(0);
=======
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
        props.onCurrentPageChange(0)
    };

    const handlePreviousClick = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        setCurrentPage(currentPage - 1);
        props.onCurrentPageChange(currentPage - 1)
=======
        props.onCurrentPageChange(props.currentPage - 1)
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
    };

    const handleNextClick = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        setCurrentPage(currentPage + 1);
        props.onCurrentPageChange(currentPage + 1)
=======
        props.onCurrentPageChange(props.currentPage + 1)
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
    };

    const handleLastClick = (e) => {
        e.preventDefault();
<<<<<<< HEAD
        setCurrentPage(props.numPages - 1);
=======
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
        props.onCurrentPageChange(props.numPages - 1)
    };

    return (
        <div style={{ overflow: "auto" }}>
            <Pagination>
                <PaginationItem>
                    <PaginationLink onClick={e => handleFirstClick(e)} first href="#" />
                </PaginationItem>
<<<<<<< HEAD
                <PaginationItem disabled={currentPage <= 0}>
=======
                <PaginationItem disabled={props.currentPage <= 0}>
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                    <PaginationLink onClick={e => handlePreviousClick(e)} previous href="#" />
                </PaginationItem>
                {
                    [...Array(props.numPages)].map((page, i) => {
                        return (
<<<<<<< HEAD
                            <PaginationItem active={i === currentPage} key={i}>
=======
                            <PaginationItem active={i === props.currentPage} key={i}>
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
                                <PaginationLink onClick={e => handlePageClick(e, i)} href="#">
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
<<<<<<< HEAD
                <PaginationItem disabled={currentPage >= props.numPages - 1}>
=======
                <PaginationItem disabled={props.currentPage >= props.numPages - 1}>
>>>>>>> 9f7776f790e23ee63e1e50f07b9000fa6124a1ef
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