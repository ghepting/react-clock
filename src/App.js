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
      seconds: Math.round(secondsDecimal * 360) // not sure why, but this doesn't always return round numbers...
    };
  };

  const [clockHandDegrees, setClockHandDegrees] = React.useState(
    getClockHandDegrees()
  );

  React.useLayoutEffect(() => {
    const timer = setTimeout(() => {
      let hours, minutes, seconds;
      [hours, minutes, seconds] = Object.values(getClockHandDegrees());

      let hoursDiff = (hours % 360) - (clockHandDegrees.hours % 360);
      if (hoursDiff < 0) hoursDiff = hoursDiff + 360; // 360 => 0 transition handler
      let minutesDiff = (minutes % 360) - (clockHandDegrees.minutes % 360);
      if (minutesDiff < 0) minutesDiff = minutesDiff + 360; // 360 => 0 transition handler
      let secondsDiff = (seconds % 360) - (clockHandDegrees.seconds % 360);
      if (secondsDiff < 0) secondsDiff = secondsDiff + 360; // 360 => 0 transition handler

      setClockHandDegrees({
        hours: clockHandDegrees.hours + hoursDiff,
        minutes: clockHandDegrees.minutes + minutesDiff,
        seconds: clockHandDegrees.seconds + secondsDiff
      });
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  });

  const generateListItems = n => {
    return [...Array(n)].map((e, i) => {
      return <li key={i} />;
    });
  };

  // const perf = performance.now();
  const result = React.useMemo(() => {
    const getComputedStyles = key => {
      return {
        transform: `translateX(-50%) scale(-1) rotate(${
          clockHandDegrees[key]
        }deg)`
      };
    };

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

  // console.log(`Rendering time: ${performance.now() - perf}s`);

  return result;
}
