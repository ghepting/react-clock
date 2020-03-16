import React from "react";
import "./styles.scss";

export default function App() {
  const getClockHandDegrees = () => {
    const time = new Date();
    const secondsDecimal = time.getSeconds() / 60; // precise second hand positioning
    const minutesDecimal = time.getMinutes() / 60 + secondsDecimal / 60; // fractional minute hand positioning
    const hoursDecimal = (time.getHours() % 12) / 12 + minutesDecimal / 60; // fractional hour hand positioning

    return {
      hours: hoursDecimal * 360,
      minutes: minutesDecimal * 360,
      seconds: secondsDecimal * 360
    };
  };

  const [clockHandDegrees, setClockHandDegrees] = React.useState(
    getClockHandDegrees()
  );

  // TODO: refactor to useReducer to address bugs
  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      let hour, minute, second;
      [hour, minute, second] = Object.values(getClockHandDegrees());

      let hourDiff = hour - (clockHandDegrees.hours % 360);
      if (hourDiff < 0) hourDiff = 0; // from 360 back to zero

      let minuteDiff = minute - (clockHandDegrees.minutes % 360);
      if (minuteDiff < 0) minuteDiff = 0; // from 360 back to zero

      let secondDiff = second - (clockHandDegrees.seconds % 360);
      if (secondDiff < 0) secondDiff = 360 / 60; // from 360 back to zero

      setClockHandDegrees({
        hours: clockHandDegrees.hours + hourDiff,
        minutes: clockHandDegrees.minutes + minuteDiff,
        seconds: clockHandDegrees.seconds + secondDiff
      });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  });

  const getComputedStyles = key => {
    return {
      transform: `translateX(-50%) scale(-1) rotate(${
        clockHandDegrees[key]
      }deg)`
    };
  };

  const generateListItems = n => {
    return [...Array(n)].map((e, i) => {
      return <li key={i} />;
    });
  };

  const perf = performance.now();
  const result = React.useMemo(() => {
    return (
      <div className="App">
        <div className="clock">
          <ul className="lines">{generateListItems(60)}</ul>
          <ol className="dial">{generateListItems(12)}</ol>
          <div className="hourHand" style={getComputedStyles("hours")} />
          <div className="minuteHand" style={getComputedStyles("minutes")} />
          <div className="secondHand" style={getComputedStyles("seconds")} />
        </div>
      </div>
    );
  }, [clockHandDegrees]);

  console.log(`Rendering time: ${performance.now() - perf}s`);

  return result;
}
