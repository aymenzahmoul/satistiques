import React, { useState, useEffect } from "react";
import {  CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import LivestatsService from "../service/livestatsService";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "./index.css";
import "./Css/buttons.css"
import { Calendar } from "primereact/calendar";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
export default function StatsLive() {
  const [livestats, setLivestats] = useState(null);

  
  const fetchData = async () => {
    try {
      const data = await LivestatsService.getLivestats();
      setLivestats(data);
      localStorage.setItem("cachedData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching live stats:", error);
    }
  };

  useEffect(() => {
    const checkBackendAvailability = async () => {
      try {
        await LivestatsService.getLivestats();
        return true; 
      } catch (error) {
        return false; 
      }
    };

    const updateDataPeriodically = async () => {
      const isBackendAvailable = await checkBackendAvailability();

      if (isBackendAvailable) {
        console.log("Backend is available");
        fetchData();

        const intervalId = setInterval(fetchData, 60000); 

        return () => clearInterval(intervalId); 
      } else {
        console.log("Backend not available");
        const cachedData = localStorage.getItem("cachedData");

       
        if (cachedData) {
          setLivestats(JSON.parse(cachedData));
          const intervalId = setInterval(fetchData, 60000); 

          return () => clearInterval(intervalId); 
        } else {
          console.log("Backend is not available, and no cached data available.");
        }
      }
    };

    const fetchDataAndSetInterval = async () => {
      const cleanupInterval = await updateDataPeriodically();

      return cleanupInterval;
    };

    fetchDataAndSetInterval();
  }, []);


  const [date1, setDate1] = useState(null);

  


  const data = () => {
    if (date1 instanceof Date) {
      const dayOfMonth = date1.getDate();
      const month = date1.toLocaleString('default', { month: 'long' });
      const year = date1.getFullYear();
      alert(` ${dayOfMonth} ${month} ${year}`);
    } else {
      alert("Please select a valid date");
    }
  };

 

  return (
    <div >
<div className="d-flex justify-content-center align-items-center" >
  <div  >
    <div className="card-stats mb-4 mb-xl-0">
      <div className="field col-12 md:col-4">
        <label htmlFor="icon"></label><br></br>
        <Calendar
          id="icon"
          value={date1}
          onChange={(e) => setDate1(e.value)}
          style={{
        
            color: 'white',
            border: 'none',
           
            padding: '2px 7px',
           
          }}
        />
        <Button   style={{
    backgroundColor: '#0061B8',
    color: 'white',
    borderRadius: '5px',
    padding: '1px 7px',
    
  }}className="slack" onClick={data}>
          <i className="pi pi-slack px-3"></i>
          <span className="px-3">Date</span>
        </Button>
      </div>
    </div>
  </div>
</div>

    <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
    <Container fluid>
    {livestats && (
      <div className="header-body color blue" >
     
        {/* Card stats */}
        <span className="h2 font-weight-bold mb-0"> Vue Globale C.A</span>
        <br></br>
        <br></br>
        <Row>
          <Col lg="5" xl="3" md={{ span: 1 }}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                    tag="h5" className="text-uppercase text-muted text-center"
                    >
                      TotalH
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                     
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-success mr-2">
                
                  </span>{" "}
                  <span className="text-nowrap">{livestats.TotalHT}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" xl="3"  md={{ span: 1, offset: 1 }}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                  tag="h5" className="text-uppercase text-muted text-center"
                    >
                      TVA
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0"></span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-chart-pie" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-danger mr-2">
                    
                  </span>{" "}
                  <span className="text-nowrap">{livestats.TVA}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" xl="3"  md={{ span: 1, offset: 1 }}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                    tag="h5" className="text-uppercase text-muted text-center"
                    >
                     TotalTTC
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0"></span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-users" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-warning mr-2">
                   
                  </span>{" "}
                  <span className="text-nowrap">{livestats.TotalTTC}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
        
        </Row>
        <br></br>
        <span className="h2 font-weight-bold mb-0"> Réparitition CA par mode de paiements</span>
        <br></br>
        <br></br>
        <Row>
          <Col lg="5" xl="3" >
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                    tag="h5" className="text-uppercase text-muted text-center"
                    >
                      Especes
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                   
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-success mr-2">
                    
                  </span>{" "}
                  <span className="text-nowrap">{livestats.Especes}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" xl="3"  >
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5" className="text-uppercase text-muted text-center"
                    >
                  Carte bancaire
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0"></span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-chart-pie" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-danger mr-2">
                   
                  </span>{" "}
                  <span className="text-nowrap">{livestats.CarteBancaire}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" xl="3"  >
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                 tag="h5" className="text-uppercase text-muted text-center"
                    >
                     Cheques
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0"></span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-users" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-warning mr-2">
                 
                  </span>{" "}
                  <span className="text-nowrap">{livestats.Cheques}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" xl="3"  >
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                tag="h5" className="text-uppercase text-muted text-center"
                    >
                   Ticket Resto
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0"></span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-users" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-warning mr-2">
                    
                  </span>{" "}
                  <span className="text-nowrap">{livestats.TicketResto}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
        
        </Row>
        <br></br>
        <span className="h2 font-weight-bold mb-0"> Repartition CA par Mode de Consommation</span>
        <br></br>
        <br></br>
        <Row>
          <Col lg="5" xl="3" md={{ span: 1 }}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                    tag="h5" className="text-uppercase text-muted text-center"
                    >
                     Sur Place
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0">
                     
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                      <i className="fas fa-chart-bar" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-success mr-2">
                  
                  </span>{" "}
                  <span className="text-nowrap">{livestats.SurPlace}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" xl="3"  md={{ span: 1, offset: 1 }}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                tag="h5" className="text-uppercase text-muted text-center"
                    >
                     A Emporter
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0"></span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <i className="fas fa-chart-pie" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-danger mr-2">
                    
                  </span>{" "}
                  <span className="text-nowrap">{livestats.A_Emporter}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg="5" xl="3"  md={{ span: 1, offset: 1 }}>
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                   tag="h5" className="text-uppercase text-muted text-center"
                    >
                      Livraison
                    </CardTitle>
                    <span className="h2 font-weight-bold mb-0"></span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                      <i className="fas fa-users" />
                    </div>
                  </Col>
                </Row>
                <p className="mt-4 mb-3 ">
                  <span className="text-warning mr-2">
                    
                  </span>{" "}
                  <span tag="h5" className=" text-uppercase text-nowrap text-muted text-center">{livestats.Livraison}$</span>
                </p>
              </CardBody>
            </Card>
          </Col>
        
        </Row>
    
      </div>
      )}
    </Container>
  </div>
    </div>
  );
}


