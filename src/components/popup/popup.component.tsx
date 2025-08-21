import { Button, DatePicker, Form, FormInstance, Input, Modal } from "antd";
import React from "react";

interface ModalComponentProps {
  isModalOpen: boolean;
  onModalOpen: (value: boolean) => void;
  form: FormInstance;
  onFinish: (values: any) => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isModalOpen,
  onModalOpen,
  form,
  onFinish,
}) => {
  return (
    <Modal 
     title={
    <div style={{ textAlign: "center"}}> Добавить запись</div>}
      open={isModalOpen}
      onCancel={() => onModalOpen(false)}
      footer={null}
      width={500}
      centered
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ paddingTop: 10 }}
      >
        <Form.Item
          name="name"
          label="Имя"
          rules={[
            { required: true, message: "Введите имя" },
            {
              pattern:
                /^[A-Za-zА-Яа-яЁё]+(?:['-][A-Za-zА-Яа-яЁё]+)?\s[A-Za-zА-Яа-яЁё]+(?:['-][A-Za-zА-Яа-яЁё]+)?$/,
              message: "Введите в формате: Имя Фамилия",
            },
          ]}
        >
          <Input placeholder="Иван Иванов" />
        </Form.Item>

        <Form.Item
          name="date"
          label="Дата"
          rules={[{ required: true, message: "Введите дату" }]}
        >
          <DatePicker format="DD.MM.YYYY" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="numberValue"
          label="Номер"
          rules={[{ required: true, message: "Введите числовое значение" }]}
        >
          <Input type="number" placeholder="123" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", marginTop: 10 }}
          >
            Сохранить данные
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(ModalComponent);