import React from "react";
import Register from "./Register";
import ScheduleTryout from "./ScheduleTryout";

const JoinNow = () => (
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, margin: '40px 0'}}>
    <div style={{minWidth: 340, maxWidth: 400, flex: 1}}>
      <Register />
    </div>
    {/* <div style={{minWidth: 340, maxWidth: 400, flex: 1}}>
      <ScheduleTryout />
    </div> */}
  </div>
);

export default JoinNow;