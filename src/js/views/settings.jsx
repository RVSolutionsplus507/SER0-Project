import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/app.css";
import "../../css/glass.css";
import { useTranslation } from "react-i18next";

export const Settings = () => {
    const [t] = useTranslation("app");

    const navigate = useNavigate();
    return (
        <>
            <div className="font-serif text-gray-200 min-h-screen bg-[url('SettingsBG.jpg')] bg-cover">
                <div className="h-28"></div>
                {/* <img
                    src="../../../public/SettingsBG.jpg"
                    className="w-[100%] h-[100%] -z-50 fixed object-cover"></img> */}
                <h1 className="lg:px-36 text-xl minimum:text-[0.5rem] tiny:text-3xl sm:text-7xl md:text-6xl font-black z-10 text-white">
                    Settings
                </h1>
                <div className="glass p-10 w-11/12 mt-5 m-auto">
                    SETTINGS
                </div>
            </div>
        </>
    );
};
