# QuoteBench — דף נחיתה + רשימת המתנה

כלי תמחור והצעות מחיר לנגרים בהזמנה אישית (ארה"ב, בריטניה, קנדה, אוסטרליה).
שלב 1: דף נחיתה באנגלית עם טופס הרשמה. בנוי ב-Expo, כך שאותו קוד יהפוך בהמשך לאפליקציה ב-App Store וב-Google Play.

## מה יש בתיקייה

| קובץ | מה הוא עושה |
|---|---|
| `src/app/index.tsx` | הדף עצמו: כותרת, 3 יתרונות, תחתית |
| `src/components/WaitlistForm.tsx` | טופס ההרשמה (אימייל + "איך אתם מתמחרים היום?") |
| `src/lib/config.ts` | **הכי נוח לשנות כאן:** שם המוצר ותשובות השאלה |
| `src/lib/theme.ts` | צבעים |
| `docs/google-apps-script.js` | קוד קטן ששומר הרשמות בגיליון Google |
| `netlify.toml` | הוראות ל-Netlify איך לבנות את האתר |

## שלב 1 — שמירת ההרשמות בגיליון Google (חינם, 5 דקות)

1. פתחו גיליון חדש ב-[sheets.new](https://sheets.new) ותנו לו שם, למשל "QuoteBench Waitlist".
2. בתפריט: **Extensions → Apps Script**.
3. מחקו את מה שכתוב שם, והדביקו את כל התוכן של `docs/google-apps-script.js`. לחצו 💾 שמירה.
4. למעלה מימין: **Deploy → New deployment**. ליד "Select type" לחצו על גלגל השיניים ← **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
5. לחצו **Deploy**, אשרו הרשאות (Google תזהיר "unverified app" — זה הקוד שלכם, לחצו Advanced ← Go to...).
6. העתיקו את הכתובת שמסתיימת ב-`/exec`. זה ה-**WAITLIST URL** שלכם.

כל הרשמה תופיע כשורה חדשה בלשונית "Waitlist": תאריך, אימייל, תשובה, אזור זמן (מראה מאיזו מדינה), ומקור. אימייל כפול נשמר פעם אחת.

## שלב 2 — העלאת האתר לאוויר ב-Netlify (חינם)

1. היכנסו ל-[app.netlify.com](https://app.netlify.com) עם חשבון GitHub.
2. **Add new site → Import an existing project → GitHub** ובחרו את `afikarush/price`.
3. Netlify יקרא את `netlify.toml` לבד. לפני Deploy, לחצו **Add environment variables**:
   - Key: `EXPO_PUBLIC_WAITLIST_URL`
   - Value: הכתובת מסוף שלב 1
4. **Deploy**. תוך 2–3 דקות תקבלו כתובת כמו `quotebench.netlify.app`.
5. מעכשיו, כל שינוי שנדחף ל-GitHub מעדכן את האתר אוטומטית.
6. (אופציונלי) דומיין משלכם: **Domain management → Add a domain**. הדומיין עצמו עולה ~10–15$ לשנה.

> אם משנים את `EXPO_PUBLIC_WAITLIST_URL` אחר כך — צריך ללחוץ **Deploys → Trigger deploy** כדי שהשינוי ייכנס.

## להרצה על המחשב (לא חובה)

צריך [Node.js](https://nodejs.org) מותקן. אז בטרמינל, בתוך התיקייה:

```bash
npm install          # פעם אחת: מוריד את הספריות
cp .env.example .env.local   # ואז הדביקו את ה-WAITLIST URL בקובץ
npm run web          # פותח את הדף בדפדפן
npm start            # או: סרקו את הקוד עם אפליקציית Expo Go בטלפון
```

## בהמשך: האפליקציה

אותו קוד רץ כבר על iPhone ו-Android (דרך Expo Go). כשנבנה את מחשבון התמחור, נוסיף מסכים ב-`src/app/`, ונעלה לחנויות עם EAS (`npx eas-cli build`). צריך חשבון Apple Developer (99$ לשנה) ו-Google Play (25$ חד-פעמי).
