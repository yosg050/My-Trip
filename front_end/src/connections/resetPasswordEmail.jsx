import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

const handleResetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("נשלח אימייל לאיפוס סיסמה. בדוק את תיבת הדואר שלך.");
  } catch (error) {
    console.error("שגיאה באיפוס סיסמה:", error);
    alert("אירעה שגיאה. נסה שוב מאוחר יותר.");
  }
};

export default handleResetPassword