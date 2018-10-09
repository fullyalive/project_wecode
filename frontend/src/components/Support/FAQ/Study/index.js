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
                    <span className={styles.faqTitle}>
                      수업은 어디에서 진행되나요?
                    </span>
                    <p className={styles.faqContent}>
                      주로 신촌, 서강대학교에서 진행되며 강의별 수업장소와
                      시간이 안내되어 있습니다.
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
                    <span className={styles.faqTitle}>
                      스터디 중개료는 얼마인가요?
                    </span>
                    <p className={styles.faqContent}>
                      현재 20%의 수수료를 받으며, 강의실 대관과 홍보를
                      대행해드리고 있습니다.
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>
                      스터디를 만들고 싶습니다.
                    </span>
                    <p className={styles.faqContent}>
                      스터디 개설에 관한 건은 카카오톡 @위코드로 문의주시길
                      바랍니다.
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
