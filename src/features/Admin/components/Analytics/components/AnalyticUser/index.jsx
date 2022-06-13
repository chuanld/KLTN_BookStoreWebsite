import React, { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import adminApi from "api/adminApi";
import UserRegister from "./UserRegister";
import FormDate from "../../common/FormDate";
var advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);
var quarterOfYear = require("dayjs/plugin/quarterOfYear");
dayjs.extend(quarterOfYear);

const initTypeDistance = {
  years: "years",
  quarters: "quarters",
  months: "months",
  weeks: "weeks",
  days: "days",
};
const options = ["years", "quarters", "months", "weeks", "days"];
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

  const [loading, setLoading] = useState(false);

  const [distanceType, setDistanceType] = useState(initTypeDistance.months);
  const [distanceTimeLine, setDistanceTimeLine] = useState([]);
  const [callback, setCallback] = useState(false);
  const Now = dayjs();
  const arrMonth = [Now.format("MMM")];
  const arrDay = [Now.format("ddd")];

  const handleOnTimeLine = () => {
    for (let i = 1; i < 10; i++) {
      arrMonth.unshift(Now.subtract(i, "month").format("MMM"));
      arrDay.unshift(Now.subtract(i, "day").format("ddd"));
    }
  };

  const getAnalytics = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getAnalytic(start, end);

      setUsers(handleUserData(res.users));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAnalytics();
    handleOnTimeLine();
  }, [callback]);

  const handleUserData = (usersDt) => {
    if (usersDt.length === 0) return;
    var userList = [];
    var totalUsers = 0;

    distanceTimeLine.forEach((tl) => {
      var elem = {};
      var totals = 0;

      usersDt.forEach((user) => {
        var total = 0;
        if (distanceType === "years") {
          if (dayjs(user.createdAt).format("YYYY") === tl) {
            total += 1;
          }
        } else if (distanceType === "quarters") {
          if (dayjs(user.createdAt).format("Q-YYYY") === tl) {
            total += 1;
          }
        } else if (distanceType === "months") {
          if (dayjs(user.createdAt).format("MMM-YY") === tl) {
            total += 1;
          }
        } else if (distanceType === "days") {
          if (dayjs(user.createdAt).format("dd-DD") === tl) {
            total += 1;
          }
        }

        totals += total;
      });

      elem.moment = tl;
      elem.count = totals;
      totalUsers += totals;
      userList.push(elem);
    });
    setTotalUser(totalUsers);
    return userList;
  };

  const handleTimeLine = (values) => {
    console.log(values, "vls");
    const date1 = dayjs(values.analyStart);
    const date2 = dayjs(values.analyEnd);
    setStart(dayjs(values.analyStart).format("YYYY-MM-DD"));
    setEnd(dayjs(values.analyEnd).format("YYYY-MM-DD"));
    let distance = 0;
    let arrDistance = [];
    let formatDistance = "";
    if (distanceType === "years") {
      distance = date2.diff(date1, "year");
      arrDistance = [Now.format("YYYY")];
      formatDistance = "YYYY";
    } else if (distanceType === "quarters") {
      distance = date2.diff(date1, "quarter");
      arrDistance = [Now.format("Q-YYYY")];
      formatDistance = "Q-YYYY";
    } else if (distanceType === "months") {
      distance = date2.diff(date1, "month");
      arrDistance = [Now.format("MMM-YY")];
      formatDistance = "MMM-YY";
    } else if (distanceType === "weeks") {
      distance = date2.diff(date1, "week");
      arrDistance = [Now.format("YYYY")];
      formatDistance = "YYYY";
    } else {
      distance = date2.diff(date1, "day");
      arrDistance = [Now.format("dd-DD")];
      formatDistance = "dd-DD";
    }

    for (let i = 1; i < distance; i++) {
      // arrMonth.unshift(Now.subtract(i, "month").format("MMM"));
      // arrDay.unshift(Now.subtract(i, "day").format("ddd"));
      arrDistance.unshift(Now.subtract(i, distanceType).format(formatDistance));
    }
    setDistanceTimeLine(arrDistance);
    setCallback(!callback);
    console.log(arrDistance, "months");
  };
  const handleChangeGroupBy = (value) => {
    setDistanceType(value);
  };

  return (
    <div className="analytic-chart-section">
      <FormDate
        onSubmit={handleTimeLine}
        loading={loading}
        from={start}
        to={end}
        distanceType={distanceType}
        options={options}
        onSubmitChange={handleChangeGroupBy}
      />
      <div className="chart-container">
        <div className="chart-line-item">
          {/* <OrderSummary orderSummary={orderSummary} totalOrd={totalOrd} /> */}
          <UserRegister
            arrMonth={arrMonth}
            distanceTimeLine={distanceTimeLine}
            users={users}
            totalUser={totalUser}
          />
        </div>
      </div>
      {/* <div className="chart-info-detail">Details</div> */}
    </div>
  );
}

export default AnalyticUser;
