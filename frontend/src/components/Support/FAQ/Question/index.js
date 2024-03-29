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
import Ask from "components/Support/FAQ/Question/Ask";
import Answer from "components/Support/FAQ/Question/Answer";

export default class QuestionFAQ extends Component {
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
        <div className={styles.faqInfo}>지식거래 FAQ</div>
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
              <span className={styles.navItem}>멘티</span>
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
              <span className={styles.navItem}>멘토</span>
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
                      어떻게 질문하면 되나요?
                    </span>
                    <p className={styles.faqContent}>
                      <Ask />
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>
                      이용료는 얼마인가요?
                    </span>
                    <p className={styles.faqContent}>
                      현재 질문당
                      <span className={styles.faqHighlight}>2,000원</span>
                      으로 일괄 책정하고 있으며
                      <span className={styles.faqHighlight}>[오류해결]</span>
                      또는
                      <span className={styles.faqHighlight}>
                        [알고리즘 문제]
                      </span>
                      에 대한 답변이 가능합니다.
                      <br />더 자세한 사항은
                      <a
                        href="http://pf.kakao.com/_qExdRj/chat"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={styles.faqLink}
                      >
                        카카오톡 1:1 문의
                      </a>
                      를 통해서 연락해주세요!
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>
                      답변은 어디서 확인하나요?
                    </span>
                    <p className={styles.faqContent}>
                      신청해주신 메일 주소로 답변 링크를 보내드리며,
                      <br />
                      답변은 위코드 사이트 내에 게시됩니다.
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
                      어떻게 답변하면 되나요?
                    </span>
                    <p className={styles.faqContent}>
                      <Answer />
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>
                      수수료는 얼마인가요?
                    </span>
                    <p className={styles.faqContent}>
                      베타 테스트 기간 중 수수료를 받지 않습니다.
                      <br />더 자세한 사항은
                      <a
                        href="http://pf.kakao.com/_qExdRj/chat"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={styles.faqLink}
                      >
                        카카오톡 1:1 문의
                      </a>
                      를 통해서 연락해주세요!
                    </p>
                  </div>
                  <div className={styles.faqRow}>
                    <span className={styles.faqTitle}>
                      질문은 어디서 받나요?
                    </span>
                    <p className={styles.faqContent}>
                      신청해주신 메일 주소로 질문 링크를 보내드리며,
                      <br />
                      질문과 답변은 위코드 사이트 내에 게시됩니다.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
