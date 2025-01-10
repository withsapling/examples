import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const EmailTemplate = () => {
  const previewText = `Hello From Sapling & Resend 👋`;
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
            <Section className="mt-[32px]">
              <Img
                src={`https://resend.com/static/brand/resend-icon-white.png`}
                width="48"
                height="48"
                alt="Resend Logo"
                className="bg-black my-0 mx-auto rounded-full"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[16px] mx-0">
              Hello From Sapling & Resend 👋
            </Heading>
            <Container className="text-center mt-[32px]">
              <Text className="text-black text-[14px] leading-[24px] m-0">
                This email was sent from the Sapling & Resend <Link href="https://github.com/withsapling/examples/tree/main/deno/with-resend">example project</Link>
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                You can learn more about Sapling and Resend with the links below
              </Text>
              <Container className="text-center mt-[32px]">
                <Button className="bg-black text-white px-4 py-2 rounded-md mr-4" href="https://sapling.land/docs">Sapling Docs</Button>
                <Button className="bg-black text-white px-4 py-2 rounded-md" href="https://resend.com/docs">Resend Docs</Button>
              </Container>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
