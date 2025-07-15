import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/users`
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard-All Users"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <>
            <h1 className="text-center">All Users</h1>
            <ul>
              {users.map(user => (
                <li key={user._id}>
                  {user.name} - {user.email} 
                </li>
              ))}
            </ul>
            </>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
