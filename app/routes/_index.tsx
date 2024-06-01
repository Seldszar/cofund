import { useFormik } from "formik";
import { useMemo } from "react";

import { Container, Flex, styled } from "~/styled-system/jsx";

import { OverlayPreview } from "~/components/OverlayPreview";

export default function Component() {
  const { handleChange, values } = useFormik({
    initialValues: {
      url: "",
    },

    onSubmit() {},
  });

  const campaignUrl = useMemo(() => values.url.match(/gofundme\.com\/f\/([^?]+)/i)?.[1], [values.url]);

  return (
    <Flex direction="column" css={{ minH: "screen" }}>
      <Container css={{ display: "flex", flex: 1, flexDir: { lgDown: "column" }, gap: 8, p: 8, w: "screen" }}>
        <styled.div css={{ flex: { lg: 1 } }}>
          <styled.header css={{ mb: 8 }}>
            <styled.h1 css={{ fontSize: "3xl", fontWeight: "bold", mb: 2 }}>
              GoFundMe Overlay Generator
            </styled.h1>
            <styled.p css={{}}>
              If you want to promote a GoFundMe fundraising campaign on your stream, this service allows you to add an overlay displaying the raised amount and the shortlink to invite your viewers to go to the page.
            </styled.p>
          </styled.header>

          <styled.label>
            <styled.div css={{ fontWeight: "bold", mb: 2 }}>
              GoFundMe Campaign URL
            </styled.div>
            <styled.input type="text" name="url" onChange={handleChange} value={values.url} css={{ bg: "neutral.200", px: 4, py: 3, rounded: "lg", w: "full" }} />
          </styled.label>
        </styled.div>

        <styled.div css={{ flex: { lg: 1 } }}>
          {campaignUrl && <OverlayPreview campaignUrl={campaignUrl} />}
        </styled.div>
      </Container>

      <styled.footer css={{ flex: "none", p: 2 }}>
        <styled.ul css={{ display: "flex", fontSize: "xs", gap: 2, justifyContent: "center" }}>
          <li>
            Made with love by <a href="https://seldszar.fr" target="_blank" rel="noopener noreferrer">Seldszar</a>
          </li>
          <li>
            &mdash;
          </li>
          <li>
            <a href="https://github.com/seldszar/cofund" target="_blank" rel="noopener noreferrer">View Source</a>
          </li>
        </styled.ul>
      </styled.footer>
    </Flex>
  )
}
