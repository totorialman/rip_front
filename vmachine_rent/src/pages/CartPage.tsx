import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert, Spinner, Button, Form, Table } from "react-bootstrap";
import { RootState, AppDispatch } from "../store/store";
import { fetchCartStart, fetchCartSuccess, fetchCartFailure } from "../store/cartSlice";
import { api } from "../api";
import { fetchVMByIdFromApi, VMData } from "../services/api";

const getCSRFToken = () => {
  const matches = document.cookie.match(new RegExp('(^| )csrftoken=([^;]+)'));
  return matches ? matches[2] : null;
};

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rent, loading, error } = useSelector(
    (state: RootState) => state.cart
  );
  const [detailedVMachines, setDetailedVMachines] = useState<VMData[]>([]);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>(""); 
  const [requests, setRequests] = useState<any[]>([]);

  // Функция для подсчета общей суммы
  const calculateTotalPrice = (detailedVMachines: VMData[], rent: { service_id: number, quantity: number }[]) => {
    return detailedVMachines.reduce((sum, vm) => {
      const rentItem = rent.find(item => item.service_id === vm.id); 
      const quantity = rentItem ? rentItem.quantity : 1; 
      return sum + vm.price * quantity;
    }, 0);
  };

  // Загрузка подробных данных для VMachines
  const loadDetailedVMachines = async (vmIds: number[]) => {
    try {
      const promises = vmIds.map(id => fetchVMByIdFromApi(id));
      const results = await Promise.all(promises);
      const validResults = results.filter((vm): vm is VMData => !!vm);
      setDetailedVMachines(validResults);
    } catch (err) {
      console.error("Ошибка при загрузке деталей машин:", err);
    }
  };

  // Загрузка корзины
  useEffect(() => {
    const fetchCart = async () => {
      dispatch(fetchCartStart());
      try {
        const response = await api.rentList.getList();
        const data: any = response.data[0];
        dispatch(fetchCartSuccess(data));

        if (data.vmachines) {
          const vmIds = data.vmachines.map((vm: any) => vm.service);  

          const updatedRent = data.vmachines.map((vm: any) => ({
            service_id: vm.service,
            quantity: vm.quantity || 1,
          }));

          dispatch(fetchCartSuccess({ rent: updatedRent, vmachines: data.vmachines }));
          loadDetailedVMachines(vmIds); 
        }
      } catch (err) {
        dispatch(fetchCartFailure("Ошибка при загрузке корзины"));
      }
    };

    fetchCart();
  }, [dispatch]);

  const fetchRequests = async () => {
    try {
      const response = await api.rentList.getListAll(); 
      setRequests(response.data); 
    } catch (error) {
      console.error("Ошибка при получении заявок:", error);
    }
  };
  useEffect(() => {
    fetchRequests(); 
  }, []);

  const handleQuantityChange = async (id: number, delta: number) => {
    const updatedRent = rent.map(item =>
      item.service_id === id ? { ...item, quantity: item.quantity + delta } : item
    );

    const filteredRent = updatedRent.filter(item => item.quantity > 0);

    dispatch(fetchCartSuccess({ rent: filteredRent, vmachines: detailedVMachines }));

    try {
      const data = { service_id: id, quantity: delta, is_main: false };
      const csrfToken = getCSRFToken();

      if (!csrfToken) {
        throw new Error("CSRF token is missing");
      }

      await api.rentList.rentListCreate(data, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
    } catch (error) {
      console.error("Ошибка при обновлении количества:", error);
    }
  };

  const handleFormRequest = async () => {
    if (!fullName || !email || !fromDate) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    const formattedDate = new Date(fromDate).toISOString().split("T")[0]; 

    const data = {
      full_name: fullName,
      email: email,
      from_date: formattedDate,  
      rent, 
    };

    const csrfToken = getCSRFToken();

    if (!csrfToken) {
      alert("CSRF token is missing");
      return;
    }

    try {
      await api.rentFormed.updateStatus(data, {
        withCredentials: true,
        headers: {
          "X-CSRFToken": csrfToken,
        },
      });
    } catch (error) {
      console.error("Ошибка при формировании заявки:", error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Загружаем корзину...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Пустая заявка</Alert>
      </Container>
    );
  }

  const isCartEmpty = rent.length === 0 || detailedVMachines.length === 0 || rent.every(item => item.quantity === 0);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <h2 className="text-center">Ваша текущая заявка</h2>
        </Col>
      </Row>
  
      {/* Форма сверху */}
      <Row className="mt-3 justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group>
              <Form.Label>Полное имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ваше полное имя"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Введите ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Дата начала аренды</Form.Label>
              <Form.Control
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </Form.Group>
          </Form>
  
          
          
        </Col>
      </Row>
  
      {isCartEmpty ? (
        <p className="text-center">Заявка пуста.</p>
      ) : (
        <Row className="flex-column align-items-center">
          {detailedVMachines.map((vm) => {
            const rentItem = rent.find(item => item.service_id === vm.id);
            if (rentItem && rentItem.quantity > 0) {
              return (
                <Row key={vm.id} className="py-3 w-75 align-items-center border-bottom">
                  <Col xs={3} className="text-center">
                    {vm.url && <img src={vm.url} alt={vm.name} style={{ width: "100%" }} />}
                  </Col>
                  <Col xs={6}>
                    <h5 className="mb-1">{vm.name}</h5>
                    <p className="mb-1">Цена: {vm.price} ₽/мес</p>
                  </Col>
                  <Col xs={3} className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(vm.id, -1)}
                      >
                        −
                      </Button>
                      <span className="mx-2">{rentItem.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleQuantityChange(vm.id, 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Row>
              );
            }
            return null;
          })}
          <Row className="mt-4">
            <Col md={12} className="text-end">
              <h3>Общая сумма: {calculateTotalPrice(detailedVMachines, rent).toFixed(2)} ₽/мес</h3>
            </Col>
            <div className="d-flex justify-content-end mt-3">
            <Button
              variant="primary"
              onClick={handleFormRequest}
            >
              Отправить заявку
            </Button>
          </div>
          <div className="d-flex justify-content-left">
            <Button
              variant="danger"
              onClick={handleFormRequest}
            >
              Удалить заявку
            </Button>
          </div>
          </Row>
        </Row>
      )}
  
      <Row className="mt-5">
        <Col md={12}>
          <h3 className="text-center">Сформированные заявки</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Полное имя</th>
                <th>Email</th>
                <th>Дата начала аренды</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                request.rent.map((rentItem: any) => (
                  <tr key={rentItem.id}>
                    <td>{rentItem.full_name || "Не указано"}</td>
                    <td>{rentItem.email || "Не указано"}</td>
                    <td>{rentItem.from_date ? new Date(rentItem.from_date).toLocaleDateString() : "Не указано"}</td>
                    <td>{rentItem.status || "Не указано"}</td>
                  </tr>
                ))
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
  
};

export default CartPage;