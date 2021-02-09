import React, { Component } from 'react';
import {Layout,columns,Row,Table} from 'antd';
import '../assets/style.css'
import axios from 'axios'
const {Content} = Layout

const data=[
    {
        key: '1',
        buy: 'b',
        rate: 32,
        sell: 'a',
    }
]
const Columns = [
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    align: "center",
  },
  {
    title: "We Buy",
    dataIndex: "buy",
    key: "buy",
    align: "center",
  },
  {
    title: "Exchange Rate",
    dataIndex: "rates",
    key: "rates",
    align: "center",
  },
  {
    title: "We Sell",
    dataIndex: "sell",
    key: "sell",
    align: "center",
  },
];

const needs=[
    'USD',
    'EUR',
    'CHF',
    'JPY',
    'IDR',
    'CAD'

]

class Main extends Component {
    state = {
        rate:[]
    };

    componentDidMount(){
        axios.get(`https://api.exchangeratesapi.io/latest?base=IDR`)
        .then((res)=>{
            let rates = res.data.rates;
            let temp = [];
            for (let i = 0; i < needs.length; i++) {
              const filteredByKey = Object.fromEntries(
                Object.entries(rates).filter(([key, value]) => key === needs[i])
              );
              let temps = {
                currency: Object.keys(filteredByKey).toString(),
                rates:( parseFloat(Object.values(filteredByKey))),
                buy: (parseFloat(Object.values(filteredByKey)) + (parseFloat(Object.values(filteredByKey))*0.07)),
                sell: (parseFloat(Object.values(filteredByKey)) + (parseFloat(Object.values(filteredByKey))*0.05)),
              };
              temp.push(temps)
            }
            this.setState({ rate: temp.reverse() });
            console.log(this.state.rate)
        });
    }
    render() {
        return (
            <Layout className="layout">
                <Content style={{overflow:"hidden"}}>
                    {/* <Row>
                        <div className="big-bold-blue center">
                            Rate Change
                        </div>
                    </Row> */}
                    <Row className="section-container">
                        <Table dataSource={this.state.rate} columns={Columns} style={{ width: '90%' }} pagination={false} bordered/>
                    </Row>
                </Content>
            </Layout>
        );
    }
}

export default Main;