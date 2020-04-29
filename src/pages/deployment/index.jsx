import React, { useState, useEffect, useRef } from "react";
import { Table, Button, message } from "antd";
import AddDeployDialog from "./AddDeployDialog";
import serveceApi from "./serviceApi";

export default () => {
  const columns = [
    ...[
      "id",
      "category",
      "name",
      "key",
      "description",
      "version",
      "resourceName",
      "deploymentId",
      "diagramResourceName",
      "hasStartFormKey",
      "hasGraphicalNotation",
      "suspended",
      "tenantId",
      "engineVersion",
      "appVersion",
    ].map((item) => ({
      title: item,
      dataIndex: item,
      key: item,
    }))
  ];
  const addDialogRef = useRef(null);
  const [processDefinitionList, setProcessDefinitionList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(init, []);
  function init() {
    getProcessDefinitionList();
  }

  async function getProcessDefinitionList() {
    setLoading(true);
    try {
      let result = await serveceApi.queryDeployment();
      setProcessDefinitionList(result);
    } finally {
      setLoading(false);
    }
  }
  function showAddDeploymentDialog() {
    addDialogRef.current.show();
  }
  async function addDeployment(data, isOk) {
    try {
      await serveceApi.addDeployment(data);
      message.success("新增成功");
      isOk(true);
      getProcessDefinitionList();
    } catch (error) {
      console.error(error);
      message.error("新增失败");
      isOk(false);
    }
  }

  return (
    <div style={{ marginLeft: 10, marginRight: 10 }}>
      <Button
        type="primary"
        onClick={showAddDeploymentDialog}
        style={{ margin: 10, marginLeft: 0 }}
      >
        新增
      </Button>
      <AddDeployDialog ref={addDialogRef} onSubmit={addDeployment} />
      <Table
        columns={columns}
        dataSource={processDefinitionList}
        loading={loading}
      />
    </div>
  );
};
