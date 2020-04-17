import React, { useState, useEffect, useRef } from "react";
import { Table, Button, message } from "antd";
import AddDeployDialog from "./AddDeployDialog";
import StartProcessDialog from "./StartProcessDialog";
import serveceApi from "./serviceApi";
import LoadingButton from "../../components/LoadingButton";

export default () => {
  const columns = [
    ...[
      "id",
      "name",
      "deploymentTime",
      "category",
      "key",
      "tenantId",
      "version",
      "projectReleaseVersion",
    ].map((item) => ({
      title: item,
      dataIndex: item,
      key: item,
    })),
    {
      title: "操作",
      key: "option",
      width: 200,
      fixed: "right",
      render: (text, record) => (
        <span>
          <Button type="default" onClick={() => startStartProcessDialog(record)}>
            创建实例
          </Button>
          <br/>
          <LoadingButton
            type="default"
            onClick={(isOver) => deleteDeployment(record, isOver)}
          >
            删除流程
          </LoadingButton>
        </span>
      ),
    },
  ];
  const addDialogRef = useRef(null);
  const startProcessDialogRef = useRef(null);
  const [processDefinitionList, setProcessDefinitionList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(init, []);
  function init() {
    getProcessDefinitionList();
  }
  async function deleteDeployment({ id }, isOver) {
    try {
      await serveceApi.deleteDeploymentById(id);
      message.success("删除成功");
      getProcessDefinitionList();
    } finally {
      isOver();
    }
  }
  async function getProcessDefinitionList() {
    setLoading(true);
    try {
      let result = await serveceApi.queryProcessDefinition();
      setProcessDefinitionList(result);
    } finally {
      setLoading(false);
    }
  }
  function showAddDeploymentDialog() {
    addDialogRef.current.show();
  }
  function startStartProcessDialog({id}) {
    startProcessDialogRef.current.show(id);
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
  async function startProcess(data, isOk) {
    try {
      await serveceApi.startProcessInstance(data);
      message.success("发布成功");
      isOk(true);
      getProcessDefinitionList();
    } catch (error) {
      console.error(error);
      message.error("发布失败");
      isOk(false);
    }
  }

  return (
    <div style={{marginLeft: 10, marginRight: 10}}>
      <Button type="primary" onClick={showAddDeploymentDialog} style={{margin: 10, marginLeft: 0}}>
        新增
      </Button>
      <AddDeployDialog ref={addDialogRef} onSubmit={addDeployment} />
      <StartProcessDialog ref={startProcessDialogRef} onSubmit={startProcess} />
      <Table columns={columns} dataSource={processDefinitionList} loading={loading} />
    </div>
  );
};
