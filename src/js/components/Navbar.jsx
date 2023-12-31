import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageButton } from "./LanguageButton.jsx";
import { Darkmode } from "./Darkmode.jsx";
import "../../css/glass.css";

export const Navbar = () => {
    const [t] = useTranslation("app");
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed flex justify-between items-center z-40 w-screen py-3 font-serif dark:text-gray-200 text-black glassNav top-0 left-0">
            <h2
                className="text-4xl font-semibold ml-10 lg:ml-32 cursor-pointer"
                onClick={() => {
                    navigate("/");
                }}>
                SERØ.
            </h2>
            <div
                className="hidden resp:flex justify-center items-center mr-5 w-10 h-10 text-2xl bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] rounded-full cursor-pointer"
                onClick={() => {
                    setIsOpen(true);
                }}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div
                className={
                    "resp:fixed resp:top-0 resp:left-0 resp:w-full resp:h-screen resp:bg-[rgba(0,0,0,0.5)]" +
                    " " +
                    (isOpen ? "resp:block" : "hidden")
                }
                id="back__menu"
                onClick={() => {
                    setIsOpen(false);
                }}></div>
            <nav
                className={
                    "navbar-home mr-4 lg:mr-16 resp:dark:bg-zinc-950 resp:bg-white resp:m-0 resp:fixed resp:w-60 resp:h-screen resp:top-0 resp:p-7 resp:z-10" +
                    " " +
                    (isOpen ? "resp:right-0" : "resp:-right-60")
                }>
                <h2 className="text-gray-600 dark:text-gray-100 text-center text-4xl font-semibold hidden resp:block resp:mt-5">
                    SERØ.
                </h2>
                <ul className="flex items-center resp:mt-5 resp:flex-col">
                    <li className="my-2.5">
                        <NavLink
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            to="/"
                            className="text-xl font-medium ml-6 hover:text-cyan-300 hover:transition-all duration-300 resp:m-0">
                            {t("home")}
                        </NavLink>
                    </li>
                    <li className="my-2.5">
                        <NavLink
                            to="/founders"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                            className="text-xl font-medium ml-7 hover:text-cyan-300 hover:transition-all duration-300 resp:m-0">
                            {t("founders")}
                        </NavLink>
                    </li>
                    <li className="my-2.5">
                        <button
                            className="w-40 hover:bg-cyan-300 dark:hover:bg-cyan-300 transition duration-300 dark:hover:text-white text-xl p-2 text-white dark:text-black ml-6 hover:text-black bg-black dark:bg-white rounded-full resp:dark:bg-gray-100 resp:m-0 resp:border resp:border-gray-400 resp:dark:hover:text-gray-black resp:dark:hover:bg-gray-200"
                            onClick={() => {
                                navigate("/login");
                            }}>
                            {t("login")}
                        </button>
                    </li>
                    <li className="my-2.5">
                        <button
                            className="hover:bg-cyan-300 dark:hover:bg-cyan-300 transition duration-300 dark:hover:text-white hover:text-black w-40 text-xl p-2 text-white dark:text-black rounded-full bg-black dark:bg-white ml-4 resp:dark:bg-gray-100 resp:m-0 resp:border resp:border-gray-400 resp:dark:hover:text-gray-black resp:dark:hover:bg-gray-200"
                            onClick={() => {
                                navigate("/signup");
                            }}>
                            {t("signup")}
                        </button>
                    </li>
                    <li className="my-2.5">
                        <LanguageButton className="ml-3 md:mt-2.5 resp:absolute resp:top-3 resp:right-5 w-9 h-6" />
                    </li>
                    <li className="my-2.5">
                        <Darkmode className="text-[10%] ml-3 resp:absolute resp:top-3 resp:left-3" />
                    </li>
                </ul>
            </nav>
        </header>
    );
};
