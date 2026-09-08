import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BulletList,
  LEGAL_EMAIL,
  LegalDocument,
  Note,
  Paragraph,
  RUNVEY_REPOSITORY,
  type LegalSection,
} from '../legal-document';

export const metadata: Metadata = {
  title: 'Terms of Service — Runvey',
  description: 'Terms governing the Runvey website, documentation, open-source project, and related services.',
};

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance and scope',
    content: <><Paragraph>These Terms of Service govern your access to and use of the Runvey website, documentation, community resources, support channels, and any hosted services that link to these Terms (together, the <strong>Services</strong>).</Paragraph><Paragraph>Runvey is maintained by <strong>Percy Real Estate Ltd, trading as Matchouse</strong>, a company registered in England and Wales under company number <strong>15525233</strong>, with its registered office at 25 Cabot Square, London, England, E14 4QZ. In these Terms, “Runvey”, “we”, “us”, and “our” refer to that operator.</Paragraph><Note>By accessing or using the Services, you agree to these Terms. If you use the Services for an organisation, you confirm that you are authorised to bind it. If you do not agree, do not use the Services.</Note></>,
  },
  {
    id: 'open-source',
    title: 'Open-source software and licence',
    content: <><Paragraph>Runvey’s source code is made available separately under the <strong>GNU Affero General Public License version 3 (AGPL-3.0)</strong>. Your rights to copy, run, study, modify, or distribute that code are governed by the licence and notices included with the repository.</Paragraph><Paragraph>These Terms govern the Services, not the permissions granted by the AGPL-3.0. If these Terms conflict with the applicable open-source licence about use of the software itself, the open-source licence controls to that extent.</Paragraph><Paragraph>You can review the <a href={`${RUNVEY_REPOSITORY}/blob/main/LICENSE`} target="_blank" rel="noreferrer">current licence in the Runvey repository</a>. Third-party components remain subject to their own licences.</Paragraph></>,
  },
  {
    id: 'self-hosting',
    title: 'Self-hosting and your infrastructure',
    content: <><Paragraph>Runvey is designed to run on infrastructure you control. When you self-host Runvey, you—not Runvey—select, configure, secure, monitor, back up, and operate that environment.</Paragraph><BulletList><li>You are responsible for servers, networks, credentials, domains, databases, containers, secrets, backups, and recovery.</li><li>You must obtain all permissions needed to connect repositories, cloud accounts, registries, and other systems.</li><li>You are responsible for the applications and content you deploy and for complying with laws that apply to them.</li><li>You act as the operator and, where applicable, the data controller for your self-hosted instance.</li></BulletList><Paragraph>Unless you deliberately configure a connection to a Runvey-operated service, a self-hosted deployment does not give us access to your source code, secrets, infrastructure, application data, or end-user data.</Paragraph></>,
  },
  {
    id: 'accounts',
    title: 'Accounts and access credentials',
    content: <><Paragraph>If a hosted feature requires an account, you must provide accurate information, keep it current, and protect all credentials, access tokens, recovery codes, and API keys associated with your account.</Paragraph><Paragraph>You are responsible for activity under your account unless caused by our breach of duty. Notify us promptly at <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> if you suspect unauthorised access. We may require additional verification before restoring or changing access.</Paragraph></>,
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    content: <><Paragraph>You must use the Services lawfully and must not use them to:</Paragraph><BulletList><li>Deploy malware, ransomware, credential theft, botnets, or code intended to damage or gain unauthorised access to systems.</li><li>Probe, scan, overload, disrupt, bypass, or interfere with the security or operation of Services you do not own or have permission to test.</li><li>Infringe intellectual property, privacy, confidentiality, export-control, sanctions, or other legal rights.</li><li>Transmit unlawful, fraudulent, deceptive, abusive, or exploitative content.</li><li>Misrepresent affiliation with Runvey or use our infrastructure to send spam or unsolicited communications.</li><li>Remove licence, attribution, source-offer, or copyright notices where the applicable licence requires them.</li></BulletList><Paragraph>Security research conducted in good faith and within a published security policy is not prohibited by this section.</Paragraph></>,
  },
  {
    id: 'user-content',
    title: 'Your code, content, and data',
    content: <><Paragraph>You retain ownership of code, configurations, data, feedback, and other material you provide. You grant us only the limited rights reasonably necessary to host, transmit, process, display, back up, and secure that material when providing a hosted Service you request.</Paragraph><Paragraph>You confirm that you have the rights and lawful basis needed for anything you submit or deploy. Do not provide secrets, personal data, or confidential information through public GitHub issues, discussions, or other public community channels.</Paragraph></>,
  },
  {
    id: 'integrations',
    title: 'Third-party services and integrations',
    content: <><Paragraph>Runvey may interoperate with Git providers, container registries, hosting providers, cloud platforms, databases, DNS providers, observability tools, and other third-party services. Those services are controlled by their providers and are subject to separate terms and privacy notices.</Paragraph><Paragraph>We do not control and are not responsible for third-party availability, security, pricing, changes, data handling, or acts. You decide whether to connect an integration and may need to grant it significant permissions; review those permissions carefully.</Paragraph></>,
  },
  {
    id: 'fees',
    title: 'Fees, subscriptions, and taxes',
    content: <><Paragraph>The open-source software can be used under its licence. We may separately offer paid hosting, support, implementation, or other services. Prices, billing periods, usage limits, renewal terms, and applicable taxes will be shown before purchase or stated in an order.</Paragraph><Paragraph>Unless an order says otherwise, subscriptions renew for the same period until cancelled. Fees already incurred are non-refundable except where required by law or expressly stated in the applicable order. We will provide reasonable notice of material price changes for renewing subscriptions.</Paragraph></>,
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property and feedback',
    content: <><Paragraph>The Services, website design, documentation, Runvey name, logos, and materials are owned by us or our licensors, except for content identified as open source or belonging to users or third parties.</Paragraph><Paragraph>You may provide feedback voluntarily. You allow us to use that feedback without restriction or payment, but this does not transfer ownership of your pre-existing intellectual property or override an open-source contribution licence that applies to a contribution.</Paragraph></>,
  },
  {
    id: 'security',
    title: 'Security and updates',
    content: <><Paragraph>We use reasonable measures to protect Services we operate, but no software or network is completely secure. You must promptly install relevant security updates, restrict administrative access, rotate secrets, maintain backups, and follow the security guidance applicable to your deployment.</Paragraph><Paragraph>We may release fixes, change supported versions, or stop supporting older releases. Open-source availability does not guarantee maintenance, response times, compatibility, or a particular release schedule.</Paragraph></>,
  },
  {
    id: 'availability',
    title: 'Availability and changes',
    content: <><Paragraph>We may improve, modify, suspend, or discontinue a Service or feature. Where practical, we will provide reasonable notice of a material change to a paid hosted Service. We do not promise uninterrupted or error-free operation.</Paragraph><Paragraph>Preview, alpha, beta, experimental, and community features may be incomplete, change without notice, and should not be used for workloads requiring guaranteed availability unless an applicable written agreement says otherwise.</Paragraph></>,
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    content: <><Paragraph>To the fullest extent permitted by law, the Services and documentation are provided <strong>“as is” and “as available”</strong>. We disclaim implied warranties of merchantability, satisfactory quality, fitness for a particular purpose, non-infringement, and uninterrupted or error-free operation.</Paragraph><Paragraph>Runvey does not provide legal, security, compliance, or professional advice. Examples, templates, and documentation require evaluation for your environment. Nothing in these Terms excludes guarantees or consumer rights that cannot lawfully be excluded.</Paragraph></>,
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    content: <><Paragraph>Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any liability that cannot legally be limited.</Paragraph><Paragraph>Subject to that, we are not liable for indirect or consequential loss, lost profits, revenue, business, goodwill, anticipated savings, data, or service interruption. For free Services, our aggregate liability is limited to £100. For a paid Service, our aggregate liability arising during any twelve-month period is limited to the fees you paid for that Service during that period.</Paragraph><Paragraph>These limits apply only to the fullest extent permitted by law. Different or additional limits may be set out in an order form or enterprise agreement.</Paragraph></>,
  },
  {
    id: 'indemnity',
    title: 'Business-user indemnity',
    content: <><Paragraph>If you use the Services for business purposes, you will indemnify us against third-party claims and reasonable costs arising from your deployed applications or content, your unlawful use of the Services, your breach of these Terms, or your infringement of another person’s rights, except to the extent caused by our breach or negligence.</Paragraph></>,
  },
  {
    id: 'termination',
    title: 'Suspension and termination',
    content: <><Paragraph>You may stop using the Services at any time. Account and subscription cancellation terms, if applicable, will be available in the relevant Service or order.</Paragraph><Paragraph>We may restrict or suspend access where reasonably necessary to address a security risk, unlawful activity, non-payment, material breach, harm to others, or risk to the Services. Where appropriate, we will provide notice and an opportunity to remedy the issue. Provisions that by their nature should survive termination will continue to apply.</Paragraph></>,
  },
  {
    id: 'law',
    title: 'Governing law and disputes',
    content: <><Paragraph>These Terms are governed by the laws of England and Wales. The courts of England and Wales have exclusive jurisdiction, except that consumers may have mandatory rights to bring proceedings in their home courts and under their local law.</Paragraph><Paragraph>Before filing a claim, please contact <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> and allow us a reasonable opportunity to resolve the issue informally.</Paragraph></>,
  },
  {
    id: 'changes-contact',
    title: 'Changes and contact details',
    content: <><Paragraph>We may update these Terms to reflect changes to the Services, law, security practices, or our business. The updated version will show a new effective date. For material changes to a paid Service, we will provide reasonable notice where required.</Paragraph><Paragraph>Contact: Percy Real Estate Ltd, 25 Cabot Square, London, England, E14 4QZ. Email: <a href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. Source and community issues: <a href={RUNVEY_REPOSITORY} target="_blank" rel="noreferrer">github.com/matchouse/runvey</a>.</Paragraph><Paragraph>These Terms, the <Link href="/privacy">Privacy Policy</Link>, the applicable open-source licence, and any order form make up the agreement relevant to your use. If one provision is unenforceable, the remaining provisions continue in effect.</Paragraph></>,
  },
];

export default function TermsPage() {
  return <LegalDocument kind="terms" eyebrow="Legal document" title="Terms of Service" description="The rules for using Runvey’s website, documentation, open-source project, and any related hosted services." sections={sections} />;
}
