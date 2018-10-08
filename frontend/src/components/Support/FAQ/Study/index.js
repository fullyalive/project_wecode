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
import styles from "shared/faqStyles.scss";

export default class StudyFAQ extends Component {
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
        <div className={styles.faqInfo}>프로그래밍 스터디 FAQ</div>
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
                    <span className={styles.faqTitle}>
                      환불 규정은 어떻게 되나요?
                    </span>
                    <p className={styles.faqContent}>
                      <span className={styles.titleHighlight}>
                        1개월(5주)이내인 강의
                      </span>
                      - 스터디 시작
                      <span className={styles.contentHighlight}>7일 이전</span>:
                      전액 환불
                      <br />- 스터디 시작
                      <span className={styles.contentHighlight}>하루 전</span>:
                      80% 환불
                      <br />- 스터디 강의 시간이
                      <span className={styles.contentHighlight}>
                        1/3 지나기 전
                      </span>
                      : 수강료의 2/3 해당 금액
                      <br />- 스터디 강의 시간이
                      <span className={styles.contentHighlight}>
                        1/2 지나기 전
                      </span>
                      : 수강료의 1/2 해당 금액
                      <br />- 스터디 강의 시간이
                      <span className={styles.contentHighlight}>
                        1/2 경과 후
                      </span>
                      : 환불 없음
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.faqContent}>
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
                    <p className={styles.faqContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.faqContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.faqContent}>
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                      더미 텍스트더미 텍스트텍스트 더미 텍스트더미 텍스트텍스트
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>1번 질문</span>
                    <p className={styles.faqContent}>
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
