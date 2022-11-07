import { useEffect, useState } from "react";
import { Axios } from "../../helpers/Axios";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
} from "@mui/material";
import { deletePostByAdmin } from "../../functions/admin";
import { useSelector } from "react-redux";
import ShowPost from "./ShowPost";

export default function ListFolders() {
  const { admin } = useSelector((state) => ({ ...state }));
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [post, setPosts] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const [postDetails, setPostDetails] = useState(null);
  let { userId } = useParams();

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };
  const getPosts = async () => {
    const { data } = await Axios.get(`/admin/getPosts/${userId}`, {
      headers: {
        Authorization: `Bearer ${admin.token}`,
      },
    });
    setPosts(data);
  };
  useEffect(() => {
    getPosts();
  }, [deleted, admin]);

  const onClose = () => {
    setDeleteModal(false);
  };
  const deletePostHandler = async () => {
    const deleted = await deletePostByAdmin(deleteId, admin);
    setDeleteModal(false);
    setDeleted((prev) => !prev);
  };
  return (
    <Paper xs={{ width: "100%" }}>
      <TableContainer
        sx={{ maxHeight: "86vh", maxWidth: "100vw", minWidth: "87vw" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Text</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Posted At</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>View Post</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {post
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{p.user.username}</TableCell>
                  <TableCell>{p.text}</TableCell>
                  <TableCell>
                    {p.type === null
                      ? "Posts"
                      : p.type === "profile"
                      ? "profile"
                      : p.type === "cover"
                      ? "cover"
                      : ""}
                  </TableCell>
                  <TableCell>{p.comments.length}</TableCell>
                  <TableCell>
                    <Moment format="YYYY/MM/DD hh.mm A">{p.createdAt}</Moment>
                  </TableCell>
                  <TableCell>
                    {p.images ? (
                      <Avatar
                        sx={{
                          borderRadius: 0,
                          width: 50,
                          marginLeft: "10px",
                          height: 48,
                          objectFit: "cover",
                        }}
                        src={p.images[0].url}
                      />
                    ) : (
                      "No images to show"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setPostDetails(p);
                        setShowPost(true);
                      }}
                    >
                      View Post
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setDeleteId(p._id);
                        setDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                    <Dialog
                      open={deleteModal}
                      onClose={onClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      hideBackdrop={true}
                      sx={{ boxShadow: "none" }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure to delete?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Once deleted the post, it can not be restored
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={onClose}>Disagree</Button>
                        <Button onClick={() => deletePostHandler()} autoFocus>
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={post.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {showPost && (
        <ShowPost
          setShowPost={setShowPost}
          setPostDetails={setPostDetails}
          postDetails={postDetails}
        />
      )}
    </Paper>
  );
}
