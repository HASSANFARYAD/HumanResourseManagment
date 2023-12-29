import React from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import generatePDF from "./generatePDF";

const PaySlip = (paySlip) => {
  console.log(paySlip);
  return (
    <Container className="mt-3" style={{ color: "#000" }}>
      <Row className="text-end mb-2">
        <Col md={12}>
          <Button onClick={() => generatePDF("paySlipContent")}>
            Download PDF
          </Button>
        </Col>
      </Row>
      <div id="paySlipContent" style={{ letterSpacing: "0.8px" }}>
        <Row>
          <Col md={8}>
            <h2 className="fw-bold text-primary mb-3">
              {paySlip.paySlip.companyName}
            </h2>
            <address>
              Contact Number
              <br />
              CompanyAddress
            </address>
          </Col>

          <Col md={4}>
            <img
              src={paySlip.paySlip.companyProfile}
              style={{ width: "200px", height: "50px" }}
              alt={paySlip.paySlip.companyName}
            />
            <br />
            <span
              className="badge btn btn-secondary p-3 pe-5 text-white"
              style={{ width: "200px" }}
            >
              Pay Slip
            </span>
          </Col>
        </Row>
        <hr className="border border-3 border-dark my-4" />
        <Row>
          <Col md={6}>
            <Row>
              <Col md={6} className="fw-bold">
                Name
              </Col>
              <Col md={6}>{paySlip.paySlip.name}</Col>
            </Row>
            <Row>
              <Col md={6} className="fw-bold">
                Date of Joining
              </Col>
              <Col md={6}>{paySlip.paySlip.joinDate}</Col>
            </Row>
            <Row>
              <Col md={6} className="fw-bold">
                Current Gross
              </Col>
              <Col md={6}>$ {paySlip.paySlip.grossSalary}</Col>
            </Row>
            <Row>
              <Col md={6} className="fw-bold">
                Designation
              </Col>
              <Col md={6}>
                <p>{paySlip.paySlip.designation}</p>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={6} className="fw-bold">
                CNIC
              </Col>
              <Col md={6}>{paySlip.paySlip.cnic}</Col>
            </Row>
            <Row>
              <Col md={6} className="fw-bold">
                Pay Period
              </Col>
              <Col md={6}>{paySlip.paySlip.dispatchedDate}</Col>
            </Row>
            <Row>
              <Col md={6} className="fw-bold">
                Employee Type
              </Col>
              <Col md={6}>{paySlip.paySlip.employeeType}</Col>
            </Row>
          </Col>
        </Row>

        <hr className="border border-3 border-dark my-4" />

        <Row>
          <Col md={12}>
            <Row
              className="py-1 align-items-center mb-1"
              style={{ backgroundColor: "#D3D3D3" }}
            >
              <Col md={6}>
                <h6 className="fw-bold m-0">EARNINGS</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="fw-bold m-0">AMOUNT</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Basic Pay</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.basicPay}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Taxable Allowances</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.taxableAllowance}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Non Corporate Car Allow</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.nonCorporateAllowance}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Encashment leave/PHs </h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.encashmentLeave}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Other Taxable Allowances </h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.otherAllowance}</h6>
              </Col>
            </Row>
            <hr className="border border-3 border-dark mt-4" />
            <Row className="">
              <Col md={6}>
                <h6 className="fw-bolder">GROSS TAXABLE SALARY </h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.grossTaxableSalary}</h6>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="my-5">
          <Col md={12}>
            <Row
              className="py-1 align-items-center mb-1"
              style={{ backgroundColor: "#D3D3D3" }}
            >
              <Col md={6}>
                <h6 className="fw-bold m-0">DEDUCTIONS</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="fw-bold m-0">AMOUNT</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Income Tax</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.incomeTax}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Provident Fund</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.providentFund}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Corporate Car Facility</h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.corporateCarFacility}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Committee </h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.committee}</h6>
              </Col>
            </Row>

            <Row className="">
              <Col md={6}>
                <h6 className="">Other Collection/Recovery </h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.otherCollection}</h6>
              </Col>
            </Row>

            <hr className="border border-3 border-dark mt-4" />

            <Row className="">
              <Col md={6}>
                <h6 className="fw-bolder">TOTAL DEDUCTIONS </h6>
              </Col>
              <Col md={6} className="text-end">
                <h6 className="">${paySlip.paySlip.totalDeductions}</h6>
              </Col>
            </Row>
          </Col>
        </Row>

        <Table bordered style={{ color: "#000" }}>
          <thead>
            <th className="fw-bold">Net Pay Distribution</th>
            <th className="fw-bold">Bank</th>
            <th className="fw-bold">Bank A/C No.</th>
            <th className="fw-bold">Method</th>
            <th className="fw-bold">Net Amount</th>
          </thead>
          <tbody>
            <td>NET PAY TRANSFERED</td>
            <td>{paySlip.paySlip.bank}</td>
            <td>{paySlip.paySlip.accountNumber}</td>
            <td>EFT</td>
            <td>${paySlip.paySlip.totalDeductions}</td>
          </tbody>
        </Table>

        <Row className="text-center my-5 pb-5">
          <Col md={12}>
            <p className="text-danger">
              * This is system-generated Pay-Slip and does not require any
              signature, please don’t print this email unless it is absolutely
              necessary
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default PaySlip;
