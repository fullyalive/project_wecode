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
import style from "./style.css";
import StudyFAQ from "components/Support/FAQ/Study";
import QuestionFAQ from "components/Support/FAQ/Question";

export default class Support extends Component {
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
    let supportBanner = require(`images/supportBanner.jpg`);
    return (
      <div className={styles.container}>
        <div
          className={styles.boardTitle}
          style={{ backgroundImage: `url(${supportBanner})` }}
        >
          <span className={styles.title}>위코드 고객센터</span>
          <span className={styles.subTitle}>무엇이든 도와드릴게요 :)</span>
        </div>
        <Nav tabs className={styles.customizedNav}>
          <NavItem className={styles.customizedNavitem}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "1"
              })}
              onClick={() => {
                this.toggle("1");
              }}
              style={{ borderRadius: 3 }}
            >
              <span className={styles.navItem}>지식거래 FAQ</span>
            </NavLink>
          </NavItem>
          <NavItem className={styles.customizedNavitem}>
            <NavLink
              className={classnames({
                active: this.state.activeTab === "2"
              })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <span className={styles.navItem}>스터디 FAQ</span>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent
          className={styles.tabContainer}
          activeTab={this.state.activeTab}
        >
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <QuestionFAQ />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <StudyFAQ />
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
