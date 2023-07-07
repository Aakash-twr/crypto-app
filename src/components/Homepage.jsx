import React, { useEffect, useState } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cryptocurrencies, News } from "../components";
import { useDispatch } from "react-redux";
import { getData } from "../services/dataSlice";
import { getNews } from "../services/newsSlice";

const { Title } = Typography;

const Homepage = () => {
  const [responseData, setResponseData] = useState(null);
  // const [responseNews, setResponseNews] = useState(null);
  const dispatch = useDispatch();

  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "f067606404msh19386fda76b0846p1f3f2djsnf05d65cc8376",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.request(options);
      // console.log(response?.data, "data---");
      setResponseData(response?.data);
      dispatch(getData({ data: response?.data }));
    }
    fetchData();
  }, []);

  const options2 = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news",
    params: {
      safeSearch: "Off",
      textFormat: "Raw",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "f820fcc09dmshd8ab2666bd17fb7p12bbc5jsn8460c07525f3",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };
  

  useEffect(() => {
    async function fetchData2() {
      const response = await axios.request(options2);
      // console.log(response?.data, "data---NEWS");
      dispatch(getNews({ data: response?.data }));
    }
    fetchData2();
  }, []);

  return (
    <div className="homepage1">
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(responseData?.data.stats.total)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(responseData?.data.stats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(responseData?.data.stats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(responseData?.data.stats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(responseData?.data.stats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <div className="homepage2">
        <Cryptocurrencies simplified />
      </div>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div >
      <div className="homepage2">
      <News simplified />
      </div>
    </div>
  );
};

export default Homepage;
