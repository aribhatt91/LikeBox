import React, { useState } from 'react'
import AppModal from './generic/AppModal';
export default function PrivacyPolicy({className}) {
    const [show, setShow] = useState(false);

    return (
        <React.Fragment>
            <a href="#privacy-policy" onClick={() => setShow(true)} className={className? className : ""}>
                Privacy policy
            </a>

            {show && <AppModal className="w-100 h100" id="privacy-policy" onClose={() => setTimeout(()=>setShow(false), 500)}>
            <article className="crisp-article">
                <div className="container">
                    <h1>PRIVACY NOTICE</h1>
                    <p><strong>Last updated May 13, 2021</strong></p>

                    <div className="article-section">
                        <p>Thank you for choosing to be part of our community at The Likebox Limited (<strong>"Company"</strong>, <strong>"we"</strong>, <strong>"us"</strong>, <strong>"our"</strong>). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us at paul@likebox.co.uk.</p>

                        <p>When you visit our website <a href="http://www.likebox.co.uk">http://www.likebox.co.uk</a> (the <strong>"Website"</strong>), use our mobile application, as the case may be (the <strong>"App"</strong>) and more generally, use any of our services (the <strong>"Services"</strong>, which include the Website and App), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.</p>

                        <p>This privacy notice applies to all information collected through our Services (which, as described above, includes our Website and App), as well as, any related services, sales, marketing or events.</p>

                        <p><strong>Please read this privacy notice carefully as it will help you understand what we do with the information that we collect.</strong></p>
                    </div>
                    <div className="article-section">
                        <h3>TABLE OF CONTENTS</h3>

                        <ol>
                            <li>WHAT INFORMATION DO WE COLLECT?</li>
                            <li>HOW DO WE USE YOUR INFORMATION?</li>
                            <li>WILL YOUR INFORMATION BE SHARED WITH ANYONE?</li>
                            <li>WHO WILL YOUR INFORMATION BE SHARED WITH?</li>
                            <li>DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</li>
                            <li>IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</li>
                            <li>HOW LONG DO WE KEEP YOUR INFORMATION?</li>
                            <li>HOW DO WE KEEP YOUR INFORMATION SAFE?</li>
                            <li>DO WE COLLECT INFORMATION FROM MINORS?</li>
                            <li>WHAT ARE YOUR PRIVACY RIGHTS?</li>
                            <li>CONTROLS FOR DO-NOT-TRACK FEATURES</li>
                            <li>DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</li>
                            <li>DO WE MAKE UPDATES TO THIS NOTICE?</li>
                            <li>HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</li>
                            <li>HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?</li>
                        </ol>
                    </div>

                    <div className="article-section">
                        <h3>1. WHAT INFORMATION DO WE COLLECT?</h3>

                        <p><strong>Personal information you disclose to us</strong></p>

                        <p><em><strong>In Short:</strong> We collect personal information that you provide to us.</em></p>

                        <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services or otherwise when you contact us.</p>

                        <p>The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make and the products and features you use. The personal information we collect may include the following:</p>

                        <p><strong>Personal Information Provided by You.</strong> We collect names; phone numbers; email addresses; mailing addresses; passwords; contact preferences; contact or authentication data; billing addresses; debit/credit card numbers; gender; location; styling preference; and other similar information.</p>

                        <p>All personal information that you provide to us must be true, complete and accurate, and you must notify us of any changes to such personal information.</p>

                        <p><strong>Information automatically collected</strong></p>

                        <p><em><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></p>

                        <p>We automatically collect certain information when you visit, use or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</p>

                        <p>Like many businesses, we also collect information through cookies and similar technologies. You can find out more about this in our Cookie Notice: __________.</p>

                        <p>The information we collect includes:</p>
                        <ul>
                            <li><em>Log and Usage Data. </em>Log and usage data is service-related, diagnostic, usage and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps') and hardware settings).</li>
                            <li><em>Device Data. </em>We collect device data such as information about your computer, phone, tablet or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model Internet service provider and/or mobile carrier, operating system and system configuration information.</li>
                            <li><em>Location Data. </em>We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. Note however, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
                        </ul>


                        <p><strong>Information collected through our App</strong></p>

                        <p><em><strong>In Short:</strong> We collect information regarding your geolocation, mobile device, push notifications, when you use our App.</em></p>

                        <p>If you use our App, we also collect the following information:</p>

                        <ul>
                            <li><em>Geolocation Information. </em>We may request access or permission to and track location-based information from your mobile device, either continuously or while you are using our App, to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.</li>

                            <li><em>Mobile Device Data. </em>We automatically collect device information (such as your mobile device ID, model and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our App, we may also collect information about the phone network associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device you use, your mobile device’s unique device ID and information about the features of our App you accessed.</li>

                            <li><em>Push Notifications. </em>We may request to send you push notifications regarding your account or certain features of the App. If you wish to opt-out from receiving these types of communications, you may turn them off in your device's settings.</li>
                        </ul>

                        <p>This information is primarily needed to maintain the security and operation of our App, for troubleshooting and for our internal analytics and reporting purposes.</p>
                    </div>

                    <div className="article-section">
                        <h3>2. HOW DO WE USE YOUR INFORMATION?</h3>

                        <p><em><strong>In Short:</strong> We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.</em></p>

                        <p>We use personal information collected via our Services for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.</p>

                        <p>We use the information we collect or receive:</p>

                        <ul>
                            <li><strong>To facilitate account creation and login process. </strong>If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.</li>

                            <li><strong>To post testimonials. </strong>We post testimonials on our Services that may contain personal information. Prior to posting a testimonial, we will obtain your consent to use your name and the content of the testimonial. If you wish to update, or delete your testimonial, please contact us at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk</a> and be sure to include your name, testimonial location, and contact information.</li>

                            <li><strong>Request feedback. </strong>We may use your information to request feedback and to contact you about your use of our Services.</li>

                            <li><strong>To enable user-to-user communications. </strong>To enable user-to-user communications.</li>

                            <li><strong>To manage user accounts. </strong>We may use your information for the purposes of managing our account and keeping it in working order.</li>

                            <li><strong>To send administrative information to you. </strong>We may use your personal information to send you product, service and new feature information and/or information about changes to our terms, conditions, and policies.</li>

                            <li><strong>To protect our Services. </strong>We may use your information as part of our efforts to keep our Services safe and secure (for example, for fraud monitoring and prevention).</li>

                            <li><strong>To enforce our terms, conditions and policies for business purposes, to comply with legal and regulatory requirements or in connection with our contract. </strong></li>

                            <li><strong>To respond to legal requests and prevent harm. </strong>If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.</li>

                            <li><strong>Fulfill and manage your orders. </strong>We may use your information to fulfill and manage your orders, payments, returns, and exchanges made through the Services.</li>

                            <li><strong>Administer prize draws and competitions. </strong>We may use your information to administer prize draws and competitions when you elect to participate in our competitions.</li>

                            <li><strong>To deliver and facilitate delivery of services to the user. </strong>We may use your information to provide you with the requested service.</li>

                            <li><strong>To respond to user inquiries/offer support to users. </strong>We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services.</li>

                            <li><strong>To send you marketing and promotional communications. </strong>We and/or our third-party marketing partners may use the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. For example, when expressing an interest in obtaining information about us or our Services, subscribing to marketing or otherwise contacting us, we will collect personal information from you. You can opt-out of our marketing emails at any time (see the "WHAT ARE YOUR PRIVACY RIGHTS?" below).</li>

                            <li><strong>Deliver targeted advertising to you. </strong>We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness. For more information see our Cookie Notice: __________.</li>

                            <li><strong>For other business purposes. </strong>We may use your information for other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Services, products, marketing and your experience. We may use and store this information in aggregated and anonymized form so that it is not associated with individual end users and does not include personal information. We will not use identifiable personal information without your consent.</li>

                        </ul>
                    </div>

                    <div className="article-section">
                        <h3>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h3>
                        <p><em><strong>In Short:</strong> We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</em></p>

                        <p>We may process or share your data that we hold based on the following legal basis:</p>

                        <ul>
                            <li><strong>Consent: </strong>We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>

                            <li><strong>Legitimate Interests: </strong>We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>

                            <li><strong>Performance of a Contract: </strong>Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>

                            <li><strong>Legal Obligations: </strong>We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).</li>

                            <li><strong>Vital Interests: </strong>We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>

                        </ul>

                        <p>More specifically, we may need to process your data or share your personal information in the following situations:</p>

                        <ul>
                            <li><strong>Business Transfers. </strong>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>

                            <li><strong>Vendors, Consultants and Other Third-Party Service Providers. </strong>We may share your data with third-party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Services, which will enable them to collect data on our behalf about how you interact with our Services over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content, pages or features, and better understand online activity. Unless described in this notice, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes. We have contracts in place with our data processors, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct.</li>

                            <li><strong>Business Partners. </strong>We may share your information with our business partners to offer you certain products, services or promotions.</li>

                        </ul>
                    </div>

                    <div className="article-section">
                        <h3>4. WHO WILL YOUR INFORMATION BE SHARED WITH?</h3>
                        <p><em><strong>In Short:</strong> We only share information with the following categories of third parties.</em></p>

                        <p>We only share and disclose your information with the following categories of third parties. If we have processed your data based on your consent and you wish to revoke your consent, please contact us using the contact details provided in the section below titled "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?".</p>

                        <ul>
                            <li>Ad Networks</li>

                            <li>Affiliate Marketing Programs</li>

                            <li>Data Analytics Services</li>

                            <li>Government Entities</li>

                            <li>Payment Processors</li>

                            <li>Sales & Marketing Tools</li>

                            <li>User Account Registration & Authentication Services</li>

                            <li>Website Hosting Service Providers</li>

                            <li>Performance Monitoring Tools</li>

                            <li>Order Fulfillment Service Providers</li>

                            <li>Cloud Computing Services</li>

                        </ul>
                    </div>

                    <div className="article-section">
                        <h3>6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h3>
                        <p><em><strong>In Short:</strong> We may transfer, store, and process your information in countries other than your own.</em></p>

                        <p>Our servers are located in. If you are accessing our Services from outside, please be aware that your information may be transferred to, stored, and processed by us in our facilities and by those third parties with whom we may share your personal information (see "WILL YOUR INFORMATION BE SHARED WITH ANYONE?" above), in the United States, and other countries.</p>

                        <p>If you are a resident in the European Economic Area (EEA) or United Kingdom (UK), then these countries may not necessarily have data protection laws or other similar laws as comprehensive as those in your country. We will however take all necessary measures to protect your personal information in accordance with this privacy notice and applicable law. </p>
                        <p><strong>European Commission's Standard Contractual Clauses:</strong></p>
                        <p>We have implemented measures to protect your personal information, including by using the European Commission's Standard Contractual Clauses for transfers of personal information between our group companies and between us and our third-party providers. These clauses require all recipients to protect all personal information that they process originating from the EEA or UK in accordance with European data protection laws and regulations. Our Data Processing Agreements that include Standard Contractual Clauses can be provided upon request/are available here: __________. We have implemented similar appropriate safeguards with our third-party service providers and partners and further details can be provided upon request.</p>
                    </div>

                    <div className="article-section">
                        <h3>7. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
                        <p><em><strong>In Short:</strong> We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.</em></p>

                        <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>

                        <p>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</p>
                    </div>

                    <div className="article-section">
                        <h3>8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
                        <p><em><strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.</em></p>

                        <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</p>
                    </div>

                    <div className="article-section">
                        <h3>9. DO WE COLLECT INFORMATION FROM MINORS?</h3>
                        <p><em><strong>In Short:</strong> We do not knowingly collect data from or market to children under 18 years of age.</em></p>

                        <p>We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk.</a></p>

                    </div>

                    <div className="article-section">
                        <h3>10. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
                        <p><em><strong>In Short:</strong> In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.</em></p>

                        <p>In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. To make such a request, please use the contact details provided below. We will consider and act upon any request in accordance with applicable data protection laws.</p>

                        <p>If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. Please note however that this will not affect the lawfulness of the processing before its withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</p>

                        <p>If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <a href="http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm">http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.</a></p>

                        <p>If you are a resident in Switzerland, the contact details for the data protection authorities are available here: <a href="https://www.edoeb.admin.ch/edoeb/en/home.html">https://www.edoeb.admin.ch/edoeb/en/home.html.</a></p>

                        <p>If you have questions or comments about your privacy rights, you may email us at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk.</a></p>

                        <p><strong>Account Information</strong></p>

                        <p>If you would at any time like to review or change the information in your account or terminate your account, you can:</p>

                        <ul>
                            <li>Log in to your account settings and update your user account.</li>
                        </ul>

                        <p>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with applicable legal requirements.</p>

                        <p><strong><u>Cookies and similar technologies:</u></strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. To opt-out of interest-based advertising by advertisers on our Services visit <a href="http://www.aboutads.info/choices/">http://www.aboutads.info/choices/.</a> For further information, please see our Cookie Notice: __________.</p>


                        <p><strong><u>Opting out of email marketing:</u></strong> You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list — however, we may still communicate with you, for example to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes. To otherwise opt-out, you may:</p>

                        <ul>
                            <li>Access your account settings and update your preferences.</li>
                        </ul>

                    </div>

                    <div className="article-section">
                        <h3>11. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
                        <p><em><strong>In Short:</strong> Yes, we will update this notice as necessary to stay compliant with relevant laws.</em></p>

                        <p>We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.</p>

                    </div>


                    <div className="article-section">
                        <h3>12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
                        <p><em><strong>In Short:</strong> Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.</em></p>

                        <p>California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.</p>


                        <p>If you are under 18 years of age, reside in California, and have a registered account with a Service, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).</p>


                        <p><strong>CCPA Privacy Notice</strong></p>

                        <p>The California Code of Regulations defines a "resident" as:</p>

                        <ol>
                            <li>every individual who is in the State of California for other than a temporary or transitory purpose and</li>
                            <li>every individual who is domiciled in the State of California who is outside the State of California for a temporary or transitory purpose</li>
                        </ol>

                        <p>All other individuals are defined as "non-residents."</p>

                        <p>If this definition of "resident" applies to you, we must adhere to certain rights and obligations regarding your personal information.</p>

                        <p><strong>What categories of personal information do we collect?</strong></p>

                        <p>We have collected the following categories of personal information in the past twelve (12) months:</p>

                        <table>
                            <thead>
                                <tr>
                                    <td>Category</td>
                                    <td>Examples</td>
                                    <td>Collected</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>A. Identifiers</td>
                                    <td>Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address and account name</td>
                                    <td>YES</td>
                                </tr>

                                <tr>
                                    <td>B. Personal information categories listed in the California Customer Records statute</td>
                                    <td>Name, contact information, education, employment, employment history and financial information</td>
                                    <td>YES</td>
                                </tr>

                                <tr>
                                    <td>C. Protected classification characteristics under California or federal law</td>
                                    <td>Gender and date of birth</td>
                                    <td>YES</td>
                                </tr>

                                <tr>
                                    <td>D. Commercial information</td>
                                    <td>Transaction information, purchase history, financial details and payment information</td>
                                    <td>YES</td>
                                </tr>

                                <tr>
                                    <td>E. Biometric information</td>
                                    <td>Fingerprints and voiceprints</td>
                                    <td>NO</td>
                                </tr>
                                <tr>
                                    <td>F. Internet or other similar network activity</td>
                                    <td>Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems and advertisements</td>
                                    <td>YES</td>
                                </tr>
                                <tr>
                                    <td>G. Geolocation data</td>
                                    <td>Device location</td>
                                    <td>YES</td>
                                </tr>

                                <tr>
                                    <td>H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                                    <td>Images and audio, video or call recordings created in connection with our business activities</td>
                                    <td>NO</td>
                                </tr>

                                <tr>
                                    <td>I. Professional or employment-related information</td>
                                    <td>Business contact details in order to provide you our services at a business level, job title as well as work history and professional qualifications if you apply for a job with us</td>
                                    <td>NO</td>
                                </tr>

                                <tr>
                                    <td>J. Education Information</td>
                                    <td>Student records and directory information</td>
                                    <td>NO</td>
                                </tr>

                                <tr>
                                    <td>K. Inferences drawn from other personal information</td>
                                    <td>Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics</td>
                                    <td>YES</td>
                                </tr>

                            </tbody>
                        </table>

                        <p>We may also collect other personal information outside of these categories instances where you interact with us in-person, online, or by phone or mail in the context of:</p>

                        <ul>
                            <li>Receiving help through our customer support channels;</li>
                            <li>Participation in customer surveys or contests; and</li>
                            <li>Facilitation in the delivery of our Services and to respond to your inquiries.</li>
                        </ul>

                        <p><strong>How do we use and share your personal information?</strong></p>

                        <p>The Likebox Limited collects and shares your personal information through:</p>

                        <ul>
                            <li>Targeting cookies/Marketing cookies</li>
                        </ul>

                        <p>More information about our data collection and sharing practices can be found in this privacy notice and our Cookie Notice: __________.</p>

                        <p>You may contact us by email at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk</a>, or by referring to the contact details at the bottom of this document.</p>

                        <p>If you are using an authorized agent to exercise your right to opt-out we may deny a request if the authorized agent does not submit proof that they have been validly authorized to act on your behalf.</p>

                        <p><strong>Will your information be shared with anyone else?</strong></p>

                        <p>We may disclose your personal information with our service providers pursuant to a written contract between us and each service provider. Each service provider is a for-profit entity that processes the information on our behalf.</p>

                        <p>We may use your personal information for our own business purposes, such as for undertaking internal research for technological development and demonstration. This is not considered to be "selling" of your personal data.</p>

                        <p>The Likebox Limited has disclosed the following categories of personal information to third parties for a business or commercial purpose in the preceding twelve (12) months:</p>

                        <ul>
                            <li>Category B. Personal information, as defined in the California Customer Records law, such as your name, contact information, education, employment, employment history and financial information.</li>
                            <li>Category F. Internet or other similar network activity</li>
                        </ul>

                        <p>The categories of third parties to whom we disclosed personal information for a business or commercial purpose can be found under "WHO WILL YOUR INFORMATION BE SHARED WITH?".</p>

                        <p>The categories of third parties to whom we sold personal information are:</p>

                        <ul>
                            <li>Affiliate Marketing Programs</li>
                            <li>Ad Networks</li>
                        </ul>

                        <p><strong>Your rights with respect to your personal data</strong></p>

                        <p><u>Right to request deletion of the data - Request to delete</u></p>

                        <p>You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law, such as (but not limited to) the exercise by another consumer of his or her right to free speech, our compliance requirements resulting from a legal obligation or any processing that may be required to protect against illegal activities.</p>

                        <p><u>Right to be informed - Request to know</u></p>

                        <p>Depending on the circumstances, you have a right to know:</p>

                        <ul>
                            <li>whether we collect and use your personal information;</li>
                            <li>the categories of personal information that we collect;</li>
                            <li>the purposes for which the collected personal information is used;</li>
                            <li>whether we sell your personal information to third parties;</li>
                            <li>whether we sell your personal information to third parties;</li>
                            <li>the categories of third parties to whom the personal information was sold or disclosed for a business purpose; and</li>
                            <li>the business or commercial purpose for collecting or selling personal information.</li>
                        </ul>

                        <p>In accordance with applicable law, we are not obligated to provide or delete consumer information that is de-identified in response to a consumer request or to re-identify individual data to verify a consumer request.</p>

                        <p><u>Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights</u></p>

                        <p>We will not discriminate against you if you exercise your privacy rights.</p>

                        <p><u>Verification process</u></p>

                        <p>Upon receiving your request, we will need to verify your identity to determine you are the same person about whom we have the information in our system. These verification efforts require us to ask you to provide information so that we can match it with information you have previously provided us. For instance, depending on the type of request you submit, we may ask you to provide certain information so that we can match the information you provide with the information we already have on file, or we may contact you through a communication method (e.g. phone or email) that you have previously provided to us. We may also use other verification methods as the circumstances dictate.</p>

                        <p>We will only use personal information provided in your request to verify your identity or authority to make the request. To the extent possible, we will avoid requesting additional information from you for the purposes of verification. If, however, we cannot verify your identity from the information already maintained by us, we may request that you provide additional information for the purposes of verifying your identity, and for security or fraud-prevention purposes. We will delete such additionally provided information as soon as we finish verifying you.</p>


                        <p><u>Other privacy rights</u></p>

                        <ul>
                            <li>you may object to the processing of your personal data</li>
                            <li>you may request correction of your personal data if it is incorrect or no longer relevant, or ask to restrict the processing of the data</li>
                            <li>you can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an authorized agent that does not submit proof that they have been validly authorized to act on your behalf in accordance with the CCPA.</li>
                        </ul>

                        <p>To exercise these rights, you can contact us by email at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk</a>, or by referring to the contact details at the bottom of this document. If you have a complaint about how we handle your data, we would like to hear from you.</p>
                    </div>



                    <div className="article-section">
                    
                        <h3>13. DO WE MAKE UPDATES TO THIS NOTICE?</h3>

                        <p>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.</p>

                    </div>

                    <div className="article-section">
                        <h3>14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>

                        <p>If you have questions or comments about this notice, you may contact our Data Protection Officer (DPO) by email at <a href="mailto:support@likebox.co.uk">support@likebox.co.uk</a>, or by post to:</p>

                        <p><strong>The Likebox Limited</strong></p>
                        <p><strong>132 Thackeray Avenue</strong></p>
                        <p><strong>London, England N17 9EA</strong></p>
                        <p><strong>United Kingdom</strong></p>

                    </div>

                    <div className="article-section">
                        <h3>15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</h3>

                        <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please email us at: <a href="mailto:support@likebox.co.uk">support@likebox.co.uk.</a></p>

                    </div>


                </div>
            </article>
            </AppModal>}
            
        </React.Fragment>
    )
}
