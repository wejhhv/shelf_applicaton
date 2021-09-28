import React, { useContext } from "react";
import "./style.scss";
import logo from "./logo.svg";
import titleLogo from "./logo_title.svg";
import { authContext } from "../hooks/useAuthContext";

export const AppBar: React.FC = () => {
  const auth = useContext(authContext);

  return (
    <div className="app-bar">
      <img className="app-bar--logo" src={logo} alt="" />
      <img className="app-bar--title-logo" src={titleLogo} alt="" />
      <div className="spacer"></div>
      {auth.userId ? (
        <button
          className="app-bar--books-register"
          onClick={() => {
            // TODO: クリックしたときの挙動をどうにかする
            window.alert("本棚連携の実装");
          }}
        >
          本棚連携
        </button>
      ) : null}
    </div>
  );
};
