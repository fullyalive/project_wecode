import React, { Component } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./styles.scss";

export default class FAQtabs extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs className={styles.customizedNav}>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <span className={styles.navItem}>수강생</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <span className={styles.navItem}>스터디리더</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className={styles.faqContainer}>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <div className={styles.faqContainer}>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.fqaContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane tabId="2">
            <Row>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane> */}
        </TabContent>
      </div>
    );
  }
}
