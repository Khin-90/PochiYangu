import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">{t("welcome")}</h1>
      <div className="flex items-center">
        <Link className="mx-2 hover:text-blue-200" to="/">
          {t("home")}
        </Link>
        <Link className="mx-2 hover:text-blue-200" to="/apply-loan">
          {t("applyLoan")}
        </Link>
        <Link className="mx-2 hover:text-blue-200" to="/repay-loan">
          {t("repayLoan")}
        </Link>
        <Link className="mx-2 hover:text-blue-200" to="/profile">
          {t("profile")}
        </Link>
        <div className="ml-4">
          <button
            onClick={() => changeLanguage("en")}
            className="mx-1 px-2 py-1 bg-white text-blue-500 rounded hover:bg-gray-200"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("sw")}
            className="mx-1 px-2 py-1 bg-white text-blue-500 rounded hover:bg-gray-200"
          >
            Swahili
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;