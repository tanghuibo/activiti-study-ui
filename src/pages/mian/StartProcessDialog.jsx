import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Form, Input, Button, message } from "antd";
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
  const [processDefinitionId, setProcessDefinitionId] = useState(null);
  function show(id) {
    setProcessDefinitionId(id);
    setVisible(true);
  }
  function submit(data) {
    let {context} = data;
    if(context != null) {
      try {
        context = JSON.parse(context);
      } catch (error) {
        console.error(error);
        message.error("context 格式错误:" + error);
        return;
      }
    }
    setLoading(true);
    props.onSubmit({ ...data, context, processDefinitionId }, (success) => {
      setLoading(false);
      setVisible(!success);
    });
  }
  useImperativeHandle(ref, () => ({
    show,
  }));
  return (
    <div>
      <Modal
        title="发布 task"
        visible={visible}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={submit}
        >
           <Form.Item label="businessKey" name="businessKey">
            <Input />
          </Form.Item>
          <Form.Item label="context" name="context">
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
