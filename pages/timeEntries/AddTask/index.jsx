import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";
import axios from "axios";
import { hostUrl } from "../../../hostUrl";

const AddTask = ({ isModal, setIsModal, getAllData }) => {
  const [addTask] = Form.useForm();
  const addTaskData = (value) => {
    addTask.resetFields();
    // getAllData();
    setIsModal(false);
  };
  return (
    <div>
      <Modal
        title="Add Task"
        footer={null}
        visible={isModal}
        onCancel={() => setIsModal(false)}
      >
        <Form
          form={addTask}
          onFinish={(val) => {
            // addTaskData(val);
            axios.post(`${hostUrl}/user/createTask`, { ...val }).then((res) => {
              console.log("res", res);
              addTask.resetFields();
              getAllData();
              setIsModal(false);
            });

            addTask.resetFields();
            getAllData();
            setIsModal(false);
          }}
        >
          <div className="font-medium ">
            <Row className="my-2">
              <Col xl={24} lg={24} md={24} xs={24}>
                <div>
                  <p className="mb-1">Task name</p>
                  <Form.Item name="title">
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col xl={24} lg={24} md={24} xs={24}>
                <div>
                  <p className="mb-1">Description</p>
                  <Form.Item name="description">
                    <TextArea />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div className="flex gap-3 justify-end my-5">
              <Button type="primary" onClick={() => setIsModal(false)}>
                {" "}
                Cancel
              </Button>
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
