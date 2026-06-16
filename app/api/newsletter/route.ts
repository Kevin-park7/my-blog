import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: '유효한 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: 'Good Thinking <onboarding@resend.dev>',
      to: email,
      subject: 'Good Thinking 뉴스레터 구독을 환영합니다!',
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #f3ecdc; color: #1a1a1a;">
          <h1 style="font-size: 24px; margin-bottom: 16px; color: #a8531f;">Good Thinking에 오신 것을 환영합니다!</h1>
          <p style="font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
            뉴스레터 구독해주셔서 감사합니다. 앞으로 주간 기술 이야기를 이메일로 보내드릴게요.
          </p>
          <p style="font-size: 14px; color: #666; margin-top: 32px;">
            구독을 원하지 않으시면 언제든지 구독 취소하실 수 있습니다.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: '이메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
