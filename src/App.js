import React from "react";
import "./styles.scss";

export default function App() {
  const getHandRotations = () => {
    const time = new Date();
    const secondsDecimal = time.getSeconds() / 60;
    const minutesDecimal = time.getMinutes() / 60 + secondsDecimal / 60;
    const hoursDecimal = (time.getHours() % 12) / 12 + minutesDecimal / 60;

    return [hoursDecimal * 360, minutesDecimal * 360, secondsDecimal * 360];
  };

  const [clockHandRotations, setClockHandRotations] = React.useState(
    getHandRotations()
  );

  React.useEffect(() => {
    setTimeout(() => {
      let hour, minute, second;
      [hour, minute, second] = getHandRotations();

      let secondDiff = second - (clockHandRotations[2] % 360);
      if (secondDiff < 0) secondDiff = 360 / 60; // from 360 back to zero
      const newSeconds = clockHandRotations[2] + secondDiff;
      console.log(secondDiff, clockHandRotations[2], second);

      setClockHandRotations([hour, minute, newSeconds]);
    }, 100);
  });

  const getComputedStyles = index => {
    return {
      transform: `translateX(-50%) scale(-1) rotate(${
        clockHandRotations[index]
      }deg)`
    };
  };

  const generateListItems = n => {
    return [...Array(n)].map((e, i) => {
      return <li key={i} />;
    });
  };

  const result = React.useMemo(() => {
    return (
      <div className="App">
        <div className="clock">
          <ul className="lines">{generateListItems(60)}</ul>
          <ol className="dial">{generateListItems(12)}</ol>
          <div className="hourHand" style={getComputedStyles(0)} />
          <div className="minuteHand" style={getComputedStyles(1)} />
          <div className="secondHand" style={getComputedStyles(2)} />
        </div>
      </div>
    );
  }, [clockHandRotations]);

  return result;
}
