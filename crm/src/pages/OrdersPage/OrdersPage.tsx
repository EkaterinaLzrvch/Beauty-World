import React, { useEffect, useState } from 'react';
import { Result, TableColumnProps, Table, Modal, Button, DatePicker, Form, Input, Select, Switch } from 'antd';
import { OrdersApi } from '../../api';
import { CustomerDto, OrderDto, ServiceDto } from '../../common/OrderDto';
import { useForm } from 'antd/es/form/Form';
import { MasterDto } from '../../common/OrderDto';
import { OrderStatus } from '../../common/dto/enums/OrderStatus';

const { confirm } = Modal;
interface OrderFormProps {
  order?: OrderDto;
  onCreate: (data: any) => void;
  onEdit: (data: any) => void;
}

export function OrderForm({ order, onCreate, onEdit }: OrderFormProps) {
  const [form] = useForm();
  const isCreateMode = !order;
  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

  const handleSubmit = (data: any) => {
    console.log(data);
    if (isCreateMode) {
      onCreate(data);
    } else {
      onEdit(data)
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      name: order?.customer?.firstName,
      phone: order?.customer?.phone,
      masterId: order?.master.fullName,
      serviceId: order?.service.name,
      // visitDate: order?.visitDate - не могу так дату вывести в поле, почему? 
    })
  }, [order])

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
    >
      <Form.Item name="name" label="Имя клиента" required>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Номер телефона" required>
        <Input />
      </Form.Item>
      <Form.Item name="masterId" label="Выберите мастера">
        <Select>
          <Select.Option value="1">Краснова Ирина</Select.Option>
          <Select.Option value="2">Калилова Жанна</Select.Option>
          <Select.Option value="3">Киселева Алина</Select.Option>
          <Select.Option value="4">Иванова Елена</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="serviceId" label="Выберите услугу">
        <Select>
          <Select.Option value="1">Женская стрижка</Select.Option>
          <Select.Option value="2">Мужская стрижка</Select.Option>
          <Select.Option value="3">Креативный стиль</Select.Option>
          <Select.Option value="4">Детский стиль</Select.Option>
          <Select.Option value="5">Экспресс укладка</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name='visitDate' label="Дата записи">
        <DatePicker format={dateFormatList} />
      </Form.Item>
      <Form.Item style={{ marginLeft: "160px" }}>
        <Button
          onClick={form.submit}
          style={{ marginRight: "10px" }}
          htmlType='submit' type='primary'>{isCreateMode ? 'Добавить' : 'Сохранить'}
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Очистить форму
        </Button>
      </Form.Item>
    </Form>
  )
}

export function OrdersPage() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [status, setStatus] = useState(OrderStatus.Opened);
  const [editableOrder, setEditableOrder] = useState<OrderDto>();

  const removeOrder = (orderId: number) => {
    confirm({
      title: 'Вы действительно хотите удалить запись?',
      onOk: () => {
        OrdersApi.remove(orderId)
          .then(() => setOrders(orders.filter(o => o.id !== orderId)));
      }
    })
  }

  const create = (data: any) => {
    OrdersApi.create(data)
      .then((createOrder) => setOrders(orders.concat(createOrder)));
  }

  const columns: TableColumnProps<OrderDto>[] = [
    {
      title: 'Дата визита',
      dataIndex: 'visitDate',
      key: 'visitDate',
      render: (dataIndex) => {
        return dataIndex.slice(0, 10)
      }
    },
    {
      title: 'Клиент',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: CustomerDto) => {
        return customer ? `${customer.fullName}` : ''
      }
    },
    {
      title: 'Номер телефона',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: CustomerDto) => {
        return customer ? `${customer.phone}` : ''
      }
    },
    {
      title: 'Мастер',
      dataIndex: 'master',
      key: 'master',
      render: (master: MasterDto) => master?.fullName
    },
    {
      title: 'Услуга',
      dataIndex: 'service',
      key: 'service',
      render: (service: ServiceDto) => service?.name
    },
    {
      title: '',
      key: 'actions',
      render: (row) => (
        <>
          <button onClick={() => { setEditableOrder(row); showModal() }}>Редактировать</button>
        </>
      )
    },
    {
      title: '',
      key: 'actions',
      render: (row) => (
        <>
          <button onClick={() => removeOrder(row.id)}>Удалить</button>
        </>
      )
    },
  ];

  useEffect(() => {
    OrdersApi.getAll(status).then(setOrders);
  }, [status])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Записи на услуги</h1>
        <Button type="primary" onClick={showModal}>
          Создать новую запись
        </Button>
        <Modal
          width={1000}
          open={open}
          title="Создать новую запись"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Закрыть
            </Button>,
          ]}
        >
          <OrderForm order={editableOrder} onCreate={create} onEdit={() => { }} />
        </Modal>
      </div>
      <div style={{ display: "flex", gap: '15px' }}>
        <p>Показать все записи</p>
        <Switch checked={status === OrderStatus.Opened}
          onChange={(checked) => setStatus(checked ? OrderStatus.Opened : OrderStatus.Closed)} />
      </div>
      <Table columns={columns} dataSource={orders} />
    </>
  )
}


