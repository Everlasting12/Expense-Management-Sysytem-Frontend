import React from "react";
import { NavLink } from "react-router-dom";

const MenuItems = ({ type, menus }) => {
  return (
    <div>
      <div className="flex item-center">
        {menus.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.to}
            className={({ isActive }) =>
              isActive
                ? "mx-2 mt-1 py-1 px-5 text-xs outline-none border-b-[3px]  text-[#3F7BDA] border-[#3F7BDA]"
                : "mx-2 mt-1 py-1 px-5 text-xs outline-none border-b-[3px]  border-slate-300"
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </div>
      <hr
        className="border-[3px] border-t-0 border-slate-300"
        style={{ marginTop: "-3px" }}
      />
    </div>
  );
};

export default MenuItems;
