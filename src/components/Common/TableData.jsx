import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Define columns configuration
const columns = [
  { id: "ticketid", label: "Ticket", minWidth: 20, align: "center" },
  { id: "description", label: "Description", minWidth: 50 },
  { id: "owner", label: "Owner", minWidth: 50, align: "center" },
  { id: "assetsiteid", label: "Organization", minWidth: 50, align: "center" },
  { id: "commodity", label: "Commodity", minWidth: 100, align: "center" },
  { id: "reportedby", label: "Reported By", minWidth: 50, align: "center" },
  { id: "reportdate", label: "Reported Date", minWidth: 50, align: "center" },
    { id: "commoditygroup", label: "Commodity Group", minWidth: 100, align: "center" },
  { id: "reportedpriority", label: "Priority", minWidth: 100, align: "center" },
];

// Styled TableCell for header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.875rem",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:first-of-type": {
    borderTopLeftRadius: theme.shape.borderRadius
  },
  "&:last-of-type": {
    borderTopRightRadius: theme.shape.borderRadius
  }
}));

// Styled TableRow for header
const StyledTableRow = styled(TableRow)({
  "&:last-child td, &:last-child th": {
    border: 0
  }
});

const TableData = ({ srData = [], loading = false, error = null }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(
      event.target.value === "All" ? srData.length : +event.target.value
    );
    setPage(0);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4, color: "error.main" }}>
        Error loading data: {error}
      </Box>
    );
  }

  if (!srData || srData.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        No service requests found
      </Box>
    );
  }

  console.log(srData)

  return (
    <Paper sx={{ 
      width: "100%", 
      overflow: "hidden",
      boxShadow: 3,
      borderRadius: 2
    }}>
      <TableContainer sx={{ maxHeight: "90vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? srData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : srData
            ).map((row, index) => (
              <TableRow 
                hover 
                role="checkbox" 
                tabIndex={-1} 
                key={row.sr + index}
                sx={{ 
                  "&:nth-of-type(odd)": {
                    backgroundColor: "action.hover"
                  },
                  "&:last-child td": {
                    borderBottom: 0
                  }
                }}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell 
                      key={column.id} 
                      align={column.align}
                      sx={{
                        fontSize: "0.875rem",
                        padding: "12px 16px"
                      }}
                    >
                      {value || "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, { label: "All", value: "All" }]}
        component="div"
        count={srData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          borderTop: "1px solid",
          borderColor: "divider"
          }}
      />
    </Paper>
  );
};

export default TableData;