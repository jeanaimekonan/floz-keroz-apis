import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SidebarNav from '../SidebarNav/SidebarNav';
import BreadcrumbAndProfile from '../BreadcrumbAndProfile/BreadcrumbAndProfile';
import InfoCard from '../InfoCard/InfoCard';
import NewsCard from '../NewsCard/NewsCard';
import DonutChart from './DonutChart';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

function Dashboard({ totalIncomes, totalExpenses, expenses }) {
  const total = totalIncomes + totalExpenses;

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="sidebar">
          <SidebarNav />
        </Col>
        <Col md={10} className="main-content main">
          <BreadcrumbAndProfile 
            username="Mr. French Pitbull" 
            role="Freelancer React Developer" 
            pageTitle="Dashboard"
            breadcrumbItems={[
              { name: 'Dashboard', path: '/dashboard', active: true },
            ]}
          />

          <Row className="mb-3">
            <Col md={4}>
              <Button onClick={handleReload} className="secondary-button w-50">
                <FontAwesomeIcon icon={faRotateRight} className="icon-left" />
                Reload
              </Button>
            </Col>
          </Row>

          {/* Info Cards */}
          <Row className="mb-3">
            <Col md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <InfoCard title="Incomes" value={`$${totalIncomes}`} linkText="Add or manage Income" linkTo="/incomes" />
              </motion.div>
            </Col>
            <Col md={6}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <InfoCard title="Expenses" value={`$${totalExpenses}`} linkText="Add or manage Expenses" linkTo="/expenses" />
              </motion.div>
            </Col>
          </Row>

          {/* Donut Chart Section */}
          <Row>
            <Col md={12}>
              <DonutChart expenses={expenses} />
            </Col>
          </Row>

          {/* News Section */}
          <div className="news-section">
            <h2>Latest News</h2>
            <Row>
              <Col md={4}>
                <NewsCard topic="personal-finance" image="/images/News/finance.jpg" title="Financial Freedom" description="Unlock financial success." />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
