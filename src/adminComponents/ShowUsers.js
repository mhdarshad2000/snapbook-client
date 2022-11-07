import {
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableBody,
  Button,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Axios } from "../helpers/Axios";
import { useSelector } from "react-redux";
import { AllUsers } from "../functions/admin";

export default function ShowUsers() {
  const [blocked, setBlocked] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { admin } = useSelector((state) => ({ ...state }));

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  useEffect(() => {
    getUsers();
  }, [blocked, admin]);
  const getUsers = async () => {
    const data = await AllUsers(admin);
    setUsers(data);
  };
  const blockUser = async (userId) => {
    const { data } = await Axios.put(
      `/admin/blockUser/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      }
    );
    if (data.response === "ok") {
      setBlocked((prev) => !prev);
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: "86vh", maxWidth:"100vw", minWidth:"87vw" }}>
        <Table stickyHeader aria-aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Picture</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, i) => (
                <TableRow>
                  <TableCell>{rowsPerPage*page + i + 1}</TableCell>
                  <TableCell>
                    <Avatar alt={user.username} src={user.picture} />
                  </TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">
                    {user.verified ? (
                      <Button variant="outlined" color="success">
                        Verified
                      </Button>
                    ) : (
                      <Button variant="outlined" color="warning">
                        Not Verified
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>
                    {user.bDay} / {user.bMonth} / {user.bYear}
                  </TableCell>
                  <TableCell align="center">
                    {user.isBlocked ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          blockUser(user._id);
                        }}
                      >
                        UnBlock
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          blockUser(user._id);
                        }}
                      >
                        Block
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </TableContainer>

    </Paper>
  );
}
