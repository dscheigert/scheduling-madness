import { useState } from "react";

function HowTo() {
  const [active, setActive] = useState(false);

  return (
    <>
    <a onClick={() => setActive(true)}>How to Play</a>
    {active && <div className="HowTo">
        <img src="img/howto.png"></img>
    </div>}
    </>  
  );
}

export default HowTo;
