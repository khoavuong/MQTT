import React from "react";

const Type = {
  temp: 0,
  humid: 0,
  roomId: 0,
};

class Devices extends React.PureComponent{
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
}
export default Devices;