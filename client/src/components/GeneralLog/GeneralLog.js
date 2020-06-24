import React, { useEffect, useState } from "react";
import { Col, Row, Container, Form, Input } from "reactstrap";
import { Chart } from "../Chart";

const GeneralLog = (props) => {
  const [range, setRange] = useState("month");

  function handleSelectRange(event) {
    console.log(event.target.value);
    setRange(event.target.value);
  }

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form>
            <Input
              type="select"
              onChange={handleSelectRange}
              defaultValue="month"
            >
              <option value="today">Today</option>
              <option value="week">A week ago</option>
              <option value="month">A month ago</option>
            </Input>
          </Form>
        </Col>
      </Row>
      <Chart range={range} />
    </Container>
  );
};

export default GeneralLog;
