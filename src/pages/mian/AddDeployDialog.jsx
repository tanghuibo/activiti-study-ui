import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Form, Input, Button } from "antd";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export default forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  function show() {
    setVisible(true);
  }
  function submit(data) {
      setLoading(true);
      props.onSubmit(data, (success) => {
          setLoading(false);
          setVisible(!success);
      });
  }
  useImperativeHandle(ref, () => ({
    show,
  }));
  return (
    <div>
      <Modal title="新增 deployment" visible={visible} footer={null} destroyOnClose={true} >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={submit}
        >
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="内容"
            name="bpmnXml"
            rules={[{ required: true}]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button loading={loading} type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});
