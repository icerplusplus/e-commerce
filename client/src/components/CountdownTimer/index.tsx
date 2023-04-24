import React from "react";
import { useCountdown } from "../../hooks/useCountdown";

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="text-[gray] text-[15px] font-bold flex flex-row justify-center items-center">
      <span className="bg-[#FF424E] rounded p-[4px] mx-[3px] text-white">
        {`0${hours}`.slice(-2)}
      </span>
      :
      <span className="bg-[#FF424E] rounded p-[4px] mx-[3px] text-white">
        {`0${minutes}`.slice(-2)}
      </span>
      :
      <span className="bg-[#FF424E] rounded p-[4px] mx-[3px] text-white">
        {`0${seconds}`.slice(-2)}
      </span>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
