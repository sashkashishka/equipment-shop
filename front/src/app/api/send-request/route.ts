import { NextRequest, NextResponse } from 'next/server';
import Mailgun from 'mailgun.js';

const DOMAIN = process.env.MAILGUN_DOMAIN!;
const DESTINATION_EMAIL = process.env.MAILGUN_DESTINATION_EMAIL;
const API_KEY = process.env.MAILGUN_API_KEY!;

export async function POST(req: NextRequest) {
  const bodyQuery = await streamToString(req.body!);
  const body = queryToObj(bodyQuery);

  const letter = createLetter(body);
  const mg = createMailTransport();

  const redirectUrl = new URL(req.headers.get('referer')!);

  try {
    await mg.messages.create(DOMAIN, letter);
    redirectUrl.searchParams.set('reqStatus', '1');
  } catch (e) {
    console.error(e);
    redirectUrl.searchParams.set('reqStatus', '0');
  }

  return NextResponse.redirect(redirectUrl);
}

async function streamToString(body: ReadableStream) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const chunks: string[] = [];

  async function read() {
    const { done, value } = await reader.read();

    if (done) {
      return chunks.join('');
    }

    chunks.push(decoder.decode(value, { stream: true }));
    return read();
  }

  return read();
}

function queryToObj(query: string): Record<string, string> {
  const searchParams = new URLSearchParams(query);

  const obj: Record<string, string> = {};

  searchParams.forEach((val, key) => {
    obj[key] = val;
  });

  return obj;
}

function createLetter(body: Record<string, string>) {
  return {
    from: `PackingService <no-reply@${DOMAIN}>`,
    to: DESTINATION_EMAIL,
    subject: `New request ${new Date().toLocaleString()}`,
    html: `<table>${Object.entries(body)
      .map(
        ([key, val]) => `
      <tr>
        <td><b>${key}</b></td>
        <td>${val}</td>
      </tr>`,
      )
      .join('')}</table>`,
  };
}

function createMailTransport() {
  // @ts-ignore - FormData on server will never accept HTMLFormElement
  const mailgun = new Mailgun(FormData);

  return mailgun.client({
    username: 'api',
    key: API_KEY,
  });
}
