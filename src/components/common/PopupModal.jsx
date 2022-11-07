import React from "react";

const PopupModal = ({ array, isPopUpOpen, domNode, ExpName }) => {
  return (
    <div
      className={`${
        isPopUpOpen ? "flex" : "hidden"
      } h-screen w-[100%] md:w-full absolute bg-gray-500/40 top-0 left-0 items-center justify-center`}
    >
      <div
        ref={domNode}
        className="min-h-3/5 w-[90%] md:w-2/4 py-2 bg-white text-black rounded-md shadow-lg flex items-center justify-center"
      >
        {array.map((de) => {
          return (
            <div key={de._id} className="p-1 w-5/6 min-h-5/6">
              <h1 className="text-center text-2xl py-2">
                {ExpName === "Daily" ? "Daily" : "Periodic"} Expense Details
              </h1>
              <div className=" w-full flex py-1 border-b">
                <span className="w-1/2">Household Name:</span>
                <span className="w-1/2"> {de.householdName}</span>
              </div>
              <div className="w-full flex py-1 border-b">
                <span className="w-1/2">Expense Type:</span>
                <span className="w-1/2">
                  {de.expenseTypeName || de.expensetype}
                </span>
              </div>
              <div className="w-full flex py-1 border-b">
                <span className="w-1/2">Description</span>
                <span className="w-1/2">{de.description}</span>
              </div>
              <div className="w-full flex py-1 border-b">
                <span className="w-1/2">Paid By</span>
                <span className="w-1/2">
                  {de.paidBy.length == 0
                    ? "NA"
                    : typeof de.paidBy == "string"
                    ? de.paidBy
                    : de.paidBy.map((name, index) => {
                        return (
                          <span className="mr-1 block" key={index}>
                            {++index} {name},
                          </span>
                        );
                      })}
                </span>
              </div>
              <div className="w-full flex py-1 border-b">
                <span className="w-1/2">Paid through</span>
                <span className="w-1/2 ">
                  {de.paidThrough.length == 0
                    ? "NA"
                    : typeof de.paidThrough == "string"
                    ? de.paidThrough
                    : de.paidThrough.map((name, index) => {
                        return (
                          <span className="mr-1 block" key={index}>
                            {++index}. {name}
                          </span>
                        );
                      })}
                </span>
              </div>
              <div className="w-full flex py-1 border-b">
                <span className="w-1/2">Updated At:</span>
                <span className="w-1/2">
                  {
                    new Date(de.updatedAt)
                      .toUTCString()
                      .split(/\s[0-9][0-9]:/)[0]
                  }
                </span>
              </div>
              <div className="w-full flex py-1 border-b">
                <div className="w-1/2">
                  <span className="w-1/2">Payment Details:</span>
                </div>
                <div className="w-1/2 h-[80px] overflow-y-auto paperWindow shadow-inner">
                  {(!Array.isArray(de.paymentDetails)
                    ? [de.paymentDetails]
                    : de.paymentDetails
                  ).map((details, index) => {
                    return (
                      <div
                        className={`block py-[3px] sm:text-[10px  ] ${
                          index / 2 !== 0 ? "bg-gray-100" : ""
                        } `}
                        key={details.amount + details.date + details._id}
                      >
                        <div className="flex">
                          <span className="w-1/3">Amount:</span>
                          <span className="w-2/3">₹ {details.amount}.00</span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3">Date:</span>
                          <span className="w-2/3 ">
                            {
                              new Date(details.date)
                                .toUTCString()
                                .split(/\s[0-9][0-9]:/)[0]
                            }
                          </span>
                        </div>
                        <div className="flex">
                          <span className="w-1/3">Method:</span>
                          <span className="w-2/3">{details.method}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopupModal;
