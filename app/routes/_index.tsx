import { ClientActionFunctionArgs, Form, redirect } from "@remix-run/react";

import { Center, Flex, styled } from "~/styled-system/jsx";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();

  const url = formData.get("url");

  if (url) {
    const matches = url.toString().match(/gofundme\.com\/f\/([^?]+)/i);

    if (matches) {
      return redirect(`/campaigns/${matches[1]}/widget`);
    }
  }

  return null;
}

export default function Component() {

  return (
    <Center css={{ minH: "screen" }}>
      <styled.div css={{ maxW: "lg", w: "screen" }}>
        <Form method="POST">
          <styled.label>
            <styled.div css={{ mb: 2 }}>GoFundMe Campaign URL</styled.div>
            <styled.input type="text" name="url" css={{ bg: "neutral.300", p: 3, rounded: "lg", w: "full" }} />
          </styled.label>
          <styled.button type="submit" css={{ bg: { base: "blue.500", _hover: "blue.400" }, color: "white", mt: 6, p: 3, rounded: "lg" }}>
            Generate Widget
          </styled.button>
        </Form>
      </styled.div>
    </Center>
  )
}
