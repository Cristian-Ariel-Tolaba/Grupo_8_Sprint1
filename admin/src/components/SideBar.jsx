import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <Link
        className="sidebar-brand" to="/">
          <img
            src="/images/logo.png"
            alt=""
            style={{width:'100px'}}
          />
      </Link>

      <hr className="sidebar-divider mt-0 mt-4" />

      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard - Vino Y Se Fue </span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Actions</div>

      <li className="nav-item">
        <Link className="nav-link collapsed" to="/products">
          <i className="fas fa-fw fa-folder"></i>
          <span>Productos</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/users">
          <i className="fas fa-fw fa-users"></i>
          <span>Usuarios</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/categories">
          <i className="fas fa-fw fa-table"></i>
          <span>Categorias</span>
        </Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
    </ul>
  );
};

export default SideBar;
