import React, { useEffect } from "react";
import { Button, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import { Github, Linkedin, Whatsapp } from "react-bootstrap-icons";


export default function Info({ show, handleClose }) {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .nav-tabs {
        display: flex !important;
        width: 100% !important;
      }
      .nav-tabs .nav-item {
        flex: 1 !important;
      }
      .nav-tabs .nav-link {
        width: 100% !important;
        text-align: center !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          עזרה ויצירת קשר
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          height: "80vh",
          overflowY: "auto",
          direction: "rtl",
        }}
      >
        <Tabs
          defaultActiveKey="מידע למשתמש"
          id="uncontrolled-tab-example"
          className="mb-3 "
        >
          <Tab eventKey="יצירת קשר" title="יצירת קשר">
            <div
              style={{
                textAlign: "center",
                marginTop: "10%",
              }}
            >
              <Row>
                <Col>
                  <Button
                    variant="link"
                    style={{ width: "fit-content" }}
                    onClick={() =>
                      window.open("https://www.linkedin.com/in/yosefgeller")
                    }
                  >
                    <Linkedin strokeWidth={3} width={24} height={24} />
                  </Button>
                  <p>Linkedin</p>
                </Col>
                <Col>
                  <Button
                    variant="link"
                    style={{ width: "fit-content" }}
                    onClick={() =>
                      window.open("https://wa.me/message/4BAFYQ42O6OVH1")
                    }
                  >
                    <Whatsapp
                      strokeWidth={3}
                      width={24}
                      height={24}
                      color="#25D366"
                    />
                  </Button>
                  <p>Whatsapp </p>
                </Col>
                <Col>
                  <Button
                    variant="link"
                    style={{ width: "fit-content" }}
                    onClick={() => window.open("https://github.com/yosg050")}
                  >
                    <Github
                      strokeWidth={3}
                      width={24}
                      height={24}
                      color="block"
                    />
                  </Button>
                  <p>Github </p>
                </Col>
              </Row>
            </div>
          </Tab>
          <Tab eventKey="מידע למשתמש" title="מידע למשתמש">
            <div style={{ marginLeft: "5%", marginRight: "5%" }}>
              <div
                style={{
                  maxHeight: "60vh",
                  overflowY: "auto",
                  marginBottom: "20px",
                  direction: "rtl",
                }}
              >
                <p>
                  MyTrip הוא הכלי המושלם לתכנון וניהול הטיולים שלך בישראל. הנה
                  כיצד תוכל להפיק את המירב מהאפליקציה שלנו:
                </p>
                <ol>
                  <li>
                    <strong>הרשמה קלה ומהירה</strong>: התחל על ידי יצירת חשבון
                    אישי. זה פשוט, מהיר, וחינם!
                  </li>
                  <li>
                    <strong>גילוי מקומות חדשים: </strong>בכל פעם שאתה נתקל במקום
                    מעניין - בין אם בטיול, בהמלצה מחבר, או בכתבה - פתח את MyTrip
                    ושמור אותו ברשימה האישית שלך. כך תוכל לאסוף רעיונות לטיולים
                    עתידיים בקלות.
                  </li>
                  <li>
                    <strong>שמירת מקומות מועדפים: </strong>לחץ על כפתור "שמור"
                    ליד כל מקום שמעניין אותך. הוא יתווסף מיד לרשימה האישית שלך
                    לשימוש עתידי.
                  </li>
                  <li>
                    <strong>תכנון טיול בקלות: </strong> כשאתה מוכן לטייל, פשוט
                    פתח את האפליקציה ובחר מהרשימה האישית שלך. אין צורך להתחיל
                    לחפש מחדש או להיזכר ברעיונות ישנים - הכל כבר מוכן ומחכה לך!
                  </li>
                  <li>
                    <strong> סימון מקומות שביקרת: </strong>לאחר ביקור במקום,
                    תוכל לסמן אותו כ"ביקרתי". המקום יישאר ברשימה שלך, אבל עם
                    סימון מיוחד. כך תוכל לעקוב אחרי המקומות שכבר ראית, ולשתף
                    המלצות עם חברים.
                  </li>
                  <li>
                    <strong> גישה מכל מקום: </strong>בין אם אתה בבית מתכנן את
                    הטיול הבא, או כבר בשטח ומחפש את היעד הבא, MyTrip זמין לך
                    תמיד - במחשב, בטלפון הנייד או בטאבלט.
                  </li>
                </ol>
                <p>
                  <strong>
                    עם MyTrip, תכנון הטיול הבא שלך הופך לחוויה פשוטה, מהנה
                    ומרגשת. אז קדימה, התחל לחקור, לשמור ולטייל!{" "}
                  </strong>
                </p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
