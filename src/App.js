import React from "react";
import "./styles.css";

export default function App() {
  const getHandRotations = () => {
    const time = new Date();
    const secondsDecimal = time.getSeconds() / 60;
    const minutesDecimal = time.getMinutes() / 60;
    const hoursDecimal = (time.getHours() % 12) / 12;

    return [hoursDecimal * 360, minutesDecimal * 360, secondsDecimal * 360];
  };

  const [clockHandRotations, setClockHandRotations] = React.useState(
    getHandRotations()
  );

  React.useEffect(() => {
    setTimeout(() => {
      let hour, minute, second;
      [hour, minute, second] = getHandRotations();
      setClockHandRotations([hour, minute, second]);
    }, 100);
  });

  const getComputedStyles = index => {
    return {
      transform: `scale(-1) rotate(${clockHandRotations[index]}deg)`
    };
  };

  const result = React.useMemo(() => {
    return (
      <div className="App">
        <div className="clock">
          <div className="hourHand" style={getComputedStyles(0)} />
          <div className="minuteHand" style={getComputedStyles(1)} />
          <div className="secondHand" style={getComputedStyles(2)} />
        </div>
      </div>
    );
  }, [clockHandRotations]);

  return result;
}
