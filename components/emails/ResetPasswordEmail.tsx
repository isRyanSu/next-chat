import * as React from 'react'

import { Tailwind } from '@react-email/tailwind'
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components'

export default function ResetPasswordEmail({
  email,
  link,
}: {
  email: string
  link: string
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Please click the following button to reset your password.
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-10 max-w-[465px] rounded border border-solid border-zinc-300 p-5">
            <Text className="text-sm leading-6 text-zinc-900">Hello,</Text>
            <Text className="text-sm leading-6 text-zinc-900">
              We&apos;ve received a request to reset the password for the{' '}
              <strong className="font-semibold">NextChat</strong> account
              associated with{' '}
              <span className="text-zinc-900 underline">{email}</span>. No
              changes have been made to your account yet. To reset your
              password, click on the button below.
            </Text>
            <Section className="my-8 text-center">
              <Button
                href={link}
                className="rounded bg-zinc-900 px-5 py-3 text-center text-xs font-semibold text-zinc-100 no-underline"
              >
                Reset your password
              </Button>
            </Section>
            <Text className="text-sm text-zinc-700">
              If you didn&apos;t request for a password reset, you can safely
              ignore this email.
            </Text>
            <Text className="text-sm text-zinc-700">
              Ryan,
              <br />
              Web Developer
            </Text>
            <Hr className="mx-0 my-4 w-full rounded-full border border-solid border-zinc-300" />
            <Text className="my-2 text-xs text-zinc-500">NextChat Team,</Text>
            <Text className="my-2 text-xs text-zinc-500">
              Changshi East Road No.21, Dinghai, Zhoushan, Zhejiang China
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
