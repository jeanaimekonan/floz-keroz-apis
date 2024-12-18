import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import SidebarNav from "../SidebarNav/SidebarNav";
import BreadcrumbAndProfile from "../BreadcrumbAndProfile/BreadcrumbAndProfile";
import DonutChart from "./DonutChart";
import "./Dashboard.css";
import { motion } from "framer-motion";
import LineChart from "./LineChart"; // Importez le composant LineChart

function Dashboard({ totalIncomes, totalExpenses, incomes, expenses }) {
  // Regrouper les données par catégorie
  const expenseData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});

  const incomeData = incomes.reduce((acc, income) => {
    acc[income.category] = (acc[income.category] || 0) + parseFloat(income.amount);
    return acc;
  }, {});

  // Calculer les épargnes mensuelles (totalIncomes - totalExpenses)
  const savingsData = [
    10, 20, 30, 42, 51, 82, 31, 59, 61, 73, 91, 58, // Par défaut, remplacez par vos calculs si nécessaire
  ];

  const totalBalance = totalIncomes - totalExpenses;

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <SidebarNav />
        </Col>
        <Col md={10} className="main-content">
          <BreadcrumbAndProfile
            username="Mr. French Pitbull"
            role="Freelancer React Developer"
            pageTitle="Dashboard"
            breadcrumbItems={[{ name: "Dashboard", path: "/dashboard", active: true }]}
          />

          {/* LineChart pour l'épargne */}
          <Row className="my-4">
            <Col>
              <motion.div whileHover={{ scale: 1 }}>
                <Card className="shadow-sm p-3">
                  <Card.Title className="text-center">Évolution de l'Épargne</Card.Title>
                  <LineChart savingsData={savingsData} />
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Diagrammes Donut */}
          <Row className="my-4 text-center">
            <Col md={6}>
              <DonutChart data={expenseData} title="Répartition des Dépenses" />
            </Col>
            <Col md={6}>
              <DonutChart data={incomeData} title="Répartition des Revenus" />
            </Col>
          </Row>

          

          {/* Soldes */}
          <Row className="my-4">
            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="balance-card">
                <Card className="shadow-sm text-center p-3 balance-card">
                  <Card.Title>Total Revenus</Card.Title>
                  <Card.Text className="balance-amount">${totalIncomes}</Card.Text>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="balance-card">
                <Card className="shadow-sm text-center p-3 balance-card">
                  <Card.Title>Total Dépenses</Card.Title>
                  <Card.Text className="balance-amount">${totalExpenses}</Card.Text>
                </Card>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div whileHover={{ scale: 1.05 }} className="balance-card">
                <Card
                  className={`shadow-sm text-center p-3 balance-card ${
                    totalBalance >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  <Card.Title>Solde Total</Card.Title>
                  <Card.Text className="balance-amount">${totalBalance}</Card.Text>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
