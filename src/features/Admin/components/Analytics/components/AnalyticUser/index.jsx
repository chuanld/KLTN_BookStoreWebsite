import React, { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import adminApi from "api/adminApi";
import UserRegister from "./UserRegister";

function AnalyticUser() {
  const formatDate = (date, month, year) => {
    let set = `${year}-${month > 9 ? month : "0" + month}-${
      date > 9 ? date : "0" + date
    }`;
    return set;
  };
  const today = new Date();
  const initialDate = {
    from: formatDate(
      today.getDate(),
      today.getMonth(),
      today.getFullYear() - 1
    ),
    to: formatDate(today.getDate(), today.getMonth() + 1, today.getFullYear()),
  };
  const [start, setStart] = useState(initialDate.from);
  const [end, setEnd] = useState(initialDate.to);
  const [users, setUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);

  const Now = dayjs();
  const arrMonth = [Now.format("MMMM")];
  const arrDay = [Now.format("dddd")];

  for (let i = 1; i < 10; i++) {
    arrMonth.unshift(Now.subtract(i, "month").format("MMMM"));
    arrDay.unshift(Now.subtract(i, "day").format("dddd"));
  }
  const getAnalytics = async () => {
    const res = await adminApi.getAnalytic(start, end);

    setUsers(handleUserData(res.users));
  };
  useEffect(() => {
    getAnalytics();
  }, [users]);
  console.log(users);
  const handleUserData = (usersDt) => {
    if (usersDt.length === 0) return;
    var userList = [];
    var totalUsers = 0;

    arrMonth.forEach((m) => {
      var elem = {};
      var totals = 0;

      usersDt.forEach((user) => {
        var total = 0;

        if (dayjs(user.createdAt).format("MMMM") === m) {
          total += 1;
          console.log(m, "m");
        }

        totals += total;
      });

      elem.moment = m;
      elem.count = totals;
      totalUsers += totals;
      userList.push(elem);
    });
    setTotalUser(totalUsers);
    return userList;
  };

  return (
    <div className="analytic-chart-section">
      <div className="chart-container">
        <div className="chart-item">
          {/* <OrderSummary orderSummary={orderSummary} totalOrd={totalOrd} /> */}
          <UserRegister
            arrMonth={arrMonth}
            users={users}
            totalUser={totalUser}
          />
        </div>
      </div>
      <div className="chart-info-detail">Details</div>
    </div>
  );
}

export default AnalyticUser;
