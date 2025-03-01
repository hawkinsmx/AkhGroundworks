import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface ContactFormEmail {
  name: string;
  email: string;
  phone: string;
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

export async function sendContactFormEmail(data: ContactFormEmail): Promise<boolean> {
  try {
    await mailService.send({
      to: "info@akhgroundworks.co.uk",
      from: "website@akhgroundworks.co.uk",
      subject: `New Contact Form Submission from ${data.name}`,
      text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

Message:
${data.message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<h3>Message:</h3>
<p>${data.message}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
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
      from: "website@akhgroundworks.co.uk",
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
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}