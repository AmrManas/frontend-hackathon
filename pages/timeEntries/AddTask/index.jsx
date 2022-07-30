import { Button, Col, Form, Input, Modal, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

const AddTask = ({ isModal, setIsModal }) => {
  const [addTask]=Form.useForm()
  return (
    <div>
      <Modal title='Add Task' footer={null} visible={isModal} onCancel={()=>setIsModal(false)}>
        <Form form={addTask} onFinish={()=>{}}>

        <div className="font-medium ">
          <Row className="my-2">
            <Col xl={24} lg={24} md={24} xs={24}>
              <div>
                <p className="mb-1">Task name</p>
                <Input />
              </div>
            </Col>
            <Col xl={24} lg={24} md={24} xs={24}>
              <div>
                <p className="mb-1">Description</p>
                <TextArea />
              </div>
            </Col>
            
          </Row>
          <div className="flex gap-3 justify-end my-5">
            <Button type="primary">Cancel</Button>
            <Button type="primary " htmlType="submit">
              Add
            </Button>
          </div>
        </div>
            </Form>
      </Modal>
    </div>
  );
};

export default AddTask;
