import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
// import { useSelector } from 'react-redux';
import axios from "axios";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const [resData, setResData] = useState(null);
  // const { data } = useSelector(({ dataReducer }) => dataReducer);
  // console.log(data?.data, "CRYPTO DETAIL")

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${resData?.price && millify(resData?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: resData?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${resData?.volume && millify(resData?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${resData?.marketCap && millify(resData?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${resData?.allTimeHigh?.price && millify(resData?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];
  
  const genericStats = [
    { title: 'Number Of Markets', value: resData?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: resData?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: resData?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${resData?.supply?.total && millify(resData?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${resData?.supply?.circulating && millify(resData?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  
  useEffect(() => {

    const options = {
      method: "GET",
      url: `https://coinranking1.p.rapidapi.com/coin/${coinId}`,
      params: {
        referenceCurrencyUuid: "yhjMzLPhuIDl",
        timePeriod: "24h",
      },
      headers: {
        "X-RapidAPI-Key": "f820fcc09dmshd8ab2666bd17fb7p12bbc5jsn8460c07525f3",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };  

    async function FetchData() {
      const response = await axios.request(options);
      console.log({ data: response });
      setResData(response.data?.data?.coin);
    }
    FetchData();
  }, []);

  return (
    <div className="homepage1" >
      {/* {resData?.map((coins) => ( */}
        <Col className="coin-detail-container">
          <Col className="coin-heading-container">
            <Title level={2} className="coin-name">
              {resData?.name} Price
            </Title>
            <p>
              {resData?.name} live price in US dollars.
              View value statistics, market cap and supply
            </p>
          </Col>
          {/* <Select defaultValue="7d" className="select-timeperiod" 
                  placeholder="Select Time Period" 
                  onChange={(value) => setTimePeriod(value)}
          >
            {time.map((date) => <Option key={date}>{date}</Option>)}
          </Select> */}
          <Col className="stats-container">
            <Col className="coin-value-statistics">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-detailes-heading">
                  {resData?.name} Value Statistics
                </Title>
                <p>
                  An overview showing the stats of {resData?.name}
                </p>
              </Col>
              {stats.map(({icon, title, value}) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text>{value}</Text>
                </Col>
              ))}
            </Col>
            <Col className="other-stats-info">
              <Col className="coin-value-statistics-heading">
                <Title level={3} className="coin-detailes-heading">
                  Other Statistics
                </Title>
                <p>
                  An overview showing the stats of all other currencies
                </p>
              </Col>
              {genericStats.map(({icon, title, value}) => (
                <Col className="coin-stats">
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text>{value}</Text>
                </Col>
              ))}
            </Col>
          </Col>
        </Col>
      {/* ))} */}
    </div>
  );
};

export default CryptoDetails;
