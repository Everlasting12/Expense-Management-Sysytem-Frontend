import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { getAllUsersAction } from "../redux/actions/usersAction";
import { deleteMemberAction } from "../redux/actions/membersAction";

const Member = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const users = useSelector((state) => state.usersReducer.users);
  const members = useSelector((state) => state.membersReducer.members);
  const households = useSelector((state) => state.householdReducer.households);

  useEffect(() => {
    dispatch(getAllUsersAction(""));
  }, []);
  useEffect(() => {
    getCurrentMembers();
  }, [searchText]);

  function getCurrentMembers() {
    let array = [];
    households.forEach((h) => {
      members.forEach((m) => {
        if (m.household === h._id) {
          const user = users.find((user) => user._id === m.user);
          if (user) {
            array.push({
              _id: m._id,
              fullname: user.firstName + " " + user.lastName,
              householdId: h._id,
              householdName: h.name,
            });
          }
        }
      });
    });
    if (searchText) {
      const f = array.filter((a) => {
        const regexp = new RegExp(`${searchText}`, "ig");
        if (a.fullname.match(regexp) || a.householdName.match(regexp)) {
          return a;
        }
      });
      array = [...f];
    }

    return array;
  }

  const handleDelete = (memberId) => {
    const result = window.confirm("Do you want to delete this Member?");
    if (result) dispatch(deleteMemberAction(memberId));
  };

  return (
    <>
      <div className="flex justify-between items-center my-3">
        <div className="w-1/3 flex items-center shadow rounded-lg overflow-clip px-3">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="px-2 py-2 outline-none text-sm placeholder:text-xs placeholder:text-slate-700 w-full"
            onChange={(e) => {
              setSearchText(e.target.value.trim());
            }}
          />
          <MdSearch className="cursor-pointer rounded-full text-[#3F7BDA] text-xl" />
        </div>
        <div>
          <Link
            className="px-2 py-0 bg-[#3F7BDA] text-white rounded-full text-2xl shadow-md"
            to="memberForm"
          >
            +
          </Link>
        </div>
      </div>
      {getCurrentMembers().length === 0 ? (
        <span className="text-lg text-center block">
          No <b>Members</b> in the Database...
        </span>
      ) : (
        <div className="h-[calc(100%-150px)] w-full overflow-auto mt-4 ">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 text-white bg-[#3F7BDA] dark:bg-gray-700 dark:text-gray-400">
              <tr className="sticky top-0 font-nunito">
                <th
                  scope="col"
                  className="sticky top-0 w-10 py-2 px-6 font-extralight"
                >
                  No.
                </th>
                <th
                  scope="col"
                  className="sticky top-0 py-2 px-6 font-extralight"
                >
                  Members
                </th>
                <th
                  scope="col"
                  className="sticky top-0 py-2 px-6 font-extralight"
                >
                  Houshold Name
                </th>
                <th
                  scope="col"
                  className="sticky top-0 py-2 px-6 font-extralight"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {getCurrentMembers().map((d, index) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={d?._id}
                  >
                    <td
                      scope="row"
                      className="w-10 py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {++index}
                    </td>
                    <td
                      scope="row"
                      className="w-10 py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {d?.fullname}
                    </td>
                    <td
                      scope="row"
                      className="py-2 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {d?.householdName}
                    </td>
                    <td className="py-2 px-6 flex ">
                      {/* <Link to={`memberForm/${d?._id}`}>
                        <MdOutlineEdit
                          size={20}
                          className="text-[#3F7BDA] bg-slate-50 p-[5px] w-7 h-7 rounded-full cursor-pointer hover:bg-slate-100 focus:bg-slate-100"
                        />
                      </Link> */}

                      <MdDeleteOutline
                        size={20}
                        className="text-[#3F7BDA] bg-slate-50 p-[5px] w-7 h-7 rounded-full cursor-pointer hover:bg-slate-100 focus:bg-slate-100 ml-2"
                        onClick={() => handleDelete(d?._id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Member;
