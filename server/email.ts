import { MailService } from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY2 || process.env.SENDGRID_API_KEY;
if (!apiKey) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(apiKey);

interface ContactFormEmail {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface JobApplicationEmail {
  name: string;
  email: string;
  phone: string;
  role: string;
  otherRole?: string;
  qualifications: Array<{
    type: string;
    qualification: string;
    expiryDate: string;
  }>;
}

interface StarterFormEmail {
  name: string;
  email: string;
  phone: string;
  role: string;
  otherRole?: string;
  qualifications?: Array<{
    type?: string;
    qualification?: string;
    registrationNumber?: string;
    expiryDate?: string;
    photo?: any;
  }>;
  cisNumber: string;
  accountName: string;
  sortCode: string;
  accountNumber: string;
  niNumber: string;
}

export async function sendContactFormEmail(data: ContactFormEmail): Promise<boolean> {
  try {
    await mailService.send({
      to: "info@akhgroundworks.co.uk",
      from: "contact@akhgroundworks.co.uk",
      replyTo: "info@akhgroundworks.co.uk",
      subject: `New Contact Form Submission from ${data.name} - ${data.service}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Service Required: ${data.service}

Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Service Required:</strong> ${data.service}</p>
<h3>Message:</h3>
<p>${data.message}</p>
      `,
    });
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error.response?.body?.errors) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body.errors, null, 2));
    }
    return false;
  }
}

export async function sendJobApplicationEmail(data: JobApplicationEmail): Promise<boolean> {
  try {
    const qualificationsText = data.qualifications
      .map(q => `- ${q.type}: ${q.qualification} (Expires: ${new Date(q.expiryDate).toLocaleDateString()})`)
      .join('\n');

    await mailService.send({
      to: "info@akhgroundworks.co.uk",
      from: "contact@akhgroundworks.co.uk",
      replyTo: "info@akhgroundworks.co.uk",
      subject: `New Job Application from ${data.name}`,
      text: `
New Job Application Received

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Role: ${data.role}${data.otherRole ? ` (${data.otherRole})` : ''}

Qualifications:
${qualificationsText}
      `,
      html: `
<h2>New Job Application</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Role:</strong> ${data.role}${data.otherRole ? ` (${data.otherRole})` : ''}</p>

<h3>Qualifications:</h3>
<ul>
  ${data.qualifications.map(q => `
    <li>
      <strong>${q.type}:</strong> ${q.qualification}<br>
      <em>Expires: ${new Date(q.expiryDate).toLocaleDateString()}</em>
    </li>
  `).join('')}
</ul>
      `,
    });
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error.response?.body?.errors) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body.errors, null, 2));
    }
    return false;
  }
}

export async function sendStarterFormEmail(data: StarterFormEmail): Promise<boolean> {
  try {
    console.log('Attempting to send starter form email with data:', { ...data, accountNumber: '****' });

    const validQualifications = (data.qualifications || []).filter(q => q.type || q.qualification);
    const qualificationsText = validQualifications.length > 0
      ? validQualifications.map(q => `- ${q.type || 'N/A'}: ${q.qualification || 'N/A'} (Reg: ${q.registrationNumber || 'N/A'}, Expires: ${q.expiryDate ? new Date(q.expiryDate).toLocaleDateString() : 'N/A'})`).join('\n')
      : 'None provided';

    const qualificationsHtml = validQualifications.length > 0
      ? `<ul>${validQualifications.map(q => `
          <li>
            <strong>${q.type || 'N/A'}:</strong> ${q.qualification || 'N/A'}<br>
            <strong>Registration Number:</strong> ${q.registrationNumber || 'N/A'}<br>
            <em>Expires: ${q.expiryDate ? new Date(q.expiryDate).toLocaleDateString() : 'N/A'}</em>
          </li>
        `).join('')}</ul>`
      : '<p>None provided</p>';

    await mailService.send({
      to: ["info@akhgroundworks.co.uk", "hawkinsmx199@aol.co.uk"],
      from: "contact@akhgroundworks.co.uk",
      replyTo: "info@akhgroundworks.co.uk",
      subject: `New Starter Form Submission from ${data.name}`,
      text: `
New Starter Form Submission

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Role: ${data.role}${data.otherRole ? ` (${data.otherRole})` : ''}

Qualifications:
${qualificationsText}

Payment Details:
National Insurance Number: ${data.niNumber}
UTR Number: ${data.cisNumber}
Name on Account: ${data.accountName}
Sort Code: ${data.sortCode}
Account Number: ${data.accountNumber}
      `,
      html: `
<h2>New Starter Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Role:</strong> ${data.role}${data.otherRole ? ` (${data.otherRole})` : ''}</p>

<h3>Qualifications:</h3>
${qualificationsHtml}

<h3>Payment Details:</h3>
<p><strong>National Insurance Number:</strong> ${data.niNumber}</p>
<p><strong>UTR Number:</strong> ${data.cisNumber}</p>
<p><strong>Name on Account:</strong> ${data.accountName}</p>
<p><strong>Sort Code:</strong> ${data.sortCode}</p>
<p><strong>Account Number:</strong> ${data.accountNumber}</p>
      `,
    });
    console.log('Successfully sent starter form email');
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', error);
    if (error.response?.body?.errors) {
      console.error('SendGrid error details:', JSON.stringify(error.response.body.errors, null, 2));
    }
    return false;
  }
}