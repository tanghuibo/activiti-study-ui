import React, { useState, useEffect } from "react";
import { Table } from "antd";
import serveceApi from "./serviceApi";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <a style={{ marginRight: 16 }}>Invite {record.name}</a>
        <a>Delete</a>
      </span>
    ),
  },
];

export default () => {
  const [deploymentList, setDeploymentList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(init, []);
  function init() {
    getDeploymentList();
  }
  async function getDeploymentList() {
    setLoading(true);
    try {
      let result = await serveceApi.queryDeployment();
      setDeploymentList(result);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Table columns={columns} dataSource={deploymentList} loading={loading} />
    </div>
  );
};
