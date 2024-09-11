import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Button, FormGroup, MenuItem, Select } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircularProgress from "@mui/material/CircularProgress";
import CustomButtons from "./buttons";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#304FFE",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function CustomTable({
  headers,
  records,
  totalRecords,
  pageLength,
  buttons,
  onPageChange,
  onPageLengthChange,
  loader,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(pageLength);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const handleSort = (headerId) => {
    const isAsc = sortColumn === headerId && sortDirection === "asc";
    const newSortDirection = isAsc ? "desc" : "asc";
    setSortColumn(headerId);
    setSortDirection(newSortDirection);
    onPageChange(page, rowsPerPage, headerId, newSortDirection, search);
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
      onPageChange(page + 1, rowsPerPage, "", "", search);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
      onPageChange(page - 1, rowsPerPage, "", "", search);
    }
  };

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex);
    onPageChange(pageIndex, rowsPerPage, "", "", search);
  };

  const currentRecords = records;

  const renderPagination = () => {
    const pagination = [];

    if (totalPages <= 3) {
      for (let i = 0; i < totalPages; i++) {
        pagination.push(
          <Button
            key={i}
            onClick={() => handlePageClick(i)}
            sx={{
              bgcolor: page === i ? "#304FFE" : "rgba(0, 0, 0, 0.26)",
              minWidth: "45px",
              color: "#fff",
              margin: "0 3px",
            }}
          >
            {i + 1}
          </Button>
        );
      }
    } else {
      if (page > 1) {
        pagination.push(
          <Button
            key={0}
            size="small"
            onClick={() => handlePageClick(0)}
            sx={{
              minWidth: "45px",
              bgcolor: "rgba(0, 0, 0, 0.26)",
              color: "#fff",
              margin: "0 3px",
            }}
          >
            1
          </Button>
        );
      }

      if (page === totalPages - 2 || page === totalPages - 1) {
        pagination.push(<span key="ellipsis1">...</span>);
      }

      pagination.push(
        <Button
          key={page}
          size="small"
          onClick={() => handlePageClick(page)}
          sx={{
            fontWeight: "bold",
            minWidth: "45px",
            bgcolor: "#304FFE",
            color: "#fff",
            margin: "0 3px",
          }}
        >
          {page + 1}
        </Button>
      );

      if (page <= totalPages - 2) {
        if (page !== totalPages - 2) {
          pagination.push(<span key="ellipsis2">...</span>);
        }
        pagination.push(
          <Button
            size="small"
            key={totalPages - 1}
            onClick={() => handlePageClick(totalPages - 1)}
            sx={{
              minWidth: "45px",
              bgcolor: "rgba(0, 0, 0, 0.26)",
              color: "#fff",
              marginLeft: "3px",
            }}
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pagination;
  };

  return (
    <Paper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <div>
          <span>Page Length: </span>
          <Select
            value={rowsPerPage}
            onChange={(e) => {
              const newPageLength = Number(e.target.value);
              setRowsPerPage(newPageLength);
              onPageLengthChange(newPageLength);
              setPage(page);
              onPageChange(page, newPageLength, "", "", search);
            }}
            sx={{
              height: "25px",
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </div>

        <FormGroup row>
          <TextField
            variant="outlined"
            placeholder="Search"
            label="Search"
            size="small"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
              onPageChange(0, rowsPerPage, "", "", e.target.value);
            }}
            sx={{
              "& .css-psxfu6-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: 0,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            sx={{
              minWidth: "30px",
              padding: "6px 12px",
              borderRadius: 0,
            }}
          >
            <SearchOutlinedIcon />
          </Button>
        </FormGroup>
      </div>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="custom table">
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <StyledTableCell
                  key={header.id}
                  onClick={() => header.id !== "0" && handleSort(header.id)} // Call sorting when clicked
                  sx={{
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                  align="center"
                >
                  {header.label}
                  {header.id !== "0" ? (
                    <>
                      {sortColumn === header.id ? (
                        sortDirection === "asc" ? (
                          <KeyboardArrowUpIcon fontSize="small" />
                        ) : (
                          <KeyboardArrowDownIcon fontSize="small" />
                        )
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {!loader ? (
              <>
                {currentRecords.length >= 1 ? (
                  currentRecords.map((row) => (
                    <StyledTableRow key={row.id}>
                      {headers.map((header) => (
                        <StyledTableCell key={header.id} align="center">
                          {header.id === "0" ? (
                            <CustomButtons buttons={buttons} row={row} />
                          ) : header.id === "profilePath" ||
                            header.id === "Image" ? (
                            <a
                              href={row.image}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={row.image}
                                style={{ width: "50px", height: "50px" }}
                              />
                            </a>
                          ) : (
                            row[header.id]
                          )}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      colSpan={headers.length}
                      align="center"
                    >
                      No Record Found
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </>
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  colSpan={headers.length}
                  align="center"
                >
                  <CircularProgress />
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <div style={{ fontWeight: "bold" }}>
          Showing {page * rowsPerPage + 1}-
          {Math.min((page + 1) * rowsPerPage, totalRecords)} of {totalRecords}{" "}
          records
        </div>

        <div>
          <Button
            color="primary"
            component="span"
            size="small"
            onClick={handlePreviousPage}
            disabled={page === 0}
            sx={{
              minWidth: "45px",
              margin: "0 3px",
              "& :hover": {
                bgcolor: "#f9f9f9",
              },
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </Button>
          {renderPagination()}
          <Button
            color="primary"
            component="span"
            size="small"
            onClick={handleNextPage}
            disabled={page === totalPages - 1}
            sx={{
              minWidth: "45px",
              "& :hover": {
                bgcolor: "#f9f9f9",
              },
            }}
          >
            <ArrowForwardIosOutlinedIcon />
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default CustomTable;
