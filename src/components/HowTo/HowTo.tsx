import './HowTo.css'; 

function HowTo(props :any) {
  const {active} = props;

  return (
    <>
    {active && <div className="HowTo">
        <img src="img/howtoinitial.png"></img>
        <img src="img/howtosolution.png"></img>
    </div>}
    </>  
  );
}

export default HowTo;
