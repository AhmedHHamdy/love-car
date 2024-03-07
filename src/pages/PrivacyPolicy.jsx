import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { i18n } = useTranslation();

  return (
    <section className="bg-secondary">
      {i18n.language == "ar" ? (
        <article className="w-8/12 mx-auto p-6">
          <h1 className="text-center text-primary text-2xl font-bold mb-4">
            سياسة الخصوصية
          </h1>

          <section className="flex flex-col gap-6">
            <section>
              <h2 className="text-primary mb-1 font-semibold">المقدمة:</h2>
              <p>
                توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وكشفنا وحماية
                المعلومات الشخصية لعملائنا فيما يتعلق بخدمات صيانة المركبات
                الخاصة بنا.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                أنواع المعلومات الشخصية المجمعة:
              </h2>
              <ul>
                <li>
                  - معلومات الاتصال، مثل الاسم والعنوان ورقم الهاتف وعنوان
                  البريد الإلكتروني
                </li>
                <li>
                  - معلومات المركبة، مثل الصنع والطراز والسنة ورقم الهيكل (VIN)
                  ورقم لوحة الترخيص
                </li>
                <li>
                  - تاريخ الخدمة والتفضيلات، مثل نوع الخدمات المقدمة وتكرار
                  مواعيد الخدمة
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                الغرض من جمع المعلومات:
              </h2>
              <p>
                تُستخدم المعلومات الشخصية التي نجمعها لتقديم وتحسين خدمات صيانة
                المركبات الخاصة بنا. قد نستخدم هذه المعلومات للأغراض التالية:
              </p>
              <ul>
                <li>- جدولة وتأكيد مواعيد الخدمة</li>
                <li>- تقديم عروض الخدمة والفواتير</li>
                <li>- التواصل مع عملائنا بشأن مركباتهم وتاريخ الخدمة</li>
                <li>
                  {" "}
                  - تخصيص خدماتنا وتصميم اتصالات التسويق بما يلبي احتياجات
                  عملائنا
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                كشف المعلومات الشخصية:
              </h2>
              <p>
                قد نشارك المعلومات الشخصية مع مقدمي الخدمات الخارجية الذين
                يساعدوننا في تقديم خدمات صيانة المركبات. يُطلب من هؤلاء مقدمي
                الخدمات الحفاظ على سرية وأمان المعلومات الشخصية ويُمنعون من
                استخدامها لأي غرض آخر. قد نكشف أيضًا المعلومات الشخصية حسب
                القانون، مثل الاستجابة لأمر قضائي أو استدعاء.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                أمان البيانات:
              </h2>
              <p>
                نتخذ خطوات معقولة لحماية المعلومات الشخصية التي نجمعها من الوصول
                غير المصرح به أو الاستخدام أو الكشف. يتضمن ذلك التدابير الفنية
                والإدارية والبدنية لتأمين أنظمتنا وبياناتنا. ومع ذلك، لا يمكن
                ضمان أن أي نقل للبيانات عبر الإنترنت أو نظام تخزين يمكن أن يكون
                آمنًا بنسبة 100٪. ونتيجة لذلك، لا يمكننا ضمان أمان أي معلومات
                شخصية تُرسل إلينا أو تُخزن على أنظمتنا.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                الوصول والتصحيح:
              </h2>
              <p>
                يمكن للعملاء طلب الوصول إلى معلوماتهم الشخصية وطلب تصحيح أي عدم
                دقة. سنرد على مثل هذه الطلبات في الوقت المناسب ونتخذ خطوات
                معقولة للتحقق من هوية الطالب.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                تغييرات في سياسة الخصوصية:
              </h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في
                ممارسات الخصوصية لدينا. سنُعلم العملاء بأي تغييرات مهمة في سياسة
                الخصوصية هذه عن طريق نشر السياسة المحدثة على موقعنا على الويب.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">تواصل معنا:</h2>
              <p>
                إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية لدينا أو
                المعلومات الشخصية التي نجمعها، يرجى الاتصال بنا على العنوان أو
                رقم الهاتف المدرج على موقعنا على الويب.
              </p>
            </section>
          </section>
        </article>
      ) : (
        <article className="w-8/12 mx-auto p-6">
          <h1 className="text-center text-primary text-2xl font-bold mb-4">
            Privacy Policy
          </h1>

          <section className="flex flex-col gap-6">
            <section>
              <h2 className="text-primary mb-1 font-semibold">Introduction:</h2>
              <p>
                This Privacy Policy outlines how we collect, use, disclose, and
                protect the personal information of our customers in connection
                with our vehicle maintenance services.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                Types of Personal Information Collected:
              </h2>
              <ul>
                <li>
                  - Contact information, such as name, address, phone number,
                  and email address
                </li>
                <li>
                  - Vehicle information, such as make, model, year, VIN, and
                  license plate number
                </li>
                <li>
                  - Service history and preferences, such as the type of
                  services performed and the frequency of service appointments
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                Purpose of Collection:
              </h2>
              <p>
                The personal information we collect is used to provide and
                improve our vehicle maintenance services. We may use this
                information for the following purposes:
              </p>
              <ul>
                <li>- To schedule and confirm service appointments</li>
                <li>- To provide service quotes and invoices</li>
                <li>
                  - To communicate with our customers regarding their vehicles
                  and service history
                </li>
                <li>
                  - To personalize our services and tailor our marketing
                  communications to meet the needs of our customers
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                Disclosure of Personal Information:
              </h2>
              <p>
                We may share personal information with third-party service
                providers who assist us in providing vehicle maintenance
                services. These service providers are required to maintain the
                confidentiality and security of the personal information and are
                prohibited from using it for any other purpose. We may also
                disclose personal information as required by law, such as in
                response to a court order or subpoena.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                Data Security:
              </h2>
              <p>
                We take reasonable steps to protect the personal information we
                collect from unauthorized access, use, or disclosure. This
                includes physical, technical, and administrative measures to
                secure our systems and data. However, no data transmission over
                the internet or storage system can be guaranteed to be 100%
                secure. As a result, we cannot guarantee the security of any
                personal information transmitted to us or stored on our systems.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                Access and Correction:
              </h2>
              <p>
                Customers may request access to their personal information and
                request that any inaccuracies be corrected. We will respond to
                such requests in a timely manner and take reasonable steps to
                verify the identity of the requester.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">
                Changes to Privacy Policy:
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our privacy practices. We will notify customers of
                any material changes to this Privacy Policy by posting the
                updated policy on our website.
              </p>
            </section>

            <section>
              <h2 className="text-primary mb-1 font-semibold">Contact Us:</h2>
              <p>
                If you have any questions or concerns about our Privacy Policy
                or the personal information we collect, please contact us at the
                address or phone number listed on our website.
              </p>
            </section>
          </section>
        </article>
      )}
    </section>
  );
}
