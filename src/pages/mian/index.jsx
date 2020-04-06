import React, { useState, useEffect, useRef } from "react";
import { Table, Button, message } from "antd";
import AddDialog from "./AddDialog";
import serveceApi from "./serviceApi";
import LoadingButton from '../../components/LoadingButton'

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
      fixed: 'right',
      render: (text, record) => (
        <span>
          <LoadingButton
            type="default"
            onClick={(isOver) => deleteDeployment(record, isOver)}
          >
            删除
          </LoadingButton>
        </span>
      ),
    },
  ];
  const addDialogRef = useRef(null);
  const [deploymentList, setDeploymentList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(init, []);
  function init() {
    getDeploymentList();
  }
  async function deleteDeployment({id}, isOver) {
    try {
      await serveceApi.deleteDeploymentById(id);
      message.success("删除成功");
      getDeploymentList();
    } finally {
      isOver();

    }
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
  function showAddDeploymentDialog() {
    addDialogRef.current.show();
  }
  async function addDeployment(data, isOk) {
    try {
      await serveceApi.addDeployment(data);
      message.success("新增成功");
      isOk(true);
      getDeploymentList();
    } catch (error) {
      console.error(error);
      message.error("新增失败");
      isOk(false);
    }
  }
  return (
    <div>
      <Button type="primary" onClick={showAddDeploymentDialog}>
        新增
      </Button>
      <AddDialog ref={addDialogRef} onSubmit={addDeployment} />
      <Table columns={columns} dataSource={deploymentList} loading={loading} />
    </div>
  );
};
