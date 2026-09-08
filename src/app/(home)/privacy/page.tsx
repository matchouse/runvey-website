import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BulletList,
  LEGAL_EMAIL,
  LegalDocument,
  Note,
  Paragraph,
  RUNVEY_REPOSITORY,
  Subheading,
  type LegalSection,
} from '../legal-document';

export const metadata: Metadata = {
  title: 'Privacy Policy — Runvey',
  description: 'How Runvey collects, uses, shares, retains, and protects personal data.',
};

const sections: LegalSection[] = [
  {
    id: 'scope',
    title: 'Scope of this policy',
    content: <><Paragraph>This Privacy Policy explains how Runvey handles personal data when you visit our website, read our documentation, contact us, participate in our community, or use a Runvey-operated hosted service that links to this Policy.</Paragraph><Paragraph>It does not govern an independently operated Runvey installation. If an organisation self-hosts Runvey, that organisation controls its instance and is responsible for explaining how it handles the personal data processed there.</Paragraph><Note>A standard self-hosted installation does not send your repositories, secrets, application data, or end-user data to us unless you or the operator deliberately configures a connection to a service we operate.</Note></>,
  },
  {
    id: 'controller',
    title: 'Who is responsible for your data',
    content: <><Paragraph>The data controller for Runvey-operated Services is <strong>Percy Real Estate Ltd, trading as Matchouse</strong>, registered in England and Wales under company number <strong>15525233</strong>, with its registered office at 25 Cabot Square, London, England, E14 4QZ.</Paragraph><Paragraph>For privacy questions or rights requests, email <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. If another organisation provides your hosted Runvey service, consult that organisation’s privacy notice first.</Paragraph></>,
  },
  {
    id: 'data-collected',
    title: 'Personal data we collect',
    content: <><Subheading>Information you provide</Subheading><BulletList><li>Contact details and the contents of messages, support requests, security reports, or other correspondence.</li><li>Account information, such as your name, email address, organisation, role, and authentication details, if you register for a hosted Service.</li><li>Billing, subscription, and transaction records for paid services. Full payment-card details are normally handled by a payment provider rather than stored by us.</li><li>Feedback, survey answers, contributions, issue reports, and public community activity.</li></BulletList><Subheading>Information collected automatically</Subheading><BulletList><li>IP address, approximate location derived from IP, browser, device, operating system, referring page, timestamps, requested URLs, and diagnostic logs.</li><li>Security events, authentication activity, feature interactions, performance data, and error information for Services we operate.</li><li>Cookie or local-storage identifiers where needed for preferences, authentication, security, or consent choices.</li></BulletList><Paragraph>We do not intentionally collect special-category data, government identifiers, or criminal-offence data through the public website. Please do not submit such information unless it is necessary and we have asked for it through an appropriate private channel.</Paragraph></>,
  },
  {
    id: 'sources',
    title: 'How we obtain personal data',
    content: <><Paragraph>We collect data directly from you, automatically from your browser or use of a Runvey-operated Service, from the organisation that gives you access to a workspace, and from services you choose to connect.</Paragraph><Paragraph>When you interact with the <a href={RUNVEY_REPOSITORY} target="_blank" rel="noreferrer">Runvey repository on GitHub</a>, GitHub provides public profile, contribution, issue, and interaction information according to your GitHub settings and GitHub’s own privacy terms.</Paragraph></>,
  },
  {
    id: 'purposes',
    title: 'How and why we use personal data',
    content: <><Paragraph>We use personal data to:</Paragraph><BulletList><li>Deliver, maintain, secure, troubleshoot, and improve the website, documentation, community, and hosted Services.</li><li>Create and administer accounts, workspaces, subscriptions, and support relationships.</li><li>Respond to messages, support requests, security reports, and privacy requests.</li><li>Detect abuse, fraud, attacks, outages, and violations of our <Link href="/terms">Terms of Service</Link>.</li><li>Comply with law, enforce agreements, protect rights, and establish or defend legal claims.</li><li>Send essential service notices and, with consent where required, product news or marketing.</li></BulletList><Paragraph>Where UK or EEA data-protection law applies, our lawful bases are performance of a contract, compliance with legal obligations, legitimate interests in operating and securing Runvey, consent where requested, and protection of vital interests in exceptional circumstances.</Paragraph></>,
  },
  {
    id: 'repositories',
    title: 'Repositories, deployments, and secrets',
    content: <><Paragraph>For self-hosted Runvey, repository content, environment variables, deployment logs, credentials, and application data remain within infrastructure selected by the instance operator unless that operator connects an external service.</Paragraph><Paragraph>If we offer a hosted control plane or support service, we will process only the repository metadata, configuration, logs, credentials, or other data needed to deliver the feature you request. Access tokens and secrets should be encrypted or otherwise protected where appropriate, and access should be limited to authorised systems and personnel.</Paragraph><Paragraph>The operator of each Runvey installation must give its users and application end users any privacy information required by law and must configure retention, access, integrations, and security appropriately.</Paragraph></>,
  },
  {
    id: 'cookies',
    title: 'Cookies, local storage, and analytics',
    content: <><Paragraph>At the effective date of this Policy, the public Runvey website does not intentionally use advertising cookies or cross-site behavioural advertising. It may use local storage or technically necessary identifiers to remember interface preferences, maintain security, or support functionality.</Paragraph><Paragraph>If we introduce non-essential analytics or marketing technologies, we will update this Policy and provide consent controls where required. Browser settings can clear or block storage, but doing so may affect preferences or signed-in features.</Paragraph></>,
  },
  {
    id: 'sharing',
    title: 'When we share personal data',
    content: <><Paragraph>We may share limited personal data with:</Paragraph><BulletList><li>Hosting, content-delivery, database, email, authentication, monitoring, support, security, and payment providers acting for us.</li><li>GitHub and other integrations you choose to use.</li><li>Professional advisers, auditors, insurers, and corporate transaction participants under appropriate duties of confidentiality.</li><li>Courts, regulators, law enforcement, or other parties where disclosure is legally required or reasonably necessary to protect rights and safety.</li><li>A successor in connection with a merger, financing, reorganisation, insolvency, or transfer of all or part of the project or business.</li></BulletList><Paragraph>We do not sell personal data for money. We do not share personal data for cross-context behavioural advertising.</Paragraph></>,
  },
  {
    id: 'international',
    title: 'International data transfers',
    content: <><Paragraph>Our providers, contributors, and users may be located in different countries. Where personal data is transferred from the UK or EEA to a country without an adequacy decision, we use an approved safeguard where required, such as standard contractual clauses, the UK International Data Transfer Agreement or UK Addendum, together with supplementary safeguards where appropriate.</Paragraph><Paragraph>GitHub and other third-party services determine their own international transfer arrangements for data they control.</Paragraph></>,
  },
  {
    id: 'retention',
    title: 'Data retention',
    content: <><Paragraph>We keep personal data only for as long as reasonably necessary for the purpose collected, including to provide Services, meet legal and accounting duties, handle disputes, maintain security, and enforce agreements.</Paragraph><BulletList><li>Public GitHub contributions remain available according to repository history and GitHub’s controls.</li><li>Support and correspondence records are retained while needed to resolve the matter and for a reasonable follow-up period.</li><li>Account and workspace records are retained while active and for a limited period after closure, subject to backups and legal requirements.</li><li>Security and access logs are retained according to operational need and provider configuration, then deleted or aggregated unless needed to investigate an incident.</li><li>Transaction records may be retained for tax, accounting, fraud prevention, and legal limitation periods.</li></BulletList><Paragraph>We may retain de-identified or aggregated information that no longer identifies you.</Paragraph></>,
  },
  {
    id: 'security',
    title: 'Security',
    content: <><Paragraph>We use reasonable technical and organisational measures designed to protect personal data, including access controls, authentication, encryption where appropriate, dependency and vulnerability management, logging, backups, and incident response.</Paragraph><Paragraph>No internet service is completely secure. Protect credentials and tokens, restrict administrative access, keep self-hosted installations updated, and notify us promptly if you believe information handled by a Runvey-operated Service has been compromised.</Paragraph></>,
  },
  {
    id: 'rights',
    title: 'Your privacy rights',
    content: <><Paragraph>Depending on where you live, you may have rights to request access, correction, deletion, restriction, objection, portability, or information about how personal data is used; withdraw consent; opt out of certain marketing or sharing; and complain to a regulator.</Paragraph><Paragraph>Submit a request to <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. We may verify your identity and authority before responding. Rights can be subject to legal exceptions, including security, freedom of expression, another person’s rights, legal obligations, and legal claims.</Paragraph><Subheading>UK and EEA</Subheading><Paragraph>You may complain to the UK Information Commissioner’s Office or the supervisory authority where you live or work. You have an absolute right to object to direct marketing and may object to certain processing based on legitimate interests.</Paragraph><Subheading>India and other regions</Subheading><Paragraph>Where India’s Digital Personal Data Protection Act or another regional privacy law applies, we will support the rights and grievance process in force for that processing. This Policy provides a global baseline and does not limit mandatory rights available under local law.</Paragraph></>,
  },
  {
    id: 'children',
    title: 'Children',
    content: <><Paragraph>Runvey’s Services are intended for developers, technical teams, and organisations and are not directed to children. You must be at least 18 to create a paid hosted account or enter a contract with us.</Paragraph><Paragraph>We do not knowingly collect personal data from children through the public website. If you believe a child has provided personal data, contact us so we can investigate and delete it where appropriate.</Paragraph></>,
  },
  {
    id: 'automation',
    title: 'Automation and product development',
    content: <><Paragraph>We may use automated tools to identify security threats, diagnose errors, route support requests, or improve product performance. We do not use private repositories, secrets, or customer application data to train public artificial-intelligence models unless we clearly disclose that use and have an appropriate legal basis or agreement.</Paragraph><Paragraph>We do not currently make solely automated decisions through the public website that produce legal or similarly significant effects about individuals.</Paragraph></>,
  },
  {
    id: 'changes-contact',
    title: 'Changes, complaints, and contact',
    content: <><Paragraph>We may update this Policy when our Services, providers, or legal obligations change. The current version will remain available here with its effective date. We will provide additional notice of material changes where required.</Paragraph><Paragraph>Contact the Runvey privacy team at <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>, or write to Percy Real Estate Ltd, 25 Cabot Square, London, England, E14 4QZ. Please do not place confidential or sensitive personal data in a public GitHub issue.</Paragraph><Paragraph>If we cannot resolve your concern, you may complain to the regulator available in your location. In the UK, this is the <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">Information Commissioner’s Office</a>.</Paragraph></>,
  },
];

export default function PrivacyPage() {
  return <LegalDocument kind="privacy" eyebrow="Your data" title="Privacy Policy" description="How Runvey collects, uses, shares, retains, and protects personal data across its website, community, and operated services." sections={sections} />;
}
