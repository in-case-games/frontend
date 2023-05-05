import React from "react";
import {DocumentLink} from "../../../components/сommon/button";

const UserAgreement = () => {
    return(
        <div className="info-text">
            <h1>Пользовательское соглашение</h1>
            <h3>Внимание! Пожалуйста, ознакомьтесь с настоящим пользовательским соглашением до начала использования сайта incase.games и его программных средств.</h3>
            <p>Регистрация (авторизация) на сайте будет означать ваше согласие с условиями настоящего пользовательского соглашения.</p>
            <p>Если Вы не согласны с условиями настоящего пользовательского соглашения, не регистрируйтесь (авторизируйтесь) на сайте и не используйте его программные средства.</p>
            <p>Администратор с одной стороны и лицо, принявшее предложение, размещенное на интернет-сайте {<DocumentLink link="/info/user-agreement" text="https://incase.games/info/user-agreement"/>}, с другой стороны, заключили настоящее пользовательское соглашение следующим образом.</p>
            <h4>1. Термины и определения</h4>
            <div className="sub-items">
                1.1. В настоящем пользовательском соглашении, если из текста прямо не вытекает иное, следующие термины будут иметь указанные ниже значения:
                <p>«Пользователь» - Физическое лицо, имеющее аккаунт Steam, заключившее с Владельцем Соглашение.</p>
                <p>«Сайт» - Составные произведения, представляющие собой совокупность информации, текстов, графических элементов, дизайна, изображений, фото и видеоматериалов, программ для ЭВМ, иных результатов интеллектуальной деятельности, за исключением Инвентаря, содержащихся в информационной системе, обеспечивающей доступность такой информации в сети Интернет в пределах доменной зоны incase.games</p>
                <p>«Соглашение» - Настоящее пользовательское соглашение.</p>
                <p>«Стороны» - Владелец и Пользователь.</p>
                <p>«Инка, Инкоин, InCoin» - Внутренняя цифровая валюта, используемая для оплаты товаров и услуг внутри проекта. При покупке инкоина учитывается актуальный курс конвертации фиатной валюты: 1 RUB = 7 инкоинов. Название валюты не зависит от буквенного регистра</p>
                1.2. Все остальные термины и определения, встречающиеся в тексте Соглашения, толкуются Сторонами в соответствии с законодательством России и сложившимися в сети Интернет обычными правилами толкования соответствующих терминов.<br/>
                1.3. Названия заголовков (статей) Соглашения предназначены исключительно для удобства пользования текстом Соглашения и буквального юридического значения не имеют.
            </div>
            <h4>2. Заключение Соглашения</h4>
            <div className="sub-items">
                2.1. Текст Соглашения, постоянно размещенный в сети Интернет по сетевому адресу {<DocumentLink link="/info/user-agreement" text="https://incase.games/info/user-agreement"/>} и доступный при регистрации (авторизации) на Сайте, содержит все существенные условия Соглашения и является предложением Владельца заключить Соглашение с любым полностью дееспособным третьим лицом, использующим Сайт, на указанных в тексте Соглашения условиях. Текст Соглашения является публичной офертой в соответствии с законодательством Российской Федерации.<br/>
                <h5>2.2. Надлежащее принятие этого предложения в соответствии с законодательством России - это последовательное выполнение третьей стороной следующих действий:</h5>
                <p className="sub-items">
                    2.2.1. Ознакомление с условиями Соглашения;<br/>
                    2.2.2. Проставление символа в специальном поле под заголовком «Я принимаю условия пользовательского соглашения»;<br/>
                </p>
            </div>
            <h4>3. Предмет Соглашения</h4>
            <div className="sub-items">
                <h5>3.1 Владелец предоставляет Пользователю:</h5>
                <p className="sub-items">
                3.1.1. Безвозмездную простую (неисключительную) лицензию на использование Сайта и его программных средств по их прямому назначению, как то предусмотрено явными пользовательскими функциями Сайта и Личного кабинета;<br/>
                3.1.2. Возмездную простую (неисключительную) лицензию на использование Кейса по его прямому назначению, при этом стоимость лицензии на использование определенного Кейса указана на Сайте.<br/>
                </p>
                3.2. Указанная в пункте 3.1.1 Соглашения лицензия предоставляется Пользователю на срок, в течение которого, и в пределах территории, на которой Сайт и Личный кабинет остаются доступными для Пользователя.<br/>
                3.3. Указанная в пункте 3.1.2 Соглашения лицензия предоставляется Пользователю в пределах территории, на которой Кейс остается доступным для Пользователя в течение срока с момента оплаты Пользователем вознаграждения за использование конкретного Кейса до момента определения Инвентаря с помощью такого Кейса.<br/>
                <h5>3.4. Пользователю запрещается:</h5>
                <p className="sub-items">
                    3.4.1. Обходить технические ограничения, установленные на Сайте и в Кейсе;<br/>
                    3.4.2. Изучать технологию, декомпилировать или дизассемблировать Сайт, Кейс и Личный кабинет, за исключением случаев, прямо предусмотренных законодательством России;<br/>
                    3.4.3. Создавать копии экземпляров Сайта, Кейсов и Личного кабинета, а также их внешнего оформления (дизайна);<br/>
                    3.4.4. Изменять Сайт, Кейсы и Личный кабинет каким бы то ни было способом;<br/>
                    3.4.5. Совершать действия, направленные на изменение функционирования и работоспособности Сайта, Кейсов и Личного кабинета;<br/>
                    3.4.6. Предоставлять доступ к Личному кабинету третьему лицу;<br/>
                    3.4.7. Осуществлять указанные выше действия в отношении любой части Сайта, Кейсов и Личного кабинета.
                </p>
            </div>
            <h4>4. Функции Сайта, Кейса и Личного кабинета</h4>
            <div className="sub-items">
                <h5>4.1 Пользователь посредством Сайта имеет возможность:</h5>
                <p className="sub-items">
                    4.1.1. Знакомиться с содержанием и характеристиками Инвентаря, выбор которого происходит посредством определенного Кейса, и стоимостью лицензии на использование такого Кейса;<br/>
                    4.1.2. Приобретать лицензию на использование Кейса и получать соответствующий Инвентарь в порядке, указанном в Соглашении.
                </p>
                4.2. Пользователь посредством Кейса имеет возможность получить один из предоставленных на странице, содержащей Кейс, Инвентарей. Инвентарь для получения Пользователем определяется автоматически посредством использования Кейса.<br/>
                <h5>4.3. Пользователь посредством Личного кабинета имеет возможность:<br/></h5>
                <p className="sub-items">
                    4.3.1. Принять Инвентарь в аккаунт Steam;<br/>
                    4.3.2. Осуществить путем совершения действия или бездействия в течение месяца с момента получения Инвентаря посредством использования Кейса отчуждение Инвентаря за бонусные баллы, в количестве, указанном в описании Инвентаря в Личном кабинете, дающие право на получение скидки при оплате лицензионного вознаграждения за Кейсы.
                </p>
            </div>
            <h4>5. Приемка Инвентаря</h4>
            <p className="sub-items">
                5.1. С момента получения Инвентаря посредством использования Кейса и его отображением в Личном кабинете, Пользователь в течение месяца имеет возможность принять Инвентарь в аккаунт Steam, либо осуществить отчуждение Инвентарь посредством Личного кабинета.<br/>
                5.2. Приемка Инвентаря в аккаунт Steam осуществляется при условии выполнения Пользователем указанных на Сайте и в Личном кабинете настроек аккаунта Steam и Личного кабинета.<br/>
                5.3. Для приемки Инвентаря в аккаунт Steam при условии соблюдения требований пункта 5.2 Соглашения, Пользователь переходит по ссылке «ВЫВОД», расположенной в Личном кабинете непосредственно в описании такого Инвентаря.<br/>
                5.4. Пользователь имеет возможность осуществить отчуждение полученного, но ещё не принятого в аккаунт Steam Инвентаря за указанное в описании Инвентаря в Личном кабинете количество бонусных баллов, дающих право на скидку при оплате лицензионного вознаграждения за Кейсы, при этом один бонусный балл дает право на скидку в один Инкоин исключительно для указанных целей (оплата лицензионного вознаграждения). Стороны согласовали, что указанные бонусные баллы не являются денежными средствами и не подлежат возврату и/или обмену.<br/>
                5.5. Для отчуждения Инвентаря Пользователь в течение месяца с момента получения Инвентаря переходит по соответствующей ссылке, расположенной в Личном кабинете непосредственно с описанием такого Инвентаря. Бездействие Пользователя по истечении месяца с момента получения Инвентаря означает отчуждение им полученного, но ещё не принятого в аккаунт Steam Инвентаря.<br/>
                5.6. При отчуждении Инвентаря полученные Пользователем бонусные баллы отображаются в Личном кабинете.
            </p>
            <h4>6. Вознаграждение Владельца</h4>
            <p className="sub-items">
                6.1. За предоставленное Владельцем право использования Кейса Пользователь выплачивает лицензионное вознаграждение в размере, указанном на Сайте и соответствующей странице Кейса.<br/>
                6.2. Указанное в пункте 6.1 Соглашения лицензионное вознаграждение выплачивается Пользователем из средств, заранее переданных Владельцу посредством платежного сервиса, информация о котором доступна Пользователю в момент оплаты. Сумма заранее переданных средств отображается в Личном кабинете.<br/>
                6.3. Передача средств Владельцу в счет оплаты указанного в пункте 6.1 Соглашения лицензионного вознаграждения осуществляется Пользователем способом, в порядке и по правилам, указанным на соответствующей странице Сайта, с учетом особенностей и требований, устанавливаемых соответствующим платежным сервисом, привлеченным Владельцем для осуществления расчетов.<br/>
                6.4. Моментом выплаты указанного в пункте 6.1 Соглашения лицензионного вознаграждения является момент списания соответствующей суммы средств, заранее переданных Владельцу, о чем Пользователь информируется соответствующим изменением баланса в Личном кабинете.<br/>
                6.5. Оплата указанного в пункте 6.1 Соглашения лицензионного вознаграждения в порядке, предусмотренном настоящим разделом, осуществляется с учетом положения пункта 5.6 Соглашения.
            </p>
            <h4>7. Персональные данные</h4>
            <p className="sub-items">
                7.1 Пользователь дает свое согласие Владельцу на обработку информации, в том числе, персональных данных Пользователя, предоставленных при использовании Сайта, а именно данных, указанных в аккаунте Пользователя в Steam.<br/>
                7.2. Обработка персональных данных означает запись, систематизацию, накопление, хранение, корректировку (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), в том числе трансграничное, обезличивание, блокирование, удаление, уничтожение персональных данных, не подлежащих на особые категории, обработка которых в соответствии с действующим законодательством Российской Федерации требует письменного согласия Пользователя.<br/>
                7.3. Обработка персональных данных производится в целях исполнения Сторонами обязательств по Соглашению, регистрации Пользователя на Сайте, приобретения лицензии на использование Кейса, получения Инвентаря, направления на адрес электронной почты Пользователя сообщений информационного и иного характера.<br/>
                7.4. Пользователь может в любое время отозвать согласие на обработку персональных данных, направив Владельцу соответствующее письменное уведомление на адрес, указанный в пункте 1.1 Соглашения, заказным письмом с уведомлением о вручении. При этом Пользователь понимает, что такой отзыв означает прекращение действия Соглашения. Владелец вправе продолжить обработку персональных данных Пользователя в предусмотренных законом случаях.<br/>
                7.5. Дополнительные или иные положения в отношении обработки персональных данных могут содержаться в соответствующем документе, размещенном или размещаемом на Сайте. В случае, противоречия положений такого документа положениям настоящего раздела применяются положения документа.<br/>
                7.6. Пользователь дает согласие на получение рекламных материалов от Владельца, его аффилированных лиц либо от иных лиц по поручению Владельца на адрес электронной почты, указанный Пользователем при регистрации в аккаунте Steam. Согласие на получение рекламных материалов может быть отозвано Пользователем в любое время путем направления Владельцу соответствующего письменного уведомления на адрес, указанный в пункте 1.1 Соглашения, либо путем совершения действий, указанных в сообщениях (электронных письмах), содержащих такие материалы.<br/>
                7.7. Мы гарантируем безопасность платежей при оплате банковской картой. Процессинговый центр соответствует международным требованиями PCI DSS для обеспечения безопасной обработки реквизитов банковской карты плательщика.
            </p>
            <h4>8. Ограничение ответственности</h4>
            <p className="sub-items">
                8.1. Владелец не отвечает за убытки Пользователя, возникшие в результате неправомерных действий третьих лиц, в том числе связанных с неправомерным доступом к Личному кабинету. Владелец не несет ответственность за убытки, причиненные Пользователю в результате разглашения третьим лицам учетных данных, необходимых для доступа к Личному кабинету, произошедшего не по вине Владельца.<br/>
                8.2. Владелец не является правообладателем объектов Инвентаря, не определяет порядок использования и функционирование Инвентаря. В отношении Инвентаря Пользователь руководствуется лицензионным соглашением Steam, доступным на момент составления редакции Соглашения по адресу http://store.steampowered.com/subscriber_agreement/russian/.<br/>
                8.3. Владелец не предоставляет программные средства для использования Инвентаря по прямому назначению на устройстве Пользователя. Такие программные средства Пользователь приобретает и/или устанавливает на свое устройство самостоятельно.<br/>
                8.4. Сайт и его программные средства, в том числе Личный кабинет и Кейсы, предоставляются «Как есть». На Пользователе лежит риск использования Сайта. Владелец, операторы проводной и беспроводной связи, по сетям которых предоставляется доступ к Сайту, аффилированные лица, поставщики, агенты Владельца не предоставляют каких бы то ни было гарантий в отношении Сайта.<br/>
                8.5. Владелец не гарантирует, что Сайт, Кейсы и Личный кабинет соответствуют требованиям Пользователя, что доступ к Сайту, Кейсам и Личному кабинету будет предоставляться непрерывно, быстро, надежно и без ошибок.<br/>
                8.6. Программно-аппаратные ошибки, как на стороне Владельца, так и на стороне Пользователя, приведшие к невозможности получения Пользователем доступа к Сайту и/или Кейсу, и/или Личному кабинету, являются обстоятельствами непреодолимой силы, и основанием освобождения от ответственности за неисполнение обязательств Владельца по Соглашению.<br/>
                8.7. Владелец вправе уступать права и переводить долги, по всем обязательствам, возникшим из Соглашения. Настоящим Пользователь дает свое согласие на уступку прав и перевод долга любым третьим лицам. О состоявшейся уступке прав и/или переводе долга Владелец информирует Пользователя, размещая соответствующую информацию на Сайте.<br/>
                8.8. Размер убытков, которые может быть возмещен Владельцем Пользователю, в любом случае ограничен в соответствии с положениями законодательства Российской Федерации.<br/>
                8.9. Если иное не предусмотрено Соглашением в случае нарушения Пользователем условий Соглашения Владелец вправе в одностороннем порядке отказаться от исполнения Соглашения и прекратить доступ Пользователя к Личному кабинету. В случае если такое нарушение причинило ущерб третьим лицам, ответственность за них полностью лежит на Пользователе.
            </p>
            <h4>9. Порядок разрешения споров</h4>
            <p className="sub-items">
                9.1. Все споры, разногласия и претензии, которые могут возникнуть в связи с исполнением, расторжением или признанием недействительным Соглашения, Стороны будут стремиться решить путем переговоров. Сторона, у которой возникли претензии и/или разногласия, направляет другой Стороне сообщение с указанием возникших претензий и/или разногласий в соответствии с пунктом 9.1 Соглашения.<br/>
                9.2. В случае если ответ на сообщение не будет получен направившей сообщение Стороной в течение 30 (тридцати) рабочих дней с даты направления соответствующего сообщения, либо если Стороны не придут к соглашению по возникшим претензиям и/или разногласиям, спор подлежит разрешению в судебном порядке по месту нахождения Владельца.<br/>
            </p>
            <h4>10. Возврат средств</h4>
            <p className="sub-items">
                10.1. Пользователь имеет право запросить возврат средств, при условии, что они не были израсходованы после пополнения баланса*.<br/>
                10.2. Все покупки и активности, произведенные посредством сервиса на сайте, являются окончательными и не возмещаемыми, потраченные средства не подлежат возврату.<br/>
            </p>
            <h4>11. Заключительные положения</h4>
            <div className="sub-items">
                11.1. Настоящим Стороны подтверждают, что при исполнении (изменении, дополнении, прекращении) Соглашения, а также при ведении переписки по указанным вопросам, допускается использование аналогов собственноручной подписи Сторон. Стороны подтверждают, что все уведомления, сообщения, соглашения и документы в рамках исполнения Сторонами обязательств, возникших из Соглашения, подписанные аналогами собственноручной подписи Сторон, имеют юридическую силу и обязательны для исполнения Сторонами. Под аналогами собственноручной подписи понимаются уполномоченные адреса электронной почты и учетные данные к Личному кабинету.<br/>
                11.2. Стороны признают, что все уведомления, сообщения, соглашения, документы и письма, направленные с использованием уполномоченных адресов электронной почты и Личного кабинета, считаются направленными и подписанными Сторонами, кроме случаев, когда в таких письмах прямо не указано обратное.<br/>
                <h5>11.3. Уполномоченными адресами электронной почты Сторон признаются:</h5>
                <p className="sub-items">
                    11.3.1. Для Владельца: support@incase.games<br/>
                    11.3.2. Для Пользователя: адрес электронной почты, указанный при регистрации аккаунта в Steam.
                </p>
                11.4. Стороны обязуются обеспечивать конфиденциальность сведений и информации, необходимых для доступа к уполномоченным адресам электронной почты и Личному кабинету, не допускать разглашение такой информации и передачу третьим лицам. Стороны самостоятельно определяют порядок ограничения доступа к такой информации.<br/>
                11.5. При использовании уполномоченных адресов электронной почты, до момента получения от второй Стороны информации о нарушении режима конфиденциальности, все действия и документы, совершенные и направленные с помощью уполномоченного адреса электронной почты второй Стороны, даже если такие действия и документы были совершены и направлены иными лицами, считаются совершенными и направленными такой второй Стороной. В этом случае права и обязанности, а также ответственность наступают у такой второй Стороны.<br/>
                11.6. При использовании Личного кабинета, до момента получения от Пользователя информации о нарушении режима конфиденциальности, все действия и документы, совершенные и направленные с помощью Личного кабинета, даже если такие действия и документы были совершены и направлены иными лицами, считаются совершенными и направленными Пользователем. В этом случае права и обязанности, а также ответственность наступают у Пользователя.<br/>
            </div>
            <h4>12. Изменение условий Соглашения</h4>
            <p className="sub-items">
                12.1. Владелец вправе в одностороннем порядке изменять условия Соглашения, при этом такие изменения вступают в силу в момент опубликования новой версии Соглашения в сети Интернет по адресу {<DocumentLink link="/info/user-agreement" text="https://incase.games/info/user-agreement"/>}<br/>
                12.2. Продолжение использования функций Сайта будет означать согласие Пользователя с условиями новой версии Соглашения. Если Пользователь не согласен с условиями новой версии Соглашения, он прекращает пользоваться Сайтом.<br/>
                12.3. Во всем остальном, что не урегулировано Соглашением, Стороны руководствуются действующим законодательством Российской Федерации без учета его коллизионных норм.<br/>
                * при наличии технической возможности осуществления возврата платежной транзакции у поставщика платежного метода.<br/>
            </p>
        </div>
    ); 
};

export default UserAgreement;