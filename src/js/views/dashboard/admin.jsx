import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import "../../../css/app.css";
import "../../../css/glass.css";
import { FaSearch } from "react-icons/fa";
import { UpdateUserModal } from "../../components/adminView/UpdateUserModal";
import { DeleteUserModal } from "../../components/adminView/DeleteUserModal";
import { useTranslation } from "react-i18next";

export const Admin = () => {
    const navigate = useNavigate();
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [user, setUser] = useState();
    const [t] = useTranslation("admin");
    const { store, actions } = useContext(Context);
    const users = store.users?.filter(user => {
        return user.id !== store.user.id;
    });

    useEffect(() => {
        actions.getAllUsers(store.token);
    }, []);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    // const [clients, setClients] = useState(store.clients);
    const [sortOrder, setSortOrder] = useState({
        column: "name",
        ascending: true
    });
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers =
        users &&
        users
            .filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) =>
                sortOrder.ascending
                    ? a[sortOrder.column].localeCompare(b[sortOrder.column])
                    : b[sortOrder.column].localeCompare(a[sortOrder.column])
            )
            .slice(indexOfFirstUser, indexOfLastUser);

    // Labels Filtrados
    const sortUsers = (users, column, ascending) => {
        return users.sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];
            return ascending
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
    };

    const handleSort = column => {
        setSortOrder({
            column,
            ascending: sortOrder.column === column ? !sortOrder.ascending : true
        });
    };

    return (
        <>
            {isOpenEdit && (
                <UpdateUserModal setIsOpen={setIsOpenEdit} user={user} />
            )}
            {isOpenDelete && (
                <DeleteUserModal setIsOpen={setIsOpenDelete} user={user} />
            )}
            <img
                src="https://firebasestorage.googleapis.com/v0/b/ser0-project.appspot.com/o/images%2Fadmin%2FAdminBG.jpeg?alt=media&token=bb862525-094d-4ea4-bd01-ad4ed93518fe"
                className="invert w-screen h-screen -z-50 fixed object-cover top-0 left-0 dark:invert-0 transition duration-500"
            />
            <div className=" font-serif text-gray-200 mt-28">
                <h2 className="w-10/12 text-3xl minimum:text-4xl md:text-5xl lg:text-6xl font-black z-10 text-black dark:text-white m-auto">
                    {t("admin")}
                </h2>
                <div className="glass p-[3vw] mt-5 m-auto tiny:w-11/12 w-[98%]">
                    <div className="flex justify-between items-center mb-5">
                        <div className="relative w-96 max-w-[65%]">
                            <input
                                type="text"
                                placeholder="Search users"
                                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900 dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white w-full"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute top-0 md:right-4 tiny:right-2 right-1 mt-3">
                                <FaSearch className="h-4 w-4 fill-current text-gray-800 dark:text-gray-500" />
                            </span>
                        </div>
                        <button
                            className="bg-orange-300 hover:bg-orange-400 sm:px-4 p-2 rounded-lg dark:bg-cyan-300 text-black dark:hover:bg-cyan-400 focus:outline-none focus:ring-2 transition duration-300 focus:ring-blue-600 border border-black focus:ring-opacity-50"
                            onClick={() => navigate("/createUser")}>
                            Add User
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="text-black dark:text-white table w-full">
                            <thead>
                                <tr>
                                    {/* <th
                                        className="px-4 py-2"
                                        onClick={() => handleSort("image")}>
                                        Image{" "}
                                        {sortOrder.column === "image" &&
                                            (sortOrder.ascending ? "▲" : "▼")}
                                    </th> */}
                                    <th
                                        className="px-4 py-2"
                                        onClick={() => handleSort("name")}>
                                        Name{" "}
                                        {sortOrder.column === "name" &&
                                            (sortOrder.ascending ? "▲" : "▼")}
                                    </th>
                                    <th
                                        className="px-4 py-2"
                                        onClick={() => handleSort("lastname")}>
                                        Lastname{" "}
                                        {sortOrder.column === "lastname" &&
                                            (sortOrder.ascending ? "▲" : "▼")}
                                    </th>
                                    <th
                                        className="px-4 py-2"
                                        onClick={() => handleSort("email")}>
                                        Email{" "}
                                        {sortOrder.column === "email" &&
                                            (sortOrder.ascending ? "▲" : "▼")}
                                    </th>
                                    <th
                                        className="px-4 py-2"
                                        onClick={() => handleSort("role")}>
                                        Role{" "}
                                        {sortOrder.column === "role" &&
                                            (sortOrder.ascending ? "▲" : "▼")}
                                    </th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-4 py-2 text-center">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {user.lastname}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {user.email}
                                        </td>
                                        <td>
                                            {user.role.map((role, i) => {
                                                return (
                                                    <span key={i}>
                                                        {role.role}
                                                        {i !==
                                                            user.role.length -
                                                                1 && ","}
                                                    </span>
                                                );
                                            })}
                                        </td>
                                        <td className="py-2 text-center">
                                            <button
                                                key={user.id}
                                                className="p-1 border border-black dark:border-white rounded"
                                                onClick={() => {
                                                    setIsOpenEdit(true);
                                                    setUser(user);
                                                }}>
                                                Editar
                                            </button>
                                            <button
                                                key={user.id}
                                                className="p-1 border border-black dark:border-white rounded"
                                                onClick={() => {
                                                    setIsOpenDelete(true);
                                                    setUser(user);
                                                }}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between items-center mt-5">
                        <div className="tiny:w-96 text-gray-700 dark:text-gray-600">
                            Showing {indexOfFirstUser + 1} to {indexOfLastUser}{" "}
                            of {users.length} entries
                        </div>
                        <div className="w-full overflow-auto flex justify-end">
                            <ul
                                className="flex rounded list-none"
                                style={{ gap: 0 }}>
                                <li>
                                    <button
                                        className="relative block p-2.5 leading-tight text-black border-r-0 rounded-l bg-orange-300 hover:bg-orange-400 dark:bg-cyan-300 dark:hover:bg-cyan-400 transition duration-300 focus:outline-none"
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}>
                                        <span>Previous</span>
                                    </button>
                                </li>
                                {Array.from(
                                    {
                                        length: Math.ceil(
                                            users.length / usersPerPage
                                        )
                                    },
                                    (_, i) => (
                                        <li key={i}>
                                            <button
                                                className={`transition duration-300 relative block p-2.5 leading-tight text-blue-900 border-r-0 bg-orange-300 hover:bg-orange-400 dark:bg-cyan-300 dark:hover:bg-cyan-400 focus:outline-none ${
                                                    currentPage === i + 1
                                                        ? "z-10 bg-orange-400 hover:bg-orange-500 dark:bg-cyan-400 dark:hover:bg-cyan-500 text-white"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setCurrentPage(i + 1)
                                                }>
                                                {i + 1}
                                            </button>
                                        </li>
                                    )
                                )}
                                <li>
                                    <button
                                        className="bg-orange-300 hover:bg-orange-400 relative block p-2.5 leading-tight bg-w text-black dark:bg-cyan-300 rounded-r dark:hover:bg-cyan-400 text-black transition duration-300 focus:outline-none"
                                        onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                        }
                                        disabled={
                                            currentPage ===
                                                Math.ceil(
                                                    users.length / usersPerPage
                                                ) || users.length < 1
                                        }>
                                        <span>Next</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="font-serif text-black dark:text-white mt-28">
                <h2 className="w-10/12 text-3xl minimum:text-4xl md:text-5xl lg:text-6xl font-black z-10 m-auto">
                    {t("admin")}
                </h2>
                <div className="glass p-10 mt-5 m-auto w-11/12">
                    {users && (
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <td className="font-bold">ID</td>
                                    <td className="font-bold">Name</td>
                                    <td className="font-bold">Lastname</td>
                                    <td className="font-bold">Email</td>
                                    <td className="font-bold">Role</td>
                                    <td className="font-bold">Edit</td>
                                    <td className="font-bold">Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.role.map((role, i) => {
                                                    return (
                                                        <span key={i}>
                                                            {role.role}
                                                            {i !==
                                                                user.role
                                                                    .length -
                                                                    1 && ","}
                                                        </span>
                                                    );
                                                })}
                                            </td>
                                            <td>
                                                <button
                                                    className="p-1 border border-black dark:border-white rounded"
                                                    onClick={() => {
                                                        setIsOpenEdit(true);
                                                        setUser(user);
                                                    }}>
                                                    Editar
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="p-1 border border-black dark:border-white rounded"
                                                    onClick={() => {
                                                        setIsOpenDelete(true);
                                                        setUser(user);
                                                    }}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div> */}
        </>
    );
};
