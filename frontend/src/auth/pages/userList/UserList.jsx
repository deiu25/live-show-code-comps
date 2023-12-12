import React, { useEffect, useState } from "react";
import "./UserList.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UserStats } from "../../components/userStats/UserStats";
import { PageMenu } from "../../components/pageMenu/PageMenu";
import { Search } from "../../components/search/Search";
import { FaTrashAlt } from "react-icons/fa";
import { ChangeRole } from "../../components/changeRole/ChangeRole";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/features/auth/authSlice";
import { shortenText } from "../profile/Profile";
import { Spinner } from "../../components/loader/Loader";
import {
  FILTER_USERS,
  selectUsers,
} from "../../redux/features/auth/filterSlice";
import ReactPaginate from "react-paginate";

export const UserList = () => {
  useRedirectLoggedOutUser("/auth");
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const { users, isLoading } = useSelector((state) => state.auth);

  const filteredUsers = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const removeUser = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(getUsers());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Delete",
          onClick: () => removeUser(id),
        },
        {
          label: "Cancel",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    dispatch(FILTER_USERS({ users, search }));
  }, [dispatch, users, search]);

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  // End Pagination
  return (
    <div className="custom-card margin-top-2">
      <div className="custom-card-header centered-text">
        <PageMenu />
        <UserStats />
      </div>
      <div className="user-list">
        {isLoading && <Spinner />}
        {error && <p>Error: {error}</p>}
        <div className="table">
          <>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </>
          <>
            <h3 className="allUsers">All Users</h3>
          </>
          {!isLoading && users.length === 0 ? (
            <p>No user found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => {
                  const { _id, firstname, lastname, email, role } = user;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(firstname, 8)}</td>
                      <td>{shortenText(lastname, 8)}</td>
                      <td>{shortenText(email, 15)}</td>
                      <td>{role}</td>
                      <td>
                        <ChangeRole _id={_id} email={email} />
                      </td>
                      <td>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color="red"
                            onClick={() => confirmDelete(_id)}
                            cursor={"pointer"}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <hr />
        </div>
        <div className="pagination-div">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="activePage"
          />
        </div>
      </div>
    </div>
  );
};
